async function priceCron() {
  const axios = require("axios");

     const response = await axios.get(
            "https://api.gold-api.com/price/XAU/INR"
        );

        console.log(' response.data: ',  response.data);
        // return response.data;

}

// priceCron()
// 