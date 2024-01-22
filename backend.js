import express from "express" // Importing the express module for creating the server
import bodyParser from "body-parser"; // Importing body-parser module for parsing incoming request bodies
import {fileURLToPath} from "url"; // Importing fileURLToPath from url module to convert URL to path
import {dirname} from "path"; // Importing dirname from path module to get directory name of a path
const __dirname = dirname(fileURLToPath(import.meta.url)); // Getting the directory name of the current module file

const app = express(); // Creating an instance of express
const port = process.env.PORT || 3000; // Setting the port number for the server

const cocktailsFinder = [ // Array of cocktail names
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
]

let cocktailSearch = false; // Variable to check if a cocktail search is successful

app.use(express.static(__dirname)); // Serving static files from the directory of the current module file
app.use(express.static(__dirname + '/public')); // Serving static files from the public directory

app.use(bodyParser.urlencoded({extended: true})); // Using body-parser middleware to parse incoming request bodies

function searchBar(req, res, next) { // Middleware function to handle search bar input
    if (req.body && req.body["search-cocktails"]) { // If request body exists and contains "search-cocktails"
        req.searchInput = req // Assigning the search input to req.searchInput
            .body["search-cocktails"]
            .toLowerCase()
            .replace(/ /g, '-');

        if (cocktailsFinder.includes(req.searchInput)) { // If the search input matches a cocktail name
            cocktailSearch = true; // Set cocktailSearch to true
        } else {
            cocktailSearch = false; // Else, set cocktailSearch to false
        }
    }
    next(); // Call the next middleware function
}

app.get("/suggest", (req, res) => { // Route handler for GET requests to "/suggest"
    const query = (req.query.q || "").toLowerCase(); // Get the query parameter "q" from the request
    const suggestions = cocktailsFinder.filter(cocktail => // Filter the cocktails array
        cocktail.toLowerCase().startsWith(query) // Return cocktails that start with the query
    );
    res.json(suggestions); // Send the suggestions as a JSON response
});

app.use(searchBar) // Using the searchBar middleware

app.get("/", (req, res) => { // Route handler for GET requests to the root URL
    res.sendFile("/") // Send the "classic-cocktails-recipe.html" file as a response
})

app.post("/check", (req, res) => { // Route handler for POST requests to "/check"
    if (cocktailSearch) { // If cocktailSearch is true
        res.sendFile( __dirname+"/public"+"/"+req.searchInput+".html") // Send the HTML file of the searched cocktail as a response
    } else {
        res.redirect("/") // Else, redirect to the root URL
    }
})

app.listen(port, () => { // Start the server and listen on the specified port
    console.log(`server run port ${port}.`) // Log a message when the server starts
})
