const { chromium } = require('playwright');

const KOC_URLS = [
  { id: '61811', title: "Brothers' Regret After I Left", url: 'https://www.goodshort.com/koc/GRKOCAWTT988493/988493-KOC' },
  { id: '61793', title: 'Ring Off Crown On', url: 'https://www.goodshort.com/koc/GRKOCAWTT989777/989777-KOC' },
  { id: '61816', title: 'Too Late, My Ex - I Belong to the Dragon King Now', url: 'https://www.goodshort.com/koc/GRKOCAWTT988864/988864-KOC' },
  { id: '61789', title: 'Queen Reborn, A Gambit Unfolded', url: 'https://www.goodshort.com/koc/GRKOCAWTT988449/988449-KOC' },
  { id: '60987', title: "You're Hired, Billionaire Callboy", url: 'https://www.goodshort.com/koc/GRKOCAWTT988454/988454-KOC' },
  { id: '61019', title: 'Choosing the Right One', url: 'https://www.goodshort.com/koc/GRKOCAWTT989359/989359-KOC' },
  { id: '60630', title: 'Reborn for Revenge, I Went Mad 2', url: 'https://www.goodshort.com/koc/GRKOCAWTT989793/989793-KOC' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const drama of KOC_URLS) {
    console.log(`\n=== ${drama.title} (${drama.id}) ===`);
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const page = await context.newPage();

    // Capture all network requests to find onelink
    const onelinks = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('onelink')) {
        onelinks.push(url);
      }
    });

    // Also capture navigation
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        const url = frame.url();
        if (url.includes('onelink')) {
          onelinks.push(url);
        }
      }
    });

    try {
      await page.goto(drama.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);

      // Try to find download buttons and get their href
      const links = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a[href]');
        return Array.from(anchors).map(a => a.href);
      });

      const relevantLinks = links.filter(l => l.includes('onelink') || l.includes('app.link') || l.includes('itunes') || l.includes('play.google'));
      console.log('  Page links with onelink/appstore:', relevantLinks);

      // Try clicking the first download button/image
      const clickTargets = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img[alt="down"], img[src*="google"], img[src*="apple"], .download img');
        return Array.from(imgs).map(i => ({ alt: i.alt, src: i.src, parent: i.parentElement?.tagName, parentHref: i.parentElement?.href, grandParentHref: i.parentElement?.parentElement?.href }));
      });
      console.log('  Download image elements:', JSON.stringify(clickTargets, null, 2));

      // Click the Google Play image (first download button)
      const googleImg = await page.$('img[src*="google"]');
      if (googleImg) {
        const parent = await googleImg.evaluateHandle(el => el.parentElement);
        const href = await parent.evaluate(el => el.href || el.getAttribute('href') || '');
        console.log('  Google button href:', href);

        // Click it
        await googleImg.click();
        await page.waitForTimeout(3000);
      }

      // Check for any popup/new page
      const pages = context.pages();
      for (const p of pages) {
        if (p.url().includes('onelink')) {
          onelinks.push(p.url());
        }
      }

      console.log('  Captured onelinks:', onelinks);

      // Also check Vue app state for any onelink
      const vueData = await page.evaluate(() => {
        try {
          const app = document.querySelector('#app');
          if (app && app.__vue_app__) {
            const vm = app.__vue_app__._instance;
            return JSON.stringify(vm?.appContext?.config?.globalProperties || {});
          }
        } catch (e) {}
        return null;
      });

      results.push({
        id: drama.id,
        title: drama.title,
        pageLinks: relevantLinks,
        onelinks,
      });

    } catch (e) {
      console.error(`  Error: ${e.message}`);
      results.push({ id: drama.id, title: drama.title, error: e.message });
    } finally {
      await context.close();
    }
  }

  console.log('\n\n========== FINAL RESULTS ==========');
  for (const r of results) {
    console.log(`\n${r.title} (${r.id}):`);
    if (r.error) console.log('  ERROR:', r.error);
    console.log('  Page links:', r.pageLinks);
    console.log('  Onelinks:', r.onelinks);
  }

  await browser.close();
})();
