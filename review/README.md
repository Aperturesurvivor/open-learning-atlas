# Mathematics review ledger

Machine validation can prove structure, reachability, reproducibility, and measurable coverage floors. It cannot establish that a mathematical decomposition is correct, well-scoped, non-duplicative, or educationally useful. This directory keeps that distinction inspectable.

## Artifacts

- `QUEUE.md` is a generated, mobile-readable territory picker with current
  status, direct atlas links, and preselected review-issue links.
- `audits/mathematics-0.3.0-alpha-ai-prevalidation.md` is a release-pinned,
  AI-generated adversarial audit. It identifies validation priorities but is
  not approval or accountable review evidence.
- `inventory/mathematics-0.3.0-alpha.json` is generated structural evidence for all 87 active territories.
- `territory-reviews.json` is the human-editable decision ledger. It begins with every dimension pending.
- `schema/territory-review.schema.json` defines the review interchange format.

Do not generate approvals, attribute an AI as the accountable reviewer, or mark an entry approved because automated checks pass.

## Review dimensions

Every territory requires explicit decisions for:

1. scope and boundary;
2. material omissions;
3. aggregation and split quality;
4. multi-region membership;
5. mathematical correctness;
6. capability observability;
7. representation coverage;
8. dependency-state honesty.

An `approved` or `changes-requested` decision requires a reviewer name, date, and substantive note. Material objections should produce a map change or a contested claim rather than being erased.

## Workflow

1. Pin the map version and choose one territory from the generated inventory.
2. Inspect its descendants, sources, relationships, capability statements, and coverage notes.
3. Record one decision per dimension in `territory-reviews.json` through a pull request.
4. Run `tools/validate-reviews` and all map checks.
5. Re-review any territory whose identity revision or material descendants change.

When an unrevised ledger contains only pending decisions and the active territory
set changes, `tools/rebase-pending-reviews` can re-pin it safely. The tool refuses
to discard non-pending review evidence.

```sh
tools/build-review-inventory --check
tools/audit-validation-risk --pretty
tools/validate-reviews
tools/build-review-queue --check
tools/test-review-validator  # isolated synthetic conformance test; never review evidence
tools/validate-reviews --require-complete  # final v1 gate; intentionally fails while reviews are pending
```

The initial alpha ledger is a review queue, not review evidence. The synthetic
complete ledger used by `tools/test-review-validator` exists only in a temporary
directory and tests validator behavior; it is never published or accepted as a
human decision.
