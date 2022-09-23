const {Basket, BasketDevice, Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const user = req.user;
            const {deviceId} = req.body;

            const basket = await BasketDevice.create({basketId: user.id, deviceId: deviceId});
            return res.json(basket);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getBasketUser(req, res, next) {
        try {
            const {id} = req.user;
            const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}});

            return res.json(basket);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await BasketDevice.destroy({where: {id}});
            return res.json('Device in Basket was deleted');
        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new BasketController();