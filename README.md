# 📚 EduPlan — Smart Timetable Planner

> A production-ready academic planner built for Ethiopian university students.  
> Featuring a dual-calendar system (Gregorian + Ethiopian EC), Pomodoro timer, conflict detection, and offline-first local storage.

![EduPlan Preview](https://img.shields.io/badge/Status-Live-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge)
![Made for Ethiopia](https://img.shields.io/badge/Made%20for-Ethiopia%20🇪🇹-ef4444?style=for-the-badge)

---
## 🚀 Live Demo

**[👉 View Live on GitHub Pages](https://aychew1229.github.io/eduplan/)**
---

## ✨ Features

### 🗓️ Smart Schedule
- Interactive weekly timetable grid (Mon–Sat, 7 AM–9 PM)
- Color-coded class types: Lecture, Lab, Tutorial, Sport, Other
- Click any slot to add a class; hover to edit or remove
- Automatic **conflict detection** with visual warnings
- Export to `.ics` (Google Calendar / Outlook / Apple Calendar)

### ⏰ Deadlines & Assignments
- Track Exams, Assignments, Quizzes, Projects, and Study Goals
- Filter by type with one click
- Mark as done with a single tap
- Auto-reminders that appear as deadlines approach

### 🇪🇹 Ethiopian Calendar Integration
- **Accurate GC → EC conversion** (verified against official Ethiopian calendar)
- Live EC date preview when picking a due date
- Every deadline card shows both Gregorian and Ethiopian dates side by side

### ⏱️ Pomodoro Study Timer
- Modes: Pomodoro (25 min), Deep Work (50 min), Short Focus (15 min), Breaks
- Auto-logs completed sessions with Ethiopian date/time
- Daily progress bar towards a 4-session goal
- Desktop notifications when session ends

### 🔔 Smart Reminders
- Auto-generated from deadlines (1 day / 3 days / 1 week before)
- Custom reminders with date and time
- Dismiss or restore any reminder
- Badge count on nav tab

### 🔐 Multi-User Auth
- Register/login with username + PIN (stored locally)
- Per-user data isolation — each user has their own planner
- Session persists across browser restarts

### 📱 Fully Responsive
- Desktop: full sidebar navigation
- Mobile: bottom tab bar with badge indicators
- Works on any screen size

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 (Custom Properties) | Styling, animations, responsive layout |
| Vanilla JavaScript (ES6+) | All logic — no frameworks, no dependencies |
| localStorage | Offline-first data persistence |
| Web Notifications API | Study session alerts |

> Zero dependencies. No npm. No build step. Just one HTML file.

---

## 📸 Screenshots

| Dashboard | Schedule Grid | Deadlines |
|---|---|---|
| Live clock · Stats · Today's classes | Weekly grid with conflict detection | EC + GC dual dates · Edit & Delete |

---

## 🔒 Privacy

All data is stored in your browser's `localStorage`. Nothing is sent to any server. Clearing browser data will erase your planner — export your schedule as `.ics` or `.csv` to back it up.

---

## 👤 Author

**Aychew M.** — Electrical & Computer Engineering Student  
Debre Tabor University, Ethiopia  

[![Portfolio](https://img.shields.io/badge/Portfolio-aychew1229.github.io-10b981?style=flat-square)](https://aychew1229.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-aychew1229-181717?style=flat-square&logo=github)](https://github.com/aychew1229)

---

## 📄 License

Open Source License — free to use, modify, and distribute.

---

<p align="center">Made with ❤️ in Ethiopia 🇪🇹</p>
