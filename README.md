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
- Task
- 
