"use strict";

const MOVING_LINKS = [
  ["before-you-arrive.html", "Before arriving"],
  ["after-you-arrive.html", "After arriving"],
  ["students.html", "Students"],
  ["workers.html", "Workers"],
  ["families.html", "Families"],
  ["visas-and-permits.html", "Visas & permits"],
  ["places-in-finland.html", "Places"],
];

function enhanceFavicon() {
  if (document.querySelector('link[rel="icon"]')) return;
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = "assets/icons/mark.svg";
  document.head.append(icon);
}

function enhanceMovingNav() {
  const menu = document.querySelector(".nav__links");
  if (!menu) return;
  const moving = [...menu.querySelectorAll("a")].find((link) => /moving-to-finland\.html$/i.test(link.getAttribute("href") || ""));
  if (!moving || moving.closest(".nav-item")) return;
  const item = document.createElement("div");
  item.className = "nav-item";
  moving.replaceWith(item);
  item.append(moving);
  const sub = document.createElement("div");
  sub.className = "nav-sub";
  sub.setAttribute("aria-label", "Moving to Finland sections");
  MOVING_LINKS.forEach(([href, label]) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (location.pathname.replace(/^\//, "").endsWith(href)) link.setAttribute("aria-current", "page");
    sub.append(link);
  });
  item.append(sub);
}

const INDEPENDENCE_NOTICE =
  "Labour Finland is an independent information service and is not affiliated with or operated by the Finnish government, any public authority, trade union, employer organisation or recruitment agency.";

function enhanceIndependenceNotice() {
  document.querySelectorAll(".site-footer p.muted, .independent-label").forEach((element) => {
    if (element.dataset.independence) return;
    element.dataset.independence = "true";
    element.textContent = INDEPENDENCE_NOTICE;
  });
}

function enhanceFooter() {
  document.querySelectorAll("nav.footer-nav").forEach((nav) => {
    if (nav.dataset.grouped) return;
    nav.dataset.grouped = "true";
    nav.classList.add("footer-nav-groups");
    nav.replaceChildren();
    [
      ["Explore", [
        ["wages.html", "Wages"],
        ["calculator.html", "Calculator"],
        ["moving-to-finland.html", "Moving to Finland"],
        ["working-in-finland.html", "Working in Finland"],
      ]],
      ["About", [
        ["methodology.html", "Methodology"],
        ["about.html", "About"],
        ["contact.html", "Contact"],
        ["collective-agreements.html", "Collective agreements"],
      ]],
      ["Legal", [
        ["privacy.html", "Privacy"],
        ["disclaimer.html", "Disclaimer"],
        ["terms.html", "Terms of use"],
      ]],
    ].forEach(([title, links]) => {
      const group = document.createElement("div");
      const heading = document.createElement("h2");
      heading.textContent = title;
      group.append(heading);
      links.forEach(([href, label]) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        group.append(link);
      });
      nav.append(group);
    });
  });
}

enhanceFavicon();
enhanceMovingNav();
enhanceFooter();
enhanceIndependenceNotice();

const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav__links");

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-privacy-choices]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const message = document.querySelector("#privacy-choices-message");
    if (message) {
      message.hidden = false;
      message.focus();
    } else {
      window.location.href = "privacy.html#privacy-choices";
    }
  });
});
