// This is a simple express app (one file)
// basic Express app that listens on a port and responds to simple requests.
// QUOTEBOOK API

const express = require('express'); // bring in express
const app = express(); // create the app
const port = 3000; // define the port

app.use(express.json()); // ^^ use express.json()
//const multer = require("multer");

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
    {
        quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
        author: 'Winston S. Churchill'
    },
    {
        quote: 'The way to get started is to quit talking and begin doing.',
        author: 'Walt Disney'
    }
];

let perseveranceQuotes = [
    {
        quote: 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
        author: 'Albert Einstein'
    },
    {
        quote: 'Perseverance is failing 19 times and succeeding the 20th.',
        author: 'Julie Andrews'
    }
];

let happinessQuotes = [
    {
        quote: 'Happiness is not something ready made. It comes from your own actions.',
        author: 'Dalai Lama'
    },
    {
        quote: 'For every minute you are angry you lose sixty seconds of happiness.',
        author: 'Ralph Waldo Emerson'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/quotebook/categories', (req, res) => {
    res.status(200).json(categories);
})

function getRandIndex (array) {
    return Math.floor(Math.random() * array.length);
}

app.get('/quotebook/quote/:category', (req, res) => {
    const category = req.params.category;
    console.log(category);

    if (!category) {
        res.status(400).send('Error: no category provided.');
    }

    const randindexs = getRandIndex(successQuotes);
    console.log(randindexs);

    console.log(category === "success");
    if (category === "success") {
        console.log(successQuotes[randindexs]);
        res.status(200).send(successQuotes[randindexs]);
    }

    const randindexp = Math.floor(Math.random() + 1 * perseveranceQuotes.length)

    if (category === "perserverance") {
        res.status(200).send(perseveranceQuotes[randindexp]);
    }

    const randindexh = Math.floor(Math.random() + 1 * happinessQuotes.length)

    if (category === "happiness") {
        res.status(200).send(happinessQuotes[randindexh]);
    }
})

// to support all post methods
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(multer().none());

app.post('/quotebook/quote/new', (req, res) => {
    const newquote = req.body.quote;
    const newauthor = req.body.author;
    const newcategory = req.body.category;

    const newquoteadd = {quote: newquote, author: newauthor}

    if (!newquote || !newauthor || !newcategory) {
        res.status(400).send("Invalid or insufficient user input");
    }   
     
    if (newcategory === "success") {
        successQuotes.push(newquoteadd);
    } else if (newcategory === "perseverance") {
        perseveranceQuotes.push(newquoteadd);
    } else if (newcategory === "happiness") {
        happinessQuotes.push(newquoteadd);
    } else {
        res.status(400).send("Unknown category");
    } //yay this works :)

    res.status(200).send("Success!");
});

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})





