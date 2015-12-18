var express = require("express");
var app = express();
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var db = mongojs("project", ["products"]);

app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.send("IT LIVES!!!");
});

app.get("/products", function(req, res) {
    console.log("Retrieving from database...")
    db.products.find(function(err, data) {
      if (err) { res.send(err)}
      console.log("sending data...");
      res.json(data);
    })
});

app.get("/products/:id", function(req, res) {
    console.log("Retrieving from database...")
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data) {
      if (err) { res.send(err)}
      console.log("sending data...");
      res.json(data);
    })
});

app.post("/products", function(req, res) {
    db.products.insert(req.body, function(err, data) {
      if (err) { res.send(err)}
      console.log("adding product...");
      res.json(data);
    });
});

app.put("/products/:id", function(req, res) {
    db.products.update({ _id: mongojs.ObjectId(req.params.id)},
      {$set: {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
      }}, function(err, data) {
      if (err) { res.send(err)}
      console.log("updating product...");
      res.json(data);
    });
});

app.delete("/products/:id", function(req, res) {
    console.log("Retrieving from database...")
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data) {
      if (err) { res.send(err)}
      console.log("sending a data delete request...");
      res.json(data);
    })
});

app.listen(3000);
console.log("The server is running on port 3000...")
