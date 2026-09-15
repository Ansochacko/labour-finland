# Labour Finland

Labour Finland is a static, independent wage and working-life information platform. Its core publishing rule is:

**SOURCE → DATE → NUMBER → EXPLANATION**

Accuracy takes priority over visual completeness. Production V1 currently publishes verified Property Services (Cleaner) wage-scale amounts from PAM. Other occupations remain searchable and show a preparing state until verified records exist.

## Technology

- HTML5, CSS3, vanilla JavaScript and JSON
- No build step, framework, database, authentication, tracking or advertising scripts
- Deployable as a static site

## Project structure

```text
/
├── index.html                 Homepage
├── wages.html                Verified-only wage lookup
├── calculator.html           Gross-pay estimate
├── working-in-finland.html   Guide hub
├── moving-to-finland.html    Newcomer journey hub
├── before-you-arrive.html    Preparation question map
├── after-you-arrive.html     First-steps question map
├── students.html             International student hub
├── workers.html              Worker journey
├── families.html             Family planning hub
├── visas-and-permits.html    Immigration starting-point structure
├── places-in-finland.html    City guide structure
├── everyday-finland.html     Everyday topic structure
├── collective-agreements.html
├── methodology.html          Source and verification policy
├── about.html
├── privacy.html              Must match actual hosting before launch
├── disclaimer.html
├── terms.html                Draft terms; legal review recommended
├── contact.html              Static corrections/feedback status page
├── 404.html
├── css/styles.css
├── js/app.js
├── js/wage-engine.js         Core lookup, dates, questions, validation
├── js/wages.js               Search, questions and result UI
├── js/calculator.js
├── data/occupations.json
├── data/collective-agreements.json
├── data/wage-questions.json
├── data/wage-records.json
├── data/supplements.json
├── data/wages.json           Compatibility stub; contains no amounts
├── data/information.json     Non-wage source-verification schema
├── tests/wage-engine.test.js Isolated development tests; not loaded by the site

├── assets/icons/mark.svg
├── robots.txt
├── sitemap.xml
└── manifest.webmanifest
```

## Run locally

The wage lookup uses `fetch`, so serve the directory over HTTP rather than opening files directly.

```powershell
python -m http.server 8080
```

Open `http://localhost:8080/`. Any static server can be used.

## Edit content

Shared presentation is in `css/styles.css`. Shared navigation, footer year and privacy-choice behavior are in `js/app.js`. Pages are plain HTML and can be edited independently.

Keep claims narrow and sourced. Add wage amounts, legal rules, rates, collective-agreement provisions, dates or source links only after each has been checked against a primary source.

## Add verified newcomer information

`data/information.json` reserves a separate verification model for time-sensitive non-wage information. A future factual entry must identify its topic and path and record:

- source name;
- official source URL;
- last verified date;
- effective dates where applicable;
- verification status.

Use the same statuses as wage data. Do not present a record as verified when its source metadata is incomplete. Immigration, eligibility, tax, healthcare, education, housing, benefit and emergency guidance requires especially careful source and date review. Labour Finland must link readers to the appropriate authority rather than claim to make official or individualized decisions.

## Wage Engine

The lookup follows:

**SOURCE → CLASSIFICATION → VALIDITY DATE → VERIFIED NUMBER → CLEAR EXPLANATION**

Never invent wage amounts, collective-agreement names, pay groups, dates or source URLs. A missing wage is acceptable. An invented wage is not.

### Architecture

1. `occupations.json` defines searchable occupations, aliases and optional question flows.
2. `wage-questions.json` defines human-language questions. A question is shown only when currently valid VERIFIED records actually differ on that answer.
3. `collective-agreements.json` stores agreement identity and source metadata.
4. `wage-records.json` stores classified wage figures.
5. `supplements.json` stores separate evening, night, Sunday, Saturday, overtime or other additions.
6. `js/wage-engine.js` searches, validates, checks dates and resolves records.
7. `js/wages.js` renders search, one-at-a-time questions and results.

Current portable URLs use `wages.html?occupation=cleaner`. Future host rewrites can map `/wages/cleaner` to that lookup without generating empty occupation pages now.

### Occupation schema

```json
{
  "id": "cleaner",
  "name": "Cleaner",
  "slug": "cleaner",
  "aliases": ["cleaning worker", "siivooja"],
  "sector": "property-services",
  "status": "ACTIVE",
  "popular": true,
  "requires_classification": false,
  "question_flow": []
}
```

Add an occupation by appending an ACTIVE record with unique `id` and `slug`. Add aliases that people actually type. Set `requires_classification` and `question_flow` only when verified wage records actually require those answers.

### How to add an alias

Add strings people type to the occupation's `aliases` array. Aliases affect search only. They do not prove that one wage applies to every listed name.

### How to add an agreement

```json
{
  "id": "agreement-id",
  "name": null,
  "short_name": null,
  "sector": null,
  "valid_from": null,
  "valid_until": null,
  "source_name": null,
  "source_url": null,
  "last_verified": null,
  "verification_status": "UNVERIFIED"
}
```

Do not add a source URL until it has been checked. Do not invent an agreement name.

### Wage record schema

```json
{
  "id": "record-id",
  "occupation_id": "cleaner",
  "agreement_id": null,
  "classification": {
    "pay_group": null,
    "experience_level": null,
    "region": null,
    "job_type": null
  },
  "wage": {
    "amount": null,
    "unit": "EUR_HOUR",
    "type": "TES_MINIMUM"
  },
  "effective_from": null,
  "effective_until": null,
  "source_name": null,
  "source_url": null,
  "last_verified": null,
  "notes": null,
  "conditions": null,
  "verification_status": "UNVERIFIED"
}
```

Wage types: `TES_MINIMUM`, `BASE_PAY`, `AVERAGE`, `MEDIAN`, `ACTUAL_OBSERVED`, `ESTIMATE`, `OTHER`. An average or estimate must never be presented as a required minimum.

### Verification statuses

- `VERIFIED`: eligible for public display after validation and date checks.
- `REVIEW_REQUIRED`: withheld until reviewed.
- `EXPIRED`: withheld.
- `UNVERIFIED`: draft or unsupported; withheld.

### Effective dates

Dates use local calendar `YYYY-MM-DD`.

A record is treated as current only when all of these are true:

- `verification_status` is `VERIFIED`
- validation passes, including source URL and last-verified date for numeric VERIFIED records
- today >= `effective_from`
- today <= `effective_until`, or `effective_until` is null

To add a future table, enter it as VERIFIED with a later `effective_from`. It will not display before that date. To retire a rate, set `effective_until` to the last inclusive valid day or change the status.

### Conditional questions

Questions are not a giant form. After an occupation is identified, the engine asks only the next question whose answer is needed to distinguish currently valid VERIFIED records. If none is required, the result is shown immediately.

### How to add a verified wage

1. Confirm the occupation exists.
2. Confirm or add the collective agreement with a checked source URL.
3. Confirm what wage type the number represents.
4. Confirm classification fields that actually affect the published figure.
5. Record `effective_from` and `effective_until` where available.
6. Save the original source URL.
7. Record `last_verified`.
8. Set `verification_status` to `VERIFIED` only after the above are complete.
9. Reload locally and confirm the engine shows the record only inside its validity period.

Broken VERIFIED records are logged to the developer console and are not shown as authoritative.

### How to add a supplement

Add a separate supplement record with occupation, optional agreement, name, amount or calculation rule, conditions, dates, source and status. Do not copy a supplement from one sector to another.

### Source URL verification

Open the source, confirm it is the primary document you extracted from, confirm it is current, and store the exact URL. Never guess a URL.

### Pre-launch data checklist

- [x] Every public numeric wage has a checked source URL and last-verified date
- [x] Effective dates are reviewed
- [x] Future tables are dated correctly
- [x] Expired tables are not current
- [x] Questions match real classification needs
- [ ] No occupation is published with a guessed TES name or pay group
- [ ] Complete operator identity on the privacy page before public launch
- [ ] Configure a public contact method
- [ ] Have a Finnish lawyer review TES extraction, terms, disclaimer and brand use

## Calculator

The calculator computes:

- weekly gross pay = hourly wage × weekly hours
- annual gross pay = weekly gross pay × 52
- average monthly gross pay = annual gross pay ÷ 12

If the visitor arrives from a currently valid verified hourly result, that rate can be pre-filled. The visitor can change it. Shift details appear only when verified applicable supplements exist. The calculator does not calculate tax or net salary.


## Contact and corrections

No public submission form or contact address is configured. The contact page states this without collecting data. Before enabling submissions, configure a real contact method or static form provider, update the privacy policy for that provider and retention practice, and test success and failure states. Keep provider credentials in deployment environment variables, never frontend JavaScript.

## Future information architecture

The content model is prepared to evolve toward `/wages/`, `/calculator/`, `/moving-to-finland/`, `/students/`, `/working-in-finland/` and `/methodology/`. Occupation detail pages can later use stable routes such as `/wages/cleaner`, but must not be generated until substantive verified content exists. V1.1 keeps `.html` URLs for portable static hosting; configure host rewrites and update canonical URLs together when migrating.

### How to run validation

Open the site over HTTP. The wage lookup logs dataset warnings to the developer console. Invalid VERIFIED records are not shown as current pay.

```powershell
node tests/wage-engine.test.js
node tests/cleaner-production.test.js
```

Isolated fixture tests in `tests/wage-engine.test.js` must never be copied into production JSON.

### How to update sitemap

Add a new public HTML page to `sitemap.xml` using the production host `https://labourfinland.com/`. Do not add test files, query-string duplicates or internal JSON.

## Deployment

Production hosting is GitHub → Vercel. The site is static HTML, CSS, JavaScript and JSON. There is no build command and no framework.

### Future updates

1. Edit files in Cursor
2. `git add .`
3. `git commit -m "Description"`
4. `git push`

Vercel deploys the `main` branch automatically.

### Vercel settings

- Framework preset: Other
- Root directory: `.`
- Build command: leave empty
- Output directory: `.`
- Production branch: `main`

`vercel.json` keeps `.html` URLs (`cleanUrls` off) so existing links keep working.

### Rollback

If a deployment breaks, open the Vercel project → Deployments → promote the last good production deployment. Or `git revert` the breaking commit and `git push` to `main`.

### Connect `labourfinland.com`

Add `labourfinland.com` and `www.labourfinland.com` in the Vercel project domain settings. Use only the DNS records Vercel shows for that project. Canonical host is `https://labourfinland.com`. Redirect `www` to the apex host. Confirm HTTPS after DNS has propagated.

## Advertising, consent and analytics

No Google AdSense code or publisher ID exists in V1. `.ad-slot` is a hidden architectural hook only. Add advertising only after a real publisher configuration exists and after privacy disclosures and an appropriate consent-management implementation are ready. Ads must remain visually distinct from navigation, buttons and wage results.

No analytics exists in V1. If analytics is added:

1. choose and document the provider and purpose;
2. update the privacy policy and service-provider list;
3. assess legal basis and consent requirements;
4. prevent optional scripts from loading before required consent;
5. test withdrawal and privacy controls;
6. store secrets or server-only identifiers in host environment variables.

A privacy-choice link is present, but it is not a substitute for a compliant CMP if one becomes necessary.

## BEFORE PUBLIC LAUNCH

- [ ] Complete all owner-information fields
- [ ] Configure and test a contact method
- [ ] Update privacy policy to match actual services
- [ ] Add only verified wage sources and records
- [ ] Check every source link
- [ ] Review expired wage data
- [ ] Connect the domain and canonical redirect
- [ ] Confirm HTTPS works
- [ ] Check `sitemap.xml`
- [ ] Check `robots.txt`
- [ ] Configure Search Console
- [ ] Configure a consent/CMP solution before applicable advertising or analytics tracking
- [ ] Add AdSense only after a real publisher configuration is available
- [ ] Re-test keyboard access, mobile layouts, links and browser console
- [ ] Review public legal and privacy wording for the actual operator and deployment
- [ ] Obtain legal review of terms of use, TES wage-table publication and trademark clearance

This documentation describes engineering safeguards, not a legal guarantee.
