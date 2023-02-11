const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PUSER = require('../models/philanthropicSchema');
const NGO = require('../models/ngoSchema');
const bcrypt = require('bcryptjs');
// const authenticate = require('../middleware/authentication');


// Register the Philanthropic

router.post('/philanthropic/register', async (req, res) => {

    const { name, email, password, cpassword } = req.body;
    console.log({ name, email, password, cpassword });

    if (!name || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill the all data" })
        console.log('Not data available');
    };

    try {
        const prePUSER = await PUSER.findOne({ email: email });
        console.log(prePUSER);
        if (prePUSER) {
            res.status(422).json({ error: "This PUSER is already present " });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and cpassword not match" });
        } else {
            const finalPUSER = new PUSER({

                name, email, password, cpassword
            });

            // Already hash the password in Schema before saving into database

            const storedata = await finalPUSER.save();

            res.status(201).json(storedata);
        }
    } catch (error) {
        // for error handling 
        console.log("Error occurs in the register philanthropic" + error.message);
    }
})

// Register the NGO 

router.post('/ngo/register', async (req, res) => {

    const { name, email, password, cpassword } = req.body;
    console.log({ name, email, password, cpassword });

    if (!name || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill the all data" })
        console.log('Not data available');
    };

    try {
        const prengo = await NGO.findOne({ email: email });
        console.log(prengo);
        if (prengo) {
            res.status(422).json({ error: "This PUSER is already present " });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and cpassword not match" });
        } else {
            const finalNgo = new NGO({
                name, email, password, cpassword
            });

            // Already hash the password in Schema before saving into database

            const storedata = await finalNgo.save();

            res.status(201).json(storedata);
        }
    } catch (error) {
        // for error handling 
        console.log("Error occurs in the register philanthropic " + error);
    }
})


// Login The Philanthropic api 

router.post('/philanthropic/login', async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    if (!email || !password) {
        res.status(400).json({ error: 'Fill the all details' });
    };

    try {
        const PUSERlogin = await PUSER.findOne({ email: email });
        console.log("data of philantropic" + PUSERlogin);

        if (PUSERlogin) {
            const isMatch = await bcrypt.compare(password, PUSERlogin.password);
            console.log("PUSER Match " + isMatch);

            if (!isMatch) {
                res.status(400).json({ error: "invalid detalis" });
            } else {
                // Token generate and cookies 
                const token = await PUSERlogin.generateAuthToken();
                // console.log(token);

                // Generate the cookie 
                res.cookie('Hackathon', token, {
                    maxAge: 2000000000000000,
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    domain: 'localhost'
                });
                res.status(200).json({ message: "password match" })
            }
        } else {
            res.status(400).json({ error: 'invalid details' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


// Login The NGO api 

router.post('/ngo/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Fill the all details' });
    };

    try {
        const ngologin = await NGO.findOne({ email: email });
        console.log("data of philantropic" + ngologin);

        if (ngologin) {
            const isMatch = await bcrypt.compare(password, ngologin.password);
            console.log("PUSER Match " + isMatch);

            if (!isMatch) {
                res.status(400).json({ error: "invalid detalis" });
            } else {
                // Token generate and cookies 
                const token = await ngologin.generateAuthToken();
                // console.log(token);

                // Generate the cookie 
                res.cookie('Hackathon', token, {
                    maxAge: 2000000000000000,
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    domain: 'localhost'
                });
                res.status(200).json({ message: "password match" })
            }
        } else {
            res.status(400).json({ error: 'invalid details' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


// API For getting the details of ngo 

router.post('/ngoworkdetails/:id', async (req, res) => {
    
        // getting the plans of ngo 
        const {location,previouswork,endgoal,plans,typeofngo} = req.body;
        console.log({location,previouswork,endgoal,plans,typeofngo});
   
    try {
        const {id} = req.params;

        const ngoUser = await NGO.findOne({_id: id});
        console.log("USER FOUND " + ngoUser);

        if (!location || !previouswork || !endgoal || !plans || !typeofngo) {
            res.status(422).json({ error: "fill the all data" })
            console.log('Not data available');
          };

          // adding in the perticular ngo schema this details
          const finalngoData = new NGO({
            location,previouswork,endgoal,plans,typeofngo
          });

          const storeData = await finalngoData.save();

          res.status(201).json("Data of ngo current work and location" + storeData);
        
    } catch (error) {
        console.log("Error occured in the ngoworkdetails/:id " + error.message);
    }
})








module.exports = router;