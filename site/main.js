(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); } }

  // Header: se vuelve sólido al bajar
  function initNav() {
    var nav = $("#nav");
    if (!nav) return;
    function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menú móvil
  function initMenu() {
    var burger = $("#burger"), menu = $("#menu");
    if (!burger || !menu) return;
    function set(open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () { set(burger.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  // Aparición suave al hacer scroll (con red de seguridad)
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;
    document.documentElement.classList.add("js");
    function showAll() { els.forEach(function (el) { el.classList.add("is-in"); }); }
    if (!("IntersectionObserver" in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(showAll, 6000);
  }

  // Medición de clics en WhatsApp (Google Ads / Analytics / Meta, si están instalados)
  function initTracking() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("[data-wa]") : null;
      if (!a) return;
      var origen = a.getAttribute("data-wa");
      try { if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", { origen: origen }); } catch (_) {}
      try { if (typeof window.fbq === "function") window.fbq("track", "Contact", { origen: origen }); } catch (_) {}
      // Conversión de Google Ads: descomentar y completar cuando se cree la acción de conversión
      // window.gtag && window.gtag("event", "conversion", { send_to: "AW-XXXXXXXXX/YYYYYYYY" });
    });
  }

  function initYear() { var y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

  function boot() {
    safe(initNav, "nav");
    safe(initMenu, "menu");
    safe(initReveals, "reveals");
    safe(initTracking, "tracking");
    safe(initYear, "year");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
