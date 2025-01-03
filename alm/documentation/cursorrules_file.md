Cursor Rules for Project
# Project Overview
- **Project Name**: AwesomeListManager (ALM)
- **Description**: ALM is a web-based platform designed to simplify the management, categorization, and sharing of AwesomeLists, helping maintainers, content curators, and open-source contributors to streamline their tasks and enhance open-source repository integrations.
- **Tech Stack**: Next.js 14 with TypeScript, Tailwind CSS, Supabase, scikit-learn or TensorFlow, OpenAI GPT-4o, Docker, GitHub Actions
- **Key Features**:
  - User account management via Supabase Auth
  - Repository management with GitHub Integration
  - AI-driven categorization and suggestions
  - Analytics dashboards for insights
  - Notification system for updates
  - Export capabilities in Markdown, CSV, and JSON formats

# Project Structure
## Root Directory:
Contains main configuration files and documentation.

## /frontend:
Contains all frontend-related code, including components, styles, and assets.
- **/components**:
  - RepositoryDashboard
  - CategorizationWorkbench
  - NotificationSystem
  - AnalyticsDashboard
- **/assets**:
  - Icons provided by Lucide
  - Logo and branding resources
- **/styles**:
  - Tailwind CSS setup files
  - Global style sheets

## /backend:
Contains all backend-related code, including API routes and database models.
- **/controllers**:
  - RepositoryController
  - UserAuthController
  - CategorizationController
- **/models**:
  - UserModel
  - RepositoryModel
  - NotificationModel
- **/routes**:
  - APIRoutes for handling requests

## /config:
Configuration files for environment variables and application settings.

## /tests:
Contains unit and integration tests for both frontend and backend.

# Development Guidelines
- **Coding Standards**: Follow best practices for TypeScript in Next.js projects.
- **Component Organization**: Components should be modular and reusable, consistent with Radix UI and shadcn/UI standards.

# Cursor IDE Integration
- **Setup Instructions**: Clone the repository and run `npm install` followed by `npm run dev` to start the development server in Cursor IDE.
- **Key Commands**:
  - `npm run test` for running tests
  - `npm run build` for production build

# Additional Context
- **User Roles**:
  - Admins: Full access to all features and settings
  - Maintainers: Manage and categorize AwesomeLists
  - Read-Only Users: View and interact with lists without modifications
- **Accessibility Considerations**: Ensure minimalistic and responsive UI designs are adhered to for broad device compatibility and user inclusivity.
