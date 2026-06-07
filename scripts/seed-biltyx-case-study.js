process.env.SANITY_TOKEN = 'skgnGuiKBa1ZQKvlUxO6WlcMfpkVqXeu3hjaUbWXPg12CExV6XG0EzKMfCUgYDZYwYQg7yoRgrd0jrjOLalKzFaovLiCq2fn6INcPWZRjo3duPAZhyUZt5DxlL8moQWW7jPyqGzvXkhL2XdUBbiux2XGJBwgb4kLDuITY4QIFUyq8XCxZ0ud';
/**
 * Seed BiltyX Case Study into Sanity
 *
 * Usage:
 *   node scripts/seed-biltyx-case-study.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId:  'ga7xrwxs',
  dataset:    'production',
  apiVersion: '2024-04-05',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

const CASE_STUDY = {
  _id:   'case-study-biltyx',
  _type: 'caseStudy',

  title:       "BiltyX — Building India's #1 Transport & Bilty App for Packers and Movers",
  slug:        { _type: 'slug', current: 'biltyx' },
  status:      'published',
  featured:    true,
  publishedAt: '2025-01-01T00:00:00.000Z',

  // ── Client ──────────────────────────────────────────────────────────────────
  clientName:    'Ujjawal Poonia',
  clientRole:    'Sole Owner',
  clientCompany: 'BiltyX',
  industry:      'Logistics & Transportation',
  duration:      '6 months',
  liveUrl:       'https://www.biltyx.com',

  // ── Services & Tech ─────────────────────────────────────────────────────────
  services:  ['Full-Stack App', 'API Integration'],
  techStack: ['Angular', 'Ruby on Rails', 'Wicked PDF', 'PostgreSQL', 'Devise + JWT', 'Sidekiq'],

  // ── Content ──────────────────────────────────────────────────────────────────
  summary: `BiltyX is a cross-platform SaaS application (Web, Android, iOS) that digitises the entire paperwork lifecycle of India's packers & movers industry. From bilty generation to GST invoicing, digital signatures, and integrated payment collection — BiltyX replaces every paper form with a fast, professional digital equivalent. Trusted by 100+ companies with a 4.8/5 user rating.`,

  challenge: `India has over 500,000 registered packers & movers businesses — and almost all of them run on paper. Every consignment generates a stack of documents: bilty, quotation, GST invoice, survey list, car condition report, money receipts, and more. For a business doing even 5–10 moves a month, that's hundreds of papers per year, filed in folders or lost in drawers.

Key pain points:
• Lost documents led to billing disputes and unpaid invoices
• Manual duplication — writing the same customer details across five forms per trip
• No trip or payment tracking without calling someone directly
• No professional image — handwritten bilties are a liability with enterprise clients
• Customer signatures required physical presence
• No guided onboarding — drop-off before first use was the primary churn risk
• No integrated payment layer — subscription and in-app billing were fully manual
• Zero business intelligence — no insight into revenue, outstanding payments, or top customers

Enterprise logistics ERPs existed but were priced for large fleet operators. There was a clear gap: an affordable, mobile-first operations platform built specifically for small-to-mid Indian transport businesses.`,

  solution: `I built the full backend and product architecture on Ruby on Rails, with Prerna Rawal handling the Angular frontend.

Automated Onboarding Engine: On registration, a background job chain provisions the company's isolated workspace, assigns default document templates, creates the owner user with admin permissions, and dispatches a guided setup checklist — all asynchronously so registration stays under 200ms. This eliminated drop-off at the most critical point in the user lifecycle.

Integrated Payment Gateway — two flows:
1. Subscription billing — server-side order creation, webhook-based confirmation (not client callback). Prevents the classic "paid at gateway but unconfirmed on our side" failure mode.
2. In-app payment collection — operators generate a secure payment link from any invoice. Customer pays via UPI/card/net banking. Webhook fires, record updates, money receipt auto-generates — entire loop is server-side and connectivity-robust.

Document Generation Engine: Wicked PDF powers server-side, print-quality PDF generation for 10 document types: Bilty/LR, Quotation, GST Invoice, Survey List (with shareable customer-fill link), Article List, Money Receipt, Car Condition Report, Letterhead, NOC Letter, and OK Receiving.

Multi-tenancy & Security: Each company's data is fully scoped at the database level. Soft deletes across all document and payment records preserve a permanent audit trail. Role-based access control scoped per company (not global).

Cross-platform: Web, Android, iOS — including a dedicated iOS web app. A transporter in the field creates a bilty on their phone; the office pulls it on desktop.`,

  // ── Results / Metrics ──────────────────────────────────────────────────────
  results: [
    { _key: 'r1', _type: 'metric', label: 'Registered Companies',        value: '100+',    icon: '🏢' },
    { _key: 'r2', _type: 'metric', label: 'Documents Generated',          value: '3,000+',  icon: '📄' },
    { _key: 'r3', _type: 'metric', label: 'Document Design Templates',    value: '10+',     icon: '🎨' },
    { _key: 'r4', _type: 'metric', label: 'User Rating',                  value: '4.8/5',   icon: '⭐' },
    { _key: 'r5', _type: 'metric', label: 'Paperwork Reduction',          value: '100%',    icon: '♻️' },
    { _key: 'r6', _type: 'metric', label: 'Time to First Document',       value: '<10 min', icon: '⚡' },
    { _key: 'r7', _type: 'metric', label: 'Payment Failures Post-Launch', value: '0',       icon: '✅' },
    { _key: 'r8', _type: 'metric', label: 'Platforms',                    value: '3',       icon: '📱' },
  ],

  // ── Testimonial ─────────────────────────────────────────────────────────────
  testimonialQuote:  'BiltyX transformed how we run our transport business. What used to take hours of paperwork now takes minutes — and our documents look completely professional.',
  testimonialAuthor: 'Ujjawal Poonia, Sole Owner — BiltyX',
};

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('\nERROR: SANITY_TOKEN is not set.\n');
    process.exit(1);
  }

  console.log('\n💼  Seeding BiltyX case study → project: ga7xrwxs / production\n');

  try {
    const result = await client.createOrReplace(CASE_STUDY);
    console.log('✅  Created / updated: ' + result._id);
    console.log('    Title:  ' + result.title);
    console.log('    Slug:   ' + result.slug.current);
    console.log('    Status: ' + result.status);
    console.log('\nDone! Open Sanity Studio to add the cover image.\n');
  } catch (err) {
    console.error('❌  Error: ' + err.message);
    process.exit(1);
  }
}

main();
