# SENTINEL — Evidence-Grounded AI Disaster Intelligence & Autonomous Emergency Coordination System

> **TCS Hackathon — Theme 3: AI for Impact**  
> **Challenge 11: AI Disaster Intelligence & Autonomous Relief Coordinator**  
> **Domain:** Emergency Management • Autonomous Coordination • Responsible AI • Deepfake Defense  
> **Live Local URL:** [http://localhost:3000](http://localhost:3000) • **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)  

---

## 📖 Comprehensive Documentation
For the complete architectural blueprint, mathematical equations, API schemas, and test reports, see:  
👉 **[SENTINEL_END_TO_END_SPECIFICATION.md](SENTINEL_END_TO_END_SPECIFICATION.md)**

---

## 🎯 Executive Overview

During extreme disaster events, emergency control rooms are overwhelmed by conflicting, delayed, and unverified data. **SENTINEL** is an agentic, evidence-grounded emergency operations command system that executes a continuous operational lifecycle:

$$\mathbf{Verify} \longrightarrow \mathbf{Prioritize} \longrightarrow \mathbf{Allocate} \longrightarrow \mathbf{Route} \longrightarrow \mathbf{Monitor} \longrightarrow \mathbf{Replan}$$

The platform integrates **real AI deepfake detection (Lynote AI UnivFD ViT-L-14)** and **C2PA cryptographic provenance verification** to purge digital disinformation from the disaster triage loop, dynamically reroutes convoys when arteries submerge, and enforces **human-in-the-loop sign-off** on critical decisions.

---

## 🏗️ Key Architecture & Pillars

1. **Modern Command Centre Operations UI:** Light lavender and soft blue command centre interface with a 3-column layout (Prioritized Queue, Leaflet OSM GIS map with real-time road impedance, and AI Reassignment & Operator Authorization).
2. **Media Authenticity & Forensic Worker:**
   - **Lynote AI Image Detector:** Real OpenCLIP ViT-L-14 visual manifold feature extractor paired with pre-trained UnivFD linear classification head.
   - **C2PA Provenance Verification:** Official `c2pa-python` SDK validating X.509 cryptographic assertions and digital camera credentials.
   - **Honest Health Reporting:** Zero simulated fake scores; honest offline status reporting.
3. **Multi-Tier Bayesian Evidence Intelligence:** 5-tier source hierarchy weighting official radio ($w=1.00$), hydro sensors ($w=0.88$), 112 calls ($w=0.76$), citizen uploads ($w=0.42$), and social media ($w=0.22$).
4. **Explainable Prioritization (MCDA):** Multi-Criteria Decision Analysis balancing Casualty Risk (40%), Demographic Vulnerability (30%), and Time Urgency (30%).
5. **Dynamic Road Network & Replanning Engine:** Real-time road impedance modeling that detects submerged roads and recommends elevated bypass routes with minute-by-minute ETA deltas.
6. **Responsible AI Guardrails:** Human-in-the-loop coordinator authorization for mission diversions and route overrides.

---

## 🚀 Quick Startup Guide

### 1. One-Click Startup (Windows)
Double-click `start.bat` in the project root:
```cmd
start.bat
```

### 2. Manual Startup
**Terminal 1 — Python FastAPI Backend (Port 8000):**
```bash
python backend/run.py
```

**Terminal 2 — React + Vite Frontend (Port 3000):**
```bash
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🧪 Testing & Verification

- **Frontend Compilation:** `npm run build` (`tsc -b && vite build`) — **0 errors**.
- **Backend Tests:** 12 automated unit and integration tests passing:
```bash
python -c "import sys; sys.path.insert(0, 'backend'); import pytest; sys.exit(pytest.main(['backend/tests/test_media_authenticity.py', '-v']))"
```

---

*SENTINEL — Autonomous Disaster Intelligence & Emergency Coordination System*
