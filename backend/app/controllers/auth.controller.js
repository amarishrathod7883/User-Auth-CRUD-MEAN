const express = require('express');
var router = express.Router();

const Users = require('../models/users.model');

router.post('/signup', function(req, res)
{
  console.log("req.body", req.body);
  Users
  .findOne({ email: req.body.email})
  .then(fetchedUser => 
  {
    if(fetchedUser)
    {
      res.status(400).send({ message: "Email is already in use"})
    }
    else
    {
      new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        role: req.body.role,
      })
      .save()
      .then(savedUser =>
      {
        res.send({ message: "User was registerd successfully."})
      })
      .catch(error =>
      {
        res.status(500).send({ message: error})
        return;
      })
    }
  })
  .catch(error =>
  {
    res.status(500).send({ message: error})
    return;
  })
})

router.post('/signin', function(req, res)
{

  console.log("dsd", req.body);

  Users
  .findOne({ 
    email: req.body.email,
    password: req.body.password
  })
  .then(fetchedUser => 
  {
    console.log("fetchedUser", fetchedUser);
    if(!fetchedUser)
    {
      res.status(404).send({ message: 'User Not Found.'})
    }
    else
    {
      res.status(200).send({ data: fetchedUser})
    }
    
  })
  .catch(error =>
  {
    res.status(500).send({ message: error})
    return;
  })
})

module.exports = router;