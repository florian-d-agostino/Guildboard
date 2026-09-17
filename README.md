# GuildBoard
> *For the Horde! A fullstack adventurer guild management application.*

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4+-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21_LTS-ED8B00?logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 1. Project Overview & Team

**GuildBoard** is a fullstack web application designed for guild masters to manage an adventurers' guild. Guild masters can recruit heroes, assign them to various quests (clearing goblin dens, escorting caravans, slaying dragons), track expedition progress in real time, distribute gold rewards and experience points (XP), and manage automated level progressions.

Developed as a pair-programming project for the **B2 curriculum at La Plateforme_**:

| Member | Role & Track | Primary Responsibilities |
|---|---|---|
| **Haïk Monossian** | Front-End Lead *(ex-Web)* | React 19 SPA, strict TypeScript architecture, Tailwind CSS v4, custom CSS Spritesheet animations, desktop drag-and-drop & mobile responsive UX. |
| **Florian D'Agostino** | Back-End Lead *(ex-Log)* | Java 21 / Spring Boot REST API, layered architecture (Controller / Service / Repository), JPA entities, RG1–RG3 business logic, `@RestControllerAdvice` error contracts. |

---

## 2. Prerequisites & Step-by-Step Setup

### Prerequisites
- **Java 21 (LTS)**
- **Node.js 20+** & **npm**
- **PostgreSQL 16** (running locally on port `5432` or via Docker)
- **Git**

---

### Step 1: Database Setup (PostgreSQL)

1. Make sure your local PostgreSQL service is running on port `5432`.
2. Create the database named `guildboard`:
   ```bash
   createdb -U postgres guildboard
   ```
   *(or via `psql` / pgAdmin / DBeaver query)*:
   ```sql
   CREATE DATABASE guildboard;
   ```

3. **Configure Local Credentials (`application-local.yml`)**:
   In `backend/src/main/resources/application-local.yml`, configure your PostgreSQL credentials:

   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/guildboard
       username: postgres
       password: your_database_password
   ```

   > **Security Note:** `application-local.yml` and `.env` are listed in `.gitignore` to prevent committing private credentials.

---

### Step 2: Running the Back-End (Spring Boot)

Navigate to the `backend/` directory and launch the Spring Boot application using the Maven wrapper:

- **On macOS / Linux:**
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```

- **On Windows (PowerShell / Command Prompt):**
  ```powershell
  cd backend
  .\mvnw.cmd spring-boot:run
  ```

The REST API will boot and listen on **`http://localhost:8080`**.  
Hibernate will automatically create and update database tables (`ddl-auto: update`).

---

### Step 3: Running the Front-End (React + Vite)

In a separate terminal, navigate to the `frontend/` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The web application is live at: **`http://localhost:5173`**.

To verify TypeScript types and build for production:
```bash
npm run build
```

---

## 3. Swagger UI & API Endpoints

Interactive OpenAPI documentation is accessible when the backend is running:
- 👉 **Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) *(or `http://localhost:8080/swagger-ui.html`)*
- 👉 **OpenAPI v3 JSON Specification:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

### API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/characters` | List all adventurers in the guild |
| `GET` | `/api/characters/{id}` | Get detailed profile of a specific adventurer |
| `GET` | `/api/characters/{id}/history` | Get past and active quest assignments for an adventurer |
| `POST` | `/api/characters` | Recruit / create a new adventurer |
| `PATCH` | `/api/characters/{id}` | Update an adventurer's details |
| `DELETE` | `/api/characters/{id}` | Delete an adventurer |
| `GET` | `/api/quests` | List all quests (filterable with `?status=` and `?difficulty=`) |
| `GET` | `/api/quests/{id}` | Get a specific quest's details |
| `POST` | `/api/quests` | Create a new quest (`AVAILABLE` status by default) |
| `PATCH` | `/api/quests/{id}` | Update quest details |
| `DELETE` | `/api/quests/{id}` | Delete a quest |
| `POST` | `/api/quests/{id}/assignment` | Assign an adventurer to a quest (**RG1**, **RG2**) |
| `POST` | `/api/quests/{id}/completion` | Complete a quest, credit gold & XP, trigger level-up (**RG3**) |

### Standardized Error Contract

All error responses from the API return a uniform JSON format managed centrally by `@RestControllerAdvice`:

```json
{
  "status": 422,
  "code": "LEVEL_TOO_LOW",
  "message": "Grimbold le Prudent (niveau 2) ne peut pas prendre une quête de niveau 5"
}
```

- **400 Bad Request:** Form validation errors (Bean Validation `@NotBlank`, `@Min`, `@Size`).
- **404 Not Found:** Requested entity ID not found.
- **422 Unprocessable Entity:** Business rule violations (RG1 level mismatch, RG2 hero already engaged). Messages are directly presented to the user.

---

## 4. Technical Architecture & Challenges

### Technical Choices

1. **Back-End (Spring Boot 3.4 / Java 21 LTS)**:
   - **Strict 3-Tier Layered Architecture**: Clear separation between `controller`, `service`, and `repository`. Business rules live strictly in the service layer.
   - **Modern Java 21 Records**: Used as immutable DTOs for incoming requests and outgoing responses. JPA Entities never escape the service layer.
   - **Constructor Injection**: Enforces testability and immutability without field reflection.
   - **Spring Data JPA & Hibernate**: Type-safe query derivation and clean ORM mappings.
   - **No Lombok**: Explicit boilerplate code to ensure complete control and understanding of accessors.

2. **Front-End (React 19, Vite, TypeScript Strict)**:
   - **Zero `any` Policy**: Built with `"strict": true` in `tsconfig.json` ensuring 100% type safety aligned with backend DTOs.
   - **Enforced Folder Structure**: `src/pages`, `src/components`, `src/services`, `src/types`. Components do not execute raw HTTP requests directly; all API calls go through the dedicated `services/` layer.
   - **Complete Network State Handling**: Every asynchronous action gracefully handles 4 states: *loading*, *error* (with retry capability), *empty state*, and *data display*.
   - **No Heavy External State Libraries**: State is managed cleanly using native React primitives (`useState`, `useEffect`, custom hooks).

3. **UX & Ergonomics**:
   - **Desktop**: Native HTML5 Drag & Drop lets the user grab an adventurer card and drop it onto an available quest card to assign them instantly.
   - **Mobile**: Accordion dropdowns under each quest card allow one-tap assignment of eligible adventurers, complemented by a fixed bottom tab bar (`Footer`).

### Challenges Encountered

- **Error Propagation Contract (422 vs 500)**: Bridging backend business rule rejections (RG1, RG2) into clean frontend banners without leaking stack traces or raw server crashes. Resolved using `@RestControllerAdvice` on the backend and unified `ApiException` unwrapping in `apiClient.ts`.
- **CSS Spritesheet Dynamic Animation**: Implementing the pixel-art running knight on the quest progress bar required exact frame alignment (`steps(8)` on row 2 of the 16x16 sheet) and synchronization between CSS animation runtimes and timestamp intervals so the sprite smoothly moves along the bar and halts upon completion.

---

## 5. Extra Features & Polish

1. **Interactive Pixel Art Progress Bar**:
   - Running knight sprite animated using pure CSS `steps(8)` and pixelated rendering (`image-rendering: pixelated`).
   - Knight position moves dynamically across the bar proportional to quest progress time.
   - Real-time countdown timer automatically switches to a glowing **"CLAIM REWARD"** button once the expedition finishes.

2. **Native HTML5 Drag & Drop**:
   - Adventurer cards with status `READY` can be dragged directly onto any `AVAILABLE` quest card on desktop.
   - Automatic visual feedback when hovering over valid drop targets.

3. **Adaptive Mobile & Desktop UI**:
   - Complete responsive experience without compromising features: desktop multi-column board and mobile bottom tab navigation.
   - Quest assignment accordion for quick touch interaction on smartphones.

4. **Circular XP Gauges**:
   - Hero avatars feature a circular SVG SVG ring (`XpRing`) dynamically calculating progress to the next level based on the current level formula: $\frac{\text{XP}}{\text{Level} \times 100}$.

---

## 6. Project Structure

```text
GuildBoard/
├── backend/                             # Java 21 Spring Boot REST API
│   ├── src/main/java/laplateforme/
│   │   └── guildboard/
│   │       ├── controller/             # REST Controllers (Character, Quest)
│   │       ├── service/                # Business logic & RG1-RG3 validation
│   │       ├── repository/             # Spring Data JPA repositories
│   │       ├── model/                  # JPA Entities (Character, Quest, Assignment)
│   │       ├── dto/                    # Java 21 Records (Requests & Responses)
│   │       └── exception/              # Global @RestControllerAdvice handler
│   └── src/main/resources/
│       ├── application.yml             # General Spring configuration
│       └── application-local.yml       # Local database connection (ignored)
├── frontend/                            # React 19 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/                 # Reusable UI & business components
│   │   │   ├── characters/             # CharacterCard, CharacterList, etc.
│   │   │   ├── quests/                 # QuestCard, QuestList, QuestProgressBar
│   │   │   ├── layout/                 # Header, Footer, Box, Modal
│   │   │   └── common/                 # Button, Badge, Loader, EmptyState, ErrorAlert
│   │   ├── pages/                      # Guildboard main dashboard orchestrator
│   │   ├── services/                   # apiClient, characterService, questService
│   │   └── types/                      # TypeScript interfaces (DTO contracts)
├── ressource/
│   ├── figma/                          # UI wireframes
│   └── models/                         # Database diagrams (MCD, MLD, MPD)
└── README.md                            # Complete documentation
```