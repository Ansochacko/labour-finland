"use strict";

const engine = window.LabourFinlandWageEngine;
const list = document.querySelector("[data-agreement-list]");
if (list && engine) {
  fetch("data/collective-agreements.json")
    .then((response) => response.json())
    .then((payload) => {
      const agreements = payload.collective_agreements || [];
      if (!agreements.length) {
        const empty = document.createElement("p");
        empty.textContent = "No collective agreements have been published in the dataset yet.";
        list.replaceWith(empty);
        return;
      }
      agreements.forEach((agreement) => {
        const card = document.createElement("article");
        card.className = "card";
        const eyebrow = document.createElement("p");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = agreement.verification_status === "VERIFIED" ? "Verified in dataset" : "In dataset";
        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = agreement.short_name || agreement.name || "Agreement";
        card.append(eyebrow, title);
        if (agreement.name && agreement.short_name) {
          const full = document.createElement("p");
          full.textContent = agreement.name;
          card.append(full);
        }
        const meta = document.createElement("p");
        const parts = [];
        if (agreement.valid_from) parts.push(`Valid from ${engine.formatDate(agreement.valid_from)}`);
        if (agreement.valid_until) parts.push(`until ${engine.formatDate(agreement.valid_until)}`);
        if (agreement.last_verified) parts.push(`Last checked ${engine.formatDate(agreement.last_verified)}`);
        meta.textContent = parts.join(". ");
        card.append(meta);
        if (agreement.source_url) {
          const source = document.createElement("a");
          source.href = agreement.source_url;
          source.target = "_blank";
          source.rel = "noopener noreferrer";
          source.textContent = agreement.source_name ? `View source: ${agreement.source_name}` : "View original source";
          card.append(source);
        }
        list.append(card);
      });
    })
    .catch(() => {
      list.textContent = "Agreement information could not be loaded.";
    });
}
