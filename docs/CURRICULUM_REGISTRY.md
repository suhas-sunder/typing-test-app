# Curriculum registry

`lib/curriculum/registry.ts` is the single source of truth for the current curriculum.

## Progression

| Level | Lessons | Sequence |
|---|---:|---:|
| Beginner Foundations | 17 | 1–17 |
| Intermediate Fluency | 17 | 18–34 |
| Advanced Application | 11 | 35–45 |

The six existing row, full-keyboard, punctuation, and number routes are skill hubs. A lesson can carry several `skillTags`, but it has one `unitId` to keep one canonical runner URL. `milestoneTags` are the explicit required sets used by milestone achievements.

## Stage contract

Every lesson starts with an instruction stage excluded from metrics. Normal lessons have at least five typed required stages; reviews have six typed required stages; assessments have four typed required parts. Only explicitly configured challenges have a duration limit.

Typed stages use the shared Phase 1 engine. The aggregate formulas are:

- accuracy = total correct tracked keystrokes / total tracked keystrokes;
- WPM = total correct tracked characters / 5 / total active minutes;
- corrected and uncorrected errors remain separate;
- stars use the centralized 85/90/95/97+standard/99+mastery rubric.

If a stage set is below 95% or reports weak keys, one deterministic optional adaptive stage may be appended. It uses at most two keys and cannot recurse.

## Validation

The validator enforces 45 unique ordered IDs, valid prerequisites, centralized star thresholds, instruction-first stages, at least four typed stages, distinct stage text, declared characters, and finger assignments. Human review is still required for pedagogy, naturalness, difficulty, and final WPM targets.
