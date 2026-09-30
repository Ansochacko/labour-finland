"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const occupations = JSON.parse(fs.readFileSync(path.join(root, "data", "occupations.json"), "utf8")).occupations;
const outDir = path.join(root, "occupations");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function finnishAliases(occupation) {
  return (occupation.aliases || []).filter((alias) => /[äöå]|siivooja|tarjoilija|kokki|lähihoitaja|vartija|rakennus/i.test(alias));
}

function pageCopy(occupation) {
  const finnish = finnishAliases(occupation);
  const aliasBit = finnish.length ? ` The usual Finnish job title includes ${finnish.join(", ")}.` : "";
  const title = finnish.length
    ? `${occupation.name} wages in Finland (${finnish[0]}) | Labour Finland`
    : `${occupation.name} wages in Finland | Labour Finland`;
  const description = `${occupation.name} wage information in Finland.${aliasBit} Labour Finland shows a figure only after checking the source and validity period. Not a government website.`;
  const lede = finnish.length
    ? `Sourced wage information for ${occupation.name.toLowerCase()} work in Finland, including the Finnish title ${finnish[0]}.`
    : `Sourced wage information for ${occupation.name.toLowerCase()} work in Finland.`;
  return { title, description, lede, finnish };
}

function pageHtml(occupation) {
  const slug = occupation.slug || occupation.id;
  const copy = pageCopy(occupation);
  const url = `https://labourfinland.com/occupations/${slug}.html`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(copy.title)}</title>
  <meta name="description" content="${escapeHtml(copy.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(copy.title)}">
  <meta property="og:description" content="${escapeHtml(copy.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Labour Finland">
  <link rel="icon" href="/assets/icons/mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/css/styles.css">
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title.replace(" | Labour Finland", ""),
    url,
    description: copy.description,
    isPartOf: { "@type": "WebSite", name: "Labour Finland", url: "https://labourfinland.com/" },
  })}</script>
  <script src="/js/app.js" defer></script>
  <script src="/js/wage-engine.js" defer></script>
  <script src="/js/wages.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav container" aria-label="Primary">
      <a class="brand" href="/index.html">LABOUR FINLAND</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span class="nav-toggle__lines" aria-hidden="true"></span><span>Menu</span></button>
      <div class="nav__links" id="primary-menu">
        <a href="/wages.html" aria-current="page">Wages</a>
        <a href="/calculator.html">Calculator</a>
        <a href="/moving-to-finland.html">Moving to Finland</a>
        <a href="/working-in-finland.html">Working in Finland</a>
        <a href="/methodology.html">Methodology</a>
        <a href="/about.html">About</a>
        <a class="button button--small" href="#wage-form">Check your wage</a>
      </div>
    </nav>
  </header>
  <main id="main">
    <header class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a> / <a href="/wages.html">Wages</a> / ${escapeHtml(occupation.name)}</nav>
        <p class="eyebrow">Verified records only</p>
        <h1>${escapeHtml(occupation.name)} wages in Finland</h1>
        <p class="lede">${escapeHtml(copy.lede)} Finland does not have one universal statutory national minimum wage.</p>
      </div>
    </header>
    <section class="section">
      <div class="container lookup-shell">
        <div class="lookup-head">
          <h2>What should ${escapeHtml(occupation.name.toLowerCase())} pay be?</h2>
          <p class="muted">Labour Finland asks only the details needed for a verified record. A job title does not always identify one wage.</p>
        </div>
        <form class="occupation-form" id="wage-form" data-wage-form data-occupation="${escapeHtml(slug)}">
          <div class="field occupation-search">
            <label class="visually-hidden" for="occupation">Occupation</label>
            <input id="occupation" name="occupation" type="search" value="${escapeHtml(occupation.name)}" placeholder="Search your job or occupation..." autocomplete="off" required role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="occupation-suggestions" aria-activedescendant="">
            <div class="occupation-suggestions" id="occupation-suggestions" data-occupation-suggestions role="listbox" aria-label="Occupation suggestions" hidden></div>
          </div>
          <button class="button" type="submit">Check my pay →</button>
        </form>
        <div class="question-flow" data-question-flow hidden tabindex="-1" aria-live="polite"></div>
        <div class="lookup-result wage-results" data-wage-results tabindex="-1" aria-live="polite"></div>
      </div>
    </section>
    <section class="section--tight surface">
      <div class="narrow">
        <h2>How this page works</h2>
        <p>This page is for ${escapeHtml(occupation.name.toLowerCase())} wage information in Finland. Labour Finland publishes a figure only after checking what it represents, where it came from and whether its validity period includes the current date.</p>
        <div class="button-row">
          <a class="button" href="/wages.html">All occupations</a>
          <a class="button button--secondary" href="/methodology.html">Read the methodology</a>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/index.html">LABOUR FINLAND</a>
          <p>Understand your pay in Finland.</p>
          <p class="muted">Labour Finland is an independent information service and is not a Finnish government website.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer"></nav>
      </div>
      <div class="footer-bottom"><span>© <span data-current-year></span> Labour Finland</span><span>Independent information service</span></div>
    </div>
  </footer>
</body>
</html>
`;
}

fs.mkdirSync(outDir, { recursive: true });
occupations
  .filter((occupation) => occupation && occupation.status === "ACTIVE")
  .forEach((occupation) => {
    const slug = occupation.slug || occupation.id;
    fs.writeFileSync(path.join(outDir, `${slug}.html`), pageHtml(occupation));
  });

const sitemapUrls = [
  "/",
  "/wages.html",
  ...occupations.filter((occupation) => occupation.status === "ACTIVE").map((occupation) => `/occupations/${occupation.slug || occupation.id}.html`),
  "/calculator.html",
  "/working-in-finland.html",
  "/moving-to-finland.html",
  "/before-you-arrive.html",
  "/after-you-arrive.html",
  "/students.html",
  "/workers.html",
  "/families.html",
  "/visas-and-permits.html",
  "/places-in-finland.html",
  "/everyday-finland.html",
  "/collective-agreements.html",
  "/methodology.html",
  "/about.html",
  "/privacy.html",
  "/disclaimer.html",
  "/terms.html",
  "/contact.html",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>https://labourfinland.com${url}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
console.log(`Wrote ${occupations.filter((occupation) => occupation.status === "ACTIVE").length} occupation pages and sitemap.xml`);
