const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const FC = "https://api.open-meteo.com/v1/forecast";
const $ = id => document.getElementById(id);
const CL = "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z";
const CR = "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242";
const P = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  "cloud-sun": '<path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 0 0-5.925-4.128M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  cloud: `<path d="${CL}"/>`,
  rain: `<path d="${CR}"/><path d="M16 14v6M8 14v6M12 16v6"/>`,
  snow: `<path d="${CR}"/><path d="M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01"/>`,
  storm: '<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>',
  fog: `<path d="${CR}"/><path d="M16 17H7M17 21H9"/>`,
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  therm: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  sunrise: '<path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0"/>',
  sunset: '<path d="M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  run: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
  drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  dine: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  uv: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>'
};
const ic = (n, label) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${P[n]}</svg>`;
document.querySelectorAll("[data-i]").forEach(e => { e.innerHTML = ic(e.dataset.i); });

const W = c => c === 0 ? ["Clear sky", "sun"] : c <= 2 ? [c === 1 ? "Mainly clear" : "Partly cloudy", "cloud-sun"] : c === 3 ? ["Overcast", "cloud"]
  : c <= 48 ? ["Fog", "fog"] : c <= 57 ? ["Drizzle", "rain"] : c <= 67 ? [c >= 65 ? "Heavy rain" : "Rain", "rain"] : c <= 77 ? ["Snow", "snow"]
  : c <= 82 ? ["Rain showers", "rain"] : c <= 86 ? ["Snow showers", "snow"] : c >= 95 ? ["Thunderstorm", "storm"] : ["Unknown", "cloud"];
const n = (v, u = "", d = 0) => (v === null || v === undefined || isNaN(v)) ? "Unavailable" : Number(v).toFixed(d) + u;
const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
const compass = d => d == null ? "" : ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(d / 45) % 8];
// API times are local to the city (no offset), so they are shown as UTC to avoid browser timezone shifts.
const T = (s, o) => s ? new Date(s.length <= 10 ? s + "T00:00Z" : s + "Z").toLocaleString([], { ...o, timeZone: "UTC" }) : "Unavailable";
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};

/* ---------- API ---------- */
async function getJSON(url, tries = 2) {
  for (let a = 1; ; a++) {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 10000);
    try {
      const r = await fetch(url, { signal: ctl.signal });
      clearTimeout(to);
      if (r.ok) return await r.json();
      if (![429, 500, 502, 503, 504].includes(r.status) || a >= tries)
        throw new Error(r.status === 429 ? "Too many requests. Wait a minute, then retry." : `Weather service error (${r.status}). Please retry shortly.`);
    } catch (e) {
      clearTimeout(to);
      if (/^(Weather service|Too many)/.test(e.message)) throw e;
      if (a >= tries) throw new Error(e.name === "AbortError" ? "The request timed out." : "Network problem. Check your internet connection.");
    }
    await new Promise(r => setTimeout(r, 1200));
  }
}
async function findCity(name) {
  const d = await getJSON(`${GEO}?${new URLSearchParams({ name, count: 1, language: "en", format: "json" })}`);
  if (!d.results || !d.results.length) throw new Error("City not found. Check the spelling.");
  const r = d.results[0];
  return { name: r.name, country: r.country || "", admin: r.admin1 || "", lat: r.latitude, lon: r.longitude };
}
function getWeather(c) {
  const p = new URLSearchParams({
    latitude: c.lat, longitude: c.lon, timezone: "auto", forecast_days: 5, wind_speed_unit: "kmh",
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset,uv_index_max"
  });
  return getJSON(`${FC}?${p}`);
}

/* ---------- Load flow (latest request wins) ---------- */
let seq = 0, lastQ = null, view = null;
function setStatus(msg, type, retry) {
  const s = $("status");
  s.hidden = !msg; s.className = "status " + (type || ""); s.textContent = msg || "";
  if (retry) {
    const b = document.createElement("button");
    b.className = "btn"; b.type = "button"; b.innerHTML = ic("refresh") + "<span>Retry</span>";
    b.onclick = () => load(lastQ); s.append(b);
  }
}
async function load(q) {
  const id = ++seq; lastQ = q;
  $("dash").classList.add("busy"); $("searchBtn").disabled = true;
  setStatus("Loading weather...", "info");
  try {
    const c = typeof q === "string" ? await findCity(q) : q;
    const w = await getWeather(c);
    if (id !== seq) return;
    if (!w.current || !w.daily || !w.hourly) throw new Error("The weather service returned incomplete data.");
    view = { c, w };
    render(c, w); addRecent(c); setStatus("");
  } catch (e) {
    if (id !== seq) return;
    const name = typeof q === "string" ? q : q.name;
    setStatus(`Could not load weather for "${name}". ${e.message}` + (view ? ` Showing the last loaded city: ${view.c.name}.` : ""), "error", true);
    $("stale").hidden = !view;
  } finally {
    if (id === seq) { $("dash").classList.remove("busy"); $("searchBtn").disabled = false; }
  }
}

/* ---------- Rules ---------- */
const LV = ["Green: favorable", "Yellow: caution", "Orange: elevated risk", "Red: high risk"];
const COL = ["#1f8a4c", "#f2c230", "#ec7a1c", "#c93b3b"];
const rainy = c => (c >= 51 && c <= 67) || (c >= 80 && c <= 82);
function ctx(cur, d) {
  return { t: cur.temperature_2m, f: cur.apparent_temperature ?? cur.temperature_2m, w: cur.wind_speed_10m ?? 0, c: cur.weather_code,
    p: d.precipitation_probability_max?.[0] ?? 0, u: d.uv_index_max?.[0] ?? 0, now: (cur.precipitation ?? 0) > 0 };
}
function risk(x) {
  const R = [[3, x.c >= 95, "Thunderstorm conditions"], [3, x.w >= 60, "Very strong wind"], [3, x.t >= 40 || x.t <= -10, "Extreme temperature"],
    [2, x.w >= 40, "Strong wind"], [2, x.t >= 36 || x.t <= 0, "Very hot or freezing"], [2, x.p >= 70 || [65, 75, 82, 86].includes(x.c), "Heavy precipitation likely"], [2, x.u >= 11, "Extreme UV"],
    [1, x.w >= 25, "Breezy"], [1, x.t >= 32 || x.t <= 5, "Hot or cold"], [1, x.p >= 40, "Precipitation possible"], [1, x.u >= 6, "High UV"], [1, x.c === 45 || x.c === 48, "Fog"]];
  const l = Math.max(0, ...R.filter(r => r[1]).map(r => r[0]));
  const why = R.filter(r => r[1] && r[0] === l).map(r => r[2]);
  return { l, why: why.length ? why : ["No notable risks in current data"] };
}
const G = [["kids", "Children"], ["preg", "Pregnant women"], ["work", "Outdoor workers"], ["cyc", "Cyclists and pedestrians"], ["eld", "Elderly and heat-sensitive people"]];
const ADV = {
  heat: { kids: "Offer shade and water breaks; avoid long play at midday.", preg: "Stay hydrated, rest somewhere cool and avoid overheating.", work: "Take water and rest breaks in shade; follow workplace heat-safety procedures.", cyc: "Carry water and travel in cooler hours.", eld: "Stay cool and hydrated; go out early morning or evening." },
  cold: { kids: "Dress in warm layers, with hat and gloves.", work: "Wear insulated clothing and take warm-up breaks.", cyc: "Wear layers and watch for slippery surfaces.", eld: "Dress warmly and limit time outside." },
  uv: { kids: "Use sunscreen, hats and shade; limit direct sun.", preg: "Use sun protection and seek shade.", work: "Wear protective clothing and sunscreen; take shade breaks.", eld: "Use sun protection and prefer shade." },
  rain: { kids: "Prefer indoor play and avoid puddles and flooded areas.", preg: "Avoid unnecessary exposure; watch for slippery ground.", work: "Follow site safety procedures; pause exposed work if unsafe.", cyc: "Allow extra braking distance and wear visible clothing." },
  storm: { kids: "Stay indoors, away from windows and flooded areas.", preg: "Stay indoors and follow official alerts.", work: "Stop exposed outdoor work if conditions are dangerous.", cyc: "Avoid riding or walking outdoors until it passes.", eld: "Stay indoors and follow official alerts." },
  wind: { preg: "Avoid unnecessary exposure to strong wind.", work: "Secure loose materials; avoid hazardous elevated work.", cyc: "Expect gusts on exposed roads and bridges." },
  fog: { work: "Check visibility before driving or field shifts.", cyc: "Use lights and wear bright clothing." }
};
function precautions(x) {
  const tr = [["heat", "Heat caution", x.t >= 32 || x.f >= 34, `temperature ${n(x.t, "°C")}, feels like ${n(x.f, "°C")}`],
    ["cold", "Cold conditions", x.t <= 10, `temperature ${n(x.t, "°C")}`], ["uv", "High UV", x.u >= 6, `UV index ${n(x.u, "", 1)}`],
    ["rain", "Rain risk", x.p >= 60 || rainy(x.c), `precipitation chance ${n(x.p, "%")} or rain reported`], ["storm", "Thunderstorm", x.c >= 95, "thunderstorm weather code"],
    ["wind", "Strong wind", x.w >= 40, `wind ${n(x.w, " km/h")}`], ["fog", "Low visibility", x.c === 45 || x.c === 48, "fog reported"]].filter(r => r[2]);
  $("why").innerHTML = tr.length ? tr.map(r => `<li><b>${r[1]}:</b> ${r[3]}.</li>`).join("") : "<li>No special precautions are triggered by the current data.</li>";
  $("groups").innerHTML = G.map(([k, name]) => {
    const li = tr.filter(r => ADV[r[0]][k]).map(r => `<li><b>${r[1]}.</b> ${ADV[r[0]][k]}</li>`).join("");
    return `<article class="card sub"><h4>${ic("user")} ${name}</h4><ul>${li || '<li class="muted">Nothing specific for current conditions.</li>'}</ul></article>`;
  }).join("");
}
function activities(x) {
  const storm = x.c >= 95, wet = x.now || rainy(x.c);
  const A = [
    ["Running", "run", [[2, storm, "Thunderstorm"], [2, x.t >= 35, "Extreme heat " + n(x.t, "°C")], [2, x.t <= -5, "Very cold"], [1, x.t >= 28, "Warm " + n(x.t, "°C")], [1, x.t <= 3, "Cold " + n(x.t, "°C")], [1, x.p >= 50, "Rain chance " + x.p + "%"], [1, x.w >= 30, "Wind " + n(x.w, " km/h")]], "Run indoors or go early morning or evening."],
    ["Washing a car", "car", [[2, wet || x.p >= 70, "Rain likely (" + x.p + "%)"], [1, x.p >= 40, "Some rain chance (" + x.p + "%)"], [1, x.w >= 35, "Wind may blow dust onto wet paint"]], "Wait for a dry, calm day."],
    ["Flying a drone", "drone", [[2, storm, "Thunderstorm"], [2, wet || x.p >= 60, "Rain risk"], [2, x.w >= 30, "Wind " + n(x.w, " km/h")], [1, x.w >= 20, "Breezy " + n(x.w, " km/h")]], "Postpone the flight."],
    ["Cycling", "bike", [[2, storm, "Thunderstorm"], [2, x.w >= 45, "Strong wind " + n(x.w, " km/h")], [2, x.t >= 36 || x.t <= -2, "Extreme temperature"], [1, x.p >= 50, "Rain chance " + x.p + "%"], [1, x.w >= 30, "Wind " + n(x.w, " km/h")], [1, x.t >= 32 || x.t <= 4, "Hot or cold " + n(x.t, "°C")]], "Pick a calmer time or use other transport."],
    ["Outdoor dining", "dine", [[2, storm || x.p >= 70, "Storm or heavy rain risk"], [1, x.p >= 40, "Rain chance " + x.p + "%"], [1, x.w >= 30, "Wind " + n(x.w, " km/h")], [1, x.t >= 33 || x.t <= 12, "Temperature " + n(x.t, "°C")]], "Choose indoor or covered seating."]];
  $("acts").innerHTML = A.map(([name, icon, rules, alt]) => {
    let l = 0, f = "Temperature, wind and rain are within comfortable limits";
    rules.forEach(r => { if (r[1] && r[0] > l) { l = r[0]; f = r[2]; } });
    return `<article class="card act"><h4>${ic(icon)} ${name}</h4><span class="badge s${l}">${["Good", "Use caution", "Not recommended"][l]}</span>
      <p><b>Factor:</b> ${f}.</p>${l ? `<p class="muted">${alt}</p>` : ""}</article>`;
  }).join("");
}

/* ---------- Render ---------- */
function render(c, w) {
  const cur = w.current, d = w.daily, h = w.hourly, [txt, icn] = W(cur.weather_code), x = ctx(cur, d);
  $("empty").hidden = true; $("dash").hidden = false; $("stale").hidden = true;
  $("place").textContent = [c.name, c.admin, c.country].filter(Boolean).join(", ");
  $("ltime").textContent = "Local time: " + T(cur.time, { weekday: "long", hour: "2-digit", minute: "2-digit" }) + (w.timezone_abbreviation ? " (" + w.timezone_abbreviation + ")" : "");
  $("bigIcon").innerHTML = ic(icn, txt);
  $("temp").textContent = n(cur.temperature_2m, "°C");
  $("cond").textContent = txt;
  $("summary").textContent = `${txt}, feels like ${n(x.f, "°C")}. Today: ${n(d.temperature_2m_min?.[0], "°C")} to ${n(d.temperature_2m_max?.[0], "°C")}, precipitation chance ${n(d.precipitation_probability_max?.[0], "%")}.`;
  const hm = t => T(t, { hour: "2-digit", minute: "2-digit" });
  const dets = [["drop", "Humidity", n(cur.relative_humidity_2m, "%")], ["wind", "Wind", n(cur.wind_speed_10m, " km/h") + (cur.wind_direction_10m != null ? " " + compass(cur.wind_direction_10m) : "")],
    ["therm", "Feels like", n(cur.apparent_temperature, "°C")], ["uv", "UV index", n(d.uv_index_max?.[0], "", 1)], ["sunrise", "Sunrise", hm(d.sunrise?.[0])], ["sunset", "Sunset", hm(d.sunset?.[0])],
    ["rain", "Precip. chance", n(d.precipitation_probability_max?.[0], "%")], ["rain", "Precipitation", n(cur.precipitation, " mm", 1)]];
  $("details").innerHTML = dets.map(m => `<div class="card met"><div class="l">${ic(m[0])} ${m[1]}</div><div class="v">${m[2]}</div></div>`).join("");
  let s = h.time.findIndex(t => t >= cur.time.slice(0, 13) + ":00"); if (s < 0) s = 0;
  $("hourly").innerHTML = h.time.slice(s, s + 24).map((t, k) => { const i = s + k, wc = W(h.weather_code[i]);
    return `<div class="hr"><small>${hm(t)}</small>${ic(wc[1], wc[0])}<b>${n(h.temperature_2m[i], "°")}</b><small>${n(h.precipitation_probability?.[i], "%")} rain</small></div>`; }).join("");
  $("daily").innerHTML = d.time.slice(0, 5).map((t, i) => { const wc = W(d.weather_code[i]);
    return `<div class="dy"><b>${T(t, { weekday: "short" })}</b><small>${T(t, { day: "numeric", month: "short" })}</small>${ic(wc[1], wc[0])}<div>${wc[0]}</div>
      <div><b>${n(d.temperature_2m_max[i], "°")}</b> / ${n(d.temperature_2m_min[i], "°")}</div><small>Rain ${n(d.precipitation_probability_max?.[i], "%")}</small><small>Wind ${n(d.wind_speed_10m_max?.[i], " km/h")}</small></div>`; }).join("");
  const r = risk(x);
  $("riskBadge").className = "badge k" + r.l; $("riskBadge").textContent = LV[r.l]; $("riskWhy").textContent = r.why.join(", ");
  precautions(x); activities(x); drawMap(c, cur, r); updateFav();
}

/* ---------- Map ---------- */
let map, mark;
/* Base map tiles.
   Default: OpenStreetMap standard tiles (policy: https://operations.osmfoundation.org/policies/tiles/). Light use is allowed,
   but the page must be served over http(s) so the browser sends a Referer header, and the attribution must stay.
   Optional: paste a free key from https://client.stadiamaps.com/ into stadiaKey to use Stadia Maps tiles instead (works from any address). */
const MAP_TILES = { stadiaKey: "" };
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
const STADIA_ATTR = '&copy; <a href="https://stadiamaps.com/" target="_blank" rel="noopener">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> ' + OSM_ATTR;
function tileSource() {
  if (MAP_TILES.stadiaKey) return { url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=" + encodeURIComponent(MAP_TILES.stadiaKey), maxZoom: 20, attribution: STADIA_ATTR };
  return { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", maxZoom: 19, attribution: OSM_ATTR };
}
let tileLayer = null, tileOK = 0, tileBad = 0;
function tileProblem(fileMode) {
  $("tileText").textContent = fileMode
    ? "Map tiles need the site to be served over http. Open http://localhost:8080 (Docker) instead of opening the file, or add a free Stadia Maps key in script.js."
    : "Map tiles could not be loaded. Check your internet connection, then retry. If you see an error image instead of a map, add a free Stadia Maps key in script.js (see README).";
  $("tileMsg").hidden = false;
}
function reloadTiles() {
  if (!tileLayer) { location.reload(); return; }
  tileOK = 0; tileBad = 0; $("tileMsg").hidden = true; tileLayer.redraw();
}
function addBasemap() {
  $("tileRetry").onclick = reloadTiles; $("reloadTiles").onclick = reloadTiles;
  if (location.protocol === "file:" && !MAP_TILES.stadiaKey) { tileProblem(true); return; }
  const t = tileSource();
  tileLayer = L.tileLayer(t.url, { maxZoom: t.maxZoom, attribution: t.attribution, referrerPolicy: "strict-origin-when-cross-origin" }).addTo(map);
  tileLayer.on("tileload", () => { tileOK++; $("tileMsg").hidden = true; });
  tileLayer.on("tileerror", () => { tileBad++; if (tileOK === 0 && tileBad >= 3) tileProblem(false); });
}
function drawMap(c, cur, r) {
  if (typeof L === "undefined") { $("mapBox").innerHTML = '<p class="muted">The map library could not load. Check your internet connection.</p>'; return; }
  if (!map) {
    map = L.map("map", { scrollWheelZoom: false }).setView([c.lat, c.lon], 10);
    addBasemap();
  }
  if (mark) mark.remove();
  mark = L.circleMarker([c.lat, c.lon], { radius: 14, color: "#fff", weight: 3, fillColor: COL[r.l], fillOpacity: 0.95 }).addTo(map)
    .bindPopup(`<b>${esc(c.name)}</b><br>${esc(W(cur.weather_code)[0])}, ${n(cur.temperature_2m, "°C")}<br>Risk: ${LV[r.l]}`);
  map.setView([c.lat, c.lon], 10);
  setTimeout(() => { map.invalidateSize(); mark.openPopup(); }, 50);
  drawHeat(c);
}
$("centerBtn").onclick = () => { if (view && map) { map.setView([view.c.lat, view.c.lon], 10); mark.openPopup(); } };

/* ---------- Favorites, recent, theme, search ---------- */
let favs = store.get("wn_fav", []), recent = store.get("wn_recent", []);
const key = c => `${c.name}|${c.country}|${Number(c.lat).toFixed(2)}`;
const isFav = () => view && favs.some(f => key(f) === key(view.c));
function updateFav() {
  const b = $("favBtn"), on = !!isFav();
  b.innerHTML = ic("star"); b.setAttribute("aria-pressed", on);
  b.setAttribute("aria-label", on ? "Remove from favorites" : "Add to favorites");
}
$("favBtn").onclick = () => {
  if (!view) return;
  favs = isFav() ? favs.filter(f => key(f) !== key(view.c)) : [...favs, view.c];
  store.set("wn_fav", favs); lists(); updateFav();
};
function chips(list, el, remove, empty) {
  el.innerHTML = "";
  if (!list.length) { el.innerHTML = `<span class="muted">${empty}</span>`; return; }
  list.forEach((c, i) => {
    const s = document.createElement("span"); s.className = "chip";
    const b = document.createElement("button"); b.type = "button"; b.textContent = [c.name, c.country].filter(Boolean).join(", "); b.onclick = () => load(c); s.append(b);
    if (remove) {
      const r = document.createElement("button"); r.type = "button"; r.className = "rm"; r.innerHTML = ic("x");
      r.setAttribute("aria-label", "Remove " + c.name); r.onclick = () => { remove(i); }; s.append(r);
    }
    el.append(s);
  });
}
function lists() {
  chips(favs, $("favorites"), i => { favs.splice(i, 1); store.set("wn_fav", favs); lists(); updateFav(); }, "No favorites yet. Open a city and press the star.");
  chips(recent, $("recent"), null, "No recent searches yet.");
}
function addRecent(c) { recent = [c, ...recent.filter(x => key(x) !== key(c))].slice(0, 5); store.set("wn_recent", recent); lists(); }
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $("themeBtn").innerHTML = ic(t === "dark" ? "sun" : "moon");
  $("themeBtn").setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  store.set("wn_theme", t);
}
$("themeBtn").onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
setTheme(store.get("wn_theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("searchForm").onsubmit = e => {
  e.preventDefault();
  const q = $("cityInput").value.trim();
  if (!q) return setStatus("Enter a city name to search.", "error");
  load(q);
};
lists();
load(recent[0] || "Mumbai");

/* ---------- Temperature heat layer (interpolated from a grid of Open-Meteo points) ---------- */
const STOPS = [[-10, "#b04fd8"], [0, "#4b3fc4"], [8, "#2a6fdb"], [15, "#19b5d6"], [22, "#3cc24a"], [28, "#f2e12a"], [34, "#f59a1b"], [40, "#e0401b"], [46, "#8c0a0a"]];
const RGB = STOPS.map(s => [s[0], [1, 3, 5].map(i => parseInt(s[1].slice(i, i + 2), 16))]);
function tempColor(t) {
  if (t <= RGB[0][0]) return RGB[0][1];
  for (let i = 1; i < RGB.length; i++) {
    if (t <= RGB[i][0]) { const a = RGB[i - 1], b = RGB[i], f = (t - a[0]) / (b[0] - a[0]); return a[1].map((v, k) => v + (b[1][k] - v) * f); }
  }
  return RGB[RGB.length - 1][1];
}
$("scale").style.background = "linear-gradient(90deg," + STOPS.map(s => `${s[1]} ${((s[0] + 10) / 56 * 100).toFixed(1)}%`).join(",") + ")";
$("ticks").innerHTML = [-10, 0, 10, 20, 30, 40].map(v => `<span style="left:${((v + 10) / 56 * 100).toFixed(1)}%">${v}${v === 40 ? " °C" : ""}</span>`).join("");
let heat = null, heatSeq = 0;
$("heatToggle").onchange = e => { if (heat && map) { if (e.target.checked) heat.addTo(map); else heat.remove(); } };
async function drawHeat(c) {
  const id = ++heatSeq, N = 7, span = 1.2, dl = span / Math.max(Math.cos(c.lat * Math.PI / 180), 0.3);
  if (heat) { heat.remove(); heat = null; }
  $("heatMsg").textContent = "Loading temperature layer...";
  const la = [], lo = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    la.push(Math.max(-90, Math.min(90, c.lat + span - 2 * span * i / (N - 1))).toFixed(3));
    lo.push((c.lon - dl + 2 * dl * j / (N - 1)).toFixed(3));
  }
  try {
    const d = await getJSON(`${FC}?${new URLSearchParams({ latitude: la.join(","), longitude: lo.join(","), current: "temperature_2m", timezone: "auto" })}`);
    if (id !== heatSeq) return;
    const g = (Array.isArray(d) ? d : [d]).map(x => x.current?.temperature_2m);
    if (g.length !== N * N || g.some(v => v == null)) throw new Error("incomplete data");
    const S = 160, cv = document.createElement("canvas"); cv.width = cv.height = S;
    const ctx2 = cv.getContext("2d"), im = ctx2.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let u = 0; u < S; u++) {
      const fy = y / (S - 1) * (N - 1), fx = u / (S - 1) * (N - 1);
      const i = Math.min(Math.floor(fy), N - 2), j = Math.min(Math.floor(fx), N - 2), ty = fy - i, tx = fx - j;
      const v = (g[i * N + j] * (1 - tx) + g[i * N + j + 1] * tx) * (1 - ty) + (g[(i + 1) * N + j] * (1 - tx) + g[(i + 1) * N + j + 1] * tx) * ty;
      const col = tempColor(v); im.data.set([col[0], col[1], col[2], 255], (y * S + u) * 4);
    }
    ctx2.putImageData(im, 0, 0);
    heat = L.imageOverlay(cv.toDataURL(), [[c.lat - span, c.lon - dl], [c.lat + span, c.lon + dl]], { opacity: 0.65, pane: "tilePane" });
    if ($("heatToggle").checked) heat.addTo(map);
    $("heatMsg").textContent = `Temperatures in this area range from ${Math.min(...g).toFixed(0)} to ${Math.max(...g).toFixed(0)} °C (smoothed between a ${N}x${N} grid of forecast points).`;
  } catch (e) {
    if (id === heatSeq) $("heatMsg").textContent = "Temperature layer unavailable right now (" + e.message + "). The map and marker still work.";
  }
}
