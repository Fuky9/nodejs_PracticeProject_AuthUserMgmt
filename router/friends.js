const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  // Update the code here

  res.send(JSON.stringify(friends, null, 4)); //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  email = req.params.email;
  res.send(friends[email]); //This line is to be replaced with actual return value
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  if (req.body.email) {
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
  }
  res.send(`User ${req.body.firstName} has been added!`); //This line is to be replaced with actual return value
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let DOB = req.body.DOB;

    // If there was a change in request update the data
    if (firstName) {
      friend.firstName = req.body.firstName;
    }

    if (lastName) {
      friend.lastName = req.body.lastName;
    }

    if (DOB) {
      friend.DOB = req.body.DOB;
    }

    res.send(`Friend with the email ${email} was updated`);
  } else res.status(404).send("Friend does not exist");
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email];
  const name = friend.firstName;
  if (friend) {
    delete friends[email];
    res.status(200).send(`Friend with name ${name} was deleted`);
  } else res.status(404).send("Friend not found!");
});

module.exports = router;
