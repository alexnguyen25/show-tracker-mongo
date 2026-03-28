const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const DB_NAME = "showtracker";

let client;
let db;

async function getDb() {
  if (!db) {
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db;
}

module.exports = { getDb };