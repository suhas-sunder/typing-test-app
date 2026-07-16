# Free Typing Camp Agent Notes

## Binding UI Rules

These rules are immutable unless the user explicitly replaces them in a later task:

- Preserve the existing warm cream, deep navy, coral-orange, and muted sage visual direction.
- Do not create nested cards or panels. Prefer flat sections, open space, and clear type hierarchy.
- Apply distinct section or footer backgrounds across the full viewport width; constrain only the inner content.
- Keep typing pages calm and zen-like. The passage and keyboard are the focus, without decorative containers or competing widgets.
- Navigation must link only to real, implemented destinations. Do not show authentication, student-path, cloud-save, or account wording unless those systems actually exist.
- On light surfaces, interactive hover and keyboard-focus states use the bright coral-orange action colour with sufficient contrasting text.
- Preserve the existing dark-header navigation hover treatment.
- Do not add CSS borders, outlines, or box shadows. Accessible focus visibility must use colour, background, text decoration, weight, opacity, or another approved existing treatment.
- Every changed interface must remain responsive and readable at 390px, 768px, 1366px, and 1920px without horizontal page overflow.

## Product Positioning

Free Typing Camp is a calm, accuracy-first typing program for students, homeschool parents, tutors, and small classrooms.

The product should feel warm, structured, trustworthy, and easy to return to. It should not feel like a noisy typing game, a generic WPM test site, or a bloated school LMS.

Primary positioning:

> Calm typing practice that students can actually stick with.

Secondary positioning:

> Accuracy first. Short lessons. Clear progress. No noisy classroom clutter.

## Target Audience

Prioritize:

- Homeschool parents who want a simple typing curriculum.
- Elementary and middle-school teachers who need low-friction typing practice.
- Tutors and small learning pods.
- Students who need structure but get bored by generic drills.
- Older beginners who want a clean, non-childish typing practice experience.

Do not prioritize district-scale LMS features, enterprise school procurement, or complex classroom administration unless explicitly requested.

## Strategic Wedge

The wedge is not “free typing lessons.” That market is already crowded.

The wedge is:

> A low-clutter, accuracy-first typing curriculum that makes practice easier to start, easier to finish, and easier for parents or teachers to monitor.

Free Typing Camp should compete on:

- calm design
- short-session pacing
- accuracy before speed
- weak-key detection
- simple student progress
- parent/teacher-friendly reporting
- printable summaries and certificates
- clear lesson progression
- fewer distractions than large ad-supported typing platforms

Avoid competing on:

- massive district admin features
- enterprise rostering
- bloated dashboards
- dozens of unrelated games
- generic WPM tests as the main value
- AI gimmicks that do not improve learning

## Design Direction

Follow the existing Free Typing Camp visual system unless the user explicitly asks to deviate.

The visual direction should be:

> Warm cream canvas, deep navy typography, coral-orange action accents, muted sage support states, generous spacing, minimal table lines, and clean progress visuals.

The design should feel:

- calm
- structured
- warm
- student-friendly
- parent/teacher trustworthy
- polished
- minimal
- editorial rather than boxed SaaS

Avoid:

- generic SaaS styling
- bright-blue UI treatments
- nested boxes-within-boxes
- noisy dashboard layouts
- heavy borders
- random outlines
- harsh shadows
- gradients
- shadowy glows
- decorative box-shadows unless explicitly approved
- over-decorated cards
- cluttered game UI

## Color Palette

Use this palette as the design reference.

### Backgrounds

- Main paper/background: `#f5efe5`
- Main surface: `#fffdf8`
- Secondary surface: `#faf5ed`
- Elevated warm surface: `#fffaf3`
- Soft tan fill: `#f4eadc`

The site should feel mostly cream/off-white, not pure white. Background contrast should come from spacing, warm fills, and layout hierarchy rather than visible boxes.

### Text

- Primary ink: `#172033`
- Muted text: `#4f6072`
- Strong navy: `#202c3a`
- Deeper navy: `#162232`

Use deep navy for structure and headings. Use muted blue-gray for secondary labels, descriptions, percentages, and supporting UI text.

### Primary Accent

- Coral-orange: `#ef7449`
- Strong coral-orange: `#cf5d3f`
- Pale orange fill: `#fff0e7`
- Pale coral fill support: `#f2c5b2`

Orange/coral is the primary action color. Use it for next actions, active states, current lesson emphasis, active graph lines, and important progress moments.

### Supporting Colors

- Sage: `#789a84`
- Pale sage fill: `#eaf3ee`
- Peach: `#f7d7c6`
- Tan: `#eadfce`
- Strong tan line: `#d0c0ad`
- Gold: `#e5a33a`
- Success: `#668b72`
- Warning: `#c48738`
- Error: `#bd5948`

Use sage for correct/home-row/supportive states. Use peach/coral for warnings, errors, or practice attention. Use gold sparingly for stars, completion, or achievement states.

## Typography

Preferred font system:

- `Manrope` for headings, UI, labels, navigation, buttons, stats, and general copy.
- `JetBrains Mono` for typing prompts, practice text, keyboard output, keyboard-like UI, and code-like text.
- `Atkinson Hyperlegible` as a readability-focused fallback or support font where useful.

The font system should feel modern, calm, structured, and readable. It should not feel childish, gimmicky, overly playful, or like a generic school game.

### Font Usage

Use:

- `Manrope` for main headings, section headings, body copy, navigation, buttons, labels, cards, stats, and marketing content.
- `JetBrains Mono` only where monospacing improves the experience: typing prompts, typed text, keyboard output, practice text, code-like examples, and keyboard-focused UI.
- `Atkinson Hyperlegible` only as a support or fallback readability font, not as the primary brand font unless explicitly requested.

### Font Weight Guidance

Use weights intentionally.

Recommended direction:

- Main headings: `700-800`
- Section headings: `700`
- Body copy: `400-500`
- Supporting descriptions: `400-500`
- Buttons: `700-800`
- Labels and lesson titles: `700-800`
- Stats and result numbers: `700-800`
- Typing prompts: `500-600`
- Keyboard labels: `600-700`

Avoid using heavy weights everywhere. If every paragraph, nav item, label, and description is bold, the site will feel dense and harder to read.

### Typography Style

Use:

- strong heading hierarchy
- deep navy headings
- readable body copy
- generous line-height for instructional text
- uppercase micro-labels sparingly
- heavy weights for buttons, lesson labels, and key stats
- monospace only where typing practice benefits from it

Avoid:

- overly playful fonts
- thin low-contrast text
- generic system-font-only styling if the project already uses the preferred font stack
- cramped labels
- fake handwritten classroom fonts
- excessive uppercase text
- excessive bold text in paragraphs or secondary copy

## Borders, Lines, and Outlines

Page styling should not use visible borders by default.

Prefer:

- whitespace
- alignment
- surface contrast
- soft fills
- clear type hierarchy
- spacing
- selective accent color

Do not add border utilities, border-color states, divider lines, or outlined cards unless the element matches an approved exception.

Do not use outlines as decorative styling. Focus states must be visible, but should use the approved site language: clear fill changes, text color changes, or the keyboard-button lower-edge treatment.

Do not use gradients anywhere on the site unless the user explicitly approves one.

Do not use shadowy glow, halo, or blurred light effects anywhere on the site. Decorative box-shadows are not allowed unless the user explicitly approves them. Subtle button depth may be used for real interactive buttons when it matches the approved site button language, but visual keyboard keys should stay flat unless the user explicitly requests key depth.

Do not create nested cards beyond one level. One level of nesting is acceptable only when it improves layout clarity. If a layout appears to need more than one level of nested cards, stop and ask before implementing it, and provide a screenshot or mockup reference explaining the proposed nesting.

### Approved Line Exceptions

Lines are acceptable only when they are intentional and sparse. Visible borders are not a default styling tool.

Allowed:

1. **Table/list row separators**

   - Thin warm tan lines are acceptable for structured lesson lists, progress lists, tables, and curriculum rows.
   - Active rows may use a stronger orange divider.

2. **Progress charts and graphs**

   - Gridlines, chart strokes, markers, and plot lines are allowed.
   - Keep them light and consistent with the warm tan/coral palette.

Avoid borders everywhere else.

Specifically avoid:

- bordered cards
- bordered outer containers
- nested bordered panels
- generic bordered inputs unless necessary
- boxed dashboards
- decorative dividers between every section
- dashed ad-slot borders
- browser/phone mockup frames
- random outline treatments

## Start Typing Pill Style

The Start Typing eyebrow/pill should remain flat and compact.

Use this direction:

- rounded pill shape
- pale orange fill: `#fff0e7`
- strong coral text: `#cf5d3f`
- small coral-orange dot: `#ef7449`
- uppercase label
- bold weight
- slight letter spacing
- compact but readable padding

This style should be used sparingly for high-signal calls to action or typing-state indicators, not everywhere. Do not add a visible border, outline, shadow, glow, or gradient to it.

## List and Table Style

For lesson categories, curriculum tables, progress lists, and similar structured rows, use the mockup-style row system:

- no enclosing card
- no visible outer box
- generous row height
- left number/index column where useful
- strong lesson/category name
- right-aligned progress, score, or status
- muted text for secondary values
- thin warm tan row separators
- orange text and orange divider for active/current row

Preferred line colors:

- normal row divider: `#e3d8c9`
- stronger tan line: `#d0c0ad`
- active divider/accent: `#ef7449`

This is one of the few places where lines are acceptable because they organize information.

## Chart and Progress Visuals

Charts should follow the mockup’s calm progress style.

Use:

- warm cream background
- subtle horizontal gridlines
- orange trend lines
- pale orange area fill
- pale sage or warm tan bars
- hollow orange circle markers
- deep navy values
- muted blue-gray labels

Preferred chart colors:

- gridline: `#eadfce`
- main line: `#ef7449`
- area fill: `rgba(239, 116, 73, 0.14)`
- bar fill: `#eaf3ee` or warm tan variants
- marker fill: `#fffdf8`
- marker stroke: `#ef7449`
- axis labels: `#4f6072`
- values: `#172033`

Do not place charts inside heavy bordered cards. Let the chart breathe.

## Buttons and Interactive States

Buttons and interactive elements must include `cursor-pointer`.

Buttons and interactive elements must have clear default, hover, and focus states.

Real interactive buttons should use the approved keyboard-button-inspired accent treatment: a soft warm fill, rounded shape, and subtle lower-edge depth. Avoid heavy borders, decorative outlines, glows, and bulky SaaS button treatments.

Navigation text must remain readable. Do not undersize top navigation links, mobile navigation links, or authentication links.

Use:

- orange/coral for primary/next action
- sage for correct/home-row/supportive states
- peach/coral for warning/error states
- tan/cream for neutral chips and secondary controls
- deep navy for text-heavy navigation and strong structure

Avoid:

- bright blue buttons
- generic gray SaaS buttons
- random color states
- hard black borders
- heavy outlines
- shadow glows
- gradients
- random new card or button systems
- hover states that rely only on borders

## Layout Rules

Use spacious layouts with clear hierarchy.

Prefer:

- generous whitespace
- clean alignment
- flat sections
- soft warm surfaces
- minimal row-based organization
- wide readable content areas
- clear progress rhythm
- obvious next actions

Avoid:

- nested cards
- stacked bordered boxes
- dense dashboard grids
- too many metrics on one screen
- cramped lesson layouts
- visual clutter around the typing area
- decorative containers that do not help the user

Header/navigation rule:

- Do not make the main site navigation sticky unless the user explicitly asks for sticky navigation.
- Page controls should not depend on JavaScript measurement for first-paint layout. Use deterministic responsive CSS first, then JavaScript only when behavior cannot be expressed safely in CSS.

## Typing Practice UX

The typing area should be the visual focus during practice.

Rules:

- Do not surround the practice area with unnecessary widgets.
- Do not display too many metrics while the student is actively typing.
- Show detailed feedback after completion unless live feedback clearly helps.
- Prioritize accuracy before WPM.
- Treat speed as a secondary metric that only counts as meaningful progress when accuracy is maintained.
- Do not celebrate a speed increase if the student’s accuracy drops enough to show rushing.
- Reward small speed gains with excellent accuracy more than large speed gains with poor accuracy.
- Use repeated attempts to show whether the student is improving consistently, not just whether they had one fast run.
- Make the next action obvious after each lesson.
- Use calm, direct feedback.
- Do not shame mistakes.
- Do not over-gamify beginner practice.
- Make repeated practice feel normal, not like failure.
- If a student rushes and accuracy drops, recommend slowing down.
- If accuracy is strong, recommend progressing.

## Scoring and Progress Rules

Typing metrics should help students build durable typing skill, not chase inflated WPM.

The scoring system should not treat speed as the main success metric. Speed only matters when accuracy is maintained. A student who gets faster by making many more mistakes should not be rewarded as improving.

Core scoring principle:

> Reward controlled improvement: meeting the expected accuracy and speed for the lesson, then improving both accuracy and speed consistently over repeated attempts.

### Primary Scoring Priorities

Beginner and student-facing scoring should prioritize:

1. Accuracy
2. Consistency
3. Problem-key improvement
4. Controlled speed improvement
5. Raw WPM

WPM should never outrank accuracy for beginners.

### Baseline and Repeated Attempts

When a student repeats the same lesson, passage, or test, the app should compare performance against that same activity whenever possible.

Use repeated attempts to establish a student baseline.

Recommended baseline logic:

- Establish a baseline after multiple attempts, not one attempt.
- Prefer a rolling average of the last 3 to 5 comparable attempts.
- Compare the same lesson/test against itself, not against unrelated passages.
- Treat one unusually high-speed attempt as noise if accuracy drops sharply.
- Track recent trend, not only all-time best score.

### Good Improvement

A result should be treated as a strong improvement when:

- Accuracy meets or exceeds the expected threshold.
- WPM meets or exceeds the expected threshold for the lesson level.
- Accuracy is stable or improving.
- Speed improves without a meaningful accuracy drop.
- Weak-key mistakes decrease over repeated attempts.

Examples of good progress:

- Accuracy improves from 92% to 97%, while speed stays similar.
- Accuracy remains 100%, and speed improves slightly.
- Speed improves moderately, while accuracy remains above the lesson target.
- Weak-key errors decrease even if WPM only improves slightly.

### Rushed Attempts

A result should not be treated as a win when speed improves but accuracy collapses.

Examples of rushed progress:

- WPM increases sharply, but accuracy drops materially.
- The student beats their best speed but makes many more mistakes.
- The student completes faster by ignoring correct finger/key patterns.
- A 100% speed jump with a 50% accuracy drop should be treated as rushing, not improvement.

When this happens, feedback should recommend slowing down and rebuilding accuracy.

### Accuracy-Gated Speed

Speed gains should be gated by accuracy.

Suggested rule:

- If accuracy is below the lesson target, the result should focus on accuracy improvement.
- If accuracy meets the lesson target, then WPM improvement can count positively.
- If accuracy is excellent and speed improves slightly, reward the result.
- If speed improves but accuracy drops below target, do not mark it as a clean improvement.

A student with 100% accuracy and a small speed improvement should usually be considered to have made better progress than a student with a large speed jump and a major accuracy drop.

### Lesson Targets

Each lesson or test should be able to define reasonable targets for:

- expected accuracy
- expected WPM or speed range
- problem-key reduction
- completion consistency

Targets should vary by difficulty level. Beginner lessons should have stricter accuracy expectations and softer speed expectations.

### Feedback Rules

Feedback should explain what happened in plain language.

Use feedback like:

- “Great control. Your accuracy stayed high while your speed improved.”
- “Your speed improved, but your accuracy dropped. Slow down and aim for cleaner keystrokes.”
- “You are ready to move on because you met the accuracy target and stayed consistent.”
- “Repeat this once more. Your weak keys are improving, but accuracy is not stable yet.”
- “Strong accuracy. Speed can build gradually from here.”

Avoid feedback like:

- “New best WPM” as the only success message.
- “You improved” when the student got faster by making many more mistakes.
- “Failed” or shaming language.
- Overly competitive speed-first messaging.

### Metrics to Track

Track where relevant:

- accuracy percentage
- WPM
- adjusted WPM if supported
- total characters
- correct characters
- incorrect characters
- problem keys
- completion time
- lesson attempts
- best accuracy
- best controlled WPM
- recent rolling average
- recent score
- improvement trend
- weak-key trend
- consistency across repeated attempts

### Result Labels

Use result labels that reflect balanced progress.

Possible labels:

- Controlled Improvement
- Accuracy Win
- Speed Built on Accuracy
- Rushed Attempt
- Needs Cleaner Keystrokes
- Ready to Move On
- Repeat for Consistency
- Weak Keys Improving

Do not use labels that imply speed alone is the main goal.

## TypingStories Relationship

TypingStories is the engagement/content layer for Free Typing Camp, not a disconnected product.

Free Typing Camp owns:

- structured curriculum
- lesson progression
- typing fundamentals
- accuracy tracking
- weak-key remediation
- progress reporting

TypingStories supports:

- story-based practice
- leveled passages
- serialized progression
- weak-key-focused chapters
- more engaging repetition
- practice that feels less like abstract drills

Do not describe TypingStories as simply “AI-generated stories.”

Better positioning:

> Story-driven keyboarding that fixes weak keys without feeling like drills.

## Copywriting Rules

Use clear, human, parent-friendly language.

Good tone:

- “Practice for a few minutes each day.”
- “Focus on accuracy first. Speed follows.”
- “These keys need a little more practice.”
- “Print a simple progress summary when you need one.”
- “Short lessons help students stay consistent.”

Avoid:

- “Revolutionary AI typing platform.”
- “Master typing instantly.”
- “Become a typing pro overnight.”
- “Unlock your full keyboarding potential.”
- “No fake certainty.”
- generic SaaS fluff
- overly childish classroom language
- fear-based parent copy
- fake guarantees about learning outcomes

## SEO and Content Strategy

Every page should serve a real user intent. Do not create thin duplicate pages.

High-value content areas:

- typing lessons for kids
- typing practice for homeschool
- typing practice for beginners
- accuracy-first typing practice
- home row typing lessons
- typing practice by grade level
- typing tests for students
- printable typing certificates
- typing progress reports
- typing practice without ads
- keyboarding curriculum for homeschool
- typing activities for small classrooms
- weak-key typing practice
- typing speed vs accuracy guidance

SEO pages should include:

- a practical explanation of the lesson/tool
- who it is for
- how to use it
- what students should focus on
- common mistakes
- relevant internal links
- clear next action into the typing tool

Avoid:

- keyword stuffing
- duplicated converter-style page layouts
- thin pages with only a tool and FAQ
- pages that promise unrealistic improvement
- pretending to be a full school LMS if the feature does not exist

## Monetization Direction

Do not force monetization into the UI too early.

The most plausible paid paths are:

- parent plan
- homeschool/family plan
- small classroom plan
- printable progress reports
- printable certificates
- saved student profiles
- assignment tracking
- TypingStories premium collections
- expanded practice packs
- ad-free classroom use if ads are ever introduced elsewhere

Do not build pricing around generic typing tests. Users will not pay for that.

Paid value should come from:

- saved progress
- easier parent/teacher monitoring
- better practice consistency
- story-based engagement
- printable outputs
- weak-key remediation
- classroom-lite organization

## Technical Implementation Rules

- Preserve existing component names, function names, route conventions, and file structure unless the user explicitly asks for a refactor.
- Do not rename existing functions or variables casually.
- Do not remove working features while improving design.
- Do not replace existing behavior with mock behavior.
- Do not hide broken functionality behind static UI.
- Do not add fake data unless clearly marked as demo data and only where appropriate.
- Keep TypeScript types strict and practical.
- Keep state management simple.
- Prefer reusable components only where they reduce duplication without making the flow harder to follow.
- Validate typing calculations carefully.
- Keep WPM, accuracy, mistake count, and weak-key calculations consistent across the app.
- Ensure scoring does not reward speed gains when accuracy drops sharply.
- Ensure repeated attempts compare against the same lesson/test where possible.
- Ensure result feedback distinguishes controlled improvement from rushed attempts.
- Do not introduce hydration-prone behavior without checking it.
- Do not add heavy dependencies without a clear reason.
- Keep keyboard interactions reliable.
- Ensure practice pages work with real keyboard input.
- Ensure buttons, links, and form controls remain accessible.

## Accessibility Rules

- Maintain strong text contrast.
- Ensure keyboard navigation works.
- Use visible focus states.
- Avoid motion-heavy interactions during typing.
- Respect reduced-motion preferences.
- Keep text readable for students.
- Avoid small low-contrast labels.
- Do not rely on color alone for correct/error states.
- Provide clear text explanations for results.
- Make interactive controls large enough for younger students and classroom devices.

## Performance Rules

- Keep typing interactions instant.
- Avoid animation or layout work that can cause typing lag.
- Do not run expensive calculations on every keystroke unless necessary.
- Keep analytics or persistence logic from interfering with typing input.
- Avoid heavy client-side libraries for simple UI.
- Practice pages should feel fast on school Chromebooks and older laptops.

## Validation Checklist

Before returning changes, verify:

- Existing routes still load.
- Existing typing practice still accepts keyboard input.
- Lesson completion still works.
- WPM and accuracy are not obviously broken.
- Buttons have pointer cursor and hover states.
- No unwanted visible borders were added.
- Borders/lines are used only for approved exceptions.
- No old bright-blue visual treatments were introduced.
- No gradients or heavy shadows were introduced.
- The layout is not a pile of nested cards.
- Mobile informational pages remain readable.
- Desktop typing practice remains usable.
- SEO metadata still matches the route intent.
- Internal links point only to existing routes.
- TypeScript passes if a typecheck script exists.
- Lint/build issues are not introduced where avoidable.
- Scoring does not reward speed gains when accuracy drops sharply.
- Repeated attempts compare against the same lesson/test where possible.
- Result feedback distinguishes controlled improvement from rushed attempts.
- Accuracy remains the main beginner success metric.

## Definition of Done

A Free Typing Camp change is done only when:

- It supports the calm, accuracy-first product direction.
- It follows the warm cream/navy/coral/sage visual system.
- It does not make the UI noisier.
- It does not weaken the existing visual system.
- It does not introduce generic SaaS copy.
- It does not pretend to offer features that are not built.
- It keeps typing practice reliable.
- It helps students practice, parents/teachers understand progress, or both.
- It rewards controlled improvement rather than raw speed chasing.
- It treats speed as meaningful only when accuracy is maintained.
