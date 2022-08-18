const models = require("../models/Users");

//Sign Up
exports.signUp =  (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.time,
        password: req.body.price,
    };
    models.push(user);
    res.json(user)
};

//Log In
exports.logIn =  (req, res) => {
    const all = models.filter(model=> model.price==req.params.id);
    res.json(all)
};

//Get all Flight
exports.getAllFlight = (req, res) => {
    console.log(Flight);
    res.json(Flight);
};

//Update/Edit Flight
exports.editFlight =  (req, res) => {
    const flightIndex = models.findIndex(object => {
        return object.price == req.params.id;
      }); 
    models[flightIndex].title = req.body.title;
    models[flightIndex].time = req.body.time;
    models[flightIndex].date = req.body.date;
    res.json(models[flightIndex]);
};

//Delete Flight
exports.deleteFlight =  (req, res) => {
const flightIndex = models.findIndex(object => {
    return object.price == req.params.id;
  });  
  models.splice(flightIndex, 1);
  res.send("Flight deleted")
};

//Example
exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}


