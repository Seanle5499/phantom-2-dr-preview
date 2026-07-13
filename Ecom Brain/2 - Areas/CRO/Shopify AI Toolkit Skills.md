# Shopify AI Toolkit Skills

> Open-source plugin (April 2025) connecting AI agents to Shopify's dev platform. 16 agent skills for building, validating, and executing store changes.
> GitHub: https://github.com/Shopify/Shopify-AI-Toolkit

## Installation Methods

| Method | Command | Auto-Update |
|---|---|---|
| Plugin (recommended) | Install via IDE plugin manager | Yes |
| Manual (all skills) | `npx skills add Shopify/shopify-ai-toolkit` | No |
| Manual (single skill) | `npx skills add Shopify/shopify-ai-toolkit --skill shopify-liquid` | No |
| Dev MCP Server | Local MCP for doc search + validation | Yes |

## All 16 Skills

### Core Store Management
| Skill | Purpose | Use When |
|---|---|---|
| `shopify-admin` | Admin GraphQL API — products, orders, collections, store config | Managing store data, querying products, building admin integrations |
| `shopify-admin-execution` | Execute real store operations via CLI | Pushing live changes: product updates, inventory, config adjustments |
| `shopify-custom-data` | Metafields & metaobjects | Adding custom content fields (hero copy, badges, trust signals, FAQs) |

### Theme & Storefront
| Skill | Purpose | Use When |
|---|---|---|
| `shopify-liquid` | Liquid template validation, LiquidDoc headers, schema validation | Building/customizing theme sections, templates, snippets |
| `shopify-hydrogen` | Hydrogen React framework (headless commerce) | Building headless storefronts with React/Remix |
| `shopify-storefront-graphql` | Storefront API queries | Querying products/collections from the storefront side |

### Extensions & UI (Polaris)
| Skill | Purpose | Use When |
|---|---|---|
| `shopify-polaris-admin-extensions` | Admin UI extensions | Building custom admin panels/widgets |
| `shopify-polaris-app-home` | App home UI with Polaris components | Building app dashboards (templates: Homepage, Index, Details, Settings) |
| `shopify-polaris-checkout-extensions` | Checkout UI extensions | Customizing checkout flow (upsells, trust badges, custom fields) |
| `shopify-polaris-customer-account-extensions` | Customer account extensions | Customizing customer account pages |
| `shopify-polaris-thank-you-extensions` | Thank-you / order status extensions | Post-purchase upsells, order tracking customization |

### Serverless & Logic
| Skill | Purpose | Use When |
|---|---|---|
| `shopify-functions` | Serverless compute for checkout & discount customization | Custom discount logic, checkout rules, delivery customization |
| `shopify-payments-apps` | Payments app integration | Building custom payment methods |

### Developer & Partner
| Skill | Purpose | Use When |
|---|---|---|
| `shopify-partner` | Partner API GraphQL | Managing apps, stores, earnings via Partner dashboard API |
| `shopify-onboarding-dev` | Developer onboarding | First-time Shopify dev setup |
| `shopify-onboarding-merchant` | Merchant onboarding | First-time store owner setup |

## Landing Page Relevant Skills

For building a high-converting landing page (tactical/EDC niche):

1. **`shopify-liquid`** — Hero sections, product grids, trust bars, testimonial blocks
2. **`shopify-custom-data`** — Metafields for dynamic hero copy, badge icons, USP text
3. **`shopify-admin`** — Product/collection setup, navigation, page management
4. **`shopify-admin-execution`** — Push all changes live
5. **`shopify-polaris-checkout-extensions`** — Checkout trust badges, upsells
6. **`shopify-polaris-thank-you-extensions`** — Post-purchase flow

## Important Warnings

- **No undo button** — Store changes via agent are permanent. No version history, no rollback.
- **Telemetry** — Code is sent to Shopify servers by default. Set `OPT_OUT_INSTRUMENTATION=true` to opt out.
- **Manual skills don't auto-update** — Plugin install is recommended for staying current.
- **Requires**: Node.js 18+, Shopify Partner account, CLI access

## Related
- [[CRO MOC]]
- [[Landing Pages]]
- [[Checkout Flow]]
