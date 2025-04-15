# Quotebook API

A simple API for storing and recieving quotes. You can add new quotes and get random quotes from various categories. 

## How To Get Started
**1. Clone the Repository**

Open your terminal and run:

```js
git clone REPOSITORY LINK HERE cd quotebook-api
 ```

 **2. Install Dependencies**

 Run this command and install the required packages:
 ```js
node server.js
 ```

 You should see:
 ```js
Example app listening on port 3000
 ```

## Base URL
When running locally:

http://localhost:3000

Using Google App URL (Deployed):

*URL goes here*

 ## API Endpoints

 **1. Get All Categories**
 - Method: `GET`
 - URL: /quotebook/categories

 Example:

 GET http://localhost:3000/quotebook/categories

 Reponse (json):

 ```js
 ["successQuotes", "perseveranceQuotes", "happinessQuotes"]
 ```

 **2. Get a Random Quote by Category**

 - Method: `GET`
 - URL: /quotebook/quote/:category
 - Replace `:category` with `successQuotes`, `perservereanceQuotes`, or `happinessQuotes`.

 Example:

 GET http://localhost:3000/quotebook/quote/successQuotes

 Response:
 ```js
{
  "quote": "The way to get started is to quit talking and begin doing.",
  "author": "Walt Disney"
}
 ```

 Errors:
 ```js
 "Error: Category not found."
 ```

 ## 3. Add a New Quote
 - Method: `POST`
 - URL: /quotebook/quote/new
 - Body:
 ```js
 {
  "category": "happinessQuotes",
  "quote": "Joy is a choice you make.",
  "author": "Unknown"
}
 ```

 Success Response:
 ```json
{
  "message": "Success!"
}
 ```

 Error Response:
 - Missing field(s):
 ```js
{ "error": "invalid or insufficient user input" }
 ```
 - Invalid category:
 ```js
{ "error": "Category not found." }
 ```







