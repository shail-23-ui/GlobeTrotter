/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const HERO_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80";

const DESTINATIONS = [
  {
    city: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    desc: "Temples, bamboo groves and quiet tea houses.",
    cost: "Moderate",
  },
  {
    city: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    desc: "Whitewashed cliffs over a sapphire caldera.",
    cost: "High",
  },
  {
    city: "Ubud",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    desc: "Rice terraces, jungle air and slow mornings.",
    cost: "Budget",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    img: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    desc: "Glaciers, geysers and endless summer light.",
    cost: "High",
  },
];

const INITIAL_TRIPS = [
  {
    id: "t1",
    name: "Japan in Bloom",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    start: "2026-10-02",
    end: "2026-10-14",
    stops: 4,
    budget: 3200,
    status: "upcoming",
  },
  {
    id: "t2",
    name: "Greek Island Hop",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    start: "2026-06-05",
    end: "2026-06-16",
    stops: 3,
    budget: 2650,
    status: "upcoming",
  },
  {
    id: "t3",
    name: "Bali Reset",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    start: "2025-03-10",
    end: "2025-03-20",
    stops: 2,
    budget: 1400,
    status: "past",
  },
];

/* ------------------------------------------------------------------ */
/*  GLOBAL APPLICATION STATE                                           */
/* ------------------------------------------------------------------ */

let currentView = "login";
let userName = "Amara";
let trips = [...INITIAL_TRIPS];
let selectedTrip = null;

// Public / shared-itinerary state (Condition #11 — Shared/Public Itinerary View)
let sharedTripData = null;   // decoded, public-safe trip payload currently being viewed via a "?share=" link
let sharedLinkInvalid = false; // true when a "?share=" param was present but couldn't be decoded
let shareModalTrip = null;   // the trip (from "My Trips" / Trip Detail) whose share options are open in a modal
let confirmDelete = null;
let toastTimer = null;
let mobileMenuOpen = false;
let isLoading = false;

// Search & Filter State for My Trips
let myTripsQuery = "";
let myTripsFilter = "all";

/* ------------------------------------------------------------------ */
/*  HELPER FUNCTIONS                                                  */
/* ------------------------------------------------------------------ */

const fmtRange = (start, end) => {
  const opts = { month: "short", day: "numeric" };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  const e = new Date(end).toLocaleDateString("en-US", {
    ...opts,
    year: "numeric",
  });
  return `${s} – ${e}`;
};

/* ------------------------------------------------------------------ */
/*  SHARED / PUBLIC ITINERARY — URL-SAFE ENCODING                      */
/* ------------------------------------------------------------------ */

// Converts standard base64 (which can contain +, / and =) into a
// URL-safe variant, so it can live inside a query string untouched.
function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str) {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

// Strips a trip down to only the fields that are safe to expose publicly.
// Never include auth tokens, passwords, or private profile data here.
function buildPublicTripPayload(trip) {
  return {
    id: trip.id,
    name: trip.name || "Untitled Trip",
    city: trip.city || "",
    country: trip.country || "",
    img: trip.img || HERO_IMG,
    start: trip.start || "",
    end: trip.end || "",
    stops: trip.stops || 1,
    travelers: trip.travelers || 1,
    budget: trip.budget || 0,
    dailyBudget: trip.dailyBudget || null,
    description: trip.desc || trip.description || "",
    itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : [],
    budgetBreakdown: trip.budgetBreakdown || null,
  };
}

function encodeShareData(trip) {
  const payload = buildPublicTripPayload(trip);
  return base64UrlEncode(encodeURIComponent(JSON.stringify(payload)));
}

// Returns the decoded public payload, or null if the link is invalid/corrupt.
function decodeShareData(encoded) {
  try {
    const json = decodeURIComponent(base64UrlDecode(encoded));
    const data = JSON.parse(json);
    if (!data || typeof data !== "object" || !data.name) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function buildPublicUrl(trip) {
  const encoded = encodeShareData(trip);
  const params = new URLSearchParams();
  params.set("share", encoded);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// The URL currently in the address bar if we're already viewing a shared
// link, otherwise (re)built from the payload we have in memory.
function currentPublicUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("share")) {
    return window.location.href;
  }
  if (sharedTripData) {
    return `${window.location.origin}${window.location.pathname}?share=${encodeShareData(sharedTripData)}`;
  }
  return window.location.href;
}

function notify(msg, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  const isError = type === "error";
  
  toastContainer.innerHTML = `
    <div className="gt-toast" style="
      position: fixed; bottom: 24px; right: 24px; z-index: 200;
      background: var(--navy); color: #fff; padding: 13px 18px;
      border-radius: 13px; display: flex; align-items: center; gap: 10px;
      box-shadow: 0 12px 32px rgba(19,42,70,0.28); max-width: 340px; font-size: 14px; font-weight: 500;
    ">
      <i data-lucide="${isError ? 'alert-circle' : 'check-circle-2'}" style="color: ${isError ? '#F08B7F' : '#5FD68C'}; flex-shrink: 0;"></i>
      <span>${msg}</span>
    </div>
  `;
  lucide.createIcons();

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastContainer.innerHTML = "";
  }, 3200);
}

function addTrip(newTrip) {
  trips = [newTrip, ...trips];
}

function updateTrip(updated) {
  trips = trips.map((x) => (x.id === updated.id ? { ...x, ...updated } : x));
}

function deleteTrip() {
  if (!confirmDelete) return;
  trips = trips.filter((x) => x.id !== confirmDelete.id);
  notify(`"${confirmDelete.name}" was deleted.`, "success");
  confirmDelete = null;
  renderModal();
  renderPage();
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION CONTROLLER                                              */
/* ------------------------------------------------------------------ */

function go(view) {
  currentView = view;
  mobileMenuOpen = false;

  if (view === "dashboard" || view === "my-trips") {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      renderPage();
    }, 650);
  }

  renderPage();
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}

function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  pages.forEach((p) => p.classList.remove("active"));
}

function showPage(pageId) {
  const p = document.getElementById(pageId);
  if (p) p.classList.add("active");
}

function renderPage() {
  renderNavbar();
  renderModal();
  hideAllPages();

  switch (currentView) {
    case "login":
      showPage("login-page");
      renderLogin();
      break;
    case "signup":
      showPage("signup-page");
      renderSignup();
      break;
    case "dashboard":
      showPage("dashboard-page");
      renderDashboard();
      break;
    case "create-trip":
      showPage("create-trip-page");
      renderCreateTrip();
      break;
    case "my-trips":
      showPage("my-trips-page");
      renderMyTrips();
      break;
    case "edit-trip":
      showPage("edit-trip-page");
      renderEditTrip();
      break;
    case "trip-detail":
      showPage("trip-detail-page");
      renderTripDetail();
      break;
    case "shared-itinerary":
      showPage("shared-itinerary-page");
      renderSharedItinerary();
      break;
  }

  lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/*  SHARED COMPONENTS (MODAL & NAVBAR)                                 */
/* ------------------------------------------------------------------ */

function renderLogo(dark = false) {
  return `
    <div style="display: flex; align-items: center; gap: 9px; cursor: pointer;" onclick="go('${currentView === 'login' || currentView === 'signup' ? 'login' : 'dashboard'}')">
      <div style="width: 34px; height: 34px; border-radius: 10px; background: ${dark ? 'var(--accent)' : 'var(--navy)'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i data-lucide="globe-2" style="color: ${dark ? '#132A46' : '#F5A524'};"></i>
      </div>
      <span class="gt-display" style="font-size: 19px; font-weight: 700; color: ${dark ? '#fff' : 'var(--navy)'};">
        GlobeTrotter
      </span>
    </div>
  `;
}

function renderRouteMotif(w = 260, h = 90, color = "#F5A524") {
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 260 90" fill="none">
      <path d="M8 70 C 60 10, 110 90, 160 30 S 240 10, 252 20" stroke="${color}" stroke-width="2" class="gt-route-dash" opacity="0.85" />
      <circle cx="8" cy="70" r="5" fill="${color}" />
      <circle cx="160" cy="30" r="4" fill="${color}" opacity="0.85" />
      <circle cx="252" cy="20" r="5" fill="${color}" />
    </svg>
  `;
}

function renderNavbar() {
  const container = document.getElementById("navbar-container");
  if (currentView === "login" || currentView === "signup" || currentView === "profile-setup") {
    container.innerHTML = "";
    return;
  }

  const links = [
    { key: "dashboard", label: "Dashboard", icon: "home" },
    { key: "my-trips", label: "My Trips", icon: "compass" },
    { key: "explore", label: "Explore", icon: "sparkles", comingSoon: true },
    { key: "profile", label: "Profile", icon: "user", comingSoon: true },
  ];

  container.innerHTML = `
    <div style="position: sticky; top: 0; z-index: 100; background: rgba(251,248,243,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line);">
      <div style="max-width: 1180px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;">
        ${renderLogo()}

        <div class="gt-hide-mobile" style="display: flex; gap: 4px;">
          ${links.map(l => `
            <div
              class="gt-nav-link ${currentView === l.key ? 'gt-nav-link-active' : ''}"
              style="${l.comingSoon ? 'opacity: 0.55;' : ''}"
              title="${l.comingSoon ? 'Coming soon' : ''}"
              onclick="handleNavClick('${l.key}', ${l.comingSoon || false})"
            >
              <i data-lucide="${l.icon}"></i> ${l.label}
            </div>
          `).join('')}
        </div>

        <div class="gt-hide-mobile" style="display: flex; align-items: center; gap: 14px;">
          <div
            style="width: 36px; height: 36px; border-radius: 50%; background: var(--navy); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13.5px; cursor: pointer;"
            title="${userName}"
          >
            ${userName.slice(0, 1).toUpperCase()}
          </div>
        </div>

        <div class="gt-hide-desktop" id="menu-toggle-btn" style="cursor: pointer; padding: 6px;">
          <i data-lucide="${mobileMenuOpen ? 'x' : 'menu'}"></i>
        </div>
      </div>

      ${mobileMenuOpen ? `
        <div class="gt-hide-desktop" style="padding: 4px 20px 16px; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--line);">
          ${links.map(l => `
            <div
              class="gt-nav-link ${currentView === l.key ? 'gt-nav-link-active' : ''}"
              style="${l.comingSoon ? 'opacity: 0.55;' : ''}"
              onclick="handleNavClick('${l.key}', ${l.comingSoon || false})"
            >
              <i data-lucide="${l.icon}"></i> ${l.label}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById("menu-toggle-btn")?.addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;
    renderNavbar();
    lucide.createIcons();
  });
}

function handleNavClick(key, comingSoon) {
  if (comingSoon) {
    notify(`${key.charAt(0).toUpperCase() + key.slice(1)} is coming soon.`, "error");
    return;
  }
  go(key);
}

function renderModal() {
  const container = document.getElementById("modal-container");

  if (!confirmDelete && !planModalOpen) {
    container.innerHTML = "";
    return;
  }

  if (planModalOpen && planDraft) {
    container.innerHTML = renderPlanModalHTML();
    document.getElementById("modal-bg").addEventListener("click", (e) => {
      if (e.target.id === "modal-bg") closePlanModal();
    });
    lucide.createIcons();
    return;
  }

  container.innerHTML = `
    <div class="gt-modal-bg" style="position: fixed; inset: 0; background: rgba(19,42,70,0.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px;" id="modal-bg">
      <div class="gt-modal-card gt-card" style="width: 380px; padding: 26px;">
        <div style="width: 42px; height: 42px; border-radius: 11px; background: var(--danger-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 14px;">
          <i data-lucide="trash-2" style="color: var(--danger);"></i>
        </div>
        <h3 class="gt-display" style="font-size: 18px; font-weight: 700; margin: 0 0 8px;">Delete this trip?</h3>
        <p style="font-size: 14px; color: var(--slate); line-height: 1.55; margin: 0 0 22px;">
          "${confirmDelete.name}" and its itinerary will be permanently removed. This can't be undone.
        </p>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="gt-btn gt-btn-ghost gt-btn-sm" id="modal-cancel-btn">Cancel</button>
          <button class="gt-btn gt-btn-sm" style="background: var(--danger); color: #fff;" id="modal-confirm-btn">Delete trip</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modal-bg").addEventListener("click", (e) => {
    if (e.target.id === "modal-bg") {
      confirmDelete = null;
      renderModal();
    }
  });

  document.getElementById("modal-cancel-btn").addEventListener("click", () => {
    confirmDelete = null;
    renderModal();
  });

  document.getElementById("modal-confirm-btn").addEventListener("click", deleteTrip);
}

/* ------------------------------------------------------------------ */
/*  10. LOGIN VIEW                                                     */
/* ------------------------------------------------------------------ */

function renderLogin() {
  const container = document.getElementById("login-page");
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex;">
      <div class="gt-hide-mobile" style="flex: 0 0 46%; position: relative; overflow: hidden;">
        <img src="${HERO_IMG}" alt="Mountain lake at golden hour" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(200deg, rgba(19,42,70,0.15) 10%, rgba(19,42,70,0.82) 90%);"></div>
        <div style="position: absolute; inset: 0; padding: 48px; display: flex; flex-direction: column; justify-content: space-between;">
          ${renderLogo(true)}
          <div>
            ${renderRouteMotif()}
            <h2 class="gt-display" style="color: #fff; font-size: 34px; font-weight: 700; line-height: 1.15; margin: 18px 0 10px; max-width: 380px;">
              Your journey, organized beautifully.
            </h2>
            <p style="color: rgba(255,255,255,0.72); font-size: 15px; max-width: 340px;">
              Every stop, every activity, every dollar — mapped out before you pack a bag.
            </p>
          </div>
        </div>
      </div>

      <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <div style="width: 100%; max-width: 380px;">
          <div class="gt-hide-desktop" style="margin-bottom: 30px;">${renderLogo()}</div>
          <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">Welcome back</h1>
          <p style="color: var(--slate); font-size: 14.5px; margin: 0 0 30px;">Log in to pick up where you left off.</p>

          <form id="login-form" novalidate>
            <div style="margin-bottom: 18px;">
              <label class="gt-label">Email</label>
              <div class="gt-input-wrap">
                <i data-lucide="mail" style="position: absolute; left: 14px; top: 14px; color: var(--slate-light);"></i>
                <input class="gt-input gt-input-icon-pad" id="login-email" type="email" placeholder="you@example.com" />
              </div>
              <div class="gt-error-text" id="login-email-error" style="display: none;"></div>
            </div>

            <div style="margin-bottom: 10px;">
              <label class="gt-label">Password</label>
              <div class="gt-input-wrap">
                <i data-lucide="lock" style="position: absolute; left: 14px; top: 14px; color: var(--slate-light);"></i>
                <input class="gt-input gt-input-icon-pad" id="login-password" type="password" placeholder="••••••••" />
              </div>
              <div class="gt-error-text" id="login-password-error" style="display: none;"></div>
            </div>

            <div style="text-align: right; margin-bottom: 22px;">
              <span style="font-size: 13px; color: var(--slate); cursor: pointer; font-weight: 500;" id="forgot-password">
                Forgot password?
              </span>
            </div>

            <button class="gt-btn gt-btn-primary" id="login-btn" type="submit" style="width: 100%;">
              Log in <i data-lucide="arrow-right"></i>
            </button>
          </form>

          <p style="text-align: center; font-size: 14px; color: var(--slate); margin-top: 26px;">
            New to GlobeTrotter?
            <span style="color: var(--navy); font-weight: 700; cursor: pointer;" onclick="go('signup')">
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("forgot-password").addEventListener("click", () => {
    notify("Password reset isn't wired up in this prototype.", "error");
  });

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const emailErr = document.getElementById("login-email-error");
    const passErr = document.getElementById("login-password-error");

    let hasErr = false;
    if (!email.trim()) {
      emailErr.style.display = "flex";
      emailErr.innerHTML = `<i data-lucide="alert-circle"></i> Enter your email address.`;
      document.getElementById("login-email").classList.add("gt-input-error");
      hasErr = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailErr.style.display = "flex";
      emailErr.innerHTML = `<i data-lucide="alert-circle"></i> That email doesn't look right.`;
      document.getElementById("login-email").classList.add("gt-input-error");
      hasErr = true;
    } else {
      emailErr.style.display = "none";
      document.getElementById("login-email").classList.remove("gt-input-error");
    }

    if (!password) {
      passErr.style.display = "flex";
      passErr.innerHTML = `<i data-lucide="alert-circle"></i> Enter your password.`;
      document.getElementById("login-password").classList.add("gt-input-error");
      hasErr = true;
    } else {
      passErr.style.display = "none";
      document.getElementById("login-password").classList.remove("gt-input-error");
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("login-btn");
    btn.disabled = true;
    btn.innerText = "Logging in…";

    setTimeout(() => {
      userName = email.split("@")[0].replace(/[^a-zA-Z]/g, "") || "Traveler";
      notify("Welcome back! Good to see you.", "success");
      go("dashboard");
    }, 700);
  });
}

/* ------------------------------------------------------------------ */
/*  11. SIGNUP VIEW                                                    */
/* ------------------------------------------------------------------ */

function renderSignup() {
  const container = document.getElementById("signup-page");
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: var(--cream);">
      <div class="gt-card" style="width: 100%; max-width: 440px; padding: 38px 36px;">
        <div style="margin-bottom: 26px;">${renderLogo()}</div>
        <h1 class="gt-display" style="font-size: 26px; font-weight: 700; margin: 0 0 6px;">Create your account</h1>
        <p style="color: var(--slate); font-size: 14.5px; margin: 0 0 26px;">Start planning trips that actually fit your budget.</p>

        <form id="signup-form" novalidate>
          <div style="margin-bottom: 16px;">
            <label class="gt-label">Full name</label>
            <input class="gt-input" id="signup-name" placeholder="Amara Okafor" />
            <div class="gt-error-text" id="signup-name-error" style="display: none;"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <label class="gt-label">Email</label>
            <input class="gt-input" id="signup-email" type="email" placeholder="you@example.com" />
            <div class="gt-error-text" id="signup-email-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <div style="flex: 1;">
              <label class="gt-label">Password</label>
              <input class="gt-input" id="signup-password" type="password" placeholder="8+ characters" />
            </div>
            <div style="flex: 1;">
              <label class="gt-label">Confirm</label>
              <input class="gt-input" id="signup-confirm" type="password" placeholder="Repeat it" />
            </div>
          </div>
          <div class="gt-error-text" id="signup-password-error" style="display: none; margin-top: -8px; margin-bottom: 14px;"></div>

          <button class="gt-btn gt-btn-primary" id="signup-btn" type="submit" style="width: 100%; margin-top: 6px;">
            Create account <i data-lucide="arrow-right"></i>
          </button>
        </form>

        <p style="text-align: center; font-size: 14px; color: var(--slate); margin-top: 22px;">
          Already have an account?
          <span style="color: var(--navy); font-weight: 700; cursor: pointer;" onclick="go('login')">Log in</span>
        </p>
      </div>
    </div>
  `;

  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("signup-name-error").style.display = "flex";
      document.getElementById("signup-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Enter your full name.`;
      document.getElementById("signup-name").classList.add("gt-input-error");
      hasErr = true;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("signup-email-error").style.display = "flex";
      document.getElementById("signup-email-error").innerHTML = `<i data-lucide="alert-circle"></i> Enter a valid email address.`;
      document.getElementById("signup-email").classList.add("gt-input-error");
      hasErr = true;
    }

    if (password.length < 8) {
      document.getElementById("signup-password-error").style.display = "flex";
      document.getElementById("signup-password-error").innerHTML = `<i data-lucide="alert-circle"></i> Use at least 8 characters.`;
      document.getElementById("signup-password").classList.add("gt-input-error");
      hasErr = true;
    } else if (confirm !== password || !confirm) {
      document.getElementById("signup-password-error").style.display = "flex";
      document.getElementById("signup-password-error").innerHTML = `<i data-lucide="alert-circle"></i> Passwords don't match.`;
      document.getElementById("signup-confirm").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("signup-btn");
    btn.disabled = true;
    btn.innerText = "Creating account…";

    setTimeout(() => {
      userName = name.split(" ")[0];
      notify("Account created — let's plan a trip.", "success");
      go("dashboard");
    }, 700);
  });
}

/* ------------------------------------------------------------------ */
/*  12. DASHBOARD VIEW                                                 */
/* ------------------------------------------------------------------ */

function renderTripCardHTML(trip, isDashboard = false) {
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden; min-width: 300px; flex: 0 0 300px;">
      <div style="position: relative; height: 150px;">
        <img src="${trip.img}" alt="${trip.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.85); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px; text-transform: capitalize;
        ">
          ${trip.status}
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 8px;">${trip.name}</h4>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(trip.start, trip.end)}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="map-pin"></i> ${trip.stops} destination${trip.stops !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> $${trip.budget.toLocaleString()} estimated
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${trip.id}')">
            <i data-lucide="eye"></i> View
          </button>
          <button class="gt-btn gt-btn-ghost gt-btn-icon" onclick="editTrip('${trip.id}')" title="Edit">
            <i data-lucide="pencil"></i>
          </button>
          <button class="gt-btn gt-btn-ghost gt-btn-icon" onclick="openShareModal('${trip.id}')" title="Share">
            <i data-lucide="share-2"></i>
          </button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-icon" onclick="requestDeleteTrip('${trip.id}')" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSkeletonCardHTML(h = 230) {
  return `
    <div class="gt-card" style="overflow: hidden;">
      <div class="gt-skel" style="height: ${h * 0.55}px; border-radius: 0;"></div>
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
        <div class="gt-skel" style="height: 16px; width: 70%;"></div>
        <div class="gt-skel" style="height: 12px; width: 45%;"></div>
        <div class="gt-skel" style="height: 12px; width: 55%;"></div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const container = document.getElementById("dashboard-page");
  const upcoming = trips.filter((t) => t.status === "upcoming");
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalDays = trips.reduce((s, t) => {
    const d = (new Date(t.end) - new Date(t.start)) / 86400000;
    return s + Math.max(d, 1);
  }, 0);
  const avgDaily = totalDays ? Math.round(totalBudget / totalDays) : 0;

  container.innerHTML = `
    <div style="max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 34px;">
        <div>
          <h1 class="gt-display" style="font-size: 30px; font-weight: 700; margin: 0 0 6px;">
            Good morning, ${userName} 👋
          </h1>
          <p style="color: var(--slate); font-size: 15.5px; margin: 0;">Where are you going next?</p>
        </div>
        <button class="gt-btn gt-btn-primary" onclick="go('create-trip')">
          <i data-lucide="plus"></i> Plan New Trip
        </button>
      </div>

      <!-- Upcoming Trips -->
      <section style="margin-bottom: 44px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0;">Upcoming trips</h2>
          <span style="font-size: 13.5px; font-weight: 600; color: var(--accent-dark); cursor: pointer; display: flex; align-items: center; gap: 4px;" onclick="go('my-trips')">
            View all <i data-lucide="chevron-right"></i>
          </span>
        </div>
        <div class="gt-scrollbar-none" style="display: flex; gap: 18px; overflow-x: auto; padding-bottom: 8px;">
          ${isLoading
            ? [1, 2, 3].map(() => `<div style="min-width: 300px; flex: 0 0 300px;">${renderSkeletonCardHTML()}</div>`).join('')
            : upcoming.length
            ? upcoming.map((t) => renderTripCardHTML(t, true)).join('')
            : `
              <div class="gt-card" style="padding: 26px; flex: 1; text-align: center; color: var(--slate); font-size: 14px;">
                No upcoming trips yet. Plan your first one!
              </div>
            `}
        </div>
      </section>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;" class="gt-dash-grid">
        <!-- Recommended Destinations -->
        <section>
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Recommended destinations</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${isLoading
              ? [1, 2, 3, 4].map(() => renderSkeletonCardHTML(190)).join('')
              : DESTINATIONS.map((d) => `
                  <div class="gt-dest-card" style="height: 190px;">
                    <img src="${d.img}" alt="${d.city}" style="width: 100%; height: 100%; object-fit: cover;" />
                    <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(19,42,70,0.88) 0%, rgba(19,42,70,0.1) 55%);"></div>
                    <div style="position: absolute; left: 14px; right: 14px; bottom: 12px; color: #fff;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                          <div class="gt-display" style="font-size: 16.5px; font-weight: 700;">${d.city}</div>
                          <div style="font-size: 12px; opacity: 0.85;">${d.country} · ${d.cost}</div>
                        </div>
                        <button class="gt-btn gt-btn-soft gt-btn-sm" onclick="notify('${d.city} added to your explore list.', 'success')">
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
          </div>
        </section>

        <!-- Budget Highlights -->
        <section>
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget highlights</h2>
          <div class="gt-card" style="padding: 22px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center;">
                <i data-lucide="trending-up" style="color: var(--accent-dark);"></i>
              </div>
              <div>
                <div style="font-size: 12.5px; color: var(--slate);">Total planned spend</div>
                <div class="gt-display" style="font-size: 21px; font-weight: 700;">
                  ${isLoading ? "—" : `$${totalBudget.toLocaleString()}`}
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13.5px; margin-bottom: 8px;">
              <span style="color: var(--slate);">Average per day</span>
              <span style="font-weight: 700;">${isLoading ? "—" : `$${avgDaily}`}</span>
            </div>
            <div style="height: 8px; border-radius: 999px; background: var(--accent-soft); overflow: hidden; margin-bottom: 6px;">
              <div style="width: 64%; height: 100%; background: var(--accent);"></div>
            </div>
            <div style="font-size: 12px; color: var(--slate-light);">64% of your typical monthly travel budget</div>
          </div>
        </section>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  13. CREATE TRIP VIEW                                              */
/* ------------------------------------------------------------------ */

function renderCreateTrip() {
  const container = document.getElementById("create-trip-page");
  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 48px 24px 80px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">Plan a new trip</h1>
        <p style="color: var(--slate); font-size: 15px;">Start with the basics — you can add stops and activities next.</p>
      </div>

      <div class="gt-card" style="padding: 34px 32px;">
        <form id="create-trip-form" novalidate>
          <div style="margin-bottom: 18px;">
            <label class="gt-label">Trip name</label>
            <input class="gt-input" id="create-trip-name" placeholder="e.g. Japan in Bloom" />
            <div class="gt-error-text" id="create-name-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 18px;">
            <div style="flex: 1;">
              <label class="gt-label">Start date</label>
              <input class="gt-input" id="create-trip-start" type="date" />
              <div class="gt-error-text" id="create-start-error" style="display: none;"></div>
            </div>
            <div style="flex: 1;">
              <label class="gt-label">End date</label>
              <input class="gt-input" id="create-trip-end" type="date" />
              <div class="gt-error-text" id="create-end-error" style="display: none;"></div>
            </div>
          </div>

          <div style="margin-bottom: 18px;">
            <label class="gt-label">Description</label>
            <textarea
              class="gt-input" id="create-trip-desc" rows="4" placeholder="What's this trip about?"
              style="resize: vertical; font-family: Inter, sans-serif;"
            ></textarea>
          </div>

          <div style="margin-bottom: 26px;">
            <label class="gt-label">Cover photo (optional)</label>
            <div style="
              border: 1.5px dashed var(--line); border-radius: 12px; padding: 22px 16px;
              display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--slate);
              cursor: pointer; background: #FCFAF6;
            ">
              <i data-lucide="image-plus" style="color: var(--slate-light);"></i>
              <span style="font-size: 13px;">Click to upload, or drag an image here</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button type="button" class="gt-btn gt-btn-ghost" style="flex: 1;" onclick="go('dashboard')">Cancel</button>
            <button type="submit" class="gt-btn gt-btn-primary" id="create-trip-submit" style="flex: 2;">
              Create trip <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("create-trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("create-trip-name").value;
    const start = document.getElementById("create-trip-start").value;
    const end = document.getElementById("create-trip-end").value;
    const desc = document.getElementById("create-trip-desc").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("create-name-error").style.display = "flex";
      document.getElementById("create-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Give your trip a name.`;
      document.getElementById("create-trip-name").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!start) {
      document.getElementById("create-start-error").style.display = "flex";
      document.getElementById("create-start-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick a start date.`;
      document.getElementById("create-trip-start").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!end) {
      document.getElementById("create-end-error").style.display = "flex";
      document.getElementById("create-end-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick an end date.`;
      document.getElementById("create-trip-end").classList.add("gt-input-error");
      hasErr = true;
    } else if (start && end && new Date(end) < new Date(start)) {
      document.getElementById("create-end-error").style.display = "flex";
      document.getElementById("create-end-error").innerHTML = `<i data-lucide="alert-circle"></i> End date can't be before the start date.`;
      document.getElementById("create-trip-end").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("create-trip-submit");
    btn.disabled = true;
    btn.innerText = "Creating…";

    setTimeout(() => {
      addTrip({
        id: "t" + Date.now(),
        name,
        img: DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)].img,
        start,
        end,
        desc,
        stops: 1,
        budget: 0,
        status: new Date(start) >= new Date() ? "upcoming" : "past",
      });
      notify("Trip created. Time to add stops!", "success");
      go("my-trips");
    }, 600);
  });
}

/* ------------------------------------------------------------------ */
/*  14. MY TRIPS VIEW                                                 */
/* ------------------------------------------------------------------ */

function renderMyTrips() {
  const container = document.getElementById("my-trips-page");

  const filtered = trips.filter((t) => {
    const matchesQuery = t.name.toLowerCase().includes(myTripsQuery.toLowerCase());
    const matchesFilter = myTripsFilter === "all" || t.status === myTripsFilter;
    return matchesQuery && matchesFilter;
  });

  container.innerHTML = `
    <div style="max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 18px; margin-bottom: 26px;">
        <div>
          <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">My Trips</h1>
          <p style="color: var(--slate); font-size: 15px;">All your adventures in one place.</p>
        </div>
        <button class="gt-btn gt-btn-primary" onclick="go('create-trip')">
          <i data-lucide="plus"></i> Plan New Trip
        </button>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px;">
        <div class="gt-input-wrap" style="flex: 1 1 240px;">
          <i data-lucide="search" style="position: absolute; left: 14px; top: 13px; color: var(--slate-light);"></i>
          <input class="gt-input gt-input-icon-pad" id="my-trips-search" placeholder="Search trips…" value="${myTripsQuery}" />
        </div>
        <div style="display: flex; gap: 6px; background: #F2EEE4; border-radius: 11px; padding: 4px;">
          ${[
            { key: "all", label: "All" },
            { key: "upcoming", label: "Upcoming" },
            { key: "past", label: "Past" },
          ].map((f) => `
            <div
              onclick="setMyTripsFilter('${f.key}')"
              style="
                padding: 8px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer;
                background: ${myTripsFilter === f.key ? 'var(--white)' : 'transparent'};
                color: ${myTripsFilter === f.key ? 'var(--navy)' : 'var(--slate)'};
                box-shadow: ${myTripsFilter === f.key ? '0 1px 3px rgba(19,42,70,0.08)' : 'none'};
              "
            >
              ${f.label}
            </div>
          `).join('')}
        </div>
      </div>

      ${isLoading ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${[1, 2, 3].map(() => renderSkeletonCardHTML()).join('')}
        </div>
      ` : trips.length === 0 ? `
        <div style="text-align: center; padding: 70px 20px;">
          <svg width="150" height="110" viewBox="0 0 150 110" fill="none" style="margin: 0 auto 22px;">
            <ellipse cx="75" cy="98" rx="55" ry="8" fill="#EFE8D8" />
            <circle cx="75" cy="46" r="38" fill="#FDECC8" />
            <path d="M75 46 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0" stroke="#F5A524" stroke-width="2" class="gt-route-dash" />
            <circle cx="75" cy="46" r="5" fill="var(--navy)" />
            <path d="M40 30 C 55 15, 95 15, 110 30" stroke="var(--navy)" stroke-width="2" class="gt-route-dash" opacity="0.5" />
            <circle cx="40" cy="30" r="3.5" fill="var(--accent-dark)" />
            <circle cx="110" cy="30" r="3.5" fill="var(--accent-dark)" />
          </svg>
          <h3 class="gt-display" style="font-size: 20px; font-weight: 700; margin: 0 0 8px;">No trips yet</h3>
          <p style="color: var(--slate); font-size: 14.5px; max-width: 320px; margin: 0 auto 22px;">
            Plan your first adventure and start building your itinerary.
          </p>
          <button class="gt-btn gt-btn-primary" onclick="go('create-trip')">
            <i data-lucide="plus"></i> Plan New Trip
          </button>
        </div>
      ` : filtered.length === 0 ? `
        <div style="text-align: center; padding: 60px 20px; color: var(--slate);">
          <i data-lucide="search" style="margin-bottom: 10px; color: var(--slate-light);"></i>
          <p style="font-size: 14.5px;">No trips match "${myTripsQuery}".</p>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${filtered.map((t) => renderTripCardHTML(t)).join('')}
        </div>
      `}
    </div>
  `;

  document.getElementById("my-trips-search")?.addEventListener("input", (e) => {
    myTripsQuery = e.target.value;
    renderMyTrips();
    lucide.createIcons();
  });

  document.getElementById("my-trips-sort")?.addEventListener("change", (e) => {
    myTripsSort = e.target.value;
    renderMyTrips();
    lucide.createIcons();
  });
}

function renderExploringTripCardHTML(t) {
  const days = tripDurationDays(t);
  const progress = tripProgress(t);
  const activities = tripActivitiesCount(t);
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden;">
      <div style="position: relative; height: 150px;">
        <img src="${t.img}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.85); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px; text-transform: capitalize;
        ">
          ${t.status === "planning" ? "Planning" : "Upcoming"}
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 2px;">${t.name}</h4>
        <p style="font-size: 12.5px; color: var(--slate); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(t.start, t.end)} · ${days} day${days !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="users"></i> ${t.travelers || 1} traveler${(t.travelers || 1) !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> ${formatINR(t.budget)} · ${formatINR(Math.round(t.budget / days))}/day
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="list-checks"></i> ${activities} activities
          </span>
        </div>
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--slate); margin-bottom: 5px;">
            <span>Planning progress</span><span>${progress}%</span>
          </div>
          <div class="gt-bar-track-sm"><div class="gt-bar-fill" style="width: ${progress}%; background: var(--accent);"></div></div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${t.id}')">
            <i data-lucide="eye"></i> View Trip
          </button>
          <button class="gt-btn gt-btn-ghost gt-btn-icon" onclick="editTrip('${t.id}')" title="Edit">
            <i data-lucide="pencil"></i>
          </button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-icon" onclick="requestDeleteTrip('${t.id}')" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderPastTripCardHTML(t) {
  const days = tripDurationDays(t);
  const activities = tripActivitiesCount(t);
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden;">
      <div style="position: relative; height: 150px;">
        <img src="${t.img}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85);" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.7); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px;
        ">
          Completed
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 2px;">${t.name}</h4>
        <p style="font-size: 12.5px; color: var(--slate); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(t.start, t.end)} · ${days} days
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> Total spent: ${formatINR(t.budget)}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="list-checks"></i> ${activities} activities completed
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${t.id}')">
            <i data-lucide="eye"></i> View Trip
          </button>
          <button class="gt-btn gt-btn-soft gt-btn-sm" onclick="planAgain('${t.id}')" title="Plan Again">
            <i data-lucide="repeat"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function setMyTripsFilter(filter) {
  myTripsFilter = filter;
  renderMyTrips();
  lucide.createIcons();
}

function viewTripDetail(tripId) {
  selectedTrip = trips.find((t) => t.id === tripId);
  go("trip-detail");
}

function editTrip(tripId) {
  selectedTrip = trips.find((t) => t.id === tripId);
  go("edit-trip");
}

function requestDeleteTrip(tripId) {
  confirmDelete = trips.find((t) => t.id === tripId);
  renderModal();
  lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/*  15. EDIT TRIP VIEW                                                 */
/* ------------------------------------------------------------------ */

function renderEditTrip() {
  const container = document.getElementById("edit-trip-page");

  if (!selectedTrip) {
    container.innerHTML = `
      <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
        <p style="color: var(--slate); font-size: 15px; margin-bottom: 18px;">No trip selected to edit.</p>
        <button class="gt-btn gt-btn-primary" onclick="go('my-trips')">Back to My Trips</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 48px 24px 80px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">Edit trip</h1>
        <p style="color: var(--slate); font-size: 15px;">Update the basics for "${selectedTrip.name}".</p>
      </div>

      <div class="gt-card" style="padding: 34px 32px;">
        <form id="edit-trip-form" novalidate>
          <div style="margin-bottom: 18px;">
            <label class="gt-label">Trip name</label>
            <input class="gt-input" id="edit-trip-name" value="${selectedTrip.name}" placeholder="e.g. Japan in Bloom" />
            <div class="gt-error-text" id="edit-name-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 18px;">
            <div style="flex: 1;">
              <label class="gt-label">Start date</label>
              <input class="gt-input" id="edit-trip-start" type="date" value="${selectedTrip.start}" />
              <div class="gt-error-text" id="edit-start-error" style="display: none;"></div>
            </div>
            <div style="flex: 1;">
              <label class="gt-label">End date</label>
              <input class="gt-input" id="edit-trip-end" type="date" value="${selectedTrip.end}" />
              <div class="gt-error-text" id="edit-end-error" style="display: none;"></div>
            </div>
          </div>

          <div style="margin-bottom: 26px;">
            <label class="gt-label">Description</label>
            <textarea
              class="gt-input" id="edit-trip-desc" rows="4" placeholder="What's this trip about?"
              style="resize: vertical; font-family: Inter, sans-serif;"
            >${selectedTrip.desc || ""}</textarea>
          </div>

          <div style="display: flex; gap: 10px;">
            <button type="button" class="gt-btn gt-btn-ghost" style="flex: 1;" onclick="go('my-trips')">Cancel</button>
            <button type="submit" class="gt-btn gt-btn-primary" id="edit-trip-submit" style="flex: 2;">
              Save changes <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("edit-trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("edit-trip-name").value;
    const start = document.getElementById("edit-trip-start").value;
    const end = document.getElementById("edit-trip-end").value;
    const desc = document.getElementById("edit-trip-desc").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("edit-name-error").style.display = "flex";
      document.getElementById("edit-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Give your trip a name.`;
      document.getElementById("edit-trip-name").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!start) {
      document.getElementById("edit-start-error").style.display = "flex";
      document.getElementById("edit-start-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick a start date.`;
      document.getElementById("edit-trip-start").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!end) {
      document.getElementById("edit-end-error").style.display = "flex";
      document.getElementById("edit-end-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick an end date.`;
      document.getElementById("edit-trip-end").classList.add("gt-input-error");
      hasErr = true;
    } else if (start && end && new Date(end) < new Date(start)) {
      document.getElementById("edit-end-error").style.display = "flex";
      document.getElementById("edit-end-error").innerHTML = `<i data-lucide="alert-circle"></i> End date can't be before the start date.`;
      document.getElementById("edit-trip-end").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("edit-trip-submit");
    btn.disabled = true;
    btn.innerText = "Saving…";

    setTimeout(() => {
      updateTrip({
        ...selectedTrip,
        name,
        start,
        end,
        desc,
        status: new Date(start) >= new Date() ? "upcoming" : "past",
      });
      notify("Trip updated.", "success");
      go("my-trips");
    }, 500);
  });
}

/* ------------------------------------------------------------------ */
/*  TRIP DETAIL VIEW                                                   */
/* ------------------------------------------------------------------ */

function renderTripDetail() {
  const container = document.getElementById("trip-detail-page");
  const t = selectedTrip;

  if (!t) {
    container.innerHTML = `
      <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
        <div class="gt-card" style="padding: 44px 32px;">
          ${renderRouteMotif(220, 78)}
          <h1 class="gt-display" style="font-size: 24px; font-weight: 700; margin: 18px 0 8px;">No trip selected</h1>
          <button class="gt-btn gt-btn-primary" onclick="go('my-trips')">Back to My Trips</button>
        </div>
      </div>
    `;
    return;
  }

  const days = tripDurationDays(t);
  const activities = tripActivitiesCount(t);
  const dailyBudget = t.dailyBudget || Math.round(t.budget / days);
  const hasItinerary = Array.isArray(t.itinerary) && t.itinerary.length > 0;
  const breakdown = t.budgetBreakdown;

  container.innerHTML = `
    <div style="max-width: 860px; margin: 0 auto; padding: 24px 24px 80px;">
      <div style="display: flex; align-items: center; gap: 6px; color: var(--slate); font-size: 13.5px; font-weight: 600; cursor: pointer; margin-bottom: 18px;" onclick="go('my-trips')">
        <i data-lucide="arrow-left"></i> Back to My Trips
      </div>

      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 22px;">
        <div>
          <h1 class="gt-display" style="font-size: 27px; font-weight: 700; margin: 0 0 6px;">${t.name}</h1>
          <p style="color: var(--slate); font-size: 14.5px; margin: 0;">
            ${t.city ? `${t.city}${t.country ? ", " + t.country : ""}` : ""} · ${fmtRange(t.start, t.end)}
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-ghost gt-btn-sm" onclick="editTrip('${t.id}')"><i data-lucide="pencil"></i> Edit</button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-sm" onclick="requestDeleteTrip('${t.id}')"><i data-lucide="trash-2"></i> Delete</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 28px;">
        ${[
          [`${days} Days`, "calendar-days"],
          [`${t.travelers || 1} Traveler${(t.travelers || 1) !== 1 ? "s" : ""}`, "users"],
          [`${activities} Activities`, "list-checks"],
          [`${formatINR(t.budget)} Budget`, "wallet"],
          [`${formatINR(dailyBudget)}/day`, "trending-up"],
        ].map(([label, icon]) => `
          <div class="gt-card" style="padding: 16px; text-align: center;">
            <i data-lucide="${icon}" style="color: var(--accent-dark); margin-bottom: 6px;"></i>
            <div class="gt-display" style="font-size: 14.5px; font-weight: 700;">${label}</div>
          </div>
        `).join('')}
      </div>

      ${hasItinerary ? `
        <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Daily Itinerary</h2>
        <div class="gt-timeline" style="margin-bottom: 32px;">
          ${t.itinerary.map((day) => `
            <div style="position: relative; margin-bottom: 26px;">
              <div class="gt-timeline-dot"></div>
              <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0 0 12px;">Day ${day.day} — ${day.title}</h4>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;">
                ${day.activities.map((a) => `
                  <div class="gt-card" style="padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <i data-lucide="${TIMELINE_ICONS[a.category] || "map-pin"}" style="color: var(--accent-dark); width: 17px; height: 17px;"></i>
                      <div>
                        <div style="font-size: 11px; font-weight: 700; color: var(--slate); text-transform: uppercase;">${a.time}</div>
                        <div style="font-size: 14px; font-weight: 600;">${a.name}</div>
                      </div>
                    </div>
                    <span style="font-size: 12.5px; color: var(--slate);">${a.cost ? formatINR(a.cost) : "Free"}</span>
                  </div>
                `).join('')}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: var(--accent-dark);">Daily cost: ${formatINR(day.dailyCost)}</div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="gt-card" style="padding: 30px; text-align: center; color: var(--slate); margin-bottom: 28px;">
          No day-by-day itinerary yet for this trip.
        </div>
      `}

      ${breakdown ? `
        <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget Breakdown</h2>
        <div class="gt-card" style="padding: 22px;">
          ${renderBudgetBarsHTML(breakdown, t.budget)}
          <div style="display: flex; justify-content: space-between; font-size: 14.5px; font-weight: 700; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line);">
            <span>Total</span><span>${formatINR(t.budget)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--slate); margin-top: 4px;">
            <span>Daily average</span><span>${formatINR(dailyBudget)}</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  19. BUDGET PAGE                                                    */
/* ------------------------------------------------------------------ */

function renderBudget() {
  const container = document.getElementById("budget-page");

  const totalPlanned = trips.reduce((s, t) => s + (t.budget || 0), 0);
  const upcomingBudget = trips.filter((t) => t.status !== "past").reduce((s, t) => s + (t.budget || 0), 0);
  const pastBudget = trips.filter((t) => t.status === "past").reduce((s, t) => s + (t.budget || 0), 0);
  const totalDays = trips.reduce((s, t) => s + tripDurationDays(t), 0);
  const avgDaily = totalDays ? Math.round(totalPlanned / totalDays) : 0;

  container.innerHTML = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">Travel Budget</h1>
        <p style="color: var(--slate); font-size: 15px;">Track and plan every rupee of your adventures.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 36px;">
        ${[
          ["Total Planned", formatINR(totalPlanned), "wallet", "var(--navy)"],
          ["Upcoming Budget", formatINR(upcomingBudget), "plane", "var(--accent-dark)"],
          ["Past Trips", formatINR(pastBudget), "check-circle-2", "var(--success)"],
          ["Average Daily Cost", formatINR(avgDaily), "trending-up", "var(--slate)"],
        ].map(([label, val, icon, color]) => `
          <div class="gt-card" style="padding: 20px;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              <i data-lucide="${icon}" style="color: ${color};"></i>
            </div>
            <div style="font-size: 12px; color: var(--slate); margin-bottom: 4px;">${label}</div>
            <div class="gt-display" style="font-size: 19px; font-weight: 700;">${val}</div>
          </div>
        `).join('')}
      </div>

      <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget by Trip</h2>
      ${trips.length === 0 ? `
        <div class="gt-card" style="padding: 30px; text-align: center; color: var(--slate); margin-bottom: 36px;">
          No trips yet — plan one from Explore to see its budget here.
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; margin-bottom: 40px;">
          ${trips.map((t) => `
            <div class="gt-card" style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0;">${t.name}</h4>
                <span style="font-size: 13px; font-weight: 700; color: var(--accent-dark);">${formatINR(t.budget)}</span>
              </div>
              <p style="font-size: 12px; color: var(--slate-light); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
              ${t.budgetBreakdown ? renderBudgetBarsHTML(t.budgetBreakdown, t.budget) : `<p style="font-size: 13px; color: var(--slate);">No breakdown available.</p>`}
            </div>
          `).join('')}
        </div>
      `}

      <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget Calculator</h2>
      <div class="gt-card" style="padding: 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div>
            <label class="gt-label">Destination</label>
            <select id="calc-destination" class="gt-input">
              <option value="">Custom / none</option>
              ${EXPLORE_DESTINATIONS.map((d) => `<option value="${d.id}" ${budgetCalc.destination === d.id ? "selected" : ""}>${d.city}, ${d.country}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="gt-label">Travelers</label>
            <input class="gt-input" id="calc-travelers" type="number" min="1" value="${budgetCalc.travelers}" />
          </div>
          <div>
            <label class="gt-label">Number of days</label>
            <input class="gt-input" id="calc-days" type="number" min="1" value="${budgetCalc.days}" />
          </div>
          <div>
            <label class="gt-label">Accommodation budget</label>
            <input class="gt-input" id="calc-accommodation" type="number" min="0" step="500" value="${budgetCalc.accommodation}" />
          </div>
          <div>
            <label class="gt-label">Food budget / day</label>
            <input class="gt-input" id="calc-food" type="number" min="0" step="100" value="${budgetCalc.foodPerDay}" />
          </div>
          <div>
            <label class="gt-label">Transportation</label>
            <input class="gt-input" id="calc-transport" type="number" min="0" step="500" value="${budgetCalc.transportation}" />
          </div>
          <div>
            <label class="gt-label">Activities / day</label>
            <input class="gt-input" id="calc-activities" type="number" min="0" step="100" value="${budgetCalc.activitiesPerDay}" />
          </div>
          <div>
            <label class="gt-label">Miscellaneous</label>
            <input class="gt-input" id="calc-misc" type="number" min="0" step="100" value="${budgetCalc.misc}" />
          </div>
          <div>
            <label class="gt-label">Your planned budget (optional)</label>
            <input class="gt-input" id="calc-limit" type="number" min="0" step="1000" value="${budgetCalc.limit}" />
          </div>
        </div>
        <div id="calc-results"></div>
      </div>
    </div>
  `;

  document.getElementById("calc-destination")?.addEventListener("change", (e) => {
    budgetCalc.destination = e.target.value;
    const dest = EXPLORE_DESTINATIONS.find((d) => d.id === e.target.value);
    if (dest) {
      budgetCalc.accommodation = Math.round(dest.dailyBudget * 0.45 * budgetCalc.days);
      budgetCalc.foodPerDay = Math.round(dest.dailyBudget * 0.3);
      budgetCalc.transportation = Math.round(dest.startingBudget * 0.3);
      budgetCalc.activitiesPerDay = Math.round(dest.dailyBudget * 0.2);
    }
    renderBudget();
    lucide.createIcons();
  });

  ["travelers", "days", "accommodation", "food", "transport", "activities", "misc", "limit"].forEach((field) => {
    document.getElementById(`calc-${field}`)?.addEventListener("input", updateBudgetCalcField);
  });

  renderBudgetCalcResults();
}

function updateBudgetCalcField() {
  budgetCalc.travelers = Math.max(1, parseInt(document.getElementById("calc-travelers").value) || 1);
  budgetCalc.days = Math.max(1, parseInt(document.getElementById("calc-days").value) || 1);
  budgetCalc.accommodation = Math.max(0, parseInt(document.getElementById("calc-accommodation").value) || 0);
  budgetCalc.foodPerDay = Math.max(0, parseInt(document.getElementById("calc-food").value) || 0);
  budgetCalc.transportation = Math.max(0, parseInt(document.getElementById("calc-transport").value) || 0);
  budgetCalc.activitiesPerDay = Math.max(0, parseInt(document.getElementById("calc-activities").value) || 0);
  budgetCalc.misc = Math.max(0, parseInt(document.getElementById("calc-misc").value) || 0);
  budgetCalc.limit = Math.max(0, parseInt(document.getElementById("calc-limit").value) || 0);
  renderBudgetCalcResults();
}

function renderBudgetCalcResults() {
  const results = document.getElementById("calc-results");
  if (!results) return;
  const { travelers, days, accommodation, foodPerDay, transportation, activitiesPerDay, misc, limit } = budgetCalc;

  const total = accommodation + (foodPerDay * days * travelers) + transportation + (activitiesPerDay * days * travelers) + misc;
  const perPerson = Math.round(total / travelers);
  const perDay = Math.round(total / days);
  const overBudget = limit > 0 && total > limit;

  results.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; padding-top: 16px; border-top: 1px solid var(--line);">
      <div>
        <div style="font-size: 12px; color: var(--slate);">Total estimated cost</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700; color: var(--navy);">${formatINR(total)}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--slate);">Cost per person</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700;">${formatINR(perPerson)}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--slate);">Cost per day</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700;">${formatINR(perDay)}</div>
      </div>
    </div>
    ${overBudget ? `
      <div style="display: flex; gap: 10px; align-items: flex-start; background: var(--danger-soft); border-radius: 12px; padding: 14px 16px; margin-top: 18px;">
        <i data-lucide="alert-triangle" style="color: var(--danger); flex-shrink: 0; margin-top: 1px;"></i>
        <div>
          <div style="font-size: 13.5px; font-weight: 700; color: var(--danger);">You're ${formatINR(total - limit)} over your planned budget.</div>
          <ul style="margin: 8px 0 0; padding-left: 18px; font-size: 13px; color: var(--slate);">
            <li>Reduce accommodation</li>
            <li>Remove expensive activities</li>
            <li>Choose public transportation</li>
            <li>Reduce trip duration</li>
          </ul>
        </div>
      </div>
    ` : limit > 0 ? `
      <div style="display: flex; gap: 10px; align-items: center; background: var(--success-soft); border-radius: 12px; padding: 14px 16px; margin-top: 18px;">
        <i data-lucide="check-circle-2" style="color: var(--success);"></i>
        <div style="font-size: 13.5px; font-weight: 700; color: var(--success);">You're within budget by ${formatINR(limit - total)}.</div>
      </div>
    ` : ''}
  `;
  lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/*  INITIAL APP LAUNCH                                                 */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  // Re-read the latest accounts/session (safe fallbacks if storage is
  // empty or corrupted — see loadFromStorage).
  users = loadFromStorage(USERS_STORAGE_KEY, []);
  currentUser = loadFromStorage(CURRENT_USER_STORAGE_KEY, null);

  // If the saved session no longer matches a real account (e.g.
  // localStorage was edited/cleared by hand), don't trust it.
  if (currentUser) {
    const stillRegistered = users.some((u) => u.id === currentUser.id);
    if (!stillRegistered) {
      currentUser = null;
      try {
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      } catch (e) {
        /* storage unavailable */
      }
    }
  }

  if (currentUser) {
    userName = currentUser.name.split(" ")[0];
    currentView = "dashboard";
  } else {
    currentView = "login";
  }

  renderPage();
});