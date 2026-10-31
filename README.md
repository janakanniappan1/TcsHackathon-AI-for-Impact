# AI Disaster Intelligence & Autonomous Relief Coordinator

> **TCS Hackathon — Theme 3: AI for Impact**  
> **Challenge 11: AI Disaster Intelligence & Autonomous Relief Coordinator**  
> **Domain:** Disaster Management  
> **Tags:** Agentic AI | Optimization | Emergency Response | Responsible AI  

---

## 🎯 Executive Overview
During large-scale emergencies, information arriving from weather alerts, citizen SOS calls, field responders, shelter records, and road sensors is noisy, delayed, and conflicting. 

This project delivers an **Autonomous Disaster Intelligence & Relief Coordination Command Center** that executes:
$$\mathbf{Verify} \longrightarrow \mathbf{Prioritize} \longrightarrow \mathbf{Allocate} \longrightarrow \mathbf{Route} \longrightarrow \mathbf{Monitor} \longrightarrow \mathbf{Replan}$$

It specifically solves the **Dynamic Jury Challenge** (autonomous mid-mission rerouting and replanning when a critical artery collapses) while enforcing **Responsible AI Guardrails** (human sign-off on life-critical missions).

---

## 📖 Master Architecture & Implementation Plan
For the complete mathematical formulations, multi-agent architecture, and demonstration protocol, see:
👉 **[MASTER_PROJECT_PLAN.md](MASTER_PROJECT_PLAN.md)**

---

## 🏗️ Core Pillars

1. **Multi-Tier Evidence Verification Engine**: Differentiates official NDRF field reports ($w=1.00$), IoT telemetry ($w=0.88$), 112 helpline calls ($w=0.76$), citizen SOS reports ($w=0.42$), and unverified social rumors ($w=0.22$) with exponential corroboration gains.
2. **Explainable Prioritization (MCDA)**: Computes composite priority scores balancing Casualty Risk, Demographic Vulnerability, and Urgency, accompanied by human-readable Chain-of-Thought Decision Cards.
3. **Constrained Resource & Shelter Optimization (MILP)**: Dispatches the nearest capable units (Ambulances, Rescue Boats, NDRF Rescue Teams, Food Convoys) while routing victims to flood-safe shelters and ICU trauma centers.
4. **Dynamic Road Network & Jury Replanning Engine**: Graph-based routing with real-time impedance updates. Allows judges to cut off roads (e.g. bridge washouts) and watch the AI dynamically reroute convoys and swap units within $< 100\text{ms}$.
5. **Responsible AI Guardrail**: Enforces human-in-the-loop sign-off for critical life-safety mission diversions.

---

## 🚀 Repository Layout
```text
/data/tcs hackthon/
├── MASTER_PROJECT_PLAN.md    # Complete mathematical & architectural blueprint
├── README.md                 # Project summary and overview
├── backend/                  # Python FastAPI, PuLP / SciPy, NetworkX
└── frontend/                 # React 18, Vite, Tailwind CSS, Leaflet GIS Map
```