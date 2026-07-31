(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const scrollTop = document.querySelector(".scroll-top");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
    scrollTop.classList.toggle("show", window.scrollY > 400);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Scrollspy: highlight the nav link of the section in view
  const navLinks = [...document.querySelectorAll('.site-nav ul a[href^="#"]')];
  const sections = navLinks
    .map((a) => document.querySelector(a.hash))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.hash === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Fade-up reveals
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => io.observe(el));

  // Work / school track filter. Filtering to one track keeps a single project
  // from the other track at the bottom, with a prompt that flips the filter.
  const filterRow = document.querySelector(".projects-controls");
  const filterBtns = [...document.querySelectorAll(".track-btn")];
  const features = [...document.querySelectorAll(".features .feature")];
  const teaser = document.querySelector(".track-teaser");

  if (filterRow && filterBtns.length && features.length && teaser) {
    const teaserTrack = teaser.querySelector(".teaser-track");
    const teaserBtn = teaser.querySelector(".teaser-btn");
    let active = null;

    const applyFilter = (track) => {
      // clicking the pressed button clears the filter
      active = track === active ? null : track;
      filterBtns.forEach((b) =>
        b.setAttribute("aria-pressed", b.dataset.filter === active)
      );

      // shown is built in ON-SCREEN order, not DOM order: the teaser is pulled
      // to the bottom by order:1, so it has to be stamped as the last one
      const shown = [];
      let odd = null;
      features.forEach((f) => {
        f.classList.remove("is-teaser");
        if (!active) {
          f.hidden = false;
          f.style.order = "";
          shown.push(f);
        } else if (f.dataset.track === active) {
          f.hidden = false;
          f.style.order = "0";
          shown.push(f);
        } else if (!odd) {
          // first project of the other track becomes the teaser
          odd = f;
          f.hidden = false;
          f.style.order = "1";
          f.classList.add("is-teaser");
        } else {
          f.hidden = true;
        }
      });
      if (odd) shown.push(odd);

      teaser.hidden = !odd;
      if (odd) {
        teaser.style.order = "2";
        teaserTrack.textContent = odd.dataset.track;
        teaserBtn.textContent = "Show " + odd.dataset.track + " projects";
        teaserBtn.dataset.target = odd.dataset.track;
      }

      // hidden siblings would leave a stray divider or stack two images on the
      // same side, so restamp both against what is actually on screen
      shown.forEach((f, i) => {
        f.classList.toggle("is-first", i === 0);
        f.classList.toggle("media-right", i % 2 === 1);
        f.classList.add("visible"); // may never have been scrolled into view
      });

      if (filterRow.getBoundingClientRect().top < 0) {
        filterRow.scrollIntoView({ block: "start" });
      }
    };

    filterBtns.forEach((b) =>
      b.addEventListener("click", () => applyFilter(b.dataset.filter))
    );
    teaserBtn.addEventListener("click", () =>
      applyFilter(teaserBtn.dataset.target)
    );
  }
})();
