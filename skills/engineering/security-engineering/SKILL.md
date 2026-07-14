---
name: security-engineering
description: Analyzes and hardens software against abuse — threat modeling, authn/authz, input handling, secrets, crypto usage, and dependency/supply-chain risk — reasoning from an attacker's goals to concrete, evidence-grounded findings with fixes. Use when designing security-sensitive features, reviewing code that touches auth/crypto/untrusted input, or threat-modeling a system. Not for live breach response (observability-incident-response) or general code review (code-change-review escalates here). Defensive and authorized-testing use only.
---

# Security Engineering

## Purpose

Produce security findings an attacker would actually exploit, each grounded
in specific code or design evidence, ranked by realistic impact and
likelihood, with a concrete remediation — not a generic checklist recital.

## Scope and ethics

This skill supports **defensive** hardening, threat modeling, and authorized
security review. It MUST NOT produce working exploits for systems the user
isn't authorized to test, weaponized attack tooling, or evasion techniques
for malicious use. When authorization is unclear for anything offensive,
ask before proceeding.

## Inputs

- The asset and adversary picture: what's worth protecting (data, funds,
  availability, integrity) and who wants it (external, authenticated user,
  insider, supply chain). Absent this, threat modeling is unfocused.
- The code/design under review, the trust boundaries, and the tech stack
  (vuln classes are stack-specific).
- The existing security controls (auth model, framework protections) — so
  findings aren't already mitigated one layer up.

## Procedure

1. **Model the threats before reading line-by-line.** Identify trust
   boundaries (where data crosses from less-trusted to more-trusted), the
   assets behind each, and the adversary's goal per asset. STRIDE or
   attacker-goal trees — pick one and cover: spoofing, tampering,
   repudiation, information disclosure, denial of service, elevation. This
   frames what to look for; MUST precede detailed review.
2. **Follow untrusted data.** For every input crossing a trust boundary,
   trace it to every sink: query (injection), template/DOM (XSS), shell/
   eval (command injection), path (traversal), deserializer (RCE/gadget),
   URL fetch (SSRF), and log (log injection). A finding MUST cite the
   source→sink path in the actual code, not assert a category.
3. **Test the authorization model specifically.** For each protected
   operation: is authz checked, at the right layer, on every path
   (including the "internal" one), against the right subject? Hunt IDOR
   (object references without ownership checks), missing function-level
   checks, and confused-deputy patterns. Authentication ≠ authorization —
   check both.
4. **Audit secrets and crypto usage.** Hardcoded secrets, secrets in logs/
   URLs/errors, credentials in the repo history. For crypto: MUST check for
   use-don't-invent (roll-your-own crypto is a finding), correct primitives
   (password hashing = argon2/bcrypt/scrypt not SHA, encryption is
   authenticated, randomness is CSPRNG), and correct usage (IV reuse, ECB,
   missing signature verification).
5. **Check the boring high-impact classes:** missing rate limiting on
   auth/expensive endpoints, verbose errors leaking internals, insecure
   defaults, CORS/CSRF posture, SSRF via user-supplied URLs, and
   mass-assignment.
6. **Assess dependency and supply-chain risk:** known-vuln dependencies
   (with the version-specific CVE, not a guess), typosquat/confusion risk,
   unpinned or unverified build inputs, over-broad permissions/tokens in CI.
   Hand version-selection tradeoffs to `dependency-evaluation`.
7. **Rank by realistic risk.** Each finding: impact × likelihood ×
   exploitability given existing controls. A theoretical issue behind three
   mitigations ranks below a trivial IDOR. MUST distinguish confirmed
   (evidenced in code) from suspected (needs runtime verification).
8. **Remediate concretely.** Per finding: the specific fix (framework
   mechanism, correct primitive, the missing check) and the defensive test
   that would catch regression. Prefer eliminating the vulnerability class
   (parameterized queries everywhere) over patching the instance.

## Output Format

```markdown
# Security review: <target>
## Threat model summary (assets, boundaries, adversaries, top threats)
## Findings (ranked)
### F1: <title> — Severity (impact/likelihood/exploitability)
- Evidence: source→sink at file:line (confirmed | suspected)
- Attack: how it's exploited (conceptually; no weaponized payload)
- Fix: specific remediation + regression test
## Positive controls observed (what's already done right)
## Suspected items needing runtime/authorized verification
## Out of scope / escalation (incl. anything needing authorization)
```

## Quality Checklist

- [ ] Threat model precedes line review; adversary goals stated.
- [ ] Every finding cites a source→sink path in real code, not a category name.
- [ ] Authz checked separately from authn, on all paths.
- [ ] Crypto findings name the correct primitive/usage, not just "insecure".
- [ ] Dependency findings cite specific versions/CVEs, not guesses.
- [ ] Findings ranked by realistic risk given existing controls; confirmed vs suspected labeled.

## Failure Conditions

- **Checklist recital:** listing OWASP categories without locating them in
  the code — the dominant low-value failure.
- **Fabricated CVEs / vulns:** asserting a dependency is vulnerable without
  the specific advisory (serious hallucination risk — mark unverified).
- **Severity inflation:** flagging every theoretical issue as critical,
  drowning the real IDOR.
- **Authn/authz conflation.**
- **Roll-your-own endorsement:** approving custom crypto.
- **Escalate / stop** when: exploitation would require authorization the
  user hasn't demonstrated (do not produce the exploit); a finding indicates
  an active compromise (route to incident response immediately); or
  confirming a suspected issue needs runtime testing out of scope (label it,
  don't assert it).

## Related skills

- `code-change-review` — general review that escalates security-sensitive
  diffs here.
- `dependency-evaluation` — deeper analysis of a risky dependency's fitness.
- `api-design` — authz/abuse-resistance at contract-design time.
- `observability-incident-response` — when a finding is a live breach.
