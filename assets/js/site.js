(() => {
  "use strict";

  /* ---- 1. Mount the scroll engine -------------------------------------- */
  // Both scripts are deferred, so the DOM and the engine are both ready here.
  var phoneMQ = window.matchMedia ? window.matchMedia("(max-width: 768px)") : null;
  // Swipe strips need a coarse pointer because narrow mouse windows keep the desktop flow.
  var stripMQ = window.matchMedia ? window.matchMedia("(max-width: 768px) and (pointer: coarse)") : null;
  var reduceMQ = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var stripsAtLoad = !!(stripMQ && stripMQ.matches);
  var peak = document.querySelector("#inverted-pendulum[data-sc-act=\"scrub\"]");
  var folds = [...document.querySelectorAll("details.label-more")];
  var strips = [];
  var placeBlocks = [];
  var lastSeenId = null;
  var printing = false;
  var sending = false;
  var crossingPending = false;

  var stripGroups = [
    {
      key: "work",
      title: "Work projects",
      ids: ["cw-chassis", "rtd-sensor"]
    },
    {
      key: "school",
      title: "School projects",
      ids: ["inverted-pendulum", "blade-polisher", "gear-reducer", "beer-goggles", "greenhouse"]
    }
  ];

  // Track the reader's place before a breakpoint crossing can reflow the page.
  var readPlace = function () {
    if (stripMQ && stripMQ.matches !== stripsAtLoad) return;
    if (!placeBlocks.length) return;
    var current = placeBlocks[0];
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = placeBlocks[placeBlocks.length - 1];
    } else {
      placeBlocks.forEach(function (block) {
        if (block.getBoundingClientRect().top <= window.innerHeight * 0.35) current = block;
      });
    }
    if (current.classList.contains("project-strip")) {
      var currentStrip = strips.find(function (strip) { return strip.wrapper === current; });
      if (currentStrip && currentStrip.sections[currentStrip.index]) {
        lastSeenId = currentStrip.sections[currentStrip.index].id;
      }
      return;
    }
    lastSeenId = current.id;
  };

  var setupPhonePeak = function () {
    if (!peak) return;
    var video = peak.querySelector("video[data-sc-scrub]");
    var plate = video ? video.closest(".plate--film") : null;
    peak.removeAttribute("data-sc-act");
    peak.style.setProperty("--sc-p", "1");
    if (!video || (reduceMQ && reduceMQ.matches)) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.src = video.getAttribute("data-sc-src-mobile");
    video.addEventListener("playing", function () {
      if (plate) plate.classList.add("sc-has-clip");
    }, { once: true });

    if (plate && "IntersectionObserver" in window) {
      var peakClipObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            var play = video.play();
            if (play && play.catch) play.catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: [0, 0.5, 1] });
      peakClipObserver.observe(plate);
    }
  };

  var buildStrips = function () {
    if (!stripsAtLoad || strips.length) return;
    var main = document.querySelector("main");
    if (!main) return;

    var schoolBuilt = false;
    stripGroups.forEach(function (group) {
      var sections = group.ids.map(function (id) { return document.getElementById(id); });
      if (sections.some(function (section) { return !section || section.parentNode !== main; })) return;

      var wrapper = document.createElement("div");
      wrapper.className = "project-strip";
      wrapper.id = group.key + "-strip";
      wrapper.dataset.strip = group.key;

      var head = document.createElement("div");
      head.className = "project-strip__head";
      var title = document.createElement("h3");
      title.className = "project-strip__title";
      title.textContent = group.title;
      var hint = document.createElement("p");
      hint.className = "swipe-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.textContent = "Swipe sideways \u00b7 " + sections.length + " projects";
      var count = document.createElement("p");
      count.className = "project-strip__count";
      count.setAttribute("aria-live", "polite");
      count.textContent = "1 / " + sections.length;

      var track = document.createElement("div");
      track.className = "project-strip__track";
      track.tabIndex = 0;
      track.setAttribute("role", "group");
      track.setAttribute("aria-label", group.title);

      head.append(title, hint, count);
      wrapper.append(head, track);
      main.insertBefore(wrapper, sections[0]);
      sections.forEach(function (section) {
        track.appendChild(section);
        section.querySelectorAll("[data-sc-in]").forEach(function (node) {
          node.classList.add("sc-in");
        });
        section.querySelectorAll("[data-sc-stagger]").forEach(function (node) {
          Array.prototype.forEach.call(node.children, function (child) {
            child.classList.add("sc-in");
          });
        });
      });

      var strip = {
        wrapper: wrapper,
        track: track,
        sections: sections,
        index: 0
      };
      var frame = 0;
      var updateCount = function () {
        frame = 0;
        var nearest = 0;
        var distance = Infinity;
        sections.forEach(function (section, index) {
          var nextDistance = Math.abs(section.offsetLeft - track.scrollLeft);
          if (nextDistance < distance) {
            nearest = index;
            distance = nextDistance;
          }
        });
        var nextText = (nearest + 1) + " / " + sections.length;
        if (count.textContent !== nextText) count.textContent = nextText;
        if (strip.index !== nearest) {
          strip.index = nearest;
          readPlace();
        }
      };
      var onStripScroll = function () {
        if (!frame) frame = requestAnimationFrame(updateCount);
      };
      track.addEventListener("scroll", onStripScroll, { passive: true });
      strips.push(strip);
      if (group.key === "school") schoolBuilt = true;
    });
    if (strips.length) document.documentElement.classList.add("strips-on");
    if (schoolBuilt) setupPhonePeak();
  };

  var rememberCrossingForm = function () {
    var values = {};
    var hasValue = false;
    var focus = null;
    var fields = document.querySelectorAll(".contact-form form input[name], .contact-form form textarea[name], .contact-form form select[name]");
    fields.forEach(function (field) {
      values[field.name] = field.value;
      if (field.value !== "") hasValue = true;
      if (field === document.activeElement) {
        focus = { name: field.name, start: null, end: null };
        try {
          var start = field.selectionStart;
          var end = field.selectionEnd;
          focus.start = typeof start === "number" ? start : null;
          focus.end = typeof end === "number" ? end : null;
        } catch (error) {}
      }
    });
    if (!hasValue && !focus) return;
    try {
      window.sessionStorage.setItem("chrisalrahi:crossing-form", JSON.stringify({
        values: values,
        focus: focus,
        t: Date.now()
      }));
    } catch (error) {}
  };

  var restoreCrossingState = function () {
    var scrollJSON = null;
    var formJSON = null;
    var scrollId = null;
    var formState = null;
    var now = Date.now();
    try {
      scrollJSON = window.sessionStorage.getItem("chrisalrahi:crossing-scroll");
      window.sessionStorage.removeItem("chrisalrahi:crossing-scroll");
    } catch (error) {}
    try {
      formJSON = window.sessionStorage.getItem("chrisalrahi:crossing-form");
      window.sessionStorage.removeItem("chrisalrahi:crossing-form");
    } catch (error) {}

    if (scrollJSON !== null) {
      try {
        var scrollState = JSON.parse(scrollJSON);
        if (scrollState && typeof scrollState.id === "string" && typeof scrollState.t === "number" && now - scrollState.t <= 30000) {
          scrollId = scrollState.id;
        }
      } catch (error) {}
    }
    if (formJSON !== null) {
      try {
        var savedForm = JSON.parse(formJSON);
        if (savedForm && savedForm.values && typeof savedForm.t === "number" && now - savedForm.t <= 30000) {
          formState = savedForm;
        }
      } catch (error) {}
    }

    var focusField = null;
    if (formState) {
      document.querySelectorAll(".contact-form form input[name], .contact-form form textarea[name], .contact-form form select[name]").forEach(function (field) {
        if (Object.prototype.hasOwnProperty.call(formState.values, field.name)) field.value = formState.values[field.name];
        if (formState.focus && field.name === formState.focus.name) focusField = field;
      });
    }

    var jumpToSavedState = function () {
      if (focusField) {
        focusField.scrollIntoView({ block: "center", behavior: "instant" });
        return;
      }
      if (scrollId !== null) {
        var target = document.getElementById(scrollId);
        if (target) {
          var track = target.closest(".project-strip__track");
          if (track) {
            var scrollPadding = parseFloat(window.getComputedStyle(track).scrollPaddingLeft) || 0;
            track.scrollLeft = target.offsetLeft - scrollPadding;
            target.closest(".project-strip").scrollIntoView({ block: "start", behavior: "instant" });
          } else {
            target.scrollIntoView({ block: "start", behavior: "instant" });
          }
        }
      }
    };

    if (focusField || scrollId !== null) {
      history.scrollRestoration = "manual";
      // Hold manual restoration through load so the browser cannot overwrite the saved place.
      requestAnimationFrame(function () {
        if (focusField) {
          try {
            focusField.focus({ preventScroll: true });
          } catch (error) {
            focusField.focus();
          }
          try {
            if (typeof formState.focus.start === "number" && typeof formState.focus.end === "number") {
              focusField.setSelectionRange(formState.focus.start, formState.focus.end);
            }
          } catch (error) {}
        }
        jumpToSavedState();
        var finishRestoration = function () {
          jumpToSavedState();
          window.addEventListener("pagehide", function () { history.scrollRestoration = "auto"; }, { once: true });
          readPlace();
        };
        if (document.readyState === "complete") finishRestoration();
        else window.addEventListener("load", finishRestoration, { once: true });
      });
    } else {
      requestAnimationFrame(readPlace);
    }
  };

  var saveCrossingStateAndReload = function () {
    if (lastSeenId !== null) {
      try {
        window.sessionStorage.setItem("chrisalrahi:crossing-scroll", JSON.stringify({
          id: lastSeenId,
          t: Date.now()
        }));
      } catch (error) {}
    }
    rememberCrossingForm();
    window.location.reload();
  };

  // On phones the role/outcome copy starts folded so each card reads photo,
  // title, hook, then the optional detail.
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

  if (stripsAtLoad) {
    try {
      buildStrips();
    } catch (error) {
      document.querySelectorAll(".project-strip").forEach(function (wrapper) {
        try {
          wrapper.querySelectorAll(".project-strip__track").forEach(function (track) {
            Array.prototype.forEach.call(track.children, function (section) {
              if (section.tagName === "SECTION" && wrapper.parentNode) {
                wrapper.parentNode.insertBefore(section, wrapper);
              }
            });
          });
        } catch (unwrapError) {}
        try { wrapper.remove(); } catch (removeError) {}
      });
      strips.length = 0;
      document.documentElement.classList.remove("strips-on");
      if (peak && !peak.hasAttribute("data-sc-act")) peak.setAttribute("data-sc-act", "scrub");
      if (peak) peak.style.removeProperty("--sc-p");
    }
  }
  placeBlocks = [...document.querySelectorAll("main > section[id], main > .project-strip")];

  var sc = window.ScrollCraft ? window.ScrollCraft.mount(document.body) : null;
  restoreCrossingState();

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
  var onStripChange = function () {
    if (printing || window.matchMedia("print").matches) return;
    if (stripMQ.matches === stripsAtLoad) {
      crossingPending = false;
      return;
    }
    if (sending) {
      crossingPending = true;
      return;
    }
    crossingPending = false;
    saveCrossingStateAndReload();
  };
  window.addEventListener("beforeprint", function () { printing = true; });
  window.addEventListener("afterprint", function () {
    printing = false;
    if (crossingPending) onStripChange();
  });
  if (stripMQ) {
    if (stripMQ.addEventListener) stripMQ.addEventListener("change", onStripChange);
    else stripMQ.addListener(onStripChange);
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
    readPlace();
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
        if (first) {
          const wrapper = first.closest(".project-strip");
          const stripTrack = wrapper ? wrapper.querySelector(".project-strip__track") : null;
          if (stripTrack) stripTrack.scrollLeft = 0;
          (wrapper || first).scrollIntoView({ block: "start" });
        }
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

      sending = true;
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
        sending = false;
        button.textContent = originalText;
        button.disabled = false;
        if (crossingPending) onStripChange();
      }
    });
  }
})();
