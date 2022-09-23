const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const {name} = req.body;
        const candicate = await Type.findOne({where: {name}});
        if (candicate) {
            return next(ApiError.badRequest('Тип с таким именем уже существует!'));
        } 

        const type = await Type.create({name});        
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        const {name} = req.params;
        await Type.destroy({where: {name}});
        return res.json('Type was deleted');
    }

    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;
        await Type.update({name}, {where: {id}});
        return res.json('Type was updated');
    }
};

module.exports = new TypeController();