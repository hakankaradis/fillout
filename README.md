# Fillout.com API Filtered Responses Server

This project provides a REST API server that interfaces with Fillout.com's API to fetch and filter form responses based on specified criteria.

## How to Run the Project

**Install dependencies:**
```bash
npm install
```
**Start the Server**
```bash
npm start
```

### Example Usage
```
http://localhost:3000/cLZojxk94ous/filteredResponses?filters=[{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"Nothing much to share yet!"}, {"id":"bE2Bo4cGUv49cjnqZ4UnkW", "condition":"equals", "value":"Johnny"}]
```

### Env variables
Before starting the server, make sure to set the following environment variables in your .env file:

FILLOUT_API_KEY: Your API key for accessing Fillout.com's API.
FILLOUT_BASE_URL: The base URL for Fillout.com's API.