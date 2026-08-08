# Poissonnerie Sherbrooke

A bilingual editorial website for Poissonnerie Sherbrooke in Montréal. The site includes English and Québec French routes for the market, Chef Paul’s menu, catering, story, contact, privacy, and a custom 404 page.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` if online inquiry delivery is needed.
3. Add a Resend API key and destination email.
4. Start locally with `npm run dev`.
5. Validate with `npm run build` and `npm run lint`.

Without email credentials, forms remain development-safe and direct visitors to the verified telephone number and email address.

## Editing content

- Business details, hours, bilingual copy, routes, product categories, menu groups, and photography credits: `lib/content.ts`
- Page structures and form behavior: `components/SeafoodSite.tsx`
- Visual system and responsive styling: `app/globals.css`
- Inquiry delivery and validation: `app/api/inquiry/route.ts`
- Replaceable editorial photographs: `public/seafood/`

Temporary promotions are intentionally omitted by default. Add only verified, current promotions and holiday hours.
