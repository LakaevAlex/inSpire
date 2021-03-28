const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();
const auth = require('../middleware/auth.middleware')

router.post(
    '/test',
    auth,
    async (req, res) => {
    try {
        console.log(req.user.userId)
        res.status(201).json({ message: 'test passed' });
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
})

module.exports = router;