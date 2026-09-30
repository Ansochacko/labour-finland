# Labour Finland

Independent wage and working-life information for Finland.

**SOURCE → DATE → NUMBER → EXPLANATION**

Accuracy takes priority over completeness. TES amounts come from checked collective-agreement sources. Statistics Finland Structure of Earnings 2024 figures are labelled as official statistics (CC BY 4.0), not as TES minima. Missing data is shown as **Data not yet verified**.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/`.

```powershell
npm run build
npm start
```

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- JSON data in `/data`
- Vercel hosting

## Add a verified TES wage record

1. Confirm the occupation in `data/occupations.json`.
2. Confirm the agreement in `data/collective-agreements.json` with a real source URL.
3. Append a record to `data/wage-records.json` with amount, unit, wage type, classification, `effective_from` / `effective_until`, `source_name`, `source_url`, `last_verified`, and `verification_status: "VERIFIED"`.
4. Do not invent amounts, grades or URLs.
5. Run `npm run dev` and open `/wages/[slug]-salary-finland`.

## Statistics Finland figures

`data/statfin-records.json` was retrieved from table **15au** (Structure of Earnings 2024) via the PxWeb API on 2026-09-19. Attribution: Statistics Finland, CC BY 4.0. Confidential cells are omitted, not estimated.

## Custom domain on Vercel

1. Import the GitHub repo into Vercel (framework: Next.js).
2. Add `labourfinland.com` and `www.labourfinland.com`.
3. Keep DNS A records on Vercel. Do not change nameservers if email uses the same domain.
4. Canonical host is `https://labourfinland.com`. `vercel.json` redirects www to apex.

## BEFORE PUBLIC LAUNCH

- [ ] Complete operator / controller identity on `/about` and `/privacy`
- [ ] Configure a real contact method (`NEXT_PUBLIC_FORM_ENDPOINT` or a published email)
- [ ] Confirm privacy text matches actual Vercel Analytics settings
- [ ] Google Search Console: Domain property `labourfinland.com`, sitemap `https://labourfinland.com/sitemap.xml`
- [ ] AdSense only after approval — do not paste a fake publisher ID
- [ ] Legal review of TES table publication and disclaimer

## Tests for the wage engine

```powershell
node tests/wage-engine.test.js
node tests/cleaner-production.test.js
```
