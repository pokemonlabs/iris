# Documentation: Stack Overview

This document provides a brief overview of the tools and technologies used in the project.

## **Languages and Frameworks**

### **TypeScript**
- **Category**: Programming Language
- **Purpose**: A strongly typed superset of JavaScript, used for type safety and scalable application development.
- **Documentation**: [TypeScript Docs](https://www.typescriptlang.org/)

### **Remix**
- **Category**: React Framework
- **Purpose**: A full-stack web framework for building fast, dynamic applications with server-side rendering and routing capabilities.
- **Documentation**: [Remix Docs](https://remix.run/docs)

### **Vite**
- **Category**: Build Tool
- **Purpose**: A lightning-fast frontend build tool optimized for modern JavaScript development.
- **Documentation**: [Vite Docs](https://vitejs.dev/)

## **User Interface**

### **Ant Design**
- **Category**: User Interface System
- **Purpose**: A comprehensive design system with ready-to-use React components for building user interfaces.
- **Documentation**: [Ant Design Docs](https://ant.design/)

## **Database and ORM**

### **Prisma**
- **Category**: Database ORM
- **Purpose**: An object-relational mapper (ORM) for managing database schemas and queries with a type-safe API.
- **Documentation**: [Prisma Docs](https://www.prisma.io/docs)

### **PostgreSQL**
- **Category**: Relational Database
- **Purpose**: A powerful, open-source relational database for storing and querying structured data.
- **Documentation**: [PostgreSQL Docs](https://www.postgresql.org/docs/)

## **Access Control and Multi-tenancy**

### **ZenStack**
- **Category**: Access Control and Multi-tenancy Management
- **Purpose**: A toolkit built on Prisma for managing access control, data policies, and multi-tenancy.
- **Documentation**: [ZenStack Docs](https://zenstack.dev/)



---
 # Project Structure Documentation

This document outlines the structure of the project directory, providing a brief description of each major folder and file.

---

## **Root Level**

### **`entry.client.tsx`**
- The entry point for the client-side application.

### **`entry.server.tsx`**
- The entry point for the server-side application.

### **`root.tsx`**
- The root component of the application, responsible for defining the overall layout and routes.

---

## **Core Modules** (`core/`)
Core functionality and reusable utilities.

- **`authentication/`**  
  Handles user authentication logic (e.g., login, registration, session management).

- **`configuration/`**  
  Centralized configuration settings for the project.

- **`context/`**  
  Application-wide context providers for managing global state.

- **`database/`**  
  Database-related files, including schema definitions and ORM configurations.

- **`helpers/`**  
  Utility functions used across the project.

- **`trpc/`**  
  Configuration and implementation for tRPC API routing.

---

## **Design System** (`designSystem/`)
Components and styles for the application's user interface.

- **`core/`**  
  Core components shared across the design system.

- **`helpers/`**  
  Utility functions and hooks specific to the design system.

- **`index.tsx`**  
  Entry point for exporting the design system.

- **`landing/`**  
  Components specific to the landing pages.

- **`layouts/`**  
  Layout components for structuring pages.

- **`provider.tsx`**  
  Context providers for themes and global UI settings.

- **`style/`**  
  Stylesheets for custom design elements.

- **`theme/`**  
  Theming logic and definitions (e.g., light and dark mode configurations).

- **`ui/`**  
  UI components (e.g., buttons, modals, tables).

---

## **Plugins** (`plugins/`)
Extensions and integrations.

- **`ai/`**  
  Artificial intelligence and machine learning-related functionality.

- **`email/`**  
  Email handling and services.

- **`image-optimize/`**  
  Image optimization logic.

- **`organization/`**  
  Features related to organization management.

- **`payment/`**  
  Payment gateway and billing integrations.

- **`rabbitmq/`**  
  Message queue integrations with RabbitMQ.

- **`upload/`**  
  File upload functionality.

---

## **Routes** (`routes/`)
Frontend routes and API endpoints.

### **Frontend Routes**
- **Auth Routes**  
  - `_auth.login_`: Login page.  
  - `_auth.register_`: Registration page.  
  - `_auth.reset-password_`: Password reset initiation page.  
  - `_auth.reset-password.$token_`: Password reset confirmation page.

- **Logged-In User Routes**  
  - `_logged.home_`: Dashboard homepage for logged-in users.  
  - `_logged.organizations`: Organization management page.  
  - Other routes for organization-specific features (e.g., agents, projects, pricing).

- **Miscellaneous Routes**  
  - `$404.$.tsx`: Custom 404 error page.

### **API Routes**
- `api.billing.webhook.stripe.tsx`: Stripe webhook for billing events.  
- `api.trpc.$.tsx`: tRPC API endpoint.  
- `api.upload.private.tsx`: Endpoint for private file uploads.  
- `api.upload.public.tsx`: Endpoint for public file uploads.

---

## **Server** (`server/`)
Server-specific logic.

- **`index.tsx`**  
  The main server entry point, initializing server-side configurations and services.
