(function () {
  try {
    var raw = sessionStorage.getItem("mica-pt");
    if (!raw) return;
    var data = JSON.parse(raw);
    var root = document.documentElement;
    root.classList.add("pt-boot");
    root.style.setProperty("--pt-x", data.x || "50%");
    root.style.setProperty("--pt-y", data.y || "50%");
  } catch (e) {}
})();
