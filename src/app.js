require("dotenv").config();
const express = require("express")
const app = express();


require("./db/conn")
const ShortUrl = require("./models/url")
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", 'hbs');

app.get('/', async (req, res) => {
    const shortUrl = await ShortUrl.find();
    res.render("index", { shortUrl });
})
app.post("/shortUrl", async (req, res) => {
    try {
        const urldata = await new ShortUrl({
            full: req.body.fullUrl,
        })
        const data = await urldata.save();
        res.status(201).redirect("/");

    } catch (error) {
        res.status(400).send(error);
    }
})
app.get('/:shortUrl', async (req, res) => {
    const urlSearch = req.params.shortUrl;
    const shortUrl = await ShortUrl.findOne({ short: urlSearch });
    if (!shortUrl) {
        console.error("Url not found");
    } else {
        shortUrl.clicks++;
        shortUrl.save();
        res.status(201).redirect(shortUrl.full);
    }

})

app.listen(port, () => {
    console.log(`connection to the port ${port}`);
})