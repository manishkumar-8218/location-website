

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'location_tracker';
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
app.use(cors({
  origin: 'https://new-year-2023-8j4y.onrender.com'
}));

app.post('/location', (req, res) => {
  const { location, phoneNumber, name, address } = req.body;

  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('locations');

    collection.insertOne({ location, phoneNumber, name, address }, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      console.log(`Location saved to database: ${req.body}`);
      res.sendStatus(200);
      client.close();
    });
  });
});

const port = process.env.PORT || "3001";
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
