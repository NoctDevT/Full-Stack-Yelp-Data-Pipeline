const BASE_URL = "https://www.yelp.co.uk/search?find_desc=Restaurants&find_loc=London";
const Data = [
    '',
    '',
    '1. The Mayfair Chippy\n' +
        '4.5 (498 reviews)\n' +
        'Fish & Chips\n' +
        '££\n' +
        'Mayfair\n' +
        '\t\n' +
        '\n' +
        "“I'm guessing Mayfair doesn't need my review. We're from the U.S.--but even in the land of Fish and Chips this may be the best you ever have. For the Mayfair…” more",
    '2. Dishoom\n' +
        '4.5 (2.5k reviews)\n' +
        'Indian\n' +
        '££\n' +
        'Covent Garden\n' +
        '\t\n' +
        '\n' +
        '“Kenikmatan dalam bermain judi slot yang ada di indonesia memang sangat menggiurkan karena permainan slot ini merupakan permainan yang sudah lama dikenal di…” more',
    '3. Flat Iron\n' +
        '4.4 (479 reviews)\n' +
        'Steakhouses\n' +
        '££\n' +
        'Soho\n' +
        '\t\n' +
        '\n' +
        "“We came to this location when we were visiting London back in July. We made reservations ahead of time for 6 people. I think 6 was the max they'll let you book…” more",
    '4. Duck & Waffle\n' +
        '4.0 (886 reviews)\n' +
        'Modern European\n' +
        'Bars\n' +
        'British\n' +
        '£££\n' +
        'Aldgate\n' +
        '\t\n' +
        '\n' +
        '“Today I went with a bunch of my friends for my best friends 20th birthday dinner. Sometimes restaurants can be pretentious and judgy against young people who…” more',
    '5. The Fat Bear\n' +
        '4.5 (127 reviews)\n' +
        'American\n' +
        'Soul Food\n' +
        'Cajun/Creole\n' +
        '££\n' +
        'Blackfriars\n' +
        '\t\n' +
        '\n' +
        "“WOW, this place is delicious! Our family stopped in London for the last part of our cruise. After touring St. Paul's Cathedral, we were pretty hungry. We…” more\n" +
        '\n' +
        'Outdoor seating\n' +
        '\n' +
        'Delivery\n' +
        '\n' +
        'Takeout',
    'Outdoor seating\n\nDelivery\n\nTakeout',
    '6. The Victoria\n' +
        '4.4 (286 reviews)\n' +
        'Pubs\n' +
        'British\n' +
        '££\n' +
        'Paddington\n' +
        '\t\n' +
        '\n' +
        '“Serving figures from Winston Churchill to Charles Dickens over the 150 years that this place has been in business, it is  pretty unlikely that even the most…” more',
    '7. Padella\n' +
        '4.5 (292 reviews)\n' +
        'Italian\n' +
        '££\n' +
        'London Bridge\n' +
        '\t\n' +
        '\n' +
        '“Another frequent London recommendation that was totally worth the hype!! As a solo diner I only had to wait ~15 mins for a bar seat, and walked around Borough…” more',
    '8. Mother Mash\n' +
        '4.3 (551 reviews)\n' +
        'British\n' +
        '££\n' +
        'Soho\n' +
        '\t\n' +
        '\n' +
        '“Affordable and delicious. One of my favorite places to get bangers & mash! I came here once several years ago and this spot is still as good as I remembered!…” more',
    '9. The Golden Chippy\n' +
        '4.9 (156 reviews)\n' +
        'Fish & Chips\n' +
        '££\n' +
        'Deptford\n' +
        '\t\n' +
        '\n' +
        '“Delicious Loved this fish and chips place fresh and yummy We will definitely be coming again when in London. This is our second year in a row but first…” more',
    '10. Hawksmoor Seven Dials\n' +
        '4.4 (395 reviews)\n' +
        'British\n' +
        'Steakhouses\n' +
        'Cocktail Bars\n' +
        '£££\n' +
        'Covent Garden\n' +
        '\t\n' +
        '\n' +
        "“We visited Hawksmoor without a reservation on a Monday night and they sat us right away. I've heard about their Sunday Roast and was sad to not have had the…” more",
    '1\n2\n3\n4\n5\n6\n7\n8\n9\n1 of 24',
    "Can't find the business?\n" +
        '\n' +
        'Adding a business to Yelp is always free.\n' +
        '\n' +
        'Add business\n' +
        '\n' +
        'Got search feedback? Help us improve.',
    'More Restaurants in London\n' +
        '\n' +
        'Breakfast & Brunch\n' +
        '\n' +
        'British\n' +
        '\n' +
        'Burgers\n' +
        '\n' +
        'Cafes\n' +
        '\n' +
        'Chinese\n' +
        '\n' +
        'Fast Food\n' +
        '\n' +
        'Fish & Chips\n' +
        '\n' +
        'French\n' +
        '\n' +
        'Indian\n' +
        '\n' +
        'Italian\n' +
        '\n' +
        'Japanese\n' +
        '\n' +
        'Mediterranean\n' +
        '\n' +
        'Middle Eastern\n' +
        '\n' +
        'Pakistani\n' +
        '\n' +
        'Pizza\n' +
        '\n' +
        'Sandwiches\n' +
        '\n' +
        'Thai\n' +
        '\n' +
        'Turkish',
    '',
    'Related Talk Topics\n' +
        '\t\n' +
        'Indian restaurants\n' +
        '\n' +
        'Anyone experience bad service at Indian restaurants?\n' +
        '\n' +
        '\t\n' +
        'Restaurants in Chinatown...?\n' +
        '\n' +
        'Can someone please suggest which restaurants in Chinatown you would recommend? And also feel free to say which restaurants you would avoid in that…\n' +
        '\n' +
        '\t\n' +
        'Restaurants in Chinatown...?\n' +
        '\n' +
        'Can someone please suggest which restaurants in Chinatown you would recommend? And also feel free to say which restaurants you would avoid in that…',
    '',
    '',
    ''
];
// ;(async () => {
//     const browser = await playwright.chronium.launch({headless: true})
// })
// ;(async () => {
// const agent = random_useragent.getRandom();
// const browser = await playwright.chromium.launch({headless: true})
// const context = await browser.newContext({userAgent: agent})
// const page = await context.newPage({bypassCSP: true})
// //setup
// await page.setDefaultTimeout(30000)
// await page.setViewportSize({width: 800, height: 600})
// await page.goto(BASE_URL)
// const details = await page.$$eval('li.css-1qn0b6x', items => {
//     return items.map(item => 
//         item.innerText.trim()
//         );
// });
// console.log(details)
// const processedData = fixData(details)
// console.log(processedData)
// await browser.close()
// })().catch((error) => {
//     console.log(error)
//     process.exit(1)
// })
function normaliseData(data) {
    let preprocessed_data = Data.filter(item => item.trim() !== '');
    const normalisedData = preprocessed_data.map(item => {
        // Split the item into lines
        const lines = item.split('\n').filter(line => line.trim() !== '');
        return lines;
        // Extracting data based on the observed pattern
        // const name = lines[0].substring(lines[0].indexOf(' ') + 1);
        // const [rating, reviews] = lines[1].split(' (');
        // const cuisine = lines[2];
        // const priceRange = lines[3];
        // const location = lines[4];
        // const description = lines.slice(6).join(' ');
    });
    return normalisedData;
}
console.log(normaliseData(Data));
export {};
// function fixData(dataArray: []) {
//     // Assuming each element in dataArray is a string containing details of one restaurant
//     return dataArray.map(section => {
//         const lines = section.split('\n').filter(line => line.trim() !== '');
//         const name = lines[0]?.trim(); // Use optional chaining in case lines are empty
//         const rating = lines[1]?.trim();
//         const cuisine = lines[2]?.trim();
//         // ... other details
//         return { name, rating, cuisine /*, ... other details */ };
//     });
// }
// function solveCaptcha(captcha){
// }
