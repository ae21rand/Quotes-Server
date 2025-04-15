// This is a simple express app (one file)
// basic Express app that listens on a port and responds to simple requests.
// QUOTEBOOK API

const express = require('express'); // bring in express
const app = express(); // create the app
const port = 3000; // define the port

app.use(express.json()); // ^^ use express.json()

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//

app.get('/quotebook/categories', (req, res) => {
    res.status(200).json(categories);
})

app.get('/quotebook/quote/:category', (req, res) => {
    const category = req.params.category;

    if (!category) {
        res.status(400).send('Error: no category provided.');
    }

    const quotes = {
        successQuotes,
        perseveranceQuotes,
        happinessQuotes
    };

    const categoryQuotes = quotes[category];

    if (!categoryQuotes) {
        return res.status(404).send('Error: Category not found.');
    }

    // get random index & random quote
    const randIndex = Math.floor(Math.random() * categoryQuotes.length);
    const randQuote = categoryQuotes[randIndex];

    // json response of quote
    res.status(200).json(randQuote);
})


app.post('/quotebook/quote/new', (req, res) => {
    const { category, quote, author } = req.body;

    // if parameter is missing
    if (!category || !quote || !author) {
        return res.status(400).json({ error: 'invalid or insufficient user input' })
    }

    // existing categories array from above
    const quotes = {
        successQuotes,
        perseveranceQuotes,
        happinessQuotes
    };

    // if category is not found
    if (!quotes[category]) {
        return res.status(400).json({ error: 'Category not found.' });
    }

    // create a new quote object to be added
    const newQuote = {
        quote,
        author
    };

    // add new quote to correct category  array
    quotes[category].push(newQuote);

    res.status(201).json({ message: 'Success!' });
});






