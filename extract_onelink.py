import asyncio
from urllib.parse import quote
from playwright.async_api import async_playwright

KOC_DRAMAS = [
    {"id": "61811", "title": "Brothers' Regret After I Left", "url": "https://www.goodshort.com/koc/GRKOCAWTT988493/988493-KOC", "extCode": "988493"},
    {"id": "61789", "title": "Queen Reborn, A Gambit Unfolded", "url": "https://www.goodshort.com/koc/GRKOCAWTT988449/988449-KOC", "extCode": "988449"},
]

def build_onelink(channel_code, bid, token, ext_code):
    deep_link = f"goodreels://grAdjust?bid={bid}&cid=0&channelCode={channel_code}&token={token}&extType=KOC&extCode={ext_code}"
    c_param = f"gr_{channel_code}_{bid}_{token}_0_and"
    return (
        f"https://grlink.onelink.me/oYuU"
        f"?af_xp=custom"
        f"&pid=web"
        f"&c={quote(c_param)}"
        f"&deep_link_value={quote(deep_link)}"
        f"&af_dp={quote(deep_link)}"
    )

async def main():
    async with async_playwright() as p:
        # Connect to local Chrome with remote debugging
        # Or use headed mode
        browser = await p.chromium.launch(headless=False)
        results = []

        for drama in KOC_DRAMAS:
            print(f"\n=== {drama['title']} ({drama['id']}) ===")
            context = await browser.new_context(
                viewport={"width": 390, "height": 844},
                is_mobile=True,
                user_agent="Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36"
            )
            page = await context.new_page()

            onelinks = []

            async def handle_popup(popup):
                url = popup.url
                if "onelink" in url:
                    onelinks.append(url)
                    print(f"  GOT IT!")

            page.on("popup", handle_popup)

            try:
                print(f"  Loading...")
                await page.goto(drama["url"], wait_until="load", timeout=30000)
                await page.wait_for_timeout(4000)

                # Click the download image
                btn = await page.query_selector(".mgt37 img")
                if btn:
                    print(f"  Clicking download button...")
                    await btn.click()
                    await page.wait_for_timeout(5000)

                if onelinks:
                    print(f"  ONELINK: {onelinks[0]}")
                    results.append({"id": drama["id"], "title": drama["title"], "onelink": onelinks[0]})
                else:
                    print(f"  No onelink captured")
                    results.append({"id": drama["id"], "title": drama["title"], "onelink": None})

            except Exception as e:
                print(f"  Error: {e}")
                results.append({"id": drama["id"], "title": drama["title"], "onelink": None, "error": str(e)})
            finally:
                await context.close()

        print("\n\n========== RESULTS ==========")
        for r in results:
            print(f"\n{r['title']}:")
            print(f"  {r.get('onelink') or 'FAILED: ' + r.get('error', 'no popup')}")

        await browser.close()

asyncio.run(main())
