# FB Ads Library Scraper

> Workflow: Facebook Page link => crawl ads from FB Ad Library => save to `research/`

## How to Use

### 1. Get the Facebook Page's Ad Library Page ID

The profile URL ID (`profile.php?id=XXX`) is **not** the same as the Ad Library page ID.

To find the correct page ID:
- Go to the Facebook Page
- Click **Page Transparency** (or "About" > "Page Transparency")
- Click **See all** under "Ads from this Page"
- You'll be redirected to the Ad Library. The URL will contain `view_all_page_id=XXXXXXXXX` — that's the correct ID

### 2. Create a direct run script

Location: `/Users/sonle/Downloads/crawldata/`

Create a file like `run_BRAND_direct.py`:

```python
import os
from main_pipeline import scrape_page_ads, _save_brand, sync_playwright

def run():
    brand = "BrandName"
    page_id = "XXXXXXXXX"  # from Ad Library URL

    os.makedirs("research", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        brand_pages = [{
            "Brand": brand,
            "Page Name": brand,
            "Facebook Page ID": page_id
        }]

        ads = scrape_page_ads(page, page_id, brand_name=brand)

        if ads:
            _save_brand(brand, brand_pages, ads)
            print(f"[SUCCESS] {len(ads)} ads -> research/{brand}.xlsx")

        browser.close()

if __name__ == "__main__":
    run()
```

### 3. Run

```bash
cd /Users/sonle/Downloads/crawldata
python3 run_BRAND_direct.py
```

### Output

Excel file saved to `research/{BrandName}.xlsx` with 2 sheets:
- **Pages** — Page Name, Facebook Page ID
- **Ads** — Library ID, Start Date, Ad Type, Title, Primary Text, Description, Landing Page, CTA, Media URL

## Brands Researched

| Brand | Page ID | Ads | Date |
|---|---|---|---|
| 2Tactic | 970815972790388 | 303 | 2026-06-15 |

## Notes

- Script uses Playwright (headless=False) — a Chrome window will open
- FB Ad Library lazy-loads ads on scroll; large pages (500+) may not load all cards in one run
- The `source=page-transparency-widget` URL param is required for the page to load properly
- Output dir is set in `main_pipeline.py` via `ADS_OUTPUT_DIR`
