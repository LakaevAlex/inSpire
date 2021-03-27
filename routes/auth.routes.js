const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();

// /api/auth/register

async function hashPassword (password) {

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, bcrypt.genSaltSync(10), function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}


// check email
router.post(
    '/check',
    async (req, res) => {
    try {
        const {email} = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(201).json({error: 'Такая почта уже занята.'});
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
})



router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password','Некорректный пароль').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({message: 'Такая почта уже занята.'});
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({email, password: hashedPassword});
        await user.save()
        
        res.status(201).json({ message: 'User created' });
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email','Некорректный email').normalizeEmail().isEmail(),
        check('password','Некорректный пароль').exists()
    ],
    async (req, res) => {
    console.log('body', req.body)
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при авторизации'
            })
        }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).json({message: 'Пользователь не найден.'});
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({message: "Пароль неправильный."});
    }

    const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
    )

    res.json({token, userId: user.id});

    } catch (e) {
        res.status(500).json({message: 'Server error'});
    }
})

module.exports = router;