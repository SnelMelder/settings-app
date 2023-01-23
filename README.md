# Snelmelder settings panel

## Description

When a user creates a new report in the Snelmelder app, we want to know which project (location + contractors) the report belongs to, in order to inform the right people. The locations and contractors can change. Therefore, we need a way to configure these. The Snelmelder settings panel is used for this. It allows a user to perform CRUD operations on projects.

## Technologies

- React
- JWT authentication with Azure AD
- Fluent UI components
- Redux + RTK Query

## Running the project

1. Clone the project
2. Install the dependencies with `yarn install`
3. Optional: configure project with your own Azure tenant (edit authConfig.ts in src/features/auth folder)
4. Run project with `yarn run dev`
