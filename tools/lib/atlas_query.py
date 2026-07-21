"""Read-only query primitives for Open Learning Atlas releases."""

from __future__ import annotations

from collections import Counter, defaultdict, deque
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable
import json


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RELEASE = ROOT / "map" / "releases" / "mathematics-v0.1.0-alpha.json"


class QueryError(ValueError):
    pass


@dataclass
class Atlas:
    release: dict[str, Any]

    def __post_init__(self) -> None:
        self.nodes = {node["id"]: node for node in self.release["nodes"]}
        self.sources = {source["id"]: source for source in self.release["sources"]}
        self.edges = {edge["id"]: edge for edge in self.release["edges"]}
        self.slugs: dict[str, list[dict[str, Any]]] = defaultdict(list)
        self.outgoing: dict[str, list[dict[str, Any]]] = defaultdict(list)
        self.incoming: dict[str, list[dict[str, Any]]] = defaultdict(list)
        for node in self.release["nodes"]:
            self.slugs[node["slug"]].append(node)
        for edge in self.release["edges"]:
            self.outgoing[edge["subject"]].append(edge)
            self.incoming[edge["object"]].append(edge)
        roots = [node for node in self.release["nodes"] if node.get("subtype") == "atlas-root"]
        if len(roots) != 1:
            raise QueryError(f"Expected one atlas root; found {len(roots)}")
        self.root = roots[0]

    @classmethod
    def load(cls, path: Path | str = DEFAULT_RELEASE) -> "Atlas":
        with Path(path).open(encoding="utf-8") as handle:
            return cls(json.load(handle))

    def resolve_node(self, reference: str) -> dict[str, Any]:
        if reference in self.nodes:
            return self.nodes[reference]
        exact = self.slugs.get(reference, [])
        if len(exact) == 1:
            return exact[0]
        if len(exact) > 1:
            raise QueryError(f"Ambiguous slug: {reference}")
        raise QueryError(f"Unknown node ID or slug: {reference}")

    def search(self, query: str, limit: int = 20) -> list[dict[str, Any]]:
        normalized = query.casefold().strip()
        if not normalized:
            return []

        def score(node: dict[str, Any]) -> tuple[int, str]:
            label = node["label"].casefold()
            slug = node["slug"].casefold()
            identity = node["id"].casefold()
            definition = node["definition"].casefold()
            if normalized in (label, slug, identity):
                rank = 0
            elif label.startswith(normalized):
                rank = 1
            elif normalized in label:
                rank = 2
            elif normalized in slug:
                rank = 3
            elif normalized in identity:
                rank = 4
            elif normalized in definition:
                rank = 5
            else:
                rank = 99
            return rank, label

        matches = sorted(self.release["nodes"], key=score)
        return [node for node in matches if score(node)[0] < 99][:limit]

    def children(self, identity: str) -> list[dict[str, Any]]:
        return sorted(
            (
                self.nodes[edge["object"]]
                for edge in self.outgoing[identity]
                if edge["relation"] == "composed_of"
            ),
            key=lambda node: (node["label"].casefold(), node["id"]),
        )

    def parents(self, identity: str) -> list[dict[str, Any]]:
        return sorted(
            (
                self.nodes[edge["subject"]]
                for edge in self.incoming[identity]
                if edge["relation"] == "composed_of"
            ),
            key=lambda node: (node["label"].casefold(), node["id"]),
        )

    def composition_path(self, reference: str) -> list[dict[str, Any]]:
        target = self.resolve_node(reference)
        queue: deque[tuple[str, list[str]]] = deque([(self.root["id"], [self.root["id"]])])
        seen = {self.root["id"]}
        while queue:
            current, path = queue.popleft()
            if current == target["id"]:
                return [self.nodes[identity] for identity in path]
            for child in self.children(current):
                if child["id"] not in seen:
                    seen.add(child["id"])
                    queue.append((child["id"], [*path, child["id"]]))
        raise QueryError(f"No composition path from root to {target['id']}")

    def descendants(self, reference: str, kinds: Iterable[str] | None = None) -> list[dict[str, Any]]:
        target = self.resolve_node(reference)
        allowed = set(kinds or [])
        queue = deque(child["id"] for child in self.children(target["id"]))
        seen: set[str] = set()
        result: list[dict[str, Any]] = []
        while queue:
            identity = queue.popleft()
            if identity in seen:
                continue
            seen.add(identity)
            node = self.nodes[identity]
            if not allowed or node["kind"] in allowed:
                result.append(node)
            queue.extend(child["id"] for child in self.children(identity))
        return sorted(result, key=lambda node: (node["kind"], node["label"].casefold(), node["id"]))

    def assessable_descendants(self, reference: str) -> list[dict[str, Any]]:
        return [node for node in self.descendants(reference) if node["assessable"]]

    def expanded_coverage(self, references: Iterable[str]) -> set[str]:
        covered: set[str] = set()
        for reference in references:
            node = self.resolve_node(reference)
            if node["assessable"]:
                covered.add(node["id"])
            covered.update(item["id"] for item in self.assessable_descendants(node["id"]))
        return covered

    def requirements(self, reference: str) -> dict[str, Any]:
        target = self.resolve_node(reference)
        direct = [
            edge for edge in self.outgoing[target["id"]]
            if edge["relation"] == "requires"
        ]
        groups = [group for group in self.release["requirement_groups"] if group["target"] == target["id"]]
        return {
            "target": target,
            "direct": sorted(direct, key=lambda edge: edge["id"]),
            "groups": sorted(groups, key=lambda group: group["id"]),
        }

    def learner_gap(self, target_reference: str, mastered_references: Iterable[str]) -> dict[str, Any]:
        target = self.resolve_node(target_reference)
        mastered = {self.resolve_node(reference)["id"] for reference in mastered_references}
        requirements = self.requirements(target["id"])
        missing_direct = [edge["object"] for edge in requirements["direct"] if edge["object"] not in mastered]
        group_results = []
        for group in requirements["groups"]:
            satisfied_members = sorted(set(group["members"]) & mastered)
            minimum = group.get("minimum_satisfied")
            if group["mode"] == "all-of":
                minimum = len(group["members"])
            elif group["mode"] == "any-of":
                minimum = 1
            group_results.append({
                "group": group,
                "satisfied": len(satisfied_members) >= int(minimum),
                "satisfied_members": satisfied_members,
                "missing_members": sorted(set(group["members"]) - mastered),
            })
        return {
            "target": target,
            "mastered_ids": sorted(mastered),
            "missing_direct_ids": sorted(missing_direct),
            "requirement_groups": group_results,
        }

    def statistics(self) -> dict[str, Any]:
        return {
            "map": self.release["map"],
            "format_version": self.release["format_version"],
            "counts": {
                "nodes": len(self.nodes),
                "edges": len(self.edges),
                "sources": len(self.sources),
                "requirement_groups": len(self.release["requirement_groups"]),
            },
            "nodes_by_kind": dict(sorted(Counter(node["kind"] for node in self.nodes.values()).items())),
            "nodes_by_status": dict(sorted(Counter(node["status"] for node in self.nodes.values()).items())),
            "nodes_by_confidence": dict(sorted(Counter(node["confidence"] for node in self.nodes.values()).items())),
            "edges_by_relation": dict(sorted(Counter(edge["relation"] for edge in self.edges.values()).items())),
            "edges_by_status": dict(sorted(Counter(edge["status"] for edge in self.edges.values()).items())),
        }


def compact_node(node: dict[str, Any]) -> dict[str, Any]:
    return {
        key: node[key]
        for key in ("id", "revision", "slug", "label", "kind", "subtype", "assessable", "status", "confidence")
        if key in node
    }
