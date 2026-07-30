/* ============================================================================
   scroll-world — portable scroll-scrubbed camera-flight engine
   ----------------------------------------------------------------------------
   Framework-agnostic. Vanilla JS, zero dependencies. It builds its own DOM and
   injects its own (namespaced) CSS into a container you give it, so it drops into
   plain HTML, Next.js (call from a ref/useEffect), Vue (onMounted), a server-
   rendered page, anything.

   USAGE
     mountScrollWorld(document.getElementById('world'), {
       brand: { name: 'Pearl & Co.', href: '#top' },
       diveScroll: 1.3,   // viewport-heights of scroll per dive clip
       connScroll: 0.9,   // ...per connector clip
       hint: 'scroll to fly in',
       nav: true,         // show the top section nav
       atmosphere: true,  // subtle gradient + drifting particles behind the clips
       scrollMobileFactor: 1.2,  // extra scroll distance per segment on mobile (small
                                 // viewports read the same flight as faster; industry
                                 // pattern is a LONGER mobile scroll run)
       sections: [
         { id, label, still, poster, posterMobile, clip, clipMobile, accent,
                          // `poster` = the EXTRACTED FIRST FRAME of the encoded clip
                          // (pipeline.md §5b). Shown while the clip loads, so the
                          // still→video swap is pixel-identical (no crop/render pop).
                          // `posterMobile` = same, extracted from the mobile/portrait
                          // encode (wire it whenever clipMobile has different framing).
                          // Falls back to `still` when absent; `still` remains the
                          // stills-mode / no-clip artwork.
           scroll: 1.6,   // optional per-section override of diveScroll — more scroll
                          // distance = a slower, longer dwell in this scene
           linger: 0.5,   // optional 0..1 — remaps time so the camera settles mid-scene
                          // (exactly where the copy holds) and moves quicker at the
                          // edges. 0 = linear (default). Keep ≤ 0.6; 1 = full pause.
           eyebrow, title, body, tags:[…],
           cta:{ primary:{label,href}, secondary:{label,href} } }, // any section
         …
       ],
       connectors: [clipUrl, …],          // length = sections.length - 1 (nulls allowed)
       connectorsMobile: [clipUrl, …],    // optional lighter connectors for phones (same length)

   MOBILE (the clipMobile/connectorsMobile variants are the opt-in mobile tiers;
   the rest of the phone handling below is always on)
     Two independent axes, deliberately separate:
     - CLIP TIER (which file): decided by device class — screen short side ≤600 CSS px
       = phone → `clipMobile`/`posterMobile`; tablets (iPad Pro included) and desktops
       get the full master. NOT decided by pointer type: iPadOS reports a coarse
       pointer and a Mac UA, but has a desktop-class screen + decoder.
     - BEHAVIOUR hardening (how it acts): on any coarse-pointer / ≤860px viewport the
       engine coalesces seeks (never issues a new currentTime while the decoder is
       still `seeking` — fast flicks can't pile up and freeze), takes a coarser seek
       step, keeps the poster up (and still animating) until the clip actually paints,
       primes each video (muted play→pause) on load AND on every touch until it takes
       (iOS blank-video fix), lengthens the scroll run (`scrollMobileFactor`), drops
       the drifting particles, and ignores URL-bar-only resizes (no scroll jump).
     - MEMORY (`KEEP`): only the segments within ±2 of the current one hold a decoder
       and a blob on touch devices; the rest are released back to their posters and
       re-fetched from cache on the way back. iOS gives a tab a media budget in the
       low hundreds of MB and this page's clips add up to more than that.
     STILLS MODE (automatic fallback, never configured): the page falls back to the
     stills cross-dissolving as you scroll — no video load or decode — when the user
     asked for it (`prefers-reduced-motion`, data-saver) or video is provably blocked
     at runtime: seeks have been issued against a loaded clip for six seconds and no
     frame has ever reached the screen (iOS Low Power Mode). A rejected play() promise
     is NOT that proof and must never trigger it — WebKit rejects plays for a dozen
     transient reasons, and treating one as fatal killed video for whole sessions.
     Chromium-only network signals (`navigator.connection.saveData`/`effectiveType`)
     are used strictly as downgrade signals — saveData → stills mode, 2g/3g → shrink
     the clip prefetch window. iOS exposes none of these, so the baseline stays
     conservative (posters first, lazy blob fetch near the viewport) for everyone.
     Nothing here is required — a config with only `clip`/`connectors` still works on
     phones; the mobile variants just make it lighter and smoother.

   THEME (CSS custom properties; set on the container or :root to override)
     --sw-bg         page background (match your scene bg for seamless posters)
     --sw-ink        primary text
     --sw-ink-soft   secondary text
     --sw-accent     default accent (each section overrides via its `accent`)
     --sw-font-display / --sw-font-body

   SEO / STATIC COPY
     The engine builds its DOM client-side, so on its own the page has no crawlable
     copy. Put a plain-markup version of the copy (h1 + per-section h2/p, real links)
     inside the container in a block marked `data-sw-seo` — the engine hides it on
     mount and it never fights the visual layer, but it exists in the served HTML for
     crawlers, link previews, and no-JS visitors (see index-template.html).

   REQUIREMENTS ON YOUR ASSETS
     - clips encoded native-res, crf~20, -g 8, +faststart, no audio (see pipeline.md)
     - connectors' endpoints are the neighbouring dives' ACTUAL frames (see SKILL Step 5)
     - posters extracted from the ENCODED clips' first frames (pipeline.md §5b)
     - (optional) mobile variants at ~720p, -g 4 for smoother phone scrubbing
   The engine loads each clip as a Blob (always seekable) and scrubs currentTime; it does
   NOT depend on HTTP byte-range support.
   ========================================================================== */

function mountScrollWorld(container, config) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // BEHAVIOUR hardening (seek step, priming, particles, resize gating) keys off input
  // type + viewport: `coarse` is captured once (input type doesn't change mid-session);
  // the ≤860px query is read live via isMobile() so a desktop resize/DevTools toggle
  // switches seek behaviour without a reload.
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || smallMQ.matches;
  // CLIP TIER keys off device class, NOT input type: an iPad Pro is coarse-pointer but
  // has a desktop-class screen and decoder — it gets the 1080p master, with the touch
  // hardening above still on. Captured ONCE from the viewport short side (a phone
  // viewport is ≤600 CSS px in one dimension in either orientation; iPad viewports
  // start at 744) so the tier can't flip mid-session. Viewport, not screen.*, so the
  // pick agrees with the poster <link rel=preload> media queries in page.js (and with
  // emulated environments like Lighthouse, where screen.* stays at host size) — those
  // preload media queries MUST stay in lockstep with this expression.
  const phoneClass = window.matchMedia('(max-width: 600px), (max-height: 600px)').matches;
  // Network signals are Chromium-only (iOS/Safari/Firefox expose nothing) — treat them
  // strictly as a *downgrade* signal on top of a conservative default, never as a gate
  // for the good experience.
  const conn = navigator.connection;
  const dataSaver = !!(conn && conn.saveData);
  const slowNet = !!(conn && /^(slow-2g|2g|3g)$/.test(conn.effectiveType || ''));
  // Stills mode: the page becomes the stills cross-dissolving as you scroll — no video
  // load, no decode. Entered up-front for prefers-reduced-motion and data-saver, and at
  // runtime when video is provably blocked (see the stills probe in tick()).
  let stillsOnly = reduce || dataSaver;
  // Proof-of-paint. `seeked` only says the decoder moved the playhead; it says
  // NOTHING about whether a frame reached the screen, and on iOS those two come
  // apart constantly (a muted video that has never been played seeks fine and
  // paints nothing). requestVideoFrameCallback fires on actual presentation, so
  // where it exists it is the only trustworthy signal — and the only safe basis
  // for deciding that video is blocked (see the stills probe in tick()).
  const CAN_PROVE_PAINT = typeof HTMLVideoElement !== 'undefined'
    && 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
  let anyPainted = false, firstSeekAt = 0;
  // How many segments either side of the current one keep a decoded clip. The
  // mobile tier of a six-scene flight is ~76 MB of H.264; everything loaded used
  // to stay resident for the whole session, so a phone that scrolled the flight
  // end to end held eleven decoders and eleven blobs at once and WebKit started
  // refusing to decode anything further. Wider than the ±2.2vh load window below,
  // so a segment can never load and release on alternate frames. Keyed on `coarse`
  // rather than `phoneClass`: an iPad is not phone-class, so it pulls the FULL
  // masters (~25 MB each) and needs the cap more than a phone does, not less.
  const KEEP = coarse ? 2 : 4;
  // ?swdebug=1 — on-device diagnostics. A phone gives you no console worth
  // reading, and every failure mode here (blocked decode, evicted decoder,
  // stalled fetch, stills fallback) looks identical from the outside: "the video
  // never played". Costs nothing when the flag is absent.
  const DEBUG = /[?&]swdebug=1/.test(window.location.search);
  const dbgLog = [];
  function dbg(msg) { if (DEBUG) { dbgLog.push(msg); if (dbgLog.length > 6) dbgLog.shift(); } }
  const SECTIONS = config.sections || [];
  const CONNECTORS = config.connectors || [];
  const CONNECTORS_M = config.connectorsMobile || [];
  const DIVE_W = config.diveScroll || 1.3;
  const CONN_W = config.connScroll || 0.9;
  const CROSSFADE = (config.crossfade != null) ? config.crossfade : 0.12;  // seam dissolve width (vh)
  // Copy dwell, as a fraction of a section's own scroll length. The words ramp
  // in over the first COPY_RAMP, hold at full opacity across the middle, then
  // ramp out over the last COPY_RAMP — a trapezoid, not the triangle this used
  // to be. A triangle is only fully opaque for an instant at mid-section and
  // spends the rest of the scene in a wash, which reads as permanently
  // half-arrived and gives a section CTA almost no window to be clicked in.
  const COPY_RAMP = (config.copyRamp != null) ? config.copyRamp : 0.24;
  // The first section is already at full opacity when the page lands, so it has
  // no in-ramp — this is where its out-ramp ENDS, clearing the view for the
  // dive. It holds solid until COPY_RAMP before this.
  const HERO_COPY_OUT = (config.heroCopyOut != null) ? config.heroCopyOut : 0.68;
  // Scrub inertia: the whole page (video time, crossfades, copy) is driven from a
  // SMOOTHED scroll value that lerps toward the real one at this per-frame factor.
  // This bounds the camera's effective velocity, so a fast flick becomes a rapid
  // continuous flight through every frame and every seam crossfade IN ORDER —
  // instead of a teleport that cuts from a lagging mid-dive frame to the next
  // clip's start. 1 = no smoothing (legacy direct-drive).
  const SCRUB_SMOOTH = (config.scrubSmooth != null) ? config.scrubSmooth : 0.12;
  const N = SECTIONS.length;
  if (!N) return;

  injectCSS();
  container.classList.add('sw-root');
  // Server-rendered SEO copy (crawlers/no-JS read it from the HTML); once the
  // engine mounts, the visual layer takes over and the static block hides.
  container.querySelectorAll('[data-sw-seo]').forEach(n => { n.hidden = true; });

  // ---- build the interleaved segment chain: dive0, conn0, dive1, … diveN-1 ----
  const SEGMENTS = [];
  SECTIONS.forEach((s, i) => {
    const dive = { kind: 'dive', si: i, clip: s.clip, clipM: s.clipMobile, still: s.still,
                   poster: s.poster, posterM: s.posterMobile,
                   accent: s.accent, w: s.scroll || DIVE_W, linger: s.linger || 0 };
    SEGMENTS.push(dive);
    s._seg = dive;
    // A connector is optional: if connectors[i] is falsy, the two dives simply
    // crossfade directly (no fly-over). Lets a page complete even when a
    // connector can't be generated (e.g. a content-filter false-positive).
    if (i < N - 1 && CONNECTORS[i]) {
      SEGMENTS.push({ kind: 'conn', si: i, clip: CONNECTORS[i], clipM: CONNECTORS_M[i],
                      still: SECTIONS[i + 1].still, poster: SECTIONS[i + 1].poster,
                      posterM: SECTIONS[i + 1].posterMobile,
                      accent: SECTIONS[i + 1].accent, w: CONN_W });
    }
  });
  const NSEG = SEGMENTS.length;

  // ---- DOM ----
  const sky = el('div', 'sw-sky');
  if (config.atmosphere !== false) {
    sky.appendChild(el('div', 'sw-sky__grad'));
    sky.appendChild(el('div', 'sw-sky__glow'));
  }
  const particles = el('div', 'sw-particles'); sky.appendChild(particles);

  // `progress: false` omits the scroll-progress bar entirely (not just hides
  // it) — no element, and read() skips the per-frame transform write.
  const scrollbar = config.progress === false ? null : el('div', 'sw-scrollbar');
  const scrollbarFill = scrollbar ? el('span') : null;
  if (scrollbar) scrollbar.appendChild(scrollbarFill);

  // The topbar is only mounted if something actually goes in it. A host page
  // that renders its own header passes no brand/cta and `nav: false`, and gets
  // no engine chrome at all rather than an empty fixed div over its own.
  const topbar = el('div', 'sw-topbar');
  if (config.brand) {
    const brand = el('a', 'sw-brand'); brand.href = (config.brand.href || '#');
    brand.appendChild(el('span', 'sw-brand__mark'));
    const nm = el('span', 'sw-brand__name'); nm.textContent = config.brand.name || ''; brand.appendChild(nm);
    topbar.appendChild(brand);
  }
  const nav = el('nav', 'sw-nav'); if (config.nav !== false) topbar.appendChild(nav);
  if (config.cta && config.cta.label) {
    const c = el('a', 'sw-topcta'); c.href = config.cta.href || '#'; c.textContent = config.cta.label;
    topbar.appendChild(c);
  }

  const stage = el('div', 'sw-stage');
  const copylayer = el('div', 'sw-copylayer');
  const route = el('div', 'sw-route');
  const hint = el('div', 'sw-hint');
  const hintText = el('span'); hintText.textContent = config.hint || 'scroll'; hint.appendChild(hintText);
  hint.appendChild(el('i'));
  const track = el('div', 'sw-track');

  [sky, scrollbar, topbar.childNodes.length ? topbar : null, stage, copylayer, route, hint, track]
    .filter(Boolean).forEach(n => container.appendChild(n));

  // segment scenes
  SEGMENTS.forEach((s, i) => {
    const scene = el('div', 'sw-scene'); scene.style.setProperty('--sw-accent', s.accent || '');
    const img = el('img', 'sw-scene__still'); img.alt = ''; img.decoding = 'async';
    // Scene 0 fills the viewport at load — it IS the LCP element, so it must fetch
    // eagerly at high priority (its URL is also preloaded from page.js).
    if (i === 0) { img.loading = 'eager'; img.fetchPriority = 'high'; }
    else img.loading = 'lazy';
    // Prefer the extracted-frame poster (pixel-identical to the clip's first frame,
    // so the still→video swap can't pop) — matching the encode the device will get.
    // In stills mode the clip never loads, so the higher-fidelity source still is the
    // better permanent image.
    const pref = phoneClass ? (s.posterM || s.poster) : s.poster;
    const posterSrc = (!stillsOnly && pref) ? pref : s.still;
    if (posterSrc) img.src = posterSrc;
    scene.appendChild(img); stage.appendChild(scene);
    s.el = scene; s.img = img; s.video = null; s.hasClip = false; s.objectUrl = null;
    s.loading = false; s.ready = false; s.painted = false; s.failed = false;
    s.cur = 0; s.target = 0; s.visible = false;
  });

  // per-section copy / route / nav
  const copies = [], dots = [];
  SECTIONS.forEach((s, i) => {
    const c = el('article', 'sw-copy'); c.style.setProperty('--sw-accent', s.accent || '');
    c.innerHTML =
      `<span class="sw-copy__num">${pad(i + 1)} / ${pad(N)}</span>` +
      (s.eyebrow ? `<span class="sw-copy__eyebrow">${esc(s.eyebrow)}</span>` : '') +
      (s.title ? `<h2 class="sw-copy__title">${esc(s.title)}</h2>` : '') +
      (s.body ? `<p class="sw-copy__body">${esc(s.body)}</p>` : '') +
      (s.tags && s.tags.length ? `<ul class="sw-copy__tags">${s.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '') +
      (s.cta ? `<div class="sw-copy__cta">${ctaBtns(s.cta)}</div>` : '');
    copylayer.appendChild(c); copies.push(c);

    const dot = el('button', 'sw-route__dot'); dot.style.setProperty('--sw-accent', s.accent || '');
    // Mobile CSS hides the label span (display:none removes it from the a11y
    // tree), so the button needs an explicit name. Attribute-only; no visual
    // or flight impact.
    dot.setAttribute('aria-label', s.label || 'Scene ' + (i + 1));
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', () => jumpTo(i)); route.appendChild(dot); dots.push(dot);

    if (config.nav !== false) {
      const b = el('button', 'sw-nav__item'); b.textContent = s.label || '';
      b.addEventListener('click', () => jumpTo(i)); nav.appendChild(b);
    }
  });

  // ---- math ----
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  // Per-section dwell: monotone remap of scroll→time so the camera settles mid-scene
  // (where the copy holds) and moves quicker near the seams. L=0 linear, L=1 full
  // mid-scene pause. f(0)=0, f(1)=1 always, so seam frames are untouched.
  const lingerEase = (x, L) => { L = clamp(L); const c = x - 0.5; return (1 - L) * x + L * (4 * c * c * c + 0.5); };
  let vh = window.innerHeight, stageX = 0, totalW = 0, activeIndex = -1, ticking = false;
  let laidOutW = window.innerWidth;   // width the current layout was computed at (see onResize)

  function layout() {
    vh = window.innerHeight;
    laidOutW = window.innerWidth;
    stageX = window.innerWidth > 860 ? 4 : 0;
    // Small viewports read a camera flight as faster than big ones do, so give each
    // segment more scroll distance on mobile (industry pattern: mobile scroll runs are
    // LONGER than desktop's for the same sequence). Override via scrollMobileFactor.
    const wf = isMobile() ? (config.scrollMobileFactor != null ? config.scrollMobileFactor : 1.2) : 1;
    let off = 0;
    SEGMENTS.forEach(s => { s.start = off * vh; off += s.w * wf; s.end = off * vh; });
    totalW = off;
    track.style.height = (totalW * vh + vh) + 'px';   // +1vh so the last flight completes
    // Snap the smoothed scroll to reality on relayout — a resize/rotation must not
    // play out as an inertia flight across the recomputed track.
    ySmooth = window.scrollY || window.pageYOffset; lastReadY = -1;
    read(ySmooth);
  }

  // Jump to a section (nav item / route dot). ONE scroll write, then the flight
  // is handed to the engine's own scrub inertia: ySmooth lerps toward the new
  // position and read() plays every intermediate segment and seam crossfade in
  // order — the same path a fast flick already takes, so a jump reads as the
  // camera flying there rather than cutting.
  //
  // Two approaches were tried and rejected, both of which left the nav and the
  // dots visibly dead or worse:
  //   - `scrollTo({behavior:'smooth'})` (what this used to be) is silently a
  //     no-op wherever the browser or OS has smooth scrolling disabled — it does
  //     nothing rather than falling back to an instant scroll, so every nav item
  //     and every route dot did nothing at all.
  //   - A hand-rolled per-frame scrollTo tween works in a vacuum but storms the
  //     scroll → seek pipeline on this page (one scroll write per frame, each
  //     re-seeking several 1080p clips) and froze the renderer outright.
  function jumpTo(i) {
    const seg = SECTIONS[i]._seg;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo(0, clamp(seg.start + (seg.end - seg.start) * 0.5, 0, max));
  }

  function enterStillsMode() {
    if (stillsOnly) return;
    stillsOnly = true;
    dbg('stills mode');
    SEGMENTS.forEach(releaseClip);
    read();
  }

  // Drop one segment's decoder and its blob, back to the poster. Used both for
  // memory eviction (see KEEP) and for a clip that errors out — either way the
  // segment stays perfectly usable as a still and loadClip re-fetches it (from
  // the HTTP cache) if the window reaches it again.
  function releaseClip(s) {
    const v = s.video;
    s.video = null; s.hasClip = false; s.ready = false; s.loading = false;
    s.painted = false; s.cur = 0;
    s.el.classList.remove('has-clip');
    if (!v) return;
    try { v.pause(); } catch (e) {}
    try { v.removeAttribute('src'); v.load(); } catch (e) {}   // free the decoder now
    try { URL.revokeObjectURL(s.objectUrl); } catch (e) {}
    s.objectUrl = null;
    v.remove();
  }

  function loadClip(s) {
    if (stillsOnly || s.loading || s.failed || !s.clip) return;
    s.loading = true;
    // Serve the lighter mobile encode on phone-class devices when one was provided
    // (tablets and desktops get the full master — see phoneClass above).
    const url = (phoneClass && s.clipM) ? s.clipM : s.clip;
    fetch(url).then(r => r.ok ? r.blob() : Promise.reject(new Error('404')))
      .then(blob => {
        if (stillsOnly || !s.loading) return;   // released while the fetch was in flight
        const v = document.createElement('video');
        v.className = 'sw-scene__video';
        v.muted = true; v.playsInline = true; v.preload = 'auto';
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        s.objectUrl = URL.createObjectURL(blob);
        v.src = s.objectUrl;
        v.addEventListener('loadedmetadata', () => {
          s.ready = true;
          // Force one seek the moment metadata lands, so a frame is guaranteed to
          // be presented and the poster always has something to hand over to. The
          // scrub loop only seeks when the playhead is off target, so a segment
          // sitting at t=0 (the hero, every time the page loads) would otherwise
          // never issue one — and never reveal its clip.
          try { v.currentTime = Math.max(0.001, clamp(s.target, 0, 0.999) * (v.duration || 1)); }
          catch (e) {}
          read();
        });
        // Reveal the video (hide the still poster) only once a real frame has
        // PAINTED. A <video> that has decoded nothing is transparent, not black,
        // so revealing early doesn't show an empty scene — it shows the poster
        // through a dead element, while read() stops animating that poster, and
        // the page reads as frozen artwork.
        //   rVFC fires on presentation; `seeked` only proves the playhead moved.
        // On a mouse/desktop browser the two are equivalent and `seeked` is the
        // older, safer path, so keep it there. On touch they are NOT equivalent:
        // iOS seeks a never-played muted video happily and paints nothing, which
        // is the entire bug this guards, so phones wait for presentation.
        //   `anyPainted` is only ever set by rVFC — the stills probe in tick()
        // needs proof of paint, not proof of seek.
        const painted = () => { s.painted = true; s.el.classList.add('has-clip'); };
        if (CAN_PROVE_PAINT) v.requestVideoFrameCallback(() => { anyPainted = true; painted(); });
        if (!CAN_PROVE_PAINT || !isMobile()) v.addEventListener('seeked', painted, { once: true });
        v.addEventListener('loadeddata', () => { try { v.pause(); } catch (e) {} primeVideo(v); });
        // A decode or memory error on one clip must not take the flight with it:
        // that segment falls back to its poster permanently, the rest still fly.
        v.addEventListener('error', () => {
          dbg('decode error ' + ((v.error && v.error.code) || '?') + ' ' + url);
          s.failed = true; releaseClip(s);
        });
        s.el.appendChild(v); s.video = v; s.hasClip = true;
      }).catch(() => { s.loading = false; });
  }

  function read(yIn) {
    // Prefer the smoothed scroll position (see raf) so every layer — clip time,
    // seam crossfade, copy, rail — stays in lockstep at any input speed. Callers
    // with no argument (loadedmetadata, stills-mode entry) reuse the same value.
    const y = (yIn != null) ? yIn : (ySmooth != null ? ySmooth : (window.scrollY || window.pageYOffset));
    const fade = CROSSFADE * vh;
    let ci = 0;
    for (let i = 0; i < NSEG; i++) if (y >= SEGMENTS[i].start) ci = i;

    // On a slow connection (Chromium signal only) shrink the prefetch window: fetch the
    // clip you're in, not the neighbourhood. Everyone else prefetches ±1.6 viewports.
    const lookahead = slowNet ? 0.4 : 2.2;
    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (y > s.start - lookahead * vh && y < s.end + lookahead * vh) loadClip(s);
      else if (s.video && Math.abs(i - ci) > KEEP) releaseClip(s);
      const local = clamp((y - s.start) / (s.end - s.start), 0, 1);
      s.target = s.linger ? lingerEase(local, s.linger) : local;
      let outside = 0;
      if (y < s.start) outside = s.start - y; else if (y > s.end) outside = y - s.end;
      const op = smooth(1 - outside / fade);
      s.el.style.opacity = op; s.visible = op > 0.001;
      s.el.style.zIndex = (i === ci) ? '120' : String(100 + Math.round(op * 10));
      // Keyed on PAINTED, not on loaded: a clip that has arrived but is not yet
      // (or never) putting frames on screen must keep its poster moving, or the
      // scene freezes the moment the file lands.
      if (!s.painted) {
        const sc = reduce ? 1 : 1.03 + local * 0.14;
        s.img.style.transform = `translateX(${stageX - 2}vw) scale(${sc.toFixed(3)})`;
      }
    }

    for (let i = 0; i < N; i++) {
      const seg = SECTIONS[i]._seg;
      const pr = clamp((y - seg.start) / (seg.end - seg.start), 0, 1);
      const before = y < seg.start, after = y > seg.end;
      // smooth() clamps its input, so each ramp below is written as a bare
      // fraction of COPY_RAMP and saturates at 1 across the hold.
      let cop;
      if (i === 0) cop = after ? 0 : smooth((HERO_COPY_OUT - pr) / COPY_RAMP);  // greets on landing
      else if (i === N - 1) cop = before ? 0 : smooth(pr / COPY_RAMP);          // holds CTA at the end
      else cop = (before || after) ? 0 : smooth(Math.min(pr, 1 - pr) / COPY_RAMP);
      const c = copies[i];
      c.style.opacity = cop;
      c.style.transform = reduce ? 'none' : `translateY(${(0.5 - pr) * 4}vh)`;
      c.style.pointerEvents = cop > 0.5 ? 'auto' : 'none';
    }

    const cur = SEGMENTS[ci];
    const near = clamp(cur.kind === 'dive' ? cur.si
      : (((y - cur.start) / (cur.end - cur.start)) > 0.5 ? cur.si + 1 : cur.si), 0, N - 1);
    if (near !== activeIndex) {
      activeIndex = near;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === near));
      nav.querySelectorAll('.sw-nav__item').forEach((n, k) => n.classList.toggle('is-active', k === near));
      container.style.setProperty('--sw-accent', SECTIONS[near].accent || '');
    }
    if (scrollbarFill) scrollbarFill.style.transform = `scaleX(${clamp(y / (totalW * vh))})`;
    hint.style.opacity = clamp(1 - y / (0.5 * vh));
    if (particles) particles.style.transform = `translate3d(0, ${-y * 0.05}px, 0)`;
    ticking = false;
  }

  let ySmooth = null, lastReadY = -1, lastTs = 0;
  function tick(ts) {
    // Scrub inertia: chase the real scroll position at a bounded rate and drive the
    // entire page from the chased value. Reduced-motion users get direct drive.
    // The lerp is TIME-based, not frame-based: heavy 1080p seek loads drop rAF to
    // 15-25fps mid-transit, and a per-frame factor would stretch a 600ms settle
    // into a multi-second mid-air stall. dt is clamped so pauses (background tab,
    // occluded window) don't teleport on resume — the flight just finishes fast.
    const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.1) : 1 / 60;
    if (dt <= 0) return;                  // duplicate call within the same frame
    lastTs = ts;
    const yNow = window.scrollY || window.pageYOffset;
    if (ySmooth == null) ySmooth = yNow;
    const k = (reduce || SCRUB_SMOOTH >= 1) ? 1 : 1 - Math.pow(1 - SCRUB_SMOOTH, dt * 60);
    ySmooth += (yNow - ySmooth) * k;
    if (Math.abs(yNow - ySmooth) < 0.5) ySmooth = yNow;   // settle → idle frames skip work
    if (ySmooth !== lastReadY) { lastReadY = ySmooth; read(ySmooth); }

    const eps = isMobile() ? 0.02 : 0.008;   // coarser seek step on phones = fewer decodes
    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (!s.hasClip || !s.ready || !s.video) continue;
      // Never queue a seek while the decoder is still resolving the last one.
      // On phones a fast flick would otherwise pile up seeks and freeze the clip;
      // we snap to the latest target the moment it's free.
      if (s.video.seeking) continue;
      if (!s.visible && Math.abs(s.cur - s.target) < 0.002) continue;
      // ySmooth already provides the easing — a second lerp here would lag the clip
      // behind its own crossfade and misalign the seam handoff frames.
      s.cur = s.target;
      const dur = s.video.duration || 1;
      const t = clamp(s.cur, 0, 0.999) * dur;
      if (Math.abs(s.video.currentTime - t) > eps) {
        try { s.video.currentTime = t; if (!firstSeekAt) firstSeekAt = ts; } catch (e) {}
      }
    }

    // Stills probe. A rejected play() promise is NOT proof that the OS blocks
    // video: WebKit rejects a play interrupted by a concurrent seek or pause, and
    // rejects extra plays under media-resource pressure. This engine used to treat
    // any single rejection as fatal and drop the ENTIRE page to stills for the rest
    // of the session — a phone hit that on its first touch and never showed a frame
    // again. The honest test is paint: if we have been seeking ready clips for six
    // seconds and nothing anywhere has presented a frame, video really is blocked
    // (iOS Low Power Mode) and the stills flight is the better page.
    if (!stillsOnly && !anyPainted && firstSeekAt && isMobile() && CAN_PROVE_PAINT
        && ts - firstSeekAt > 6000) { firstSeekAt = 0; enterStillsMode(); }
  }
  function raf(ts) { tick(ts); requestAnimationFrame(raf); }
  // Degraded-mode fallback: browsers throttle or stop rAF (energy saver, occluded
  // windows) while scroll events keep firing. Ticking from scroll too means the
  // page always responds to input even when the frame loop is starved; the dt<=0
  // guard makes a same-frame double tick a no-op.
  window.addEventListener('scroll', () => { tick(performance.now()); }, { passive: true });

  // iOS will not paint a frame of a muted video that has never played, however much
  // you seek it — so every clip gets primed with a muted play()→pause() the moment
  // it loads, and again on any touch.
  //
  // Priming RETRIES rather than firing once, because a one-shot gesture handler
  // primes nothing at all in the common case: these clips are megabytes and the
  // first touch lands within a second of the page, long before any of them has
  // finished downloading. The old code took that touch, found `s.video === null`
  // for every segment, marked itself done, and left each clip to prime itself from
  // its own `loadeddata` — with no user activation left to spend.
  let userReady = false, primeFails = 0;
  function primeVideo(v) {
    if (!isMobile() || !v || v.dataset.swPrimed) return;
    try {
      const p = v.play();
      if (p && p.then) p.then(() => { v.dataset.swPrimed = '1'; try { v.pause(); } catch (e) {} })
        .catch(err => { primeFails++; dbg('play rejected: ' + ((err && err.name) || '?')); });
    } catch (e) {}
  }
  function onGesture() {
    userReady = true;
    SEGMENTS.forEach(s => primeVideo(s.video));
  }
  window.addEventListener('pointerdown', onGesture, { passive: true });
  window.addEventListener('touchstart', onGesture, { passive: true });

  // Particles are a per-frame cost we can't afford alongside video scrubbing on a phone.
  seedParticles(particles, reduce || coarse);
  // No scroll listener: the persistent rAF loop polls scrollY and drives the page
  // through the smoothed value, so scroll events would only double-paint.
  // Mobile browsers fire `resize` every time the URL bar slides in/out. Re-running
  // layout() there rebuilds the track height and yanks the scroll position, so on
  // touch we ignore height-only changes and only relayout when the width actually
  // changes (rotation still comes through orientationchange). layout() records the
  // width it laid out at.
  function onResize() {
    if (coarse && window.innerWidth === laidOutW) return;
    layout();
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', layout);
  window.addEventListener('load', layout);
  layout();
  requestAnimationFrame(raf);

  // ---- ?swdebug=1 overlay ----
  // Per segment: d/c = dive or connector, then L(oading) R(eady, metadata in)
  // P(ainted, a frame reached the screen), the element's readyState, and its
  // current playhead. "L-- rs0" for long stretches = the fetch is the bottleneck;
  // "LR- rs4" that never becomes P = decode is being refused.
  if (DEBUG) {
    const panel = el('pre');
    panel.style.cssText = 'position:fixed;left:6px;top:6px;z-index:9999;margin:0;padding:8px;'
      + 'max-width:92vw;font:10px/1.35 ui-monospace,Menlo,monospace;white-space:pre-wrap;'
      + 'background:rgba(0,0,0,.82);color:#3f6;border-radius:6px;pointer-events:none;';
    document.body.appendChild(panel);
    setInterval(() => {
      panel.textContent =
        `stills:${stillsOnly} reduce:${reduce} coarse:${coarse} phone:${phoneClass}\n`
        + `touched:${userReady} anyPainted:${anyPainted} rVFC:${CAN_PROVE_PAINT} playFails:${primeFails}\n`
        + `live:${SEGMENTS.filter(s => s.video).length}/${NSEG} y:${Math.round(window.scrollY)}\n`
        + SEGMENTS.map((s, i) =>
            `${String(i).padStart(2)}${s.kind === 'conn' ? 'c' : 'd'} `
            + `${s.loading ? 'L' : '-'}${s.ready ? 'R' : '-'}${s.painted ? 'P' : '-'}`
            + ` rs${s.video ? s.video.readyState : '-'}`
            + ` t${s.video ? s.video.currentTime.toFixed(2) : '----'}`).join('\n')
        + (dbgLog.length ? '\n! ' + dbgLog.join('\n! ') : '');
    }, 400);
  }

  // ---- helpers ----
  function el(tag, cls) { const n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function ctaBtns(cta) {
    let h = '';
    if (cta.primary) h += `<a class="sw-btn sw-btn--primary" href="${esc(cta.primary.href || '#')}">${esc(cta.primary.label)}</a>`;
    if (cta.secondary) h += `<a class="sw-btn sw-btn--ghost" href="${esc(cta.secondary.href || '#')}">${esc(cta.secondary.label)}</a>`;
    return h;
  }
}

function seedParticles(host, reduce) {
  if (!host || reduce) return;
  const kinds = ['dot', 'dot', 'ring'];
  const seeds = [7, 23, 41, 58, 71, 88, 12, 34, 52, 66, 83, 95, 18, 29, 47, 63, 77, 91, 5, 38, 55, 69, 82, 97];
  for (let k = 0; k < 20; k++) {
    const s = document.createElement('span');
    s.className = 'sw-pt sw-pt--' + kinds[k % kinds.length];
    s.style.left = seeds[k % seeds.length] + 'vw';
    s.style.top = ((seeds[(k * 3) % seeds.length] * 1.3) % 100) + 'vh';
    s.style.setProperty('--sw-sc', (0.5 + ((seeds[(k * 5) % seeds.length] % 60) / 60) * 1.1).toFixed(2));
    const dur = 14 + (seeds[(k * 7) % seeds.length] % 22);
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = (-(seeds[(k * 2) % seeds.length] % dur)) + 's';
    host.appendChild(s);
  }
}

function injectCSS() {
  if (document.getElementById('sw-css')) return;
  const css = `
  .sw-root{--sw-bg:#F5EDE0;--sw-ink:#241d2b;--sw-ink-soft:#6a6072;--sw-accent:#8a7bb5;
    --sw-font-display:ui-rounded,"SF Pro Rounded","Segoe UI",system-ui,sans-serif;
    --sw-font-body:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;
    color:var(--sw-ink);font-family:var(--sw-font-body);}
  html,body{margin:0;background:var(--sw-bg,#F5EDE0);overflow-x:hidden;}
  .sw-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:var(--sw-bg);}
  .sw-sky__grad{position:absolute;inset:-10%;background:linear-gradient(178deg,color-mix(in srgb,var(--sw-accent) 12%,var(--sw-bg)) 0%,var(--sw-bg) 55%,color-mix(in srgb,var(--sw-accent) 6%,var(--sw-bg)) 100%);}
  .sw-sky__glow{position:absolute;inset:0;background:radial-gradient(60% 42% at 74% 16%,color-mix(in srgb,var(--sw-accent) 22%,transparent),transparent 70%),radial-gradient(46% 34% at 50% 50%,color-mix(in srgb,#fff 45%,transparent),transparent 70%);}
  .sw-particles{position:absolute;inset:-6% -2%;will-change:transform;}
  .sw-pt{position:absolute;width:13px;height:13px;transform:scale(var(--sw-sc,1));opacity:0;animation:sw-drift linear infinite;}
  .sw-pt::before{content:"";position:absolute;inset:0;border-radius:50%;}
  .sw-pt--dot::before{background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--sw-accent) 60%,#000),#000 82%);}
  .sw-pt--ring::before{background:transparent;border:2px solid color-mix(in srgb,var(--sw-accent) 55%,transparent);}
  @keyframes sw-drift{0%{opacity:0;transform:scale(var(--sw-sc)) translate(0,12vh) rotate(0)}12%{opacity:.5}88%{opacity:.45}100%{opacity:0;transform:scale(var(--sw-sc)) translate(4vw,-22vh) rotate(210deg)}}
  .sw-scrollbar{position:fixed;top:0;left:0;right:0;height:3px;z-index:60;background:color-mix(in srgb,var(--sw-accent) 14%,transparent);}
  .sw-scrollbar span{display:block;height:100%;width:100%;transform-origin:0 50%;transform:scaleX(0);background:var(--sw-accent);}
  .sw-topbar{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:clamp(14px,2.4vw,26px) clamp(18px,5vw,64px);}
  .sw-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--sw-ink);}
  .sw-brand__mark{width:24px;height:28px;border-radius:7px 7px 10px 10px;background:linear-gradient(160deg,var(--sw-accent),color-mix(in srgb,var(--sw-accent) 60%,#000));box-shadow:0 6px 14px color-mix(in srgb,var(--sw-accent) 40%,transparent);}
  .sw-brand__name{font-family:var(--sw-font-display);font-weight:700;font-size:1.1rem;}
  .sw-nav{display:flex;gap:4px;padding:5px;background:color-mix(in srgb,#fff 55%,transparent);backdrop-filter:blur(10px);border:1px solid color-mix(in srgb,var(--sw-accent) 16%,transparent);border-radius:999px;}
  .sw-nav__item{font:inherit;font-size:.82rem;color:var(--sw-ink-soft);border:0;background:transparent;cursor:pointer;padding:7px 14px;border-radius:999px;transition:color .25s,background .25s;}
  .sw-nav__item:hover{color:var(--sw-ink);} .sw-nav__item.is-active{color:#fff;background:var(--sw-accent);}
  .sw-topcta{text-decoration:none;font-weight:600;font-size:.9rem;color:#fff;background:var(--sw-ink);padding:10px 20px;border-radius:999px;white-space:nowrap;}
  .sw-stage{position:fixed;inset:0;z-index:10;pointer-events:none;}
  .sw-scene{position:absolute;inset:0;opacity:0;overflow:hidden;will-change:opacity;}
  .sw-scene__video,.sw-scene__still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;}
  .sw-scene__still{will-change:transform;} .sw-scene.has-clip .sw-scene__still{opacity:0;} .sw-scene__video{z-index:1;}
  .sw-copylayer{position:fixed;inset:0;z-index:20;pointer-events:none;}
  .sw-copylayer::before{content:"";position:absolute;inset:0;width:min(58vw,780px);background:linear-gradient(90deg,var(--sw-bg) 0%,color-mix(in srgb,var(--sw-bg) 82%,transparent) 34%,color-mix(in srgb,var(--sw-bg) 40%,transparent) 62%,transparent 100%);}
  .sw-copy{position:absolute;left:clamp(18px,5vw,64px);top:50%;transform:translateY(-50%);width:min(42vw,620px);opacity:0;will-change:opacity,transform;}
  .sw-copy__num{font-family:ui-monospace,Menlo,monospace;font-size:.74rem;letter-spacing:.12em;color:var(--sw-ink-soft);}
  .sw-copy__eyebrow{display:block;margin-top:18px;font-family:var(--sw-font-display);font-weight:700;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sw-accent);}
  .sw-copy__title{font-family:var(--sw-font-display);font-weight:700;color:var(--sw-ink);font-size:clamp(2rem,4.4vw,3.5rem);line-height:1.03;margin:12px 0 0;letter-spacing:-.01em;text-shadow:0 2px 20px color-mix(in srgb,var(--sw-bg) 70%,transparent);}
  .sw-copy__body{margin-top:18px;font-size:clamp(1rem,1.25vw,1.14rem);line-height:1.55;color:color-mix(in srgb,var(--sw-ink) 78%,var(--sw-ink-soft));max-width:40ch;text-shadow:0 1px 12px color-mix(in srgb,var(--sw-bg) 90%,transparent);}
  .sw-copy__tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 0;padding:0;}
  .sw-copy__tags li{font-size:.82rem;font-weight:600;color:color-mix(in srgb,var(--sw-accent) 70%,#000);padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--sw-accent) 14%,#fff);border:1px solid color-mix(in srgb,var(--sw-accent) 30%,transparent);}
  .sw-copy__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;pointer-events:auto;}
  .sw-btn{text-decoration:none;font-weight:600;font-size:.95rem;padding:13px 24px;border-radius:999px;transition:transform .2s;}
  .sw-btn--primary{color:#fff;background:var(--sw-ink);} .sw-btn--primary:hover{transform:translateY(-2px);}
  .sw-btn--ghost{color:var(--sw-ink);border:1.5px solid color-mix(in srgb,var(--sw-ink) 25%,transparent);} .sw-btn--ghost:hover{transform:translateY(-2px);}
  .sw-route{position:fixed;right:clamp(14px,2.4vw,30px);top:50%;z-index:40;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;padding:18px 10px;}
  .sw-route::before{content:"";position:absolute;left:50%;top:22px;bottom:22px;width:2px;transform:translateX(-50%);background:var(--sw-accent);opacity:.28;}
  .sw-route__dot{position:relative;border:0;background:transparent;cursor:pointer;width:14px;height:14px;display:grid;place-items:center;}
  .sw-route__dot i{width:9px;height:9px;border-radius:50%;background:color-mix(in srgb,var(--sw-accent) 40%,transparent);transition:transform .3s,background .3s,box-shadow .3s;}
  .sw-route__dot:hover i{transform:scale(1.25);background:var(--sw-accent);}
  .sw-route__dot.is-active i{background:var(--sw-accent);transform:scale(1.4);box-shadow:0 0 0 5px color-mix(in srgb,var(--sw-accent) 22%,transparent);}
  .sw-route__label{position:absolute;right:24px;top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;font-size:.78rem;font-weight:500;color:var(--sw-ink);background:color-mix(in srgb,#fff 85%,transparent);backdrop-filter:blur(6px);padding:5px 11px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;border:1px solid color-mix(in srgb,var(--sw-accent) 14%,transparent);}
  .sw-route__dot:hover .sw-route__label,.sw-route__dot.is-active .sw-route__label{opacity:1;transform:translateY(-50%) translateX(0);}
  .sw-hint{position:fixed;left:50%;bottom:26px;z-index:30;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sw-ink-soft);transition:opacity .3s;}
  .sw-hint i{width:22px;height:34px;border-radius:12px;border:2px solid color-mix(in srgb,var(--sw-ink) 28%,transparent);position:relative;}
  .sw-hint i::after{content:"";position:absolute;left:50%;top:7px;width:4px;height:7px;border-radius:2px;background:var(--sw-accent);transform:translateX(-50%);animation:sw-wheel 1.7s ease-in-out infinite;}
  @keyframes sw-wheel{0%{opacity:0;top:6px}40%{opacity:1}100%{opacity:0;top:17px}}
  .sw-track{position:relative;z-index:1;width:100%;pointer-events:none;}
  @media (max-width:860px){
    .sw-nav{display:none;}
    .sw-copylayer::before{width:100%;height:60%;top:auto;bottom:0;background:linear-gradient(0deg,var(--sw-bg) 8%,color-mix(in srgb,var(--sw-bg) 70%,transparent) 46%,transparent 100%);}
    /* Anchor copy to the bottom, clear of the home indicator / collapsing URL bar.
       dvh + env() are progressive: browsers that lack them keep the vh fallback line. */
    .sw-copy{left:clamp(18px,5vw,64px);right:clamp(18px,5vw,64px);top:auto;bottom:clamp(64px,14vh,120px);transform:none;width:auto;max-width:560px;}
    .sw-copy{bottom:calc(clamp(56px,12dvh,110px) + env(safe-area-inset-bottom));}
    .sw-copy__title{font-size:clamp(1.9rem,7.5vw,2.7rem);}
    .sw-copy__body{max-width:none;font-size:clamp(.98rem,3.6vw,1.1rem);} .sw-scene__video,.sw-scene__still{object-position:center 46%;}
    .sw-hint{bottom:calc(20px + env(safe-area-inset-bottom));}
    .sw-route{gap:16px;right:6px;} .sw-route__label{display:none;}
  }
  /* Portrait phones crop a 16:9 clip hard; keep the framing centred so the focal
     subject (which the camera dives toward) stays in view. */
  @media (max-width:860px) and (orientation:portrait){
    .sw-scene__video,.sw-scene__still{object-position:center 44%;}
  }
  /* Touch: give the route dots a finger-sized hit area without growing the visible dot. */
  @media (hover:none) and (pointer:coarse){
    .sw-route{padding:14px 6px;}
    .sw-route__dot{width:28px;height:28px;}
    .sw-btn{padding:15px 26px;}
  }
  @media (prefers-reduced-motion:reduce){ .sw-hint i::after{animation:none;} .sw-pt{display:none;} }
  `;
  // Wrap in a cascade layer so the page's own theme tokens (unlayered
  // :root / .sw-root { --sw-bg / --sw-ink / --sw-accent … }) always win over
  // these defaults, regardless of injection order. Enables clean dark themes.
  const style = document.createElement('style'); style.id = 'sw-css';
  style.textContent = '@layer sw {\n' + css + '\n}';
  document.head.appendChild(style);
}

// Expose for module + global use.
if (typeof module !== 'undefined' && module.exports) module.exports = { mountScrollWorld };
if (typeof window !== 'undefined') window.mountScrollWorld = mountScrollWorld;

export { mountScrollWorld };
