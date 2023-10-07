const express = require("express"); //third party package
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const app = express();
const PORT = 5000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
let db;


app.get("/locations", function (req, res) {
  db.collection("locations")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
   
});
//get mealTypes
app.get("/quickSearch", function (req, res) {
  db.collection("mealTypes")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
//get restaurant data by stateId || mealId
app.get("/restaurants", function (req, res) {
  let query = {};
  let stateId = Number(req.query.state_id);
  let mealId = Number(req.query.mealId);
  if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  }

  db.collection("restaurant")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
//get restaurant data by stateId || mealId
app.get("/restaurants", function (req, res) {
  let query = {};
  let stateId = Number(req.query.state_id);
  let mealId = Number(req.query.mealId);
  if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  }

  db.collection("restaurant")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//filter

app.get("/filter/:mealId", function (req, res) {
  let query = {};
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  let sort = { cost: 1 };
  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }

  if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cuisineId && lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }
   //-1 => desc
  //1 => asc
  db.collection("restaurant")
    .find(query)
    .sort(sort)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
app.get("/details/:id", function (req, res) {
  let id = Number(req.params.id);

  db.collection("restaurant")
    .find({ restaurant_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//menu of restaurant

app.get("/menu/:id", function (req, res) {
  let id = Number(req.params.id);

  db.collection("menu")
    .find({ restaurant_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//Menu Details

app.post("/menuItem", express.json(), function (req, res) {
  if (Array.isArray(req.body)) {
    db.collection("menu")
      .find({ menu_id: { $in: req.body } })
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  } else {
    res.send("Invalid Input");
  }
});

//place orders

app.post("/placeorder", function (req, res) {
  console.log(req.body);
  db.collection("orders").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send("Order Placed!!!");
  });
});

//get orders
app.get("/orders", function (req, res) {
  let query = {};
  let email = req.query.email;
  if (email) {
    query = { email };
  }
  db.collection("orders")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});


//Update payment details
app.put("/updateOrder/:id", function (req, res) {
  let oid = Number(req.params.id);
  db.collection("orders").updateOne(
    { orderId: oid },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("Order updated successfully");
    }
  );
});

//delete orders
app.delete("/deleteOrder/:id", function (req, res) {
  let oid = Number(req.params.id);
  db.collection("orders").deleteOne({ orderId: oid }, (err, result) => {
    if (err) throw err;
    res.send("Order deleted successfully");
  });
});



MongoClient.connect(MONGO_URL, (err, client) => {
  console.log("Mongodb is connected");
  if (err) console.log("Error while connecting");
  db = client.db("zomato_clone");
  app.listen(PORT, () => console.log("Server started on the port", PORT));
});