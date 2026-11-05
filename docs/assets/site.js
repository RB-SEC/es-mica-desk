(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduce || isNaN(target)) {
      el.textContent = prefix + format(target, decimals) + suffix;
      return;
    }
    var start = performance.now();
    var dur = 1100;
    function frame(t) {
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + format(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function format(n, decimals) {
    if (decimals === 0) {
      return Math.round(n).toLocaleString("es-ES");
    }
    return n.toLocaleString("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function revealBars(root) {
    root.querySelectorAll(".bar-fill").forEach(function (bar) {
      var w = bar.getAttribute("data-width") || "0";
      bar.style.setProperty("--w", w + "%");
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
            if (e.target.hasAttribute("data-count")) animateCounter(e.target);
            if (e.target.classList.contains("chart")) revealBars(e.target);
            io.unobserve(e.target);
          });
        },
        { threshold: 0.35 }
      );

  document.querySelectorAll("[data-count]").forEach(function (el) {
    if (io) io.observe(el);
    else animateCounter(el);
  });

  document.querySelectorAll(".chart").forEach(function (el) {
    if (io) io.observe(el);
    else revealBars(el);
  });
})();
