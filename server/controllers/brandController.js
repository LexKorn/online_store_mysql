const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const candicate = await Brand.findOne({where: {name}});
            if (candicate) {
                return next(ApiError.badRequest('Бренд с таким именем уже существует!'));
            } 
            
            const brand = await Brand.create({name});        
            return res.json(brand);
        } catch(err) {
            next(ApiError.badRequest(err.message));
        }        
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch(err) {
            next(ApiError.badRequest(err.message));
        }        
    }

    async delete(req, res, next) {
        try {
            const {name} = req.params;
            await Brand.destroy({where: {name}});
            return res.json('Brand was deleted');
        } catch(err) {
            next(ApiError.badRequest(err.message));
        }        
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;
            await Brand.update({name}, {where: {id}});
            return res.json('Brand was updated');
        } catch(err) {
            next(ApiError.badRequest(err.message));
        }       
    }
};

module.exports = new BrandController();