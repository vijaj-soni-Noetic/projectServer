const mongoose = require('mongoose');
const AppError = require('./../utils/appError');
const tvSeriesModel = require('./../model/tvSeries');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');



exports.getAll = catchAsync(async (req,res,next)=>{
    const  features = new APIFeatures(tvSeriesModel.find({}).populate('genre_id'), req.query)
    .filter()
    .sort()
    .limitFields() 
    .paginate()
const data = await features.query;
   
        res.status(200).json({
            result: data.length,
            status:"success",
            data: data
        })
    
});

exports.getById = catchAsync(async (req, res, next) =>{
    
        const id = req.params.id;
    const data = await tvSeriesModel.findById(id);
    if(!data){
      return next(new AppError('No data found with that Id', 404))
    }
    res.status(200).json({
        status:"success",
        data: data
    })
    
});

exports.Update = catchAsync( async (req, res, next) =>{
    
        const id = req.params.id;
        const data = await tvSeriesModel.findById(id);
        if(!data){
            res.status(400).json({
                message: 'Invalid Id'
            })
        }
        else{
            const data = await tvSeriesModel.findByIdAndUpdate(id,{
                name: req.body.name,
            summary: req.body.summary,
            imdb_rating: req.body.imdb_rating,
            genre_id: req.body.genre_id
            })

            res.status(200).json({
                status:"success",
                data: data
            })
        }
   
});


exports.Create = catchAsync(async (req, res, next) => {
    const data = await tvSeriesModel.create({
                _id : new mongoose.Types.ObjectId,
                name: req.body.name,
                summary: req.body.summary,
                imdb_rating: req.body.imdb_rating,
                genre_id: req.body.genre_id
    
            });
            res.status(201).json({
                status:'success',
                data: data
            });
   

});

exports.Delete =catchAsync(async (req, res, next) =>{
  
        const id = req.params.id;
        const data = await tvSeriesModel.findById(id);
        if(!data){
            res.status(400).json({
                message: 'Invalid Id'
            })
        }
        else{
           await tvSeriesModel.findByIdAndDelete(id)
            res.status(200).json({
                status:"success",
                message: "deleted"
            })
        }
   
});
