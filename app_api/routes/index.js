const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');


// users
router
    .route('/users')
    .get(ctrlUsers.UsersCreate)
    .post(ctrlUsers.UsersCreate);

router
    .route('/users/:userid')
    .get(ctrlUsers.UsersReadOne)
    .put(ctrlUsers.UsersUpdateOne)
    .delete(ctrlUsers.UsersDeleteOne);

module.exports = router;
