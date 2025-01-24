# <img src="./public/iris.svg" alt="Project Logo" style="vertical-align: middle; width: 40px; height: 40px;" /> Iris

Essential scripts for development and deployment. A modern web application built with cutting-edge technologies.

## 🌟 Built With

[![ZenStack](https://img.shields.io/badge/ZenStack-2.0-blue?style=flat&logo=prisma)](https://zenstack.dev)  
[![Remix](https://img.shields.io/badge/Remix-2.0-purple?style=flat&logo=remix)](https://remix.run)  
[![Prisma](https://img.shields.io/badge/Prisma-5.0-black?style=flat&logo=prisma)](https://prisma.io)

## 📋 Prerequisites

- Node.js v18+
- pnpm 8.x
- Docker 20.x+
- PostgreSQL 14+

## 🛠️ Installation

```bash
pnpm run init
```
Sets up the complete environment including:
- Dependency installation
- Docker container initialization
- Database schema synchronization
- Seed data population

## 🚦 Usage

### Development Workflow
```bash
pnpm run dev    # Start development server with hot-reload
pnpm run debug  # Launch application debugger
```

### Production Deployment
```bash
pnpm run build  # Create optimized production build
pnpm run start  # Start production server (port 8099)
```

### Database Management
```bash
# Schema synchronization
pnpm run database:sync:dev  # Dev environment (destructive)

# Data operations
pnpm run database:reset     # Full reset + reseed
pnpm run database:seed      # Populate mock data
```

### Code Quality
```bash
pnpm run check   # TypeScript & model validation
pnpm run format  # Code formatting (Prettier)
pnpm run lint    # Linting (ESLint)
```

### Advanced Tools
```bash
pnpm run crud:sync       # Regenerate CRUD operations
pnpm run products:init   # Initialize Stripe integration
pnpm run docker:init     # Start Docker services
```

## 🗺 Roadmap

- [ ] Video test generation implementation
- [ ] Integration of open-source models for private deployments
- [ ] Test caching system for CI/CD optimization
- [ ] Full CI/CD pipeline implementation
- [ ] Mobile testing support (iOS/Android)
- [ ] Multi-cloud deployment configurations

## 💡 Tips

❗ Always use `pnpm run <script>` format for commands  
✅ Run `pnpm run format` before committing code  
🔧 Use `database:sync:dev` only in development environments

---

**Contribution Guidelines**: Coming soon!  
**License**: [MIT](https://opensource.org/licenses/MIT)