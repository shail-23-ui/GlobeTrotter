# 🌍 GlobeTrotter

**Empowering Personalized Travel Planning**

GlobeTrotter is an end-to-end travel planning platform that lets users dream, design, and organize multi-city trips with ease — from discovering destinations and building day-wise itineraries to tracking budgets and sharing plans with others.

Built for the Odoo Hackathon problem statement: *"Empowering Personalized Travel Planning."*

---

## ✨ Vision

Travel planning today is scattered across spreadsheets, notes apps, and a dozen browser tabs. GlobeTrotter brings it all into one intelligent, collaborative platform — helping travelers visualize their journeys, make cost-effective decisions, and stay within budget, while making the planning process as exciting as the trip itself.

---

## 🚀 Features

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Login / Signup** | Secure authentication with email & password, validation, and account creation. |
| 2 | **Dashboard** | Personalized home screen with a welcome message, upcoming trips, recommended destinations, and budget highlights. |
| 3 | **Complete Travel Profile** | Onboarding flow to capture travel style, accommodation, food, transport, and budget preferences for smarter recommendations. |
| 4 | **Create Trip** | Simple form to kick off a new trip — name, dates, description, and optional cover photo. |
| 5 | **My Trips** | List/grid view of all trips (exploring, upcoming, past) with quick view, edit, and delete actions. |
| 6 | **Explore** | Discover destinations with filters for budget, trip type, and duration, plus recommendations based on your profile. |
| 7 | **Itinerary Builder** *(planned)* | Add stops, assign travel dates, and attach activities to each city in the trip. |
| 8 | **Trip Budget & Cost Breakdown** | Visual breakdown of spend across accommodation, food, transportation, activities, and miscellaneous costs, plus an interactive budget calculator. |
| 9 | **User Profile** | View and edit personal info, travel preferences, places visited, and dream destination. |
| 10 | **Shared/Public Itinerary View** *(planned)* | Publicly shareable, read-only version of a trip itinerary. |
| 11 | **Admin / Analytics Dashboard** *(optional)* | Admin-only insights into platform usage, popular cities, and user engagement. |

---

## 📸 Screenshots

> Place the corresponding images inside a `/screenshots` folder in the repo and update the paths below.

| Login | Signup | Complete Profile |
|---|---|---|
| ![Login](screenshots/login.png) | ![Signup](screenshots/signup.png) | ![Profile Setup](screenshots/profile-setup.png) |

| Dashboard | Explore | My Trips |
|---|---|---|
| ![Dashboard](screenshots/dashboard.png) | ![Explore](screenshots/explore.png) | ![My Trips](screenshots/my-trips.png) |

| Plan New Trip | Budget | Profile |
|---|---|---|
| ![Plan Trip](screenshots/plan-trip.png) | ![Budget](screenshots/budget.png) | ![Profile](screenshots/profile.png) |

---

## 🧭 Core User Flow

```
Signup / Login
      │
      ▼
Complete Travel Profile  ──►  Dashboard
      │                          │
      ▼                          ▼
 Explore Destinations      Plan New Trip
      │                          │
      ▼                          ▼
 View Itineraries         My Trips (Manage)
      │                          │
      └──────────► Trip Budget ◄─┘
                        │
                        ▼
                  Shared Itinerary
```

---

## 🛠️ Tech Stack

> _Update this section with your actual stack._

- **Frontend:** e.g. React / Next.js, Tailwind CSS
- **Backend:** e.g. Node.js / Express or Django
- **Database:** e.g. PostgreSQL / MySQL (relational schema for users, trips, stops, activities, and budgets)
- **Auth:** e.g. JWT-based authentication
- **Hosting:** e.g. Vercel / Render / Railway

---

## 🗄️ Data Model (High-Level)

Core entities the app is designed around:

- **User** — profile info, travel preferences, dream destination, places visited
- **Trip** — name, dates, description, cover photo, planning progress
- **Stop** — city, country, dates, order within trip
- **Activity** — type, cost, duration, linked to a stop
- **Budget** — accommodation, food, transportation, activities, miscellaneous — per trip and aggregated

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/globetrotter.git
cd globetrotter

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the development server
npm run dev
```

> Update commands above to match your actual setup (frontend/backend split, package manager, etc.).

---

## 📂 Project Structure

```
globetrotter/
├── screenshots/          # App screenshots used in this README
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/             # Screens (Dashboard, Explore, My Trips, Budget, Profile...)
│   ├── services/          # API calls / data layer
│   └── styles/            # Global styles & design tokens
├── server/                # Backend API (if applicable)
├── .env.example
└── README.md
```

---

## 🗺️ Roadmap

- [x] Auth (Login/Signup)
- [x] Travel Profile onboarding
- [x] Dashboard with recommendations & budget highlights
- [x] Explore destinations with filters
- [x] Create & manage trips
- [x] Budget tracking + calculator
- [ ] Itinerary Builder (stops + activities)
- [ ] Public/shared itinerary view
- [ ] Admin analytics dashboard

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a PR or file an issue.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

Built for the **Odoo Hackathon** — *"GlobeTrotter: Empowering Personalized Travel Planning."*
