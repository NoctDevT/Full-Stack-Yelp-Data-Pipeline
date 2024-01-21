import { Client } from "pg";
import playwright, { Browser, BrowserContext, Page } from "playwright";
import random_useragent from "random-useragent";

// const BASE_URL =
// const BASE_URL = "https://www.yelp.co.uk/search?find_desc=Restaurants&find_loc=New+York%2C+NY%2C+United+States"

const URLs =
 [  "https://www.yelp.ca/search?find_desc=Restaurants&fiz`nd_loc=Toronto%2C+ON", 
    "https://www.yelp.co.uk/search?find_desc=Restaurants&find_loc=New+York%2C+NY%2C+United+States",
    "https://www.yelp.com/search?find_desc=Restaurants&find_loc=Glasgow",
    "https://www.yelp.com/search?find_desc=Restaurants&find_loc=Chicago%2C+IL",
    "https://www.yelp.com/search?find_desc=Restaurants&find_loc=Los+Angeles%2C+CA%2C+United+States",
    "https://www.yelp.com/search?find_desc=Restaurants&find_loc=San+Diego%2C+CA%2C+United+States",
    "https://www.yelp.com/search?find_desc=Restaurants&find_loc=Vancouver%2C+British+Columbia%2C+Canada"

  ];

interface Restaurant {
  name: string;
  image: string;
  telephone: string;
  address: {
    StreetAddress: string;
    addressRegion: string;
    addressThirdLine: string; // postal code
    addressCountry: string;
  };  
  rating: { ratingValue: string; ratingCount: string };
  cuisineType: string;
  description: string;
}

export const storeDataInDb = async (
  client: Client,
  restaurants: Restaurant[]
): Promise<void> => {
  try {
    for (const restaurant of restaurants) {
      const query = `
    INSERT INTO YelpTable (name, image, telephone, street_address, address_region, address_third_line, address_country, rating_value, rating_count, cuisine_type, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `;
      const rValue = [
        restaurant.name,
        restaurant.image,
        restaurant.telephone,
        restaurant.address.StreetAddress,
        restaurant.address.addressRegion,
        restaurant.address.addressThirdLine,
        restaurant.address.addressCountry,
        restaurant.rating.ratingValue,
        restaurant.rating.ratingCount,
        restaurant.cuisineType,
        restaurant.description,
      ];
      await client.query(query, rValue);
    }
    console.log("Data has been inserted into DB");
  } catch (err) {
    console.error("Error inserting data into DB", err);
  } finally {
  }
};

export const scrapeData = async (page: Page): Promise<Restaurant[]> => {
  const restaurants: Restaurant[] = [];

  // get Links
  const links = await page.$$eval(
    "div[class^='businessName'] span a",
    (anchorElements) => {
      return anchorElements.map((anchor) => (anchor as HTMLAnchorElement).href);
    }
  );

  // Removing sponsored links
  const nonSponsoredLinks = links.filter((link) => !link.includes("/adredir?"));

  console.log({ nonSponsoredLinks: nonSponsoredLinks });

  // Going through links one by one
  // Accessing JSON payload within scripts
  for (const link of nonSponsoredLinks) {
    await page.goto(link);
    console.log("break 4");

    const scriptsLocator = page.locator("yelp-react-root div script");
    const scripts = await scriptsLocator.evaluateAll((elements) =>
      elements.map((e) => e.innerHTML)
    );

    const resterauntScript = scripts.find((script: string) => {
      try {
        const jsonData = JSON.parse(script);
        return jsonData["@type"] === "Restaurant";
      } catch (e) {
        return false;
      }
    });

    if (resterauntScript) {
      const restaurantPayload = JSON.parse(resterauntScript);

      console.log({ restaurantPayload: restaurantPayload });

      console.log(restaurantPayload);
      let description: string;
      // getting Description
      try {
        await page.click(
          'button.css-o4dj9w[type="submit"]:has(span:has-text("Read More"))'
        );
        const modalData = await page.$$eval(".css-11k8aw1", (elements) => {
          if (elements.length === 0) {
            throw new Error("Elements not found");
          }
          return elements.map((element) => element.textContent?.trim());
        });
        description = modalData.join(" ").replace(/\n/g, " ");
      } catch (e) {
        description = "No description found";
      }

      console.log(restaurantPayload);

      const restaurant: Restaurant = {
        name: restaurantPayload.name,
        image: restaurantPayload.image,
        telephone: restaurantPayload.telephone,
        address: {
          StreetAddress: restaurantPayload.address.streetAddress,
          addressRegion: restaurantPayload.address.addressRegion,
          addressThirdLine: restaurantPayload.address.postalCode,
          addressCountry: restaurantPayload.address.addressCountry,
        },
        rating: {
          ratingValue: restaurantPayload.aggregateRating.ratingValue,
          ratingCount: restaurantPayload.aggregateRating.reviewCount,
        },
        cuisineType: restaurantPayload.servesCuisine,
        description: description,
      };

      console.log(restaurant);

      restaurants.push(restaurant);
    }
  }
  return restaurants;
};

const ifTableNotExist = async (client: Client): Promise<void> => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS YelpTable (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      image VARCHAR(255),
      telephone VARCHAR(50),
      street_address TEXT,
      address_region VARCHAR(100),
      address_third_line VARCHAR(50),
      address_country VARCHAR(50),
      rating_value VARCHAR(50),
      rating_count VARCHAR(50),
      cuisine_type VARCHAR(100),
      description TEXT
  );`;

  await client.query(createTableQuery);
};

(async () => {
  // const agent: string = random_useragent.getRandom();
  const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

  const browser: Browser = await playwright.chromium.launch({ headless: true });
  // const context = await browser.newContext({ userAgent: agent, bypassCSP: true });
  // const page: Page = await context.newPage();

  // await page.setDefaultTimeout(30000);
  // await page.setViewportSize({ width: 800, height: 600 });
  // await page.goto(BASE_URL);

  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  try {
    await ifTableNotExist(client);

    for (const url of URLs) {
      const userAgent : string = random_useragent.getRandom();
      const context = await browser.newContext({
        userAgent: userAgent,
        bypassCSP: true,
      });

      console.log(userAgent)

      const page = await context.newPage();
      await page.goto(url);

      await page.setDefaultTimeout(30000);
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto(url);

      const restaurantData = await scrapeData(page);
      await storeDataInDb(client, restaurantData);

      await page.close();
      await context.close();
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
    await browser.close();
  }
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
