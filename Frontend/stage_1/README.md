Frontend Wizards, Here’s Your Stage 1 Task! :rocket:
Welcome to Stage 1! :tada:
You’ll be moving from a single card into multi-page applications. In this stage, you’ll create two new pages — a Contact Us page with form validation, and an About Me page where you share your reflections. As always, semantic HTML, accessibility, responsiveness, and data-testid attributes are key.
NOTE: THIS IS A CONTINUATION OF YOUR PREVIOUS TASK, SO YOU WILL BE BUILDING ON YOUR STAGE 0 TASK.
:books: Study Material
Semantic HTML & Accessibility: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
Form Validation in HTML/JS: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
Accessibility for Forms: https://www.w3.org/WAI/tutorials/forms/
Responsive CSS Layouts: https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
:memo: Task — Two New Pages


1. Contact Us Page
A simple form with validation.
Required fields (data-testid for each):
Full name — test-contact-name
Email — test-contact-email
Subject — test-contact-subject
Message — test-contact-message
Submit button — test-contact-submit
Error messages — test-contact-error-<field> (e.g., test-contact-error-email)
Success message (after valid submission) — test-contact-success
Validation rules:
All fields required.
Email must be valid (name@example.com).
Message must be at least 10 characters.
On success, show a confirmation message.
Accessibility:
All inputs must have <label>s linked with for.
Error messages must be tied to inputs with aria-describedby.
Entire form must be keyboard accessible.


2. About Me Page
A reflective page where you share your thoughts.
Required sections (data-testid for each):
Bio — test-about-bio
Goals in this program — test-about-goals
Areas of low confidence — test-about-confidence
Note to future self — test-about-future-note
Extra thoughts — test-about-extra
Semantic structure:
Wrap with <main data-testid="test-about-page">.
Use <section> for each area.
Use proper headings (<h2>, <h3>) for clarity.

:white_check_mark: Acceptance Criteria
Contact Us Page
All required fields exist and use correct data-testids.
Validation prevents invalid submissions.
Success message only shows after valid submission.
About Me Page
All required sections exist with correct data-testids.
Semantic HTML used (main, section, ul, p, h2).
General
Semantic HTML throughout.
Accessible (labels, alt text, ARIA associations).
Fully responsive across mobile, tablet, desktop.
Keyboard navigable.
Code is modular, readable, and consistent.
:clock3: Submission Mode
Host your application (Netlify, GitHub Pages, etc.).
Submit:
Live URL
GitHub repo link with code + README instructions
Submission Link - https://forms.gle/J65RPCVspzJJDGNP7
Submission Deadline - 22nd, October 2025 | 11:59 pm WAT (GMT +1) (edited) 