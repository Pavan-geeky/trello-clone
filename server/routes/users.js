const express = require('express');
const router = express.Router();
const User = require('../models/users');
const UserRole = require('../models/userRoles')

//get - show
router.get('/', (req, res) => {
    User.findAll().then(users => {
        res.send(users)
    }).catch(err => {
        res.send(err);
    })
});

//post - create
router.post('/', (req, res) => {
    const data = req.body;
    const uuidv1 = require('uuid/v1');
    data['id'] = uuidv1();
    User.create({
         id: data.id,
         name: data.name,
         email: data.email,
         password: data.password,
         bio: data.bio
    }).then(result => {
          UserRole.create({
               user_id: data.id,
               role_id: 2
          }).then(result => {
               res.send('User created!')
          })
    })
});

module.exports = router;