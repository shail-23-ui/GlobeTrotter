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

function notify(msg, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  const isError = type === "error";
  
  toastContainer.innerHTML = `
    <div class="gt-toast" style="
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
  if (currentView === "login" || currentView === "signup") {
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
  if (!confirmDelete) {
    container.innerHTML = "";
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
/*  LOGIN VIEW                                                         */
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
/*  SIGNUP VIEW                                                       */
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
/*  DASHBOARD VIEW                                                     */
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
/*  CREATE TRIP VIEW                                                  */
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
/*  MY TRIPS VIEW                                                     */
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
/*  EDIT TRIP VIEW                                                     */
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
  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
      <div class="gt-card" style="padding: 44px 32px;">
        ${renderRouteMotif(220, 78)}
        <h1 class="gt-display" style="font-size: 24px; font-weight: 700; margin: 18px 0 8px;">
          ${selectedTrip ? selectedTrip.name : "Trip details"}
        </h1>
        <p style="color: var(--slate); font-size: 14.5px; max-width: 380px; margin: 0 auto 26px;">
          Trip details and itinerary builder will open here.
        </p>
        <button class="gt-btn gt-btn-primary" onclick="go('my-trips')">
          Back to My Trips
        </button>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  INITIAL APP LAUNCH                                                 */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});