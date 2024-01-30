import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from 'fs';
// Importing the entire path module
import * as path from 'path';
import validator from "validator";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

const cocktailsFinder = [
    "negroni",
    "daiquiri",
    "black-russian",
    "espresso-martini",
    "whiskey-sour",
    "white-russian",
    "negroni-sbagliato",
    "old-fashion",
    "sazerac",
    "mojito",
    "americano",
    "cosmopolitan",
];

let cocktailSearch = false;

app.set('view engine', 'ejs');

// Specify the correct views directory path (assuming 'public' is the directory with your EJS files)
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'sitemap')));

app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(__dirname, 'public', 'sitemap', 'sitemap.xml');

    // Imposta il tipo di contenuto del file XML
    res.header('Content-Type', 'application/xml');

    // Invia il file XML
    res.sendFile(sitemapPath);
});

function searchBar(req, res, next) {
    if (req.body && req.body["search-cocktails"]) {
        const userInput = req.body["search-cocktails"];
        // Validate the user input
        if (validator.isLength(userInput, { min: 1, max: 50 })) {
            req.searchInput = validator.escape(userInput)
                .toLowerCase()
                .replace(/ /g, '-');

            cocktailSearch = cocktailsFinder.includes(req.searchInput);
        } else {
            // Handle invalid input (e.g., show an error message)
            res.status(400).send('Invalid input');
            return;
        }
    }
    next();
}


app.get("/suggest", (req, res) => {
    const query = (req.query.q || "").toLowerCase();
    const suggestions = cocktailsFinder.filter(cocktail =>
        cocktail.toLowerCase().startsWith(query)
    );
    res.json(suggestions);
});

app.use(searchBar);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/:page", (req, res) => {
    const { page } = req.params;

    // Check if the requested EJS file exists in the 'public' directory
    const ejsFilePath = path.join(__dirname, 'public', 'views', `${page}.ejs`);
    
    try {
        fs.readFileSync(ejsFilePath);
        res.render(page);
    } catch (error) {
        res.redirect("/");
    }
});
// Add this before your other routes
app.get("/robots.txt", (req, res) => {
    const robotsFilePath = path.join(__dirname, 'public', 'robots.txt');

    // Set the appropriate headers
    res.type('text/plain');

    // Send the content of robots.txt
    res.sendFile(robotsFilePath);
});

app.post("/check", (req, res) => {
    if (cocktailSearch) {
        res.render(req.searchInput);
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`server run port ${port}.`);
});