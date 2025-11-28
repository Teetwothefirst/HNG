# Task 3a

:rocket: Frontend Wizards, Here’s Your Stage 3a Task! :rocket:
Welcome to Stage 3 — time to push beyond SaaS and tackle a real-world, pixel-perfect e-commerce build! :tada:
In this stage, you’ll bring the Audiophile e-commerce Figma design to life using React/Next.js, integrate a backend with Convex, and implement a functional checkout that sends users a confirmation email.
Figma (Pixel-perfect source of truth):
 :point_right: Audiophile E-commerce Website
:books: Study Material
React Official Docs: https://react.dev/
Next.js Docs: https://nextjs.org/docs
Convex Backend Docs: https://docs.convex.dev/
Forms & Validation in React: https://react.dev/learn/forms
Responsive Layouts: https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
Sending Emails:
            Resend API: https://resend.com/
            Nodemailer: https://nodemailer.com/about/
:memo: Stage 3 — Pixel Perfect Audiophile Build
Requirements
Must use React (Next.js strongly recommended).
Implement the Audiophile Figma design pixel perfectly across mobile, tablet, and desktop.
Checkout Form (Core Feature)
Collect user details (name, email, phone, shipping address, etc.).
Validate all fields (inline errors + accessibility).
Handle edge cases: invalid email, missing fields, invalid quantities, duplicate submissions, etc.
On success:
Save order in Convex backend (store items, totals, user details).
Send order confirmation email with an HTML template.
Redirect to Order Confirmation Page with order summary.
Order Storage (Convex)
Store order data in Convex with:
Customer details
Shipping details
Items (id, name, price, quantity)
Totals (subtotal, shipping, taxes, grand total)
Order status & timestamp
Confirmation Email
Send a transactional email when checkout is successful.
Email must include:
Greeting with user’s name
Order ID & summary of purchased items
Shipping details
Support/Contact info
CTA: “View your order” link
Must be responsive and well-formatted.
:white_check_mark: Acceptance Criteria
 Pixel-perfect build: Matches Figma across all screen sizes.
 Checkout works end-to-end: Orders saved in Convex, confirmation email sent.
 Validation & edge cases handled: All error states clearly surfaced.
 Order confirmation page: Displays full order summary.
 Email template: Responsive, personalized, and successfully delivered.
 Accessibility: Forms, navigation, and errors must be screen-reader friendly.
 Code quality: Clean, modular, and well-documented.
:clock3: Submission Mode
Deploy your project (Vercel or Netlify recommended).
Submit:
Live deployed app link
GitHub repo with code + setup instructions
Example confirmation email template (HTML)
(edited)


# Task 3b

:rocket: Frontend Wizards — Stage 3 Task!
Welcome to Stage 3b!
Time to build a sophisticated Todo List application with theme switching and real-time backend integration using Convex :tada:
In this stage, you’ll:
Create a pixel-perfect Todo app from the provided Figma design
Implement light/dark theme switching
Handle all CRUD operations using Convex for a real-time experience
:art: Figma Design
:point_right:https://www.figma.com/design/NRbd5hcrQcAa1LBbctUhf9/todo-app?node-id=0-1&p=f&m=dev :keycap_star:
:books: Study Materials
React Native Docs: https://reactnative.dev/docs/getting-started
Convex for React Native: https://docs.convex.dev/quickstart/react-native
State Management: https://reactnative.dev/docs/state
Navigation (React Navigation): https://reactnavigation.org/
Styled Components & Theming: https://styled components.com/docs/basics#react-native
Expo docs: https://docs.expo.dev/
Expo router: https://docs.expo.dev/router/introduction/
Create first app with expo: https://docs.expo.dev/tutorial/create-your-first-app/
:memo: Stage 3 — Advanced Todo List with Theme Switcher
Requirements
Use React Native (Expo recommended)
Implement the Figma design pixel-perfectly
Support both light and dark themes with smooth transitions
Core Features
:art: Theme Switcher
Light and dark themes
Smooth transition animations
Persist theme preference across app restarts
Theme affects all UI elements (backgrounds, text, buttons, etc.)
:white_check_mark: Todo CRUD Operations (Using Convex)
Create: Add todos (title, description, due date)
Read: Fetch and display todos in real-time
Update: Edit todos or toggle complete/incomplete
Delete: Remove todos (swipe-to-delete or buttons)
:iphone: UI/UX Features
Search and filter todos
Empty states & loading indicators
Drag and Sort functionality
:white_check_mark: Acceptance Criteria
Pixel-perfect implementation
Smooth theme switching with persistent preferences
Full CRUD functionality (real-time via Convex)
Proper error handling for network & validation
Responsive on all screen sizes
Clean, modular code structure
Accessibility compliance (contrast, screen reader support)
:clock3: Submission Mode
Testing & Deployment
Record the application demonstrating all requirements with a voice over.
Ensure the app builds and runs successfully
Submit the Following
Include your apk and your video in a drive and share the url.
GitHub repository — complete source code
README.md — include:
Setup instructions
Build commands
Environment variables config
Convex setup steps
Submission Checklist
CRUD operations fully functional
Theme switcher works correctly
Real-time updates functional
Code clean and documented
Proper README instructions


# Figma Link 
3a
https://www.figma.com/design/jfDxXzGw2lfyJOgFGbJOW4/audiophile-ecommerce-website?node-id=0-7791&m=dev

3b
https://www.figma.com/design/NRbd5hcrQcAa1LBbctUhf9/todo-app?node-id=0-1&p=f&m=dev

# Submission Link
https://docs.google.com/forms/d/e/1FAIpQLSeTnTgLC_lvDFx85nBPzYz2vMvb0SZNoIioH5vsofKGvf72qQ/viewform?usp=publish-editor
