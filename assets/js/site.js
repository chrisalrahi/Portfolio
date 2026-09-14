(() => {
  "use strict";

  /* ---- 1. Mount the scroll engine -------------------------------------- */
  // Both scripts are deferred, so the DOM and the engine are both ready here.
  var phoneMQ = window.matchMedia ? window.matchMedia("(max-width: 768px)") : null;
  var reduceMQ = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var peak = document.querySelector("#inverted-pendulum[data-sc-act=\"scrub\"]");
  var folds = [...document.querySelectorAll("details.label-more")];

  // Phones hold the pendulum stage for one and a half screens instead of three, and the
  // role/outcome copy starts folded so each sheet reads photo, title, hook.
  var setFolds = function () {
    var phone = !!(phoneMQ && phoneMQ.matches);
    folds.forEach(function (d) { d.open = !phone; });
  };
  if (phoneMQ && phoneMQ.matches && peak) peak.setAttribute("data-sc-span", "1.5");
  setFolds();
  // Under reduced motion the pendulum clip is never fetched, so its pinned stage
  // would hold a still poster for two viewports. Shrink the hold to the engine
  // minimum before mount; the poster, plot and copy stay complete.
  if (reduceMQ && reduceMQ.matches) {
    if (peak) peak.setAttribute("data-sc-span", "1.25");
  }

  var sc = window.ScrollCraft ? window.ScrollCraft.mount(document.body) : null;

  // Opening a fold changes the page height under every act below it. The engine
  // only remeasures on a width change, so ask it directly.
  folds.forEach(function (d) {
    d.addEventListener("toggle", function () { if (sc) sc.layout(); });
  });
  if (phoneMQ) {
    var onPhoneChange = function () { setFolds(); if (sc) sc.layout(); };
    if (phoneMQ.addEventListener) phoneMQ.addEventListener("change", onPhoneChange);
    else phoneMQ.addListener(onPhoneChange);
  }

  /* ---- 2. Header state and scroll-top visibility ------------------------ */
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const scrollTop = document.querySelector(".scroll-top");

  /* ---- 5. Parts list tracking (set up here, driven from the scroll loop) - */
  const wideMQ = window.matchMedia("(min-width: 1200px)");
  const partSections = [...document.querySelectorAll(".sheet--part")];
  const partRows = new Map();
  document.querySelectorAll(".parts-list li[data-part]").forEach((li) => {
    partRows.set(li.dataset.part, li);
  });

  const readParts = () => {
    if (!wideMQ.matches || !partRows.size) return;
    const vh = window.innerHeight;
    const mark = vh * 0.45;
    const doneLine = vh * 0.4;
    let current = null;
    partSections.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      if (current === null && r.top <= mark && r.bottom >= mark) current = sec.id;
      // a trace, not a counter: once passed, a row stays marked
      if (r.bottom < doneLine) {
        const done = partRows.get(sec.id);
        if (done) done.classList.add("is-done");
      }
    });
    partRows.forEach((row, id) => row.classList.toggle("is-current", id === current));
  };

  /* ---- 5b. Parts list depth zones -------------------------------------- */
  // Three mutually exclusive body classes trace how far the reader has moved
  // past the hero and into (then past) Experience, so the rail can fade back
  // and settle rather than just being visible/hidden.
  const heroSection = document.getElementById("hero");
  const experienceSection = document.getElementById("experience");

  const updatePartsZone = () => {
    if (!heroSection || !experienceSection) return;
    const vh = window.innerHeight;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const expTop = experienceSection.getBoundingClientRect().top;
    let zone;
    if (heroBottom > vh * 0.6) {
      zone = "pl-hidden";
    } else if (expTop > vh * 0.5) {
      zone = "pl-near";
    } else {
      zone = "pl-far";
    }
    document.body.classList.toggle("pl-hidden", zone === "pl-hidden");
    document.body.classList.toggle("pl-near", zone === "pl-near");
    document.body.classList.toggle("pl-far", zone === "pl-far");
  };

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (scrollTop) scrollTop.classList.toggle("show", y > 400);
    readParts();
    updatePartsZone();
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  /* ---- 3. Nav toggle --------------------------------------------------- */
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- 4. Scrollspy ---------------------------------------------------- */
  const navLinks = [...document.querySelectorAll('.site-nav ul a[href^="#"]')];
  const spyTargets = [
    document.getElementById("projects"),
    ...partSections,
    document.getElementById("experience"),
    document.getElementById("about"),
    document.getElementById("contact")
  ].filter(Boolean);

  if (navLinks.length && spyTargets.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // every project sheet belongs to the Projects link
        const hash = el.classList.contains("sheet--part") ? "#projects" : "#" + el.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.hash === hash));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyTargets.forEach((s) => spy.observe(s));
  }

  /* ---- 6. Work / school filter ----------------------------------------- */
  // Nothing is hidden: the engine measures act positions once at mount, so
  // removing a sheet would move every act below it. The filter dims the parts
  // list and jumps to the first sheet of the track instead.
  const filterBtns = [...document.querySelectorAll(".track-btn")];
  let activeTrack = null;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const track = btn.dataset.filter;
      activeTrack = track === activeTrack ? null : track;
      filterBtns.forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.filter === activeTrack));
      });
      document.body.classList.toggle("filter-work", activeTrack === "work");
      document.body.classList.toggle("filter-school", activeTrack === "school");
      if (activeTrack) {
        const first = document.querySelector('.sheet--part[data-track="' + activeTrack + '"]');
        if (first) first.scrollIntoView({ block: "start" });
      }
    });
  });

  /* ---- 8. Contact form ------------------------------------------------- */
  const form = document.querySelector(".contact-form form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page reload
      const formData = new FormData(form);

      // show quick "sending" feedback
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "Sending...";
      button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          // create or show thank-you message
          let msg = document.createElement("p");
          msg.textContent = "Thanks, your message has been sent!";
          msg.style.color = "var(--accent-text)";
          msg.style.marginTop = "10px";
          msg.style.textAlign = "center";
          form.appendChild(msg);

          form.reset();

          // remove message after 5 seconds
          setTimeout(() => msg.remove(), 5000);
        } else {
          alert("There was a problem sending your message.");
        }
      } catch (error) {
        alert("Network error, please try again later.");
      } finally {
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }
})();
