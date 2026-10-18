(() => {
  "use strict";

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  if (window.ScrollCraft) window.ScrollCraft.mount(document.body);

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const scrollTop = document.querySelector(".scroll-top");

  let ticking = false;
  let savedY = 0;
  const updateHeader = () => {
    const y = root.classList.contains("is-locked") ? savedY : window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (scrollTop) scrollTop.classList.toggle("show", y > 400);
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateHeader();
      ticking = false;
    });
  }, { passive: true });
  updateHeader();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const navLinks = [...document.querySelectorAll('.site-nav ul a[href^="#"]')];
  const spyTargets = ["projects", "experience", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (navLinks.length && spyTargets.length && hasIO) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hash = "#" + entry.target.id;
        navLinks.forEach((link) => link.classList.toggle("active", link.hash === hash));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyTargets.forEach((section) => spy.observe(section));
  }

  const smallClip = window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches;
  const clipSource = smallClip ? "assets/video/pendulum-m.mp4" : "assets/video/pendulum.mp4";
  const loadClip = (video) => {
    if (!video || video.querySelector("source")) return;
    const source = document.createElement("source");
    source.src = clipSource;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  };
  const playClip = (video) => {
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => {});
  };

  const cardClip = document.querySelector(".card-clip");
  if (!reduce && cardClip) {
    if (hasIO) {
      let visible = false;
      const approach = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        approach.disconnect();
        loadClip(cardClip);
        playClip(cardClip);
        if (!visible) cardClip.pause();
      }, { rootMargin: "600px 0px" });
      approach.observe(cardClip);

      const visibility = new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1].isIntersecting;
        if (!cardClip.querySelector("source")) return;
        if (visible) playClip(cardClip);
        else cardClip.pause();
      });
      visibility.observe(cardClip);
    } else {
      loadClip(cardClip);
      playClip(cardClip);
    }
  }

  const lockScroll = () => {
    const body = document.body;
    const scrollbar = window.innerWidth - root.clientWidth;
    const before = body.clientWidth;
    savedY = window.scrollY;
    root.classList.add("is-locked");
    updateHeader();
    body.style.position = "fixed";
    body.style.top = -savedY + "px";
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbar > 0 && body.clientWidth > before) body.style.paddingRight = scrollbar + "px";
  };

  const unlockScroll = () => {
    const style = document.body.style;
    style.position = "";
    style.top = "";
    style.left = "";
    style.right = "";
    style.width = "";
    style.paddingRight = "";
    try {
      window.scrollTo({ top: savedY, left: 0, behavior: "instant" });
    } catch (error) {
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, savedY);
      root.style.scrollBehavior = "";
    }
    root.classList.remove("is-locked");
    updateHeader();
  };

  const inverseTransform = (cardBox, dialogBox) => {
    const scaleX = cardBox.width / dialogBox.width;
    const scaleY = cardBox.height / dialogBox.height;
    const x = cardBox.left - dialogBox.left;
    const y = cardBox.top - dialogBox.top;
    return `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
  };

  const measureCard = (card) => {
    card.classList.add("is-measuring");
    const box = card.getBoundingClientRect();
    card.classList.remove("is-measuring");
    return box;
  };

  const dialogStates = new WeakMap();
  const restoreCardFocus = (card) => {
    if (!card) return;
    const target = card.querySelector(".card-plus") || card;
    try {
      target.focus({ preventScroll: true });
    } catch (error) {
      target.focus();
    }
    const box = card.getBoundingClientRect();
    if (box.top < 0 || box.bottom > window.innerHeight) {
      card.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  };

  const finishClose = (dialog, state) => {
    dialog.querySelectorAll("video").forEach((video) => video.pause());
    dialog.close();
    dialog.classList.remove("is-open", "is-closing");
    dialog.removeAttribute("style");
    dialog.querySelector(".detail-fade").removeAttribute("style");
    unlockScroll();
    restoreCardFocus(state.card);
    state.card = null;
    state.busy = false;
    state.phase = "idle";
    state.closeRequested = false;
  };

  const finishOpen = (dialog, state) => {
    if (state.phase !== "opening") return;
    if (state.openHandler) dialog.removeEventListener("transitionend", state.openHandler);
    if (state.openTimer) window.clearTimeout(state.openTimer);
    state.openHandler = null;
    state.openTimer = 0;
    state.busy = false;
    state.phase = "idle";
    if (state.closeRequested) {
      state.closeRequested = false;
      closeDialog(dialog);
    }
  };

  const watchOpenTransition = (dialog, state, property, fallback) => {
    state.openHandler = (event) => {
      if (event.target === dialog && event.propertyName === property) finishOpen(dialog, state);
    };
    dialog.addEventListener("transitionend", state.openHandler);
    state.openTimer = window.setTimeout(() => finishOpen(dialog, state), fallback);
  };

  const closeDialog = (dialog) => {
    const state = dialogStates.get(dialog);
    if (!state || !dialog.open) return;
    if (state.busy) {
      if (state.phase === "opening") state.closeRequested = true;
      return;
    }
    state.busy = true;
    state.phase = "closing";
    const fade = dialog.querySelector(".detail-fade");
    dialog.classList.remove("is-open");
    dialog.classList.add("is-closing");
    fade.style.transition = "opacity 120ms ease";
    fade.style.opacity = "0";

    if (reduce) {
      dialog.style.transition = "opacity 120ms ease";
      requestAnimationFrame(() => { dialog.style.opacity = "0"; });
      window.setTimeout(() => finishClose(dialog, state), 120);
      return;
    }

    window.setTimeout(() => {
      const cardBox = measureCard(state.card);
      const dialogBox = dialog.getBoundingClientRect();
      dialog.style.transition = "transform 260ms cubic-bezier(0.23, 1, 0.32, 1)";
      dialog.style.transform = inverseTransform(cardBox, dialogBox);
      window.setTimeout(() => finishClose(dialog, state), 260);
    }, 120);
  };

  const openDialog = (card) => {
    const dialog = document.getElementById(card.dataset.dialog);
    const state = dialog && dialogStates.get(dialog);
    if (!dialog || !state || state.busy || dialog.open) return;
    state.busy = true;
    state.phase = "opening";
    state.closeRequested = false;
    state.card = card;
    dialog.showModal();
    lockScroll();
    dialog.scrollTop = 0;

    const fade = dialog.querySelector(".detail-fade");
    const title = dialog.querySelector(".detail-title");
    dialog.classList.remove("is-closing");
    dialog.style.transition = "none";
    fade.style.transition = "none";
    fade.style.opacity = "0";

    if (reduce) {
      dialog.style.opacity = "0";
      void dialog.offsetWidth;
      dialog.classList.add("is-open");
      dialog.style.transition = "opacity 150ms ease";
      fade.style.transition = "opacity 150ms ease";
      requestAnimationFrame(() => {
        dialog.style.opacity = "1";
        fade.style.opacity = "1";
      });
      watchOpenTransition(dialog, state, "opacity", 220);
    } else {
      const cardBox = measureCard(card);
      const dialogBox = dialog.getBoundingClientRect();
      dialog.style.opacity = "1";
      dialog.style.transform = inverseTransform(cardBox, dialogBox);
      void dialog.offsetWidth;
      dialog.classList.add("is-open");
      dialog.style.transition = "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)";
      fade.style.transition = "opacity 180ms ease 160ms";
      requestAnimationFrame(() => {
        dialog.style.transform = "none";
        fade.style.opacity = "1";
      });
      watchOpenTransition(dialog, state, "transform", 500);
    }

    title.focus();
    if (!reduce) {
      dialog.querySelectorAll("video").forEach((video) => {
        loadClip(video);
        playClip(video);
      });
    }
  };

  document.querySelectorAll("dialog.detail").forEach((dialog) => {
    if (typeof dialog.showModal !== "function") return;
    dialogStates.set(dialog, { busy: false, card: null, phase: "idle", closeRequested: false, openHandler: null, openTimer: 0 });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      closeDialog(dialog);
    });
  });

  document.querySelectorAll(".card--expandable[data-dialog]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openDialog(card);
    });
    const plus = card.querySelector(".card-plus");
    if (plus) plus.addEventListener("click", (event) => {
      event.stopPropagation();
      openDialog(card);
    });
  });

  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
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
          const message = document.createElement("p");
          message.textContent = "Thanks, your message has been sent!";
          message.style.color = "var(--accent-text)";
          message.style.marginTop = "10px";
          message.style.textAlign = "center";
          form.appendChild(message);
          form.reset();
          setTimeout(() => message.remove(), 5000);
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

  const reveals = [...document.querySelectorAll("[data-reveal]")];
  const rows = [...document.querySelectorAll(".card .figures")];
  if (reduce || !hasIO) {
    root.classList.add("no-motion");
    reveals.forEach((element) => element.classList.add("is-in"));
    return;
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  reveals.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-in");
    else reveal.observe(element);
  });

  const easeOut = (value) => 1 - Math.pow(1 - value, 3);
  const finalText = (element) => Number(element.dataset.count).toFixed(Number(element.dataset.decimals || 0));
  let counter;
  const countRow = (row) => {
    if (row.hasAttribute("data-counted")) return;
    row.setAttribute("data-counted", "");
    counter.unobserve(row);
    row.querySelectorAll("[data-count]").forEach((element) => {
      const end = Number(element.dataset.count);
      const decimals = Number(element.dataset.decimals || 0);
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 600, 1);
        element.textContent = (end * easeOut(progress)).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  const finishRow = (row) => {
    if (row.hasAttribute("data-counted")) return;
    row.setAttribute("data-counted", "");
    counter.unobserve(row);
    row.querySelectorAll("[data-count]").forEach((element) => { element.textContent = finalText(element); });
  };
  counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) countRow(entry.target);
      else if (entry.boundingClientRect.bottom < 0) finishRow(entry.target);
    });
  }, { threshold: 0.6 });

  rows.forEach((row) => {
    if (row.getBoundingClientRect().bottom < 0) {
      row.setAttribute("data-counted", "");
      return;
    }
    row.querySelectorAll("[data-count]").forEach((element) => {
      element.textContent = (0).toFixed(Number(element.dataset.decimals || 0));
    });
    counter.observe(row);
  });
})();
