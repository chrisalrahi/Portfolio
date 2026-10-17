(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // Pendulum clip: both videos ship with a poster and no source, so nothing downloads until a source is added.
  // Under reduced motion no source is ever added: the poster stays and no video is fetched.
  var CLIP = 'assets/video/pendulum.mp4';
  var playClip = function (v) {
    var p = v.play();
    if (p) p.catch(function () {});
    return p;
  };
  var loadClip = function (v) {
    if (v.querySelector('source')) return;
    var s = document.createElement('source');
    s.src = CLIP;
    s.type = 'video/mp4';
    v.appendChild(s);
    v.load();
  };
  var cardClip = document.querySelector('.card--signature video.plate-clip');
  if (!reduce && cardClip) {
    if (hasIO) {
      var clipVisible = false;
      // The card's clip loads once, when the card comes within 600 px, and plays only while it is on screen
      var near = new IntersectionObserver(function (entries) {
        if (!entries.some(function (e) { return e.isIntersecting; })) return;
        near.disconnect();
        loadClip(cardClip);
        var p = playClip(cardClip);
        if (p) p.then(function () { if (!clipVisible) cardClip.pause(); }, function () {});
      }, { rootMargin: '600px 0px' });
      near.observe(cardClip);
      var seen = new IntersectionObserver(function (entries) {
        clipVisible = entries[entries.length - 1].isIntersecting;
        if (!cardClip.querySelector('source')) return;
        if (clipVisible) playClip(cardClip);
        else cardClip.pause();
      }, { threshold: 0 });
      seen.observe(cardClip);
    } else {
      loadClip(cardClip);
      playClip(cardClip);
    }
  }
  window.siteReady = true;

  // Nav: one toggle button below 1024 px
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (header && toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Scroll lock while a dialog is open: the body is pinned where it was, which also holds on iOS Safari
  var savedY = 0;
  var lockScroll = function () {
    var body = document.body;
    var bar = window.innerWidth - root.clientWidth;
    var before = body.clientWidth;
    savedY = window.scrollY;
    root.classList.add('is-locked');
    body.style.position = 'fixed';
    body.style.top = -savedY + 'px';
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    // Pad by the scrollbar width only when the pinned body spread into the scrollbar's space, so nothing shifts
    if (bar > 0 && body.clientWidth > before) body.style.paddingRight = bar + 'px';
  };
  var unlockScroll = function () {
    var s = document.body.style;
    s.position = s.top = s.left = s.right = s.width = s.paddingRight = '';
    root.classList.remove('is-locked');
    try {
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
    } catch (e) {
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, savedY);
      root.style.scrollBehavior = '';
    }
  };

  // Card dialogs: the plate and the See more button open one native modal per project
  var lastTrigger = null;
  var dialogs = [].slice.call(document.querySelectorAll('dialog.detail'));
  dialogs.forEach(function (dlg) {
    if (typeof dlg.showModal !== 'function') return;
    dlg.querySelector('.detail-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) {
      if (e.target !== dlg) return;
      var r = dlg.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
    });
    dlg.addEventListener('close', function () {
      unlockScroll();
      dlg.querySelectorAll('video').forEach(function (v) { v.pause(); });
      if (lastTrigger) {
        // Restore focus without a smooth scroll, then bring the trigger back on screen if the open happened mid-scroll
        lastTrigger.focus({ preventScroll: true });
        var tr = lastTrigger.getBoundingClientRect();
        if (tr.top < 0 || tr.bottom > window.innerHeight) {
          lastTrigger.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
        lastTrigger = null;
      }
    });
  });
  document.querySelectorAll('[data-dialog]').forEach(function (btn) {
    var dlg = document.getElementById(btn.getAttribute('data-dialog'));
    if (!dlg || typeof dlg.showModal !== 'function') return;
    // The plate is a pointer target only, so focus always comes back to the card's See more button
    var returnTo = btn.classList.contains('see-more') ? btn : (document.querySelector('.see-more[data-dialog="' + dlg.id + '"]') || btn);
    btn.disabled = false;
    btn.addEventListener('click', function () {
      lastTrigger = returnTo;
      dlg.showModal();
      lockScroll();
      dlg.scrollTop = 0;
      dlg.querySelector('.detail-title').focus();
      if (!reduce) {
        dlg.querySelectorAll('video').forEach(function (v) {
          loadClip(v);
          playClip(v);
        });
      }
    });
  });

  // Contact form: stay on the page and report the result inline
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var original = button.textContent;
      var previous = form.querySelector('.form-status');
      if (previous) previous.remove();
      var say = function (text, isError) {
        var p = document.createElement('p');
        p.className = isError ? 'form-status form-status--error' : 'form-status';
        p.setAttribute('role', isError ? 'alert' : 'status');
        p.textContent = text;
        form.appendChild(p);
        return p;
      };
      button.textContent = 'Sending...';
      button.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          var msg = say('Thanks, your message has been sent!', false);
          form.reset();
          setTimeout(function () { msg.remove(); }, 5000);
        } else {
          say('There was a problem sending your message.', true);
        }
      }).catch(function () {
        say('Network error, please try again later.', true);
      }).finally(function () {
        button.textContent = original;
        button.disabled = false;
      });
    });
  }

  // Under reduced motion or without IntersectionObserver nothing animates, and every key figure keeps its final value
  if (reduce || !hasIO) {
    root.classList.add('no-motion');
    return;
  }

  var plot = document.querySelector('.sig-plot .plot-plate');
  var rows = [].slice.call(document.querySelectorAll('.card .figures'));
  var pending = [].slice.call(document.querySelectorAll('[data-reveal]'));
  var wipe = null;

  // The step-response plot draws itself in once
  var drawPlot = function () {
    if (!plot) return;
    plot.classList.add('is-drawn');
    if (wipe) wipe.disconnect();
  };

  // Key figures count up once from 0 over 600 ms; the final value is already in the markup
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var finalText = function (el) {
    return Number(el.getAttribute('data-count')).toFixed(Number(el.getAttribute('data-decimals') || 0));
  };
  var countRow = function (row) {
    if (row.hasAttribute('data-counted')) return;
    row.setAttribute('data-counted', '');
    counter.unobserve(row);
    row.querySelectorAll('[data-count]').forEach(function (el) {
      var end = Number(el.getAttribute('data-count'));
      var dec = Number(el.getAttribute('data-decimals') || 0);
      var start = performance.now();
      var tick = function (now) {
        var p = Math.min((now - start) / 600, 1);
        el.textContent = (end * easeOut(p)).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  // A row that was scrolled or jumped past without being seen goes straight to its final values
  var finishRow = function (row) {
    if (row.hasAttribute('data-counted')) return;
    row.setAttribute('data-counted', '');
    counter.unobserve(row);
    row.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = finalText(el); });
  };

  // Anything already in or above the viewport settles, so an anchor jump never leaves content hidden
  var sweep = function () {
    var vh = window.innerHeight;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top >= vh) return true;
      el.classList.add('is-in');
      reveal.unobserve(el);
      return false;
    });
    if (plot && plot.getBoundingClientRect().bottom < vh) drawPlot();
    rows.forEach(function (row) {
      var bottom = row.getBoundingClientRect().bottom;
      if (bottom < 0) finishRow(row);
      else if (bottom < vh) countRow(row);
    });
  };

  // Headings and cards fade up once as they enter
  var reveal = new IntersectionObserver(function (entries) {
    if (entries.some(function (e) { return e.isIntersecting; })) sweep();
  }, { threshold: 0.15 });
  pending.forEach(function (el) { reveal.observe(el); });

  if (plot) {
    wipe = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) drawPlot();
    }, { threshold: 0.5 });
    wipe.observe(plot);
  }

  var counter = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) countRow(entry.target);
      else if (entry.boundingClientRect.bottom < 0) finishRow(entry.target);
    });
  }, { threshold: 0.6 });
  rows.forEach(function (row) {
    // Already above the viewport at load: keep the final values from the markup
    if (row.getBoundingClientRect().bottom < 0) {
      row.setAttribute('data-counted', '');
      return;
    }
    row.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = (0).toFixed(Number(el.getAttribute('data-decimals') || 0));
    });
    counter.observe(row);
  });
})();
