(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
})();
