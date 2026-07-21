# Security Policy

The canonical atlas is public data and the initial viewer is a static site, so
the project should collect no learner records, credentials, or private analytics.

## Reporting

Use GitHub private vulnerability reporting from the repository Security page.
Do not publish exploit details, credentials, or personal data in a public issue.
If private reporting is temporarily unavailable, open a minimal issue asking
the maintainers to enable a private channel without including sensitive details.

## In Scope

- viewer or build vulnerabilities that affect site visitors or contributors;
- dependency or workflow compromise;
- release tampering, checksum bypass, or misleading artifact provenance;
- accidental inclusion of credentials or private learner information;
- ID-resolution behavior that could redirect consumers to malicious content.

Mathematical errors, disputed prerequisites, and accessibility defects are
important but should normally use the public issue and review process unless
disclosure would create a separate security or privacy risk.
