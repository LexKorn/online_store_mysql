const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models');

require('dotenv').config();

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};


class UserController {
    async register(req, res, next) {
        try {            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // return next(ApiError.badRequest('Некорректный email или password'));
                return res.status(400).json({message: "Некорректный email или password", errors})
            }

            const {email, password, role} = req.body;

            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const basket = await Basket.create({userId: user.id});
            const token = generateJwt(user.id, user.email, user.role);

            return res.json({token});

        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({where: {email}});
            if (!user) {
                return next(ApiError.internal('Такого пользователя нет!'));
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal('Пароль не совпал!'));
            }

            const token = generateJwt(user.id, user.email, user.role);
            return res.json({token});

        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({token});
        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }        
    }
};

module.exports = new UserController();