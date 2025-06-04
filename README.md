# Task Manager

A modern, maintainable, and well-tested task management application built with Vue 3, TypeScript, Pinia, Vue Router, and Tailwind CSS.

## Features
- Add, edit, toggle, and delete tasks
- Filter tasks by status (all, pending, completed)
- Responsive design with dark mode support
- State management with Pinia
- Routing with Vue Router
- Core business logic separated into a TypeScript library (`src/core/task`)
- Unit testing with Vitest
- Test coverage reporting

## Project Structure
```
├── src/
│   ├── components/         # Vue components (TaskForm, TaskCard, etc.)
│   ├── core/               # Core business logic (framework-agnostic)
│   │   └── task/           # Task types, manager, and persistence
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── views/              # View components (Home, Pending, Completed)
│   └── main.ts             # App entry point
├── tests/                  # (Optional) Additional test files
├── public/                 # Static assets
├── package.json            # Project metadata and scripts
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Install Dependencies
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```

### Run Unit Tests
```bash
npm run test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Test Coverage Report
```bash
npm run test:coverage
```
- The coverage report will be available in the `coverage/` directory. Open `coverage/index.html` in your browser for a detailed report.

## Documentation & Best Practices
- **Core logic** is decoupled from UI and can be reused or tested independently (`src/core/task`).
- **Unit tests** are located in `src/stores/__tests__` and cover store logic and core task management.
- **TypeScript** is used throughout for type safety and maintainability.
- **Path aliases** (`@/`) are configured for cleaner imports.
- **Test coverage** thresholds are enforced in `vitest.config.ts`.
- **No end-to-end (E2E) tests**: The project is currently focused on unit testing only.

## Contributing
- Write clear, maintainable code and keep business logic separated from UI.
- Add or update unit tests for new features or bug fixes.
- Keep documentation up to date.s