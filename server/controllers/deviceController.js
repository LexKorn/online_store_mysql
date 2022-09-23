const uuid = require('uuid');
const path = require('path');

const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');


class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(item => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id
                    });
                });
            }
            
            return res.json(device);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let devices;

            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset});
            }

            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where:{brandId}, limit, offset});
            }

            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId}, limit, offset});
            }

            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});
            }

            return res.json(devices);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getONe(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                }
            );

            return res.json(device);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Device.destroy(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                }
            );

            return res.json('Device was deleted');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, price} = req.body;
            await Device.update({name, price}, {where: {id}});
            return res.json('Device was updated');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new DeviceController();