// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  console.log('login')
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name + email + password + confirmPassword)

  User.findOne({ email }).then(user => {
    if (user) {
      console.log("User already exists.");
      res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      console.log('creating')
      return User.create({
        name,
        email,
        password,
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
    //     const newUser = new User({
    //       name,
    //       email,
    //       password
    //     })
    //     newUser.save().then(() => res.redirect('/')).catch(err => console.log(err))
    //   }
  });
});

module.exports = router;
