"use strict";

const engine = window.LabourFinlandWageEngine;
const DATA_FILES = [
  ["occupations", "data/occupations.json"],
  ["agreements", "data/collective-agreements.json"],
  ["questions", "data/wage-questions.json"],
  ["wageRecords", "data/wage-records.json"],
  ["supplements", "data/supplements.json"],
];

function addText(parent, elementName, text, className) {
  const element = document.createElement(elementName);
  element.textContent = text;
  if (className) element.className = className;
  parent.append(element);
  return element;
}

async function loadJson(path) {
  const response = await fetch(path, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`${path} could not be loaded.`);
  return response.json();
}

async function loadDataset() {
  const payloads = {};
  const results = await Promise.all(DATA_FILES.map(([, path]) => loadJson(path)));
  DATA_FILES.forEach(([key], index) => {
    payloads[key] = results[index];
  });
  const dataset = engine.prepareDataset({
    occupations: payloads.occupations.occupations,
    agreements: payloads.agreements.collective_agreements,
    questions: payloads.questions.questions,
    wageRecords: payloads.wageRecords.wage_records,
    supplements: payloads.supplements.supplements,
  });
  if (dataset.validation.warnings.length) {
    console.warn("Labour Finland wage dataset warnings:", dataset.validation.warnings);
  }
  return dataset;
}

function popularOccupations(occupations) {
  return occupations.filter((occupation) => occupation.status === "ACTIVE" && occupation.popular);
}

function calculatorUrl(occupation, record) {
  const params = new URLSearchParams();
  params.set("occupation", occupation.id);
  if (record.wage.unit === "EUR_HOUR") params.set("hourly_wage", String(record.wage.amount));
  if (record.agreement_id) params.set("agreement", record.agreement_id);
  const label = classificationLabel(record.classification);
  if (label) params.set("classification", label);
  return `calculator.html?${params.toString()}`;
}

function occupationUrl(occupation) {
  return `wages.html?occupation=${encodeURIComponent(occupation.slug || occupation.id)}`;
}

function classificationLabel(classification) {
  if (!classification) return "";
  const parts = [];
  if (classification.grade && classification.points) {
    parts.push(`${classification.grade} · ${classification.points} points`);
  } else if (classification.grade) {
    parts.push(classification.grade);
  }
  if (classification.experience && !String(classification.grade || "").includes(classification.experience)) {
    parts.push(classification.experience);
  } else if (classification.experience_level && !classification.experience) {
    const experienceLabels = {
      "0-2": "0–2 years",
      "over-2": "over 2 years",
      "over-5": "over 5 years",
      "over-10": "over 10 years",
      "0y": "0 years",
      "5y": "5 years",
      "8y": "8 years",
      "11y": "11 years",
      "2nd-year": "2nd year",
      "4th-year": "4th year",
      "6th-year": "6th year",
      "9th-year": "9th year",
      trainee: "Trainee",
    };
    parts.push(experienceLabels[classification.experience_level] || classification.experience_level);
  }
  if (classification.seniority && classification.seniority !== classification.experience_level) {
    const seniorityLabels = {
      "2nd-year": "2nd year",
      "4th-year": "4th year",
      "6th-year": "6th year",
      "9th-year": "9th year",
      trainee: "Trainee",
    };
    parts.push(seniorityLabels[classification.seniority] || classification.seniority);
  }
  if (classification.region === "pks") parts.push("Helsinki, Espoo, Kauniainen or Vantaa");
  if (classification.region === "other-finland") parts.push("Other Finland");
  return [...new Set(parts.filter(Boolean))].join(" · ");
}

function recordNotices(record, dataset) {
  const notices = [];
  if (Array.isArray(record.notices)) notices.push(...record.notices);
  const agreement = engine.getAgreement(dataset, record.agreement_id);
  if (agreement && Array.isArray(agreement.notices)) notices.push(...agreement.notices);
  return [...new Set(notices)];
}

function renderPreparingState(container, occupation, loadFailed = false, result = null) {
  container.replaceChildren();
  const state = document.createElement("div");
  state.className = "empty-state";
  const preparing = (result && result.preparing) || (occupation && occupation.preparing) || {};
  const name = (occupation && occupation.name) || (typeof occupation === "string" ? occupation : "Occupation");
  addText(
    state,
    "h3",
    loadFailed
      ? "Wage data is temporarily unavailable"
      : preparing.title || `${name} wage information is being prepared`
  );
  addText(
    state,
    "p",
    loadFailed
      ? "The wage dataset could not be loaded. Please try again later."
      : preparing.body ||
        "We haven't yet published verified wage information for this occupation. Labour Finland publishes wage figures only after checking the source and validity period."
  );
  const links = document.createElement("div");
  links.className = "empty-state__links";
  if (preparing.source_url) {
    const source = addText(links, "a", preparing.source_name || "View original source");
    source.href = preparing.source_url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
  }
  const method = addText(links, "a", "View methodology");
  method.href = "methodology.html";
  state.append(links);
  container.append(state);
}

function appendDetail(list, label, value) {
  if (value == null || value === "") return;
  const item = document.createElement("div");
  item.className = "result-item";
  addText(item, "span", label);
  addText(item, "strong", String(value));
  list.append(item);
}

function renderSupplements(article, dataset, record) {
  const supplements = engine.getApplicableSupplements(dataset, record);
  if (!supplements.length) return;
  const section = document.createElement("section");
  section.className = "wage-supplements";
  addText(section, "h3", "Possible supplements");
  addText(
    section,
    "p",
    "These additions are published for this agreement. They are not added automatically to the wage above. Whether they apply depends on the working time and other conditions.",
    "muted"
  );
  const list = document.createElement("ul");
  list.className = "supplement-list";
  supplements.forEach((supplement) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = supplement.name;
    item.append(title);
    const detail = [];
    if (supplement.amount != null) {
      detail.push(`${engine.formatWage({ amount: supplement.amount, unit: supplement.unit || "EUR_HOUR" })}`);
    }
    if (supplement.calculation_rule) detail.push(supplement.calculation_rule);
    if (supplement.conditions) detail.push(supplement.conditions);
    item.append(document.createTextNode(` — ${detail.join(" ")}`));
    list.append(item);
  });
  section.append(list);
  article.append(section);
}

function renderResult(container, occupation, record, dataset) {
  container.replaceChildren();
  const article = document.createElement("article");
  article.className = "panel wage-result";
  addText(article, "p", "Wage information", "eyebrow");
  addText(article, "h2", occupation.name);

  const hourly = engine.formatWage(record.wage);
  const monthly = engine.formatMonthlyAmount(record.wage);
  if (hourly) {
    const primary = document.createElement("div");
    primary.className = "wage-primary";
    addText(primary, "span", engine.wageTypeLabel(record.wage.type));
    addText(primary, "strong", hourly);
    if (monthly) addText(primary, "p", monthly, "wage-primary__monthly");
    article.append(primary);
  }

  const agreement = engine.getAgreement(dataset, record.agreement_id);
  const details = document.createElement("div");
  details.className = "result-list wage-result__details";
  appendDetail(details, "Classification", classificationLabel(record.classification));
  appendDetail(details, "Collective agreement", agreement && (agreement.short_name || agreement.name));
  appendDetail(details, "Source", record.source_name);
  appendDetail(details, "Effective from", engine.formatDate(record.effective_from));
  appendDetail(details, "Last checked", engine.formatDate(record.last_verified));
  if (details.childElementCount) article.append(details);

  recordNotices(record, dataset).forEach((notice) => {
    addText(article, "p", notice, "notice");
  });

  const meaning = document.createElement("section");
  meaning.className = "wage-meaning";
  addText(meaning, "h3", "What does this mean?");
  addText(meaning, "p", record.notes || engine.wageTypeExplanation(record.wage.type));
  addText(
    meaning,
    "p",
    "Labour Finland checks the source and validity period before publishing a wage figure.",
    "muted"
  );
  article.append(meaning);

  renderSupplements(article, dataset, record);

  const actions = document.createElement("div");
  actions.className = "button-row";
  if (record.source_url) {
    const source = addText(actions, "a", "View original source", "button button--secondary");
    source.href = record.source_url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
  }
  if (record.wage.unit === "EUR_HOUR" && Number.isFinite(record.wage.amount)) {
    const calc = addText(actions, "a", "Calculate my earnings →", "button");
    calc.href = calculatorUrl(occupation, record);
  }
  article.append(actions);
  container.append(article);
}

function renderWageTable(container, occupation, records, dataset, onBack) {
  container.replaceChildren();
  const article = document.createElement("article");
  article.className = "panel wage-result wage-table-card";
  addText(article, "p", "Wage information", "eyebrow");
  addText(article, "h2", occupation.name);
  addText(article, "h3", "Wage table");
  addText(
    article,
    "p",
    "Labour Finland does not choose a classification for you. Check your employment information, employer or the relevant organisation, then select a group if you know it."
  );

  const sample = records[0];
  const agreement = sample && engine.getAgreement(dataset, sample.agreement_id);
  if (agreement) {
    addText(article, "p", `Collective agreement: ${agreement.short_name || agreement.name}.`, "muted");
  }
  if (sample) {
    addText(
      article,
      "p",
      `Effective from ${engine.formatDate(sample.effective_from)}${sample.last_verified ? `. Last checked ${engine.formatDate(sample.last_verified)}` : ""}.`,
      "muted"
    );
    recordNotices(sample, dataset).forEach((notice) => {
      addText(article, "p", notice, "notice");
    });
  }

  const sorted = records.slice().sort((a, b) => a.wage.amount - b.wage.amount);
  const tableWrap = document.createElement("div");
  tableWrap.className = "table-scroll";
  const table = document.createElement("table");
  table.className = "wage-table";
  const caption = document.createElement("caption");
  caption.textContent = `${occupation.name} collective-agreement wage scale`;
  table.append(caption);
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th scope=\"col\">Classification</th><th scope=\"col\">Hourly</th><th scope=\"col\">Monthly</th></tr>";
  table.append(thead);
  const tbody = document.createElement("tbody");
  sorted.forEach((record) => {
    const row = document.createElement("tr");
    const cls = document.createElement("th");
    cls.scope = "row";
    cls.textContent = classificationLabel(record.classification) || record.classification.pay_group || "—";
    const hour = document.createElement("td");
    hour.textContent = engine.formatWage(record.wage) || "—";
    const month = document.createElement("td");
    month.textContent = engine.formatMonthlyAmount(record.wage) || "—";
    row.append(cls, hour, month);
    tbody.append(row);
  });
  table.append(tbody);
  tableWrap.append(table);
  article.append(tableWrap);

  const cards = document.createElement("div");
  cards.className = "wage-table-cards";
  sorted.forEach((record) => {
    const card = document.createElement("div");
    card.className = "wage-scale-card";
    addText(card, "strong", classificationLabel(record.classification) || "Grade");
    addText(card, "p", engine.formatWage(record.wage) || "");
    const monthly = engine.formatMonthlyAmount(record.wage);
    if (monthly) addText(card, "p", monthly, "muted");
    cards.append(card);
  });
  article.append(cards);

  addText(
    article,
    "p",
    "These figures are collective-agreement wage-scale amounts. They are not averages or medians.",
    "muted"
  );

  const actions = document.createElement("div");
  actions.className = "button-row";
  if (onBack) {
    const back = addText(actions, "button", "Back", "button button--secondary");
    back.type = "button";
    back.addEventListener("click", onBack);
  }
  if (sample && sample.source_url) {
    const source = addText(actions, "a", "View original source", "button");
    source.href = sample.source_url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
  }
  article.append(actions);
  container.append(article);
}

function renderQuestion(container, occupation, question, onSelect, onBack, canGoBack) {
  container.replaceChildren();
  container.hidden = false;
  addText(container, "p", question.lead || "A few details can affect the applicable wage.", "muted");
  addText(container, "h3", question.prompt);
  const options = document.createElement("div");
  options.className = "choice-list";
  options.setAttribute("role", "listbox");
  options.setAttribute("aria-label", question.prompt);
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.setAttribute("role", "option");
    button.textContent = option.label;
    button.addEventListener("click", () => onSelect(question.answer_key, option.value));
    options.append(button);
  });
  container.append(options);
  if (question.why) {
    const why = document.createElement("details");
    why.className = "why-details";
    addText(why, "summary", "Why are we asking this?");
    addText(why, "p", question.why, "muted");
    container.append(why);
  }
  if (canGoBack) {
    const back = addText(container, "button", "Back", "button button--secondary button--small");
    back.type = "button";
    back.addEventListener("click", onBack);
  }
}

function renderOccupationChoice(container, matches, onSelect) {
  container.replaceChildren();
  container.hidden = false;
  addText(container, "p", "We need one more detail to find the right wage information.", "muted");
  addText(container, "h3", "Which job is closest to your work?");
  const options = document.createElement("div");
  options.className = "choice-list";
  matches.forEach((occupation) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = occupation.name;
    button.addEventListener("click", () => onSelect(occupation));
    options.append(button);
  });
  container.append(options);
}

function hideQuestionFlow(container) {
  container.hidden = true;
  container.replaceChildren();
}

const DIRECTORY_GROUPS = [
  ["cleaning-property", "Cleaning & property services"],
  ["hospitality-restaurants", "Hospitality & restaurants"],
  ["retail-commerce", "Retail & commerce"],
  ["logistics", "Logistics"],
  ["construction", "Construction"],
  ["health-social-care", "Health & social care"],
  ["security", "Security"],
  ["office-administration", "Office & administration"],
  ["it-technology", "IT & technology"],
];

function renderOccupationDirectory(container, dataset, onSelect) {
  container.replaceChildren();
  DIRECTORY_GROUPS.forEach(([groupId, title]) => {
    const occupations = dataset.occupations.filter(
      (occupation) => occupation.status === "ACTIVE" && occupation.directory_group === groupId
    );
    if (!occupations.length) return;
    const section = document.createElement("section");
    section.className = "directory-group";
    addText(section, "h3", title);
    const list = document.createElement("div");
    list.className = "directory-list";
    occupations.forEach((occupation) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "directory-card";
      addText(button, "strong", occupation.name);
      const status = engine.occupationLookupStatus(dataset, occupation);
      addText(button, "span", engine.lookupStatusLabel(status), "directory-status");
      button.addEventListener("click", () => onSelect(occupation));
      list.append(button);
    });
    section.append(list);
    container.append(section);
  });
}

function bindAutocomplete(input, list, occupations, onChoose) {
  let activeIndex = -1;
  let suggestions = [];

  const hide = () => {
    list.hidden = true;
    list.replaceChildren();
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-activedescendant", "");
    activeIndex = -1;
    suggestions = [];
  };

  const highlight = () => {
    [...list.children].forEach((item, index) => {
      item.setAttribute("aria-selected", String(index === activeIndex));
      if (index === activeIndex) input.setAttribute("aria-activedescendant", item.id);
    });
  };

  const show = (query) => {
    suggestions = engine.searchOccupations(occupations, query, 6);
    list.replaceChildren();
    if (!suggestions.length) {
      hide();
      return;
    }
    suggestions.forEach((occupation) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "suggestion";
      option.id = `occupation-option-${occupation.id}`;
      option.setAttribute("role", "option");
      option.textContent = occupation.name;
      option.addEventListener("mousedown", (event) => event.preventDefault());
      option.addEventListener("click", () => onChoose(occupation));
      list.append(option);
    });
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    activeIndex = -1;
  };

  input.addEventListener("input", () => show(input.value));
  input.addEventListener("focus", () => {
    if (input.value.trim()) show(input.value);
  });
  input.addEventListener("blur", () => {
    window.setTimeout(hide, 120);
  });
  input.addEventListener("keydown", (event) => {
    if (list.hidden) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % suggestions.length;
      highlight();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1;
      highlight();
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      onChoose(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      hide();
    }
  });

  return { hide };
}

async function initializeWageLookup() {
  const form = document.querySelector("[data-wage-form]");
  const output = document.querySelector("[data-wage-results]");
  const questionFlow = document.querySelector("[data-question-flow]");
  const input = document.querySelector("#occupation");
  const suggestions = document.querySelector("[data-occupation-suggestions]");
  if (!form || !output || !questionFlow || !input) return;

  let dataset;
  try {
    dataset = await loadDataset();
  } catch {
    renderPreparingState(output, "", true);
    return;
  }

  const state = {
    occupation: null,
    answers: {},
    history: [],
  };

  const renderResolved = () => {
    const result = engine.resolveWage(dataset, state.occupation, state.answers);
    if (result.status === "NEEDS_QUESTION") {
      output.replaceChildren();
      renderQuestion(
        questionFlow,
        state.occupation,
        result.question,
        (key, value) => {
          state.history.push({ ...state.answers });
          state.answers = { ...state.answers, [key]: value };
          renderResolved();
        },
        () => {
          state.answers = state.history.pop() || {};
          renderResolved();
        },
        state.history.length > 0
      );
      questionFlow.focus();
      return;
    }
    hideQuestionFlow(questionFlow);
    if (result.status === "RESOLVED") {
      renderResult(output, state.occupation, result.record, dataset);
    } else if (result.status === "SHOW_TABLE" && result.records && result.records.length) {
      renderWageTable(output, state.occupation, result.records, dataset, () => {
        state.answers = state.history.pop() || {};
        renderResolved();
      });
    } else {
      renderPreparingState(output, state.occupation, false, result);
    }
    output.focus();
  };

  const applyOccupationSeo = (occupation) => {
    if (!/wages\.html$/i.test(window.location.pathname)) return;
    document.title = `${occupation.name} wages in Finland | Labour Finland`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://labourfinland.com/wages.html?occupation=${encodeURIComponent(occupation.slug || occupation.id)}`;
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${occupation.name} wages in Finland | Labour Finland`);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `https://labourfinland.com/wages.html?occupation=${encodeURIComponent(occupation.slug || occupation.id)}`);
    }
  };

  const startOccupation = (occupation) => {
    state.occupation = occupation;
    state.answers = {};
    state.history = [];
    input.value = occupation.name;
    if (suggestions) {
      suggestions.hidden = true;
      suggestions.replaceChildren();
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-activedescendant", "");
    }
    const url = new URL(window.location.href);
    url.searchParams.set("occupation", occupation.slug || occupation.id);
    window.history.replaceState({}, "", url);
    applyOccupationSeo(occupation);
    renderResolved();
  };

  const autocomplete = bindAutocomplete(input, suggestions, dataset.occupations, (occupation) => {
    autocomplete.hide();
    startOccupation(occupation);
  });

  const popularContainer = document.querySelector("[data-popular-occupations]");
  const popularSection = document.querySelector("[data-popular-section]");
  if (popularContainer && popularSection) {
    popularOccupations(dataset.occupations).forEach((occupation) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip";
      button.textContent = occupation.name;
      button.addEventListener("click", () => startOccupation(occupation));
      popularContainer.append(button);
    });
    popularSection.hidden = false;
  }

  const directory = document.querySelector("[data-occupation-directory]");
  if (directory) renderOccupationDirectory(directory, dataset, startOccupation);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    autocomplete.hide();
    const matches = engine.findOccupations(dataset.occupations, input.value);
    if (matches.length === 1) {
      startOccupation(matches[0]);
      return;
    }
    if (matches.length > 1) {
      output.replaceChildren();
      renderOccupationChoice(questionFlow, matches, startOccupation);
      return;
    }
    hideQuestionFlow(questionFlow);
    renderPreparingState(output, input.value.trim() || "Occupation");
    output.focus();
  });

  const requested = new URLSearchParams(window.location.search).get("occupation");
  if (requested) {
    const matches = engine.findOccupations(dataset.occupations, requested);
    if (matches.length === 1) startOccupation(matches[0]);
    else if (matches.length > 1) renderOccupationChoice(questionFlow, matches, startOccupation);
    else {
      input.value = requested;
      renderPreparingState(output, requested);
    }
  }
}

initializeWageLookup();

window.LabourFinlandWages = {
  loadDataset,
  occupationUrl,
};
