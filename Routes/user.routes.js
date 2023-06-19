const mongoose = require('mongoose');
const express = require('express');

const bcrypt = require('bcrypt');
const { registerCheck } = require('../middleware/register.check');
var jwt = require('jsonwebtoken');


const { checkTokenExpired } = require('../middleware/checkExpireofToken');
const { UserModel } = require('../Models/user.model');
const { blackList } = require('../blackList');

const userRoute = express.Router();
// register
userRoute.post('/register', registerCheck, async (req, res) => {
    try {
        const { name, pass, email, city, age } = req.body;
        // const existingUser = users.find((user) => user.email === email);
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'A user with the same email already exists' });
        }
        else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.send(400).json({ err: err.message });
                }
                else {
                    const user = new UserModel({ name, email, age, pass: hash, city });
                    await user.save();
                    res.status(200).json({ msg: 'New user has been updated', updatedUser: req.body });
                }
            });
        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// login
userRoute.post('/login', async (req, res) => {
    //logic
    const { pass, email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(pass, user.pass, async (err, result) => {
            const token = jwt.sign({ userID : user._id , user : user.name }, process.env.secrate);
            if (result) {
                res.status(200).json({ msg: "Login Successful!!", token: token , userID : user._id , user : user.name });
            }
            else {
                res.status(200).json({ msg: "Wrong Crendintial" });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// retoken
// retoken
userRoute.get('/refreshtoken', checkTokenExpired, async (req, res) => {
    try {
      const newToken = jwt.sign({ course: 'mern' }, 'school', {
        expiresIn: '22d'
      });
      res.status(200).json({ newToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



//logout

userRoute.get('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        blackList.push(token);
        res.status(200).json({ msg: "user has logedout" })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = { userRoute };