(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PT_KEY = "mica-pt";
  var SPIN_MS = 320;
  var OIL_MS = 480;

  function revealBars(root) {
    root.querySelectorAll(".bar-fill").forEach(function (bar) {
      bar.style.setProperty("--w", (bar.getAttribute("data-width") || "0") + "%");
      if (reduce) bar.classList.add("show");
      else requestAnimationFrame(function () { bar.classList.add("show"); });
    });
  }

  var io = reduce
    ? null
    : new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            if (e.target.classList.contains("chart") || e.target.classList.contains("mini-compare")) {
              revealBars(e.target);
            }
            io.unobserve(e.target);
          });
        },
        { threshold: 0.35 }
      );

  document.querySelectorAll(".chart, .mini-compare").forEach(function (el) {
    if (io) io.observe(el);
    else revealBars(el);
  });

  function sameOrigin(href) {
    try {
      return new URL(href, location.href).origin === location.origin;
    } catch (e) {
      return false;
    }
  }

  function isInternalNav(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
      return false;
    }
    if (!sameOrigin(href)) return false;
    var next = new URL(href, location.href);
    return next.pathname !== location.pathname || next.search !== location.search;
  }

  function ensureOverlay() {
    var el = document.querySelector(".pt-overlay");
    if (el) return el;
    el = document.createElement("div");
    el.className = "pt-overlay";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
  }

  function assetBase() {
    return "/assets/";
  }

  function ensureSpinner() {
    var el = document.querySelector(".pt-spin-wrap");
    if (el) return el;
    el = document.createElement("div");
    el.className = "pt-spin-wrap";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<img class="pt-logo-spin" src="' +
      assetBase() +
      'logo-icon.png" width="72" height="76" alt="" />';
    document.documentElement.appendChild(el);
    return el;
  }

  function showSpinner() {
    if (reduce) return;
    ensureSpinner();
    document.documentElement.classList.add("pt-spinning");
  }

  function hideSpinner() {
    document.documentElement.classList.remove("pt-spinning");
  }

  function playEnter() {
    var booting = document.documentElement.classList.contains("pt-boot");
    try {
      sessionStorage.removeItem(PT_KEY);
    } catch (e) {}

    if (reduce || !booting) {
      document.documentElement.classList.remove("pt-boot", "pt-entering");
      hideSpinner();
      return;
    }

    // 1) Solo cubo (contenido sigue clipado a 0)
    showSpinner();

    setTimeout(function () {
      // 2) Cubo fuera antes de que entre el texto
      hideSpinner();

      requestAnimationFrame(function () {
        document.documentElement.classList.add("pt-entering");
        document.documentElement.classList.remove("pt-boot");
        function cleanup() {
          document.documentElement.classList.remove("pt-entering");
        }
        document.body.addEventListener("animationend", cleanup, { once: true });
        setTimeout(cleanup, OIL_MS + 80);
      });
    }, SPIN_MS);
  }

  function navigateWithOil(url) {
    if (reduce) {
      location.href = url;
      return;
    }

    var overlay = ensureOverlay();
    showSpinner();
    document.documentElement.style.setProperty("--pt-x", "50%");
    document.documentElement.style.setProperty("--pt-y", "50%");

    try {
      sessionStorage.setItem(PT_KEY, JSON.stringify({ x: "50%", y: "50%" }));
    } catch (e) {}

    // Cubo breve → se va → aceite cubre → navega
    setTimeout(function () {
      hideSpinner();
      overlay.classList.remove("pt-expand");
      void overlay.offsetWidth;
      overlay.classList.add("pt-expand");

      var done = false;
      function go() {
        if (done) return;
        done = true;
        location.href = url;
      }
      overlay.addEventListener("animationend", go, { once: true });
      setTimeout(go, OIL_MS + 60);
    }, SPIN_MS);
  }

  document.addEventListener(
    "click",
    function (ev) {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) {
        return;
      }
      var a = ev.target.closest && ev.target.closest("a");
      if (!isInternalNav(a)) return;
      ev.preventDefault();
      navigateWithOil(a.href);
    },
    true
  );


  function resetPageTransition() {
    try { sessionStorage.removeItem(PT_KEY); } catch (e) {}
    document.documentElement.classList.remove("pt-boot", "pt-entering", "pt-spinning");
    document.documentElement.style.removeProperty("--pt-x");
    document.documentElement.style.removeProperty("--pt-y");
    var overlay = document.querySelector(".pt-overlay");
    if (overlay) {
      overlay.classList.remove("pt-expand");
      overlay.remove();
    }
    var spin = document.querySelector(".pt-spin-wrap");
    if (spin) spin.remove();
  }

  // Atrás/adelante (bfcache): la página vuelve congelada a mitad del aceite/clip → pantalla en blanco
  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) resetPageTransition();
  });
  window.addEventListener("popstate", resetPageTransition);
  playEnter();
})();
