const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var MongoStore = require("connect-mongo");
require("./passportConfig");
const vehicle = require("./Modals/Vehicle");
const Toll = require("./Modals/Toll");
const Member = require("./modals/Member");

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
//
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/onenationonetag",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Login System

app.use(
  session({
    name: "onot.uid",
    resave: false,
    saveUninitialized: false,
    secret: "onot",
    cookie: {
      maxAge: 36000000, //10 Hours
      httpOnly: false,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/onenationonetag",
      autoRemove: "native",
    }),
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(501).json(err);
    }
    if (!user) {
      return res.status(404).json({ message: "Username OR Password Incorrect" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json({ message: "Login Success" });
    });
  })(req, res, next);
});

app.get("/user", isValidUser, function (req, res, next) {
  return res.status(200).json(req.user);
});

app.get("/logout", isValidUser, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
    res.clearCookie("msfl.uid").send();
  });
  return res.status(200).json({ message: "Logout Success" });
});

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: "Unauthorized Request" });
}

// API'S

app.get("/vehicle", async (req, res) => {
  try {
    const allVehicle = await vehicle.find();
    res.json(allVehicle);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/addvehicle", async (req, res) => {
  const vehiclenum = req.body.vehicleregnum;
  const uniqueregnum = await vehicle.findOne({ vehicleregnum: vehiclenum.toUpperCase() });
  const uniqueuname = await Member.findOne({ usrid: req.body.usrid });
  var ownerid;
  if (uniqueuname) {
    res.json({ message: "Username Already Exists" });
  } else {
    const newMember = new Member({
      name: req.body.ownername,
      usrid: req.body.usrid,
      password: Member.hashPassword(req.body.password),
    });
    try {
      const savedMember = await newMember.save();
      ownerid = savedMember._id;
    } catch (err) {
      res.json({ message: err });
    }
    if (uniqueregnum) {
      res.json({ message: "Vehicle Already Exists" });
    } else {
      const newvehicle = new vehicle({
        ownername: req.body.ownername,
        vehicleregnum: vehiclenum.toUpperCase(),
        ownerid: ownerid,
      });
      try {
        const savedVehicle = await newvehicle.save();
        res.json(savedVehicle);
      } catch (err) {
        res.json({ message: err });
      }
    }
  }
});

app.post("/entertoll", async (req, res) => {
  const vehiclenum = req.body.vehicleregnum;
  const regnum = await vehicle.findOne({ vehicleregnum: vehiclenum.toUpperCase() });
  if (regnum) {
    const newToll = new Toll({
      vehicleregnum: vehiclenum.toUpperCase(),
      tollamt: req.body.tollamt,
      vehicleid: regnum._id,
    });
    try {
      const savedToll = await newToll.save();
      res.json(savedToll);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    res.json({ message: "Vehicle Doesn't exist" });
  }
});

app.get("/searchtoll/:vechnum", async (req, res) => {
  const vehiclenum = req.params.vechnum;
  const regnum = await vehicle.findOne({ vehicleregnum: vehiclenum.toUpperCase() });
  // res.json({ message: `${regnum._id}` });
  if (regnum) {
    try {
      const allTollVeh = await Toll.find({ vehicleid: regnum._id });
      res.json(allTollVeh);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

app.get("/searchusertoll/:usrid", async (req, res) => {
  const regusr = await vehicle.findOne({ ownerid: req.params.usrid });
  if (regusr) {
    try {
      const tolls = await Toll.find({ vehicleid: regusr._id });
      res.json(tolls);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//Starting server
app.listen(4000, () => {
  console.log("listning at port 4000");
});
