document.addEventListener("DOMContentLoaded", function () {
  // Mobile hamburger menu.
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Reveal-on-scroll for section content blocks.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var targets = [];
  document.querySelectorAll("section[id] > div, section[id] > main").forEach(function (container) {
    Array.prototype.forEach.call(container.children, function (child) {
      var isGrid = getComputedStyle(child).display === "grid" && child.children.length > 1;
      if (isGrid) {
        Array.prototype.forEach.call(child.children, function (g) { targets.push(g); });
      } else {
        targets.push(child);
      }
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach(function (el, i) {
    var r = el.getBoundingClientRect();
    el.classList.add("reveal");
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add("in");
      return;
    }
    el.style.transitionDelay = (i % 4) * 90 + "ms";
    io.observe(el);
  });
});
