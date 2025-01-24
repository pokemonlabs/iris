
# <img src="./public/iris.svg" alt="Iris Logo" style="vertical-align: middle; width: 40px; height: 40px;" /> Iris

**Revolutionizing Open-Source AI Testing Infrastructure**

While AI-powered backend UI testing solutions have proliferated, developers face a critical challenge: most advanced testing agents are closed-source black boxes. Iris emerges as a transparent, community-driven solution - offering enterprise-grade testing capabilities with complete visibility and control.

[![GitHub stars](https://img.shields.io/github/stars/pokemonlabs/iris?style=social)](https://github.com/pokemonlabs/iris) 
[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-7289da?style=flat&logo=discord)](https://discord.gg/uuNbJQyw6g)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Why Iris?

✅ **Full observability** into testing algorithms and processes  
✅ **Avoid vendor lock-in** with self-hosted AI models  
✅ **Community-driven improvements** through open collaboration  
✅ **Modern testing paradigm** combining AI precision with developer control

## 🌟 Featured Capabilities

- Visual regression testing with AI-powered analysis
- Self-healing test scripts using ML models
- Cross-browser/device testing orchestration
- CI/CD pipeline integration hooks
- Real-time test visualization and debugging

## 🛠 Tech Stack

[![ZenStack](https://img.shields.io/badge/ZenStack-2.0-blue?style=flat&logo=prisma)](https://zenstack.dev)
[![Remix](https://img.shields.io/badge/Remix-2.0-purple?style=flat&logo=remix)](https://remix.run)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-black?style=flat&logo=prisma)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-20.x-2496ED?style=flat&logo=docker)](https://docker.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat&logo=postgresql)](https://postgresql.org)

![Iris Testing Demo](./tryiris.gif)

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js v18+
- pnpm 8.x
- Docker 20.x+
- PostgreSQL 14+
- **Environment Setup**:
  ```bash
  cp .env.template .env
  # Configure your environment variables
  ```

### ⚡ Quick Installation
```bash
pnpm run init
```
Single command sets up:
- Full dependency tree
- Dockerized services
- Database schema + seed data
- Pre-commit hooks

## 🧩 Core Workflows

### Development Mode
```bash
pnpm run dev    # Hot-reload server
pnpm run debug  # Interactive debugging
```

### Production Deployment
```bash
pnpm run build  # Optimized build
pnpm run start  # Start production server (port 8099)
```

### Database Operations
```bash
pnpm run database:sync:dev  # Schema sync (dev only)
pnpm run database:reset     # Full reset + reseed
pnpm run database:seed      # Load mock data
```

## 🏗 System Architecture

```mermaid
graph TD
    A[User Interface] -->|HTTP| B[Remix Edge Runtime]
    B -->|Job Queue| C[Redis Cluster]
    C -->|Process| D[AI Testing Workers]
    D -->|Store Results| E[(PostgreSQL)]
    E -->|Analyze| F[Reporting Dashboard]
    F -->|Trigger| G[CI/CD Pipeline]
```

## 🧭 Roadmap

- **AI Test Generation**  
  Convert natural language to executable test cases
- **Private Model Integration**  
  Support for local LLMs (Llama 2, Mistral)
- **Intelligent Test Caching**  
  Context-aware cache invalidation for CI/CD
- **Multi-Cloud Orchestration**  
  Unified testing across AWS/GCP/Azure
- **Mobile Testing Suite**  
  Cross-platform iOS/Android validation

## 💌 Community & Support

[![Discord Banner](https://dcbadge.vercel.app/api/server/uuNbJQyw6g)](https://discord.gg/uuNbJQyw6g)

Join 500+ developers in our Discord community to:
- Get expert implementation support
- Shape the product roadmap
- Share testing strategies
- Collaborate on integrations

## 🤝 Contributing

We actively welcome contributors! Please see our [Contribution Guidelines](https://github.com/pokemonlabs/iris/CONTRIBUTING.md) for:
- Code style standards
- Testing requirements
- RFC process
- Community expectations

*(Guidelines coming next week - watch the repo!)*

---

**License**: [MIT](https://opensource.org/licenses/MIT)  
**Maintainer**: Pokemon Labs Team  
**Code of Conduct**: [Contributor Covenant](https://www.contributor-covenant.org/)
