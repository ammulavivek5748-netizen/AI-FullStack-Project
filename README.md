# 🚀 Hackathon Team & Delivery Hub

> An AI-powered full-stack platform that helps students form balanced hackathon teams, plan their work, track requirements, and deliver a complete submission before the deadline.

## 📌 Overview

**Hackathon Team & Delivery Hub** is a collaborative platform designed to help students successfully participate in hackathons from **team formation to final submission**.

Participants can publish their skills, interests, and availability, discover compatible teammates, explore hackathon challenges, and collaborate inside a private team workspace.

AI assists teams with:

- 🤝 Semantic teammate discovery
- 📚 Rulebook question answering using RAG
- 🧠 AI-assisted planning
- ✅ Submission evidence checking
- ⏱️ Deadline-aware delivery planning

The platform keeps humans in control. **Students choose their teammates, captains approve task changes, mentors provide guidance, organizers manage events, and judges retain responsibility for scores and winners.**

---

# 🎯 Problem Statement

Hackathon participants often face several challenges:

- Finding teammates with complementary skills
- Understanding lengthy problem statements and rules
- Managing tasks and responsibilities
- Tracking incomplete requirements
- Coordinating mentor feedback
- Remembering submission requirements
- Completing everything before the deadline

The **Hackathon Team & Delivery Hub** brings these activities into one platform.

---

# ✨ Key Features

## 👥 Smart Team Discovery

Students can:

- Create skill and interest profiles
- Specify available hours
- Describe project ideas in everyday language
- Discover compatible teammates
- See the skills behind AI recommendations
- Send and accept team invitations

The system does **not create hidden student rankings**. Users remain in control of their teammate choices.

---

## 🏆 Hackathon & Challenge Discovery

Participants can browse:

- Published hackathons
- Problem statements
- Rules
- Deadlines
- Judging rubrics
- Event requirements

### Public APIs

```http
GET /api/events
GET /api/events/:id/challenges
```

---

## 🏠 Private Team Workspace

Every accepted team receives a private workspace containing:

- Tasks
- Task owners
- Technical decisions
- Uploaded documents
- Mentor feedback
- Submission links
- Submission checklist
- AI planning information

Team resources are isolated so that unauthorized users cannot access another team's information.

---

# 🤖 AI Features

## 1. Semantic Team Discovery

The platform uses semantic matching to identify teammates whose:

- Skills
- Interests
- Availability
- Project needs

are relevant to a team's requirements.

### Technology

- MongoDB Atlas
- Atlas Vector Search
- Ollama
- LangChain.js

Example:

```text
Project needs:
React + Node.js + UI/UX

        ↓

Semantic Search

        ↓

Compatible Profiles

        ↓

Recommended Teammates
```

The recommendation explains **why** a person was suggested rather than producing an opaque ranking.

---

## 2. Rulebook RAG

Teams can upload permitted hackathon documents such as:

- Rulebooks
- Eligibility documents
- Submission guidelines
- Judging criteria

The RAG system retrieves information from the correct event's documents and generates answers with citations.

Example:

> **Question:** "Does our team need to submit a demo video?"

The system returns an answer based on the uploaded event rulebook and identifies the relevant rule version.

### RAG Pipeline

```text
Event Documents
      ↓
Document Processing
      ↓
Chunking
      ↓
Embeddings
      ↓
MongoDB Atlas Vector Search
      ↓
Relevant Context
      ↓
Ollama / LLM
      ↓
Cited Answer
```

---

## 3. AI Delivery Agent

Teams can ask:

> "Can our team finish the submission by Sunday?"

The delivery agent performs the following workflow:

```text
readTeamPlan(teamId)
        ↓
Tasks + Owners
        ↓
checkAvailability(memberIds, window)
        ↓
Available Hours
        ↓
inspectSubmission(teamId, rubricId)
        ↓
Missing Evidence
        ↓
AI Planning
        ↓
Smaller Milestone Plan
```

The agent can suggest a more realistic plan based on:

- Current tasks
- Task ownership
- Member availability
- Remaining work
- Missing submission evidence
- Official deadline

### Important

AI tools **cannot extend official deadlines**.

Task changes require captain approval.

---

# 👤 User Roles

## Participant

Participants can:

- Manage their profile
- Control profile visibility
- Request to join teams
- Accept invitations
- Own tasks
- Contribute submission evidence

## Team Captain

Team captains can:

- Manage team membership
- Approve task changes
- Coordinate team work

## Mentor

Mentors can:

- Access explicitly assigned teams
- Answer questions
- Comment on technical decisions
- Flag blockers

Mentors **cannot**:

- Modify submissions
- Award scores

## Organizer

Organizers can:

- Create hackathons
- Publish challenges
- Define deadlines
- Assign mentors
- Assign judges
- Resolve team disputes
- Lock submissions

## Judge

Judges receive event-scoped permissions to:

- View assigned submissions
- Record rubric scores

A judge **cannot score their own team**.

---

# 🔐 Authentication & Security

The application implements secure authentication and authorization.

### Authentication

- Verified-email signup
- Login
- Logout
- Password recovery
- Password hashing
- Expiring server-side sessions
- Protected cookies
- CSRF protection
- Login rate limiting

### Authorization

Resource-level authorization is enforced on the server.

The system checks:

- Event membership
- Team membership
- Task ownership/access
- Document permissions
- Chat permissions
- Submission permissions

### Security Rules

- Users cannot self-assign staff roles
- Mentor invitations expire
- Judge invitations expire
- Duplicate invitations are rejected
- Private team data is isolated
- Submission changes are rejected after deadlines
- Judges cannot score their own teams
- Organizer overrides require a reason
- Overrides create an audit entry

---

# 🛠️ Technology Stack

## Frontend

- React.js

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## AI & Semantic Search

- MongoDB Atlas Vector Search
- Ollama
- LangChain.js
- Zod

## Development Tools

- Git
- GitHub
- VS Code
- Postman

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express.js       │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ MongoDB     │   │ AI Services │   │   Auth &    │
      │   Atlas     │   │             │   │ Authorization│
      └──────┬──────┘   └──────┬──────┘   └─────────────┘
             │                 │
             ▼                 ▼
      Atlas Vector Search   Ollama
                              │
                              ▼
                         LangChain.js
                              │
                              ▼
                            Zod
```

---

# 🗄️ Core Data Model

The application uses the following main collections:

```text
Events
Challenges
Profiles
Memberships
Teams
Tasks
Submissions
Rubrics
Scores
Documents
AgentRuns
```

### Relationship Overview

```text
Event
 │
 ├── Challenges
 ├── Rubrics
 ├── Documents
 ├── Mentors
 ├── Judges
 │
 └── Teams
      │
      ├── Members
      ├── Tasks
      ├── Documents
      ├── Feedback
      └── Submission
```

---

# 🌐 API Routes

## Public

```http
GET /api/events
GET /api/events/:id/challenges
```

## Participant

```http
POST /api/teams
POST /api/teams/:id/join-requests
PATCH /api/tasks/:id
POST /api/teams/:id/submission
```

## Mentor

```http
POST /api/teams/:id/feedback
```

## Organizer

```http
POST /api/events
PATCH /api/events/:id/assignments
```

## Authorized Team Members

```http
POST /api/team-chat
POST /api/delivery-agent
```

## Judge

```http
POST /api/submissions/:id/scores
```

---

# 🖥️ React Application Screens

The frontend will contain:

### 1. Event Discovery

Browse available hackathons and challenges.

### 2. Team Board

View team members, skills, tasks, and progress.

### 3. Task Timeline

Track:

- Tasks
- Owners
- Deadlines
- Status
- Dependencies

### 4. Submission Checklist

Clearly identify:

```text
✅ Completed
🟡 In Progress
❌ Missing
```

### 5. Mentor Feedback

Mentors can review progress and provide feedback.

### 6. Organizer Dashboard

Organizers can manage:

- Events
- Challenges
- Mentors
- Judges
- Assignments
- Deadlines
- Submission locking

---

# 🔄 Complete Application Flow

```text
                    STUDENT
                       │
                       ▼
              Create / Verify Account
                       │
                       ▼
                 Create Profile
                       │
             Skills + Interests +
              Available Hours
                       │
                       ▼
              Browse Hackathons
                       │
                       ▼
              View Challenges
                       │
                       ▼
             Describe Project Idea
                       │
                       ▼
          Semantic Teammate Discovery
                       │
                       ▼
              Send Invitations
                       │
                       ▼
              Form Balanced Team
                       │
                       ▼
             Private Team Workspace
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
      Tasks         Documents       Team Chat
        │              │              │
        ▼              ▼              ▼
   Assign Owners    Rulebook RAG   Collaboration
        │
        ▼
     AI Delivery Agent
        │
        ├── Team Plan
        ├── Availability
        └── Missing Evidence
                 │
                 ▼
          Milestone Suggestions
                 │
                 ▼
          Captain Approval
                 │
                 ▼
           Submission Checklist
                 │
                 ▼
         Evidence Verification
                 │
                 ▼
          Submit Before Deadline
                 │
                 ▼
          Organizer Locks Entry
                 │
                 ▼
               Judge
                 │
                 ▼
            Rubric Scoring
```

---

# 🎬 Demonstration Scenario

The project demonstration will follow this scenario:

### Step 1

A student creates a profile containing:

```text
Skills:
React.js
Node.js
MongoDB

Interests:
AI
Web Development

Availability:
15 hours/week
```

### Step 2

The student describes their project idea in natural language.

The semantic search system finds compatible teammates based on relevant skills, interests, and availability.

### Step 3

The team accepts members and receives a private workspace.

### Step 4

The team uploads the official hackathon rulebook.

### Step 5

A team member asks:

> "What are the mandatory submission requirements?"

The RAG system answers using the correct event document and cites the relevant rule version.

### Step 6

The team asks:

> "Can our team finish the submission by Sunday?"

The delivery agent checks:

```text
Team tasks
     +
Task owners
     +
Member availability
     +
Missing submission evidence
```

and proposes a smaller milestone plan.

### Step 7

The team discovers that a **demo video** is missing.

The submission checklist identifies it as incomplete.

### Step 8

The team replans the work around member availability.

### Step 9

The team completes the missing evidence and submits before the deadline.

### Step 10

The organizer locks the submission and the assigned judge evaluates it using the official rubric.

---

# ✅ Acceptance & Security Checks

The application will demonstrate:

- [ ] Private team isolation
- [ ] Correct role-based access
- [ ] Deadline enforcement
- [ ] Duplicate invitation prevention
- [ ] Mentor cannot submit
- [ ] Mentor cannot score
- [ ] Judge cannot score their own team
- [ ] Organizer override requires a reason
- [ ] Audit entry is created for overrides
- [ ] Rulebook answers contain citations
- [ ] Correct rule version is identified
- [ ] AI tool execution status is visible
- [ ] Missing-data situations produce graceful responses
- [ ] AI cannot modify official deadlines
- [ ] Captains approve task changes

---

# 📁 Project Structure

```text
hackathon-team-delivery-hub/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── ai/
│   │   └── utils/
│   └── package.json
│
├── docs/
│
├── tests/
│
├── .gitignore
├── README.md
└── package.json
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Ollama

## Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/hackathon-team-delivery-hub.git
cd hackathon-team-delivery-hub
```

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
OLLAMA_BASE_URL=your_ollama_url
```

**Never commit `.env` files or API keys to GitHub.**

## Run the Application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 🔀 GitHub Collaboration Workflow

This project is developed by a **10-member team** using a feature-branch workflow.

```text
main
 │
 ├── feature/frontend
 ├── feature/backend
 ├── feature/auth
 ├── feature/teams
 ├── feature/ai
 ├── feature/rag
 ├── feature/tasks
 ├── feature/submissions
 ├── feature/testing
 └── feature/deployment
```

### Workflow

```text
Create Branch
      ↓
Develop Feature
      ↓
Commit Changes
      ↓
Push Branch
      ↓
Create Pull Request
      ↓
Code Review
      ↓
Approval
      ↓
Merge into main
```

The `main` branch is protected and changes are merged only through reviewed Pull Requests.

---

# 👨‍💻 Team

**Hackathon Team & Delivery Hub** is developed collaboratively by a 10-member student team.

| Role | Responsibility |
|---|---|
| Project Lead | Architecture, integration & code review |
| Frontend Developer | React UI and screens |
| Backend Developer | Express APIs |
| Database Developer | MongoDB Atlas & Mongoose |
| Authentication Developer | Authentication & RBAC |
| AI Developer | Ollama & AI workflows |
| RAG Developer | Rulebook RAG & Vector Search |
| Collaboration Developer | Teams, tasks & chat |
| Testing Developer | Testing & security validation |
| DevOps/Documentation | Deployment, CI/CD & documentation |

---

# 🧠 Design Principles

### Human-in-the-loop AI

AI assists users but does not make authoritative decisions.

### Privacy by design

Team data is accessible only to authorized members.

### Explainable recommendations

Team discovery provides the skills and factors behind recommendations.

### Deadline-aware planning

AI planning respects official server-side deadlines.

### Role-based security

Every protected resource is checked against the user's role and membership.

---

# 📌 Project Status

🚧 **Under Development**

The project is currently being developed as an AI-powered full-stack capstone project.

Future updates will include:

- Complete implementation
- Automated testing
- Deployment
- Screenshots
- API documentation
- Architecture diagrams
- Demo video

---

## 📄 License

This project is developed for educational and hackathon purposes.

---

**Built with ❤️ by the Hackathon Team & Delivery Hub team.**
