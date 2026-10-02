const cheerio = require("cheerio");

const goldURL = "https://www.goodreturns.in/gold-rates/madurai.html";

function getGoldPrice() {

  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(goldURL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      let gold22k = 0;
      let gold22kChange = '+0';

      $("table tr").each((_, row) => {
        const cells = $(row)
          .find("th, td")
          .map((_, el) => $(el).text().trim())
          .get();

        if (cells.length >= 3 && cells[0] === "1") {
          let getTrimedData = cells[2].replaceAll('\t', '')
          gold22k = getTrimedData.replaceAll('\t', '').replaceAll('\t', '').split('₹')[1].split('(')[0].replace(',', '').trim()
          gold22kChange = getTrimedData?.replaceAll('\t', '')?.split('(')[1]?.split(')')[0]?.trim() || gold22kChange
        }
      });

      resolve({ status: 1, data: { gold22kPrice: gold22k, gold22kChange: gold22kChange } })
    } catch (error) {
      resolve({ status: 0 })
    }
  })

}


const silverURL = "https://www.goodreturns.in/silver-rates/madurai.html";

function getSilverPrice() {

  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(silverURL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      let silver = 0;
      let silverChange = '+0';

      $("table tr").each((_, row) => {
        const cells = $(row)
          .find("th, td")
          .map((_, el) => $(el).text().trim())
          .get();

        if (cells.length >= 3 && cells[0] === "1") {
          silver = cells[1].replaceAll('₹', '').trim()
          let perSplit = cells[3].split('₹')
          silverChange = perSplit[1] ? perSplit[0]?.trim() + perSplit[1] : silverChange
        }
      });

      resolve({ status: 1, data: { silverPrice: silver, silverChange: silverChange } })
    } catch (error) {
      resolve({ status: 0 })
    }
  })
}



function getAndUpdateGoldAndSilverPrice() {

  return new Promise(async (resolve, reject) => {

    const [gold22k, silver] = await Promise.all([getGoldPrice(), getSilverPrice()])
    console.log("silver: ", silver);
    console.log("gold22k: ", gold22k);

    let updateQuery = ``
    const values = []

    if (gold22k.status) {

      const { gold22kPrice, gold22kChange } = gold22k.data

      updateQuery += `UPDATE am_price_list SET price = ?, change = ? WHERE purity = ? AND material = ? AND subdomain = ?;`
      values.push(gold22kPrice, gold22kChange, '22k', 'gold', 'default')

    }

    if (silver.status) {

      const { silverPrice, silverChange } = silver.data

      updateQuery += `UPDATE am_price_list SET price = ?, change = ? WHERE purity = ? AND material = ? AND subdomain = ?`
      values.push(silverPrice, silverChange, '925', 'silver', 'default')

    }

    if (updateQuery) {
      query(updateQuery, values, () => { })
    }

  })

}


const cron = require('node-cron');
const query = require("../model/db");

// every 10 mins

cron.schedule('*/10 * * * * 1-6', () => {

  getAndUpdateGoldAndSilverPrice()

}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
