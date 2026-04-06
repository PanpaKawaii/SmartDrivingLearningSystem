# Smart Driving Learning System — Frontend

This repository contains the frontend application for the Smart Driving Learning System. It provides the user interface and client-side behavior for learners, instructors, and administrators. The frontend is focused on presentation, navigation, client-side validation, local state management, and calling backend APIs for data, authentication, scoring and AI-assisted features.

## Description

This repo implements the frontend only. It delivers screens and user flows for theory lessons, multiple-choice practice, traffic sign review, mock exam flows, simulation interfaces, result display, progress tracking, bookmarking, and a UI integration for an AI Assistant (chat/explanations). Integration with backend services (for auth, data persistence, scoring, and AI retrieval) is expected and configured via environment variables; implementation details for backend services are outside this repository.

## Scope

- UI and client-side logic for the Smart Driving Learning System.
- Routes and views for Guest, Student, Instructor and Admin roles.
- Client integration points to backend APIs (auth, content, exam submissions, simulation results, AI endpoints).
- Local features such as bookmarking, client-side progress display, and import/preview of content files.

## Key Features

- Structured theory lessons and learning paths (UI).
- Multiple-choice practice and mock exams with score presentation.
- Traffic sign browser with search and filtering UI; image upload hooks for client-side preview and sending to recognition endpoints.
- Simulation UI for running scenarios and submitting attempts (frontend surface only).
- Learning progress and statistics dashboard (client-side display).
- Bookmarking and review lists.
- Forum / Q&A interface for user/instructor interaction.
- AI Assistant integration points in the UI for explanations and sign descriptions.

## User Roles (functional summary)

- Guest: view introduction, course summaries, register and access demo question sets.
- Student: edit profile, access lessons, practice questions, take mock exams, review signs, submit simulation attempts, track progress, bookmark items, and request AI explanations.
- Instructor: manage lesson content (UI workflows), manage sign entries (UI), review reported issues, and respond in forum/Q&A.
- Admin: manage user accounts and content from the frontend management interfaces.
- AI Assistant: accessible via the frontend UI to request explanations or receive sign descriptions (backend AI services provide responses).

## Non-Functional Requirements (frontend perspective)

- Security: frontend should handle secure storage of tokens and use secure channels (HTTPS) when communicating with backend services.
- Usability: responsive and mobile-friendly interfaces.
- Maintainability: modular, component-based code to ease updates.
- Compatibility: support for modern browsers and typical mobile webviews.

## Quick Start (frontend only)

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Environment variables

Configure a `.env` file at the repository root for runtime values exposed to the frontend. Typical environment variables used by this frontend include:

- `VITE_API_URL` — base URL of the backend API the frontend calls.

Note: This README documents the frontend. Backend services, data stores and AI services are external to this repository and must be configured separately; the frontend expects to interact with them via defined API endpoints.

## Contributing

- Fork the repo, create a feature branch, and open a pull request with a clear description of changes.
- Run `npm run lint` and ensure the UI builds before submitting changes.

## License

Choose a license for this repository (for example: MIT) or follow your organization policy.

## Contact / Maintainers

- Maintainer: add name and contact details here.

---

This file documents the frontend application in this repository. For backend or service integration details, refer to the corresponding backend documentation (not included here).
