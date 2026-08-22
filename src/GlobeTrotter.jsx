import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  Search, MapPin, Star, Plus, X, Check, ChevronDown, SlidersHorizontal,
  UtensilsCrossed, Landmark, Mountain, Camera, Waves, Wallet, TrendingUp,
  AlertTriangle, Loader2, CalendarDays, PlaneTakeoff, LayoutGrid, Compass,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   bg #FAF7F1 · card #FFFFFF · ink #1E2A38 · accent #E2683A
   positive #2F8F7E · muted #757C87 · border #E8E1D5 · warn #B23A2E
   Display: Fraunces · Body: Inter · Data: IBM Plex Mono
   ============================================================ */
const T = {
  bg: "#FAF7F1",
  card: "#FFFFFF",
  ink: "#1E2A38",
  inkSoft: "#3A4657",
  accent: "#E2683A",
  accentDeep: "#C4552C",
  accentTint: "#FBE6DA",
  positive: "#2F8F7E",
  positiveTint: "#E1F1EC",
  muted: "#757C87",
  border: "#E8E1D5",
  warn: "#B23A2E",
  warnTint: "#FBE6E3",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');`;

/* ============================================================
   MOCK DATA — structured to mirror the eventual API shape
   ============================================================ */
const CITY_SEED = [
  ["Paris", "France", "Europe", 3, 4.8, "The City of Light — grand boulevards, world-class museums, and unhurried café culture.", "paris"],
  ["Amsterdam", "Netherlands", "Europe", 2, 4.7, "Canal-laced streets, cycling culture, and a compact, walkable centre.", "amsterdam"],
  ["Berlin", "Germany", "Europe", 2, 4.6, "Layered history, underground art, and a nightlife that never quite sleeps.", "berlin"],
  ["Lisbon", "Portugal", "Europe", 2, 4.6, "Pastel hillside streets, fado music, and the Atlantic just beyond every tram line.", "lisbon"],
  ["Kyoto", "Japan", "Asia", 3, 4.9, "Temples, bamboo groves, and seasons that change the whole city's mood.", "kyoto"],
  ["Bangkok", "Thailand", "Asia", 1, 4.5, "Street food economics, gilded temples, and a river that moves the whole city.", "bangkok"],
  ["Bali", "Indonesia", "Asia", 1, 4.7, "Rice terraces, surf breaks, and a slower clock than you're used to.", "bali"],
  ["Cape Town", "South Africa", "Africa", 2, 4.7, "A mountain, two oceans, and a city that sits comfortably between them.", "capetown"],
  ["Marrakech", "Morocco", "Africa", 1, 4.4, "Souks, riads, and a medina built for getting pleasantly lost.", "marrakech"],
  ["Mexico City", "Mexico", "North America", 2, 4.6, "Mural-covered neighbourhoods, market food, and museums for every hour of the day.", "mexicocity"],
  ["New York", "United States", "North America", 3, 4.6, "Every neighbourhood is its own city; the skyline is just the table of contents.", "newyork"],
  ["Buenos Aires", "Argentina", "South America", 2, 4.5, "Tango on the sidewalk, steakhouses on every corner, European bones with Latin pace.", "buenosaires"],
  ["Reykjavik", "Iceland", "Europe", 3, 4.6, "A small capital that's really a basecamp for glaciers, geysers, and the northern sky.", "reykjavik"],
  ["Sydney", "Australia", "Oceania", 3, 4.6, "Harbour views, ocean pools, and a coastline built for walking.", "sydney"],
  ["Prague", "Czech Republic", "Europe", 1, 4.7, "Spires, beer halls, and a old town that looks staged even at 7am.", "prague"],
];

const COST_SYMBOL = { 1: "$", 2: "$$", 3: "$$$" };

const CITIES = CITY_SEED.map(([name, country, region, cost, pop, desc, seed], i) => ({
  id: `city_${i + 1}`,
  name, country, region,
  costIndex: cost,
  costLabel: COST_SYMBOL[cost],
  popularity: pop,
  description: desc,
  image: `https://picsum.photos/seed/${seed}/640/440`,
  tripFit: Math.max(58, Math.min(97, Math.round(pop * 18 + (4 - cost) * 4 + (i % 3) * 2))),
}));

const ACTIVITY_CATEGORIES = [
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "culture", label: "Culture", icon: Landmark },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "sightseeing", label: "Sightseeing", icon: Camera },
  { id: "relaxation", label: "Relaxation", icon: Waves },
];

const ACTIVITY_TEMPLATES = {
  food: [["Local Cooking Class", "Learn a signature regional dish from a home cook.", 2, 2],
         ["Night Market Food Crawl", "Sample six stalls with a local food guide.", 3, 2.5]],
  culture: [["Old Town Walking Tour", "A guided walk through the historic centre.", 2.5, 1],
            ["National Museum Visit", "Half-day self-paced tour of the city's flagship museum.", 3, 1.5]],
  adventure: [["Sunrise Hike", "A guided trail hike timed for sunrise views.", 4, 2],
              ["Kayak Excursion", "Paddle the waterfront with a small group.", 2, 2.5]],
  sightseeing: [["Skyline Viewpoint", "The best rooftop or hilltop view in the city.", 1.5, 1],
                ["Landmark Photo Route", "A curated route past the five most-photographed spots.", 2, 1]],
  relaxation: [["Spa & Thermal Bath", "A half-day at a well-reviewed local spa.", 3, 3],
               ["Riverside Picnic", "A packed picnic basket delivered to a scenic riverside spot.", 2, 1.5]],
};

function costTier(v) { return v <= 1.2 ? 1 : v <= 2.2 ? 2 : 3; }

const ACTIVITIES = CITIES.flatMap((city) =>
  Object.entries(ACTIVITY_TEMPLATES).flatMap(([cat, list], ci) =>
    list.map(([name, desc, hours, costUnits], li) => ({
      id: `act_${city.id}_${cat}_${li}`,
      cityId: city.id,
      cityName: city.name,
      name,
      category: cat,
      description: desc,
      durationHours: hours,
      cost: Math.round(costUnits * (18 + (ci + li) * 3) * city.costIndex),
      costTier: costTier(costUnits * city.costIndex),
      image: `https://picsum.photos/seed/${city.description}-${cat}-${li}/480/320`,
    }))
  )
);

const TRIPS = [
  {
    id: "trip_1",
    name: "Summer Europe Escape",
    stops: [
      { id: "stop_1", cityName: "Paris", days: ["Day 1", "Day 2", "Day 3"] },
      { id: "stop_2", cityName: "Amsterdam", days: ["Day 4", "Day 5"] },
      { id: "stop_3", cityName: "Berlin", days: ["Day 6", "Day 7"] },
    ],
  },
  {
    id: "trip_2",
    name: "Kyoto & Bangkok Loop",
    stops: [
      { id: "stop_4", cityName: "Kyoto", days: ["Day 1", "Day 2", "Day 3", "Day 4"] },
      { id: "stop_5", cityName: "Bangkok", days: ["Day 5", "Day 6"] },
    ],
  },
];

const BUDGET = {
  tripId: "trip_1",
  tripName: "Summer Europe Escape",
  durationDays: 7,
  stopCount: 3,
  budgetCap: 50000,
  breakdown: [
    { category: "Transport", amount: 11200 },
    { category: "Stay", amount: 18400 },
    { category: "Activities", amount: 8700 },
    { category: "Meals", amount: 7300 },
    { category: "Other", amount: 2900 },
  ],
  dailySpending: [
    { day: "Day 1", amount: 5200 },
    { day: "Day 2", amount: 6100 },
    { day: "Day 3", amount: 8900 },
    { day: "Day 4", amount: 5400 },
    { day: "Day 5", amount: 6200 },
    { day: "Day 6", amount: 7800 },
    { day: "Day 7", amount: 8900 },
  ],
};

const PIE_COLORS = ["#E2683A", "#2F8F7E", "#3A4657", "#D9A441", "#8C93A6"];

/* ============================================================
   SMALL UTILITIES
   ============================================================ */
const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const useDebounced = (value, delay = 320) => {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return v;
};

/* ============================================================
   NAV
   ============================================================ */
function TopNav({ tab, setTab }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "trips", label: "My Trips" },
    { id: "explore", label: "Explore" },
    { id: "itinerary", label: "Itinerary" },
    { id: "budget", label: "Budget" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <div style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div style={{ background: T.ink }} className="flex h-8 w-8 items-center justify-center rounded-lg">
            <Compass size={17} color={T.bg} strokeWidth={2.25} />
          </div>
          <span style={{ fontFamily: "Fraunces", color: T.ink }} className="text-lg font-semibold tracking-tight">
            GlobeTrotter
          </span>
        </div>
        <nav className="hidden gap-1 md:flex">
          {items.map((it) => {
            const active = tab === it.id;
            const enabled = it.id === "explore" || it.id === "budget";
            return (
              <button
                key={it.id}
                onClick={() => enabled && setTab(it.id)}
                disabled={!enabled}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color: active ? T.accentDeep : enabled ? T.inkSoft : "#B7BCC4",
                  background: active ? T.accentTint : "transparent",
                  cursor: enabled ? "pointer" : "default",
                }}
              >
                {it.label}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setTab("explore")} className="rounded-lg p-2" style={{ background: tab === "explore" ? T.accentTint : "transparent" }}>
            <LayoutGrid size={18} color={tab === "explore" ? T.accentDeep : T.inkSoft} />
          </button>
          <button onClick={() => setTab("activities")} className="rounded-lg p-2" style={{ background: tab === "activities" ? T.accentTint : "transparent" }}>
            <Compass size={18} color={tab === "activities" ? T.accentDeep : T.inkSoft} />
          </button>
          <button onClick={() => setTab("budget")} className="rounded-lg p-2" style={{ background: tab === "budget" ? T.accentTint : "transparent" }}>
            <Wallet size={18} color={tab === "budget" ? T.accentDeep : T.inkSoft} />
          </button>
        </div>
      </div>
      {/* secondary strip so mobile users can also reach activities without crowding icons */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {["explore", "activities", "budget"].map((id) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: tab === id ? T.ink : T.bg,
              color: tab === id ? T.bg : T.muted,
              border: `1px solid ${tab === id ? T.ink : T.border}`,
            }}
          >
            {id === "explore" ? "Explore" : id === "activities" ? "Things to do" : "Budget"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ROUTE-LINE DIVIDER — signature decorative element
   ============================================================ */
function RouteLine({ width = 1200, className = "" }) {
  return (
    <svg viewBox={`0 0 ${width} 40`} className={className} style={{ width: "100%", height: 24, display: "block" }} preserveAspectRatio="none">
      <path
        d={`M0 20 Q ${width * 0.25} -6, ${width * 0.5} 20 T ${width} 20`}
        fill="none"
        stroke={T.border}
        strokeWidth="2"
        strokeDasharray="1 10"
        strokeLinecap="round"
      />
      <circle cx={width * 0.02} cy="20" r="4" fill={T.accent} />
      <circle cx={width * 0.98} cy="20" r="4" fill={T.positive} />
    </svg>
  );
}

/* ============================================================
   FIT RING — small circular gauge used for Trip Fit + Budget cap
   ============================================================ */
function FitRing({ value, size = 40, stroke = 4, color = T.positive, trackColor = "#EDE7DB", label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute text-[10px] font-semibold" style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>
        {label ?? `${value}`}
      </span>
    </div>
  );
}

/* ============================================================
   TOAST
   ============================================================ */
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 shadow-lg transition-all duration-300"
      style={{ background: T.ink, color: T.bg, animation: "gt-toast-in 0.28s ease" }}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: T.positive }}>
        <Check size={13} color="#fff" strokeWidth={3} />
      </div>
      <span className="text-sm font-medium">{toast}</span>
    </div>
  );
}

/* ============================================================
   LOADING SKELETON
   ============================================================ */
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ background: T.card, border: `1px solid ${T.border}` }}>
      <div className="h-40 w-full animate-pulse" style={{ background: "#EFE9DD" }} />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded" style={{ background: "#EFE9DD" }} />
        <div className="h-3 w-1/3 animate-pulse rounded" style={{ background: "#EFE9DD" }} />
        <div className="h-3 w-full animate-pulse rounded" style={{ background: "#EFE9DD" }} />
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY / ERROR STATES
   ============================================================ */
function EmptyState({ title, subtitle, icon: Icon = Search }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center" style={{ background: T.card, border: `1px dashed ${T.border}` }}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: T.accentTint }}>
        <Icon size={20} color={T.accentDeep} />
      </div>
      <p style={{ fontFamily: "Fraunces", color: T.ink }} className="text-base font-semibold">{title}</p>
      <p style={{ color: T.muted }} className="mt-1 max-w-xs text-sm">{subtitle}</p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center" style={{ background: T.warnTint, border: `1px solid #F0C7C0` }}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "#fff" }}>
        <AlertTriangle size={20} color={T.warn} />
      </div>
      <p style={{ fontFamily: "Fraunces", color: T.ink }} className="text-base font-semibold">Couldn't load results</p>
      <p style={{ color: T.muted }} className="mt-1 max-w-xs text-sm">Something went wrong reaching the server. Check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
        style={{ background: T.warn }}
      >
        Retry
      </button>
    </div>
  );
}

/* ============================================================
   SEARCH BAR + FILTER BAR
   ============================================================ */
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1">
      <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" color={T.muted} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-shadow"
        style={{ background: T.card, border: `1px solid ${T.border}`, color: T.ink }}
        onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${T.accentTint}`)}
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
    </div>
  );
}

function Pill({ active, onClick, children, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
      style={{
        background: active ? T.ink : T.card,
        color: active ? T.bg : T.inkSoft,
        border: `1px solid ${active ? T.ink : T.border}`,
      }}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

/* ============================================================
   CITY CARD
   ============================================================ */
function CityCard({ city, onAdd }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-200"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: hover ? "0 10px 24px -12px rgba(30,42,56,0.18)" : "none" }}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={city.image}
          alt={`${city.name}, ${city.country}`}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
          loading="lazy"
        />
        <div
          className="absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: "rgba(255,255,255,0.92)" }}
          title="Trip Fit — a suggested fit for your current trip, based on cost and popularity"
        >
          <FitRing value={city.tripFit} size={22} stroke={3} color={city.tripFit >= 80 ? T.positive : T.accent} label="" />
          <span className="text-xs font-semibold" style={{ color: T.ink, fontFamily: "IBM Plex Mono" }}>{city.tripFit}%</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 style={{ fontFamily: "Fraunces", color: T.ink }} className="text-lg font-semibold leading-tight">{city.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs" style={{ color: T.muted }}>
              <MapPin size={11} /> {city.country}
            </p>
          </div>
          <div className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: T.ink }}>
            <Star size={13} fill={T.accent} color={T.accent} /> {city.popularity}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm" style={{ color: T.inkSoft }}>{city.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-md px-2 py-1 text-xs font-semibold" style={{ background: T.bg, color: T.inkSoft, border: `1px solid ${T.border}`, fontFamily: "IBM Plex Mono" }}>
            Cost {city.costLabel}
          </span>
          <button
            onClick={() => onAdd(city)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform active:scale-95"
            style={{ background: T.accent }}
          >
            <Plus size={13} /> Add to Trip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY CARD
   ============================================================ */
function ActivityCard({ activity, onAdd }) {
  const meta = ACTIVITY_CATEGORIES.find((c) => c.id === activity.category);
  const Icon = meta?.icon ?? Camera;
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-md" style={{ background: T.card, border: `1px solid ${T.border}` }}>
      <div className="relative h-32 w-full overflow-hidden">
        <img src={activity.image} alt={activity.name} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.92)", color: T.ink }}>
          <Icon size={11} /> {meta?.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h4 style={{ fontFamily: "Fraunces", color: T.ink }} className="text-[15px] font-semibold leading-tight">{activity.name}</h4>
        </div>
        <p className="mt-1 flex items-center gap-2 text-xs" style={{ color: T.muted }}>
          <span>{activity.cityName}</span>·<span>{activity.durationHours}h</span>
        </p>
        <p className="mt-1.5 line-clamp-2 text-xs" style={{ color: T.inkSoft }}>{activity.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>{inr(activity.cost)}</span>
          <button
            onClick={() => onAdd(activity)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-transform active:scale-95"
            style={{ background: T.positiveTint, color: T.positive }}
          >
            <Plus size={13} /> Add to Day
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ADD-TO-TRIP MODAL (shared by City + Activity flows)
   ============================================================ */
function AddToTripModal({ item, kind, onClose, onConfirm }) {
  const [tripId, setTripId] = useState(TRIPS[0].id);
  const [stopId, setStopId] = useState("");
  const [dayId, setDayId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const trip = TRIPS.find((t) => t.id === tripId);
  const stop = trip?.stops.find((s) => s.id === stopId);

  useEffect(() => {
    setStopId("");
    setDayId("");
  }, [tripId]);

  useEffect(() => {
    setDayId("");
  }, [stopId]);

  if (!item) return null;
  const needsStop = kind === "city" ? false : true;
  const canConfirm = kind === "city" ? !!tripId : !!(tripId && stopId && dayId);

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onConfirm({
        trip_id: tripId,
        stop_id: stopId || null,
        day: dayId || null,
        ...(kind === "city"
          ? { city_id: item.id, city_name: item.name }
          : { activity_id: item.id, activity_name: item.name, cost: item.cost, duration: item.durationHours, category: item.category }),
      });
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" style={{ animation: "gt-fade-in 0.2s ease" }}>
      <div className="absolute inset-0" style={{ background: "rgba(30,42,56,0.45)" }} onClick={onClose} />
      <div
        className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-2xl p-5 sm:max-w-md sm:rounded-2xl sm:p-6"
        style={{ background: T.card, animation: "gt-sheet-in 0.28s ease" }}
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: T.accentDeep }}>
              {kind === "city" ? "Add to Trip" : "Add to Day"}
            </p>
            <h3 id="modal-title" style={{ fontFamily: "Fraunces", color: T.ink }} className="mt-0.5 text-xl font-semibold">{item.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 transition-colors hover:bg-black/5">
            <X size={18} color={T.muted} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold" style={{ color: T.inkSoft }}>Trip</label>
            <div className="mt-1.5 space-y-2">
              {TRIPS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTripId(t.id)}
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors"
                  style={{ border: `1.5px solid ${tripId === t.id ? T.accent : T.border}`, background: tripId === t.id ? T.accentTint : "transparent" }}
                >
                  <span>
                    <span className="block text-sm font-semibold" style={{ color: T.ink }}>{t.name}</span>
                    <span className="block text-xs" style={{ color: T.muted }}>{t.stops.map((s) => s.cityName).join(" → ")}</span>
                  </span>
                  {tripId === t.id && <Check size={16} color={T.accentDeep} />}
                </button>
              ))}
            </div>
          </div>

          {needsStop && trip && (
            <div>
              <label className="text-xs font-semibold" style={{ color: T.inkSoft }}>City / Stop</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {trip.stops.map((s) => (
                  <Pill key={s.id} active={stopId === s.id} onClick={() => setStopId(s.id)}>{s.cityName}</Pill>
                ))}
              </div>
            </div>
          )}

          {needsStop && stop && (
            <div>
              <label className="text-xs font-semibold" style={{ color: T.inkSoft }}>Day</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {stop.days.map((d) => (
                  <Pill key={d} active={dayId === d} onClick={() => setDayId(d)}>{d}</Pill>
                ))}
              </div>
            </div>
          )}

          {kind === "activity" && (
            <div className="rounded-xl px-3.5 py-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
              <div className="flex justify-between text-xs" style={{ color: T.muted }}>
                <span>Cost</span><span style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>{inr(item.cost)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs" style={{ color: T.muted }}>
                <span>Duration</span><span style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>{item.durationHours}h</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm || submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity active:scale-[0.99]"
          style={{ background: canConfirm ? T.accent : "#D9C9BC", opacity: submitting ? 0.85 : 1 }}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          {submitting ? "Adding…" : "Confirm"}
        </button>
        {!canConfirm && needsStop && <p className="mt-2 text-center text-xs" style={{ color: T.muted }}>Choose a stop and day to continue.</p>}
      </div>
    </div>
  );
}

/* ============================================================
   SCREEN 1 — CITY DISCOVERY
   ============================================================ */
const REGIONS = ["All", ...Array.from(new Set(CITIES.map((c) => c.region)))];

function ExploreScreen({ openAddModal }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [costMax, setCostMax] = useState(3);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error
  const debouncedQuery = useDebounced(query);

  useEffect(() => {
    setStatus("loading");
    const t = setTimeout(() => setStatus("ready"), 480);
    return () => clearTimeout(t);
  }, [debouncedQuery, region, costMax, sortBy]);

  const results = useMemo(() => {
    let r = CITIES.filter((c) =>
      (region === "All" || c.region === region) &&
      c.costIndex <= costMax &&
      (c.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || c.country.toLowerCase().includes(debouncedQuery.toLowerCase()))
    );
    r = r.sort((a, b) => (sortBy === "popularity" ? b.popularity - a.popularity : a.costIndex - b.costIndex));
    return r;
  }, [debouncedQuery, region, costMax, sortBy]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.accentDeep }}>Explore</p>
        <h1 style={{ fontFamily: "Fraunces", color: T.ink }} className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Discover your next destination</h1>
        <p className="mt-2 max-w-lg text-[15px]" style={{ color: T.muted }}>Find cities that fit your trip, budget and interests.</p>
        <RouteLine className="mt-5" />

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} placeholder="Search cities..." />
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:hidden"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.inkSoft }}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className={`${showFilters ? "flex" : "hidden"} mt-3 flex-col gap-3 sm:mt-3 sm:flex sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => <Pill key={r} active={region === r} onClick={() => setRegion(r)}>{r}</Pill>)}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs" style={{ color: T.muted }}>
              <span>Cost ≤</span>
              <input type="range" min={1} max={3} value={costMax} onChange={(e) => setCostMax(Number(e.target.value))} className="w-20 accent-current" style={{ accentColor: T.accent }} />
              <span style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>{COST_SYMBOL[costMax]}</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg px-2.5 py-2 text-xs font-medium outline-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.inkSoft }}
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="cost">Sort: Cost</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {status === "loading" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}
        {status === "ready" && results.length === 0 && (
          <EmptyState title="No cities match yet" subtitle="Try a different search term, widen the cost range, or clear a filter." icon={Search} />
        )}
        {status === "ready" && results.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => <CityCard key={c.id} city={c} onAdd={(city) => openAddModal(city, "city")} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   SCREEN 2 — ACTIVITY DISCOVERY
   ============================================================ */
function ActivityScreen({ openAddModal }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [costMax, setCostMax] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState("loading");
  const debouncedQuery = useDebounced(query);

  useEffect(() => {
    setStatus("loading");
    const t = setTimeout(() => setStatus("ready"), 420);
    return () => clearTimeout(t);
  }, [debouncedQuery, category, costMax]);

  const results = useMemo(() => {
    return ACTIVITIES.filter((a) =>
      (category === "all" || a.category === category) &&
      a.costTier <= costMax &&
      (a.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || a.cityName.toLowerCase().includes(debouncedQuery.toLowerCase()))
    ).slice(0, 24);
  }, [debouncedQuery, category, costMax]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.positive }}>Activities</p>
        <h1 style={{ fontFamily: "Fraunces", color: T.ink }} className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Things to do</h1>
        <p className="mt-2 max-w-lg text-[15px]" style={{ color: T.muted }}>Turn every stop into an experience.</p>
        <RouteLine className="mt-5" />

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} placeholder="Search activities..." />
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:hidden"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.inkSoft }}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className={`${showFilters ? "flex" : "hidden"} mt-3 flex-col gap-3 sm:mt-3 sm:flex sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-wrap gap-2">
            <Pill active={category === "all"} onClick={() => setCategory("all")}>All</Pill>
            {ACTIVITY_CATEGORIES.map((c) => (
              <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)} icon={c.icon}>{c.label}</Pill>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: T.muted }}>
            <span>Cost ≤</span>
            <input type="range" min={1} max={3} value={costMax} onChange={(e) => setCostMax(Number(e.target.value))} className="w-20" style={{ accentColor: T.positive }} />
            <span style={{ fontFamily: "IBM Plex Mono", color: T.ink }}>{COST_SYMBOL[costMax]}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {status === "loading" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}
        {status === "ready" && results.length === 0 && (
          <EmptyState title="No activities found" subtitle="Try another category or raise the cost limit." icon={Compass} />
        )}
        {status === "ready" && results.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((a) => <ActivityCard key={a.id} activity={a} onAdd={(act) => openAddModal(act, "activity")} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   SCREEN 3 — BUDGET DASHBOARD
   ============================================================ */
function computeInsights(budget) {
  const total = budget.breakdown.reduce((s, b) => s + b.amount, 0);
  const avgDaily = total / budget.durationDays;
  const insights = [];

  const worstDay = budget.dailySpending.reduce((max, d) => (d.amount > max.amount ? d : max), budget.dailySpending[0]);
  const pctAboveAvg = Math.round(((worstDay.amount - avgDaily) / avgDaily) * 100);
  if (pctAboveAvg > 5) insights.push(`${worstDay.day} is ${pctAboveAvg}% above your daily average.`);

  const activities = budget.breakdown.find((b) => b.category === "Activities");
  if (activities) insights.push(`Activities account for ${Math.round((activities.amount / total) * 100)}% of your total budget.`);

  if (budget.budgetCap) {
    if (total <= budget.budgetCap) insights.push(`Your current trip is within the selected budget.`);
    else insights.push(`You're ${inr(total - budget.budgetCap)} over budget.`);
  }
  return { insights, total, avgDaily };
}

function BudgetScreen() {
  const [status, setStatus] = useState("loading");
  useEffect(() => { const t = setTimeout(() => setStatus("ready"), 500); return () => clearTimeout(t); }, []);

  const { insights, total, avgDaily } = useMemo(() => computeInsights(BUDGET), []);
  const overBudget = BUDGET.budgetCap && total > BUDGET.budgetCap;
  const capPct = BUDGET.budgetCap ? Math.round((total / BUDGET.budgetCap) * 100) : 0;

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="h-8 w-56 animate-pulse rounded" style={{ background: "#EFE9DD" }} />
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl" style={{ background: "#EFE9DD" }} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.accentDeep }}>Budget</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 style={{ fontFamily: "Fraunces", color: T.ink }} className="text-3xl font-semibold tracking-tight sm:text-4xl">{BUDGET.tripName}</h1>
          <p className="mt-1 flex items-center gap-3 text-sm" style={{ color: T.muted }}>
            <span className="flex items-center gap-1"><CalendarDays size={14} /> {BUDGET.durationDays} days</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {BUDGET.stopCount} cities</span>
          </p>
        </div>
      </div>

      {/* Total + cap */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl p-6" style={{ background: T.ink }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "#B9C0CB" }}>Total estimated cost</p>
          <p className="mt-2 text-4xl font-semibold" style={{ fontFamily: "IBM Plex Mono", color: "#fff" }}>{inr(total)}</p>
          <div className="mt-4 flex gap-5 text-xs" style={{ color: "#B9C0CB" }}>
            <div><p style={{ color: "#fff", fontFamily: "IBM Plex Mono" }} className="text-sm font-semibold">{inr(avgDaily)}</p><p>avg / day</p></div>
            <div><p style={{ color: "#fff", fontFamily: "IBM Plex Mono" }} className="text-sm font-semibold">{BUDGET.durationDays}</p><p>trip days</p></div>
            <div><p style={{ color: "#fff", fontFamily: "IBM Plex Mono" }} className="text-sm font-semibold">{BUDGET.stopCount}</p><p>stops</p></div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: overBudget ? T.warnTint : T.positiveTint, border: `1px solid ${overBudget ? "#F0C7C0" : "#CBE6DD"}` }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: overBudget ? T.warn : T.positive }}>Budget status</p>
            <FitRing value={capPct} size={38} stroke={4} color={overBudget ? T.warn : T.positive} trackColor="#fff" label={`${capPct}%`} />
          </div>
          <p className="mt-3 text-sm" style={{ color: T.inkSoft }}>Budget <span style={{ fontFamily: "IBM Plex Mono", fontWeight: 600 }}>{inr(BUDGET.budgetCap)}</span></p>
          <p className="text-sm" style={{ color: T.inkSoft }}>Estimated <span style={{ fontFamily: "IBM Plex Mono", fontWeight: 600 }}>{inr(total)}</span></p>
          <p className="mt-1 text-sm font-semibold" style={{ color: overBudget ? T.warn : T.positive }}>
            {overBudget ? `You're ${inr(total - BUDGET.budgetCap)} over budget.` : `Remaining ${inr(BUDGET.budgetCap - total)}`}
          </p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: T.muted }}>Budget insight</p>
          <ul className="mt-3 space-y-2.5">
            {insights.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: T.inkSoft }}>
                <TrendingUp size={14} className="mt-0.5 shrink-0" color={T.accent} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* breakdown + daily spending */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl p-6" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <h3 style={{ fontFamily: "Fraunces", color: T.ink }} className="text-lg font-semibold">Cost breakdown</h3>
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <div style={{ width: 180, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={BUDGET.breakdown} dataKey="amount" nameKey="category" innerRadius={52} outerRadius={78} paddingAngle={2}>
                    {BUDGET.breakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
                  </Pie>
                  <RTooltip formatter={(v) => inr(v)} contentStyle={{ borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "Inter", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {BUDGET.breakdown.map((b, i) => (
                <div key={b.category} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2" style={{ color: T.inkSoft }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    {b.category}
                  </span>
                  <span style={{ fontFamily: "IBM Plex Mono", color: T.ink }} className="font-medium">{inr(b.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <h3 style={{ fontFamily: "Fraunces", color: T.ink }} className="text-lg font-semibold">Daily spending</h3>
          <div className="mt-4" style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUDGET.dailySpending} margin={{ left: -20, right: 4 }}>
                <CartesianGrid vertical={false} stroke={T.border} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: T.muted }} axisLine={{ stroke: T.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: T.muted }} axisLine={false} tickLine={false} />
                <RTooltip formatter={(v) => inr(v)} contentStyle={{ borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "Inter", fontSize: 12 }} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {BUDGET.dailySpending.map((d, i) => (
                    <Cell key={i} fill={d.amount > avgDaily * 1.15 ? T.warn : T.accent} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function GlobeTrotterApp() {
  const [tab, setTab] = useState("explore");
  const [modalItem, setModalItem] = useState(null);
  const [modalKind, setModalKind] = useState("city");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const openAddModal = useCallback((item, kind) => { setModalItem(item); setModalKind(kind); }, []);
  const closeModal = useCallback(() => setModalItem(null), []);

  const handleConfirm = useCallback((payload) => {
    setModalItem(null);
    const msg = payload.activity_name
      ? `Added "${payload.activity_name}" to your day`
      : `Added ${payload.city_name} to your trip`;
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
    // Integration point for Person C's itinerary builder would be called here, e.g.:
    // itineraryService.addToStop(payload)
    console.log("gt:add-to-itinerary", payload);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "Inter" }}>
      <style>{`
        ${FONT_IMPORT}
        * { font-family: 'Inter', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @keyframes gt-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes gt-sheet-in { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes gt-toast-in { from { transform: translate(-50%, 12px); opacity: 0 } to { transform: translate(-50%, 0); opacity: 1 } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
        input[type="range"] { accent-color: ${T.accent}; }
      `}</style>

      <TopNav tab={tab} setTab={setTab} />

      {tab === "explore" && <ExploreScreen openAddModal={openAddModal} />}
      {tab === "activities" && <ActivityScreen openAddModal={openAddModal} />}
      {tab === "budget" && <BudgetScreen />}
      {(tab === "dashboard" || tab === "trips" || tab === "itinerary" || tab === "profile") && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <EmptyState
            title="Owned by another team member"
            subtitle="This section is built by another part of the team. Try Explore, Things to do, or Budget."
            icon={PlaneTakeoff}
          />
        </div>
      )}

      <AddToTripModal item={modalItem} kind={modalKind} onClose={closeModal} onConfirm={handleConfirm} />
      <Toast toast={toast} />
    </div>
  );
}
