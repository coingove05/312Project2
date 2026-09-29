const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {

    const city = req.query.city;

    console.log(city)

    try {
        const response = await axios.get(
            //removed api key for upload to github
            `http://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID={apikey}` 
        );
    
        const temperaturek = response.data.main.temp;
        const temperatureu = (temperaturek - 273.15)*(9/5)+32
        const temperature = Math.ceil(temperatureu)

        console.log(temperature)

        res.render("index", {
            city: city,
            temperature: temperature
        });
    
    } catch(error) {
        console.error(error);
        res.render("index", {
            city: city,
            temperature: "could not grab temperature"
        });
    }
});


app.listen(PORT, () => {
    console.log(`NameJoke running on http://localhost{port}`);
})
