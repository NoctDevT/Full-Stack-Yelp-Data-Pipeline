import express from 'express';
import { Client } from "pg";
import playwright from "playwright";
import random_useragent from "random-useragent";
import { scrapeData, storeDataInDb } from './script'; 

const app = express();
app.use(express.json()); 
const port = 3000;

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        await performScraping(url);
        res.status(200).send(`Scraping completed for URL: ${url}`);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error during scraping:`);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

async function performScraping(url: string) {
    const DATABASE_URL = process.env.DATABASE_URL;
    const browser = await playwright.chromium.launch({ headless: true });
    const client = new Client({ connectionString: DATABASE_URL });

    try {
        await client.connect();

        const userAgent = random_useragent.getRandom();
        const context = await browser.newContext({
            userAgent: userAgent,
            bypassCSP: true,
        });

        const page = await context.newPage();
        await page.setDefaultTimeout(30000);
        await page.setViewportSize({ width: 800, height: 600 });
        await page.goto(url);

        const restaurantData = await scrapeData(page);
        await storeDataInDb(client, restaurantData);

        await page.close();
        await context.close();
    } catch (error) {
        throw error;
    } finally {
        await client.end();
        await browser.close();
    }
}


