const mongoose = require('mongoose');
const AppError = require('./../utils/appError');
const genreModel = require('./../model/genre');
const catchAsync = require('./../utils/catchAsync');


exports.getAll = catchAsync(async (req,res,next)=>{
       const data = await genreModel.find();
       
        res.status(200).json({
            data:data
        })
    
});

exports.getById = catchAsync(async (req, res, next) =>{
    
        const id = req.params.id;
    const data = await genreModel.findById(id);
    if(!data){
      return next(new AppError('No data found with that Id', 404))
    }
    res.status(200).json({
        data: data
    })
    
});

exports.Update = catchAsync( async (req, res, next) =>{
    
        const id = req.params.id;
        const data = await genreModel.findById(id);
        if(!data){
            res.status(400).json({
                message: 'Invalid Id'
            })
        }
        else{
            const updatedTour = await genreModel.findByIdAndUpdate(id,{
                name: req.body.name,
            description: req.body.description
            })

            res.status(200).json({
                status:"success",
                data: updatedTour
            })
        }
   
});


exports.Create = catchAsync(async (req, res, next) => {
    const data = await genreModel.create({
                _id : new mongoose.Types.ObjectId,
                name: req.body.name,
                description: req.body.description
    
            });
            res.status(201).json({
                status:'success'
            });
   

});

exports.Delete =catchAsync(async (req, res, next) =>{
  
        const id = req.params.id;
        const data = await genreModel.findById(id);
        if(!data){
            res.status(400).json({
                message: 'Invalid Id'
            })
        }
        else{
            await genreModel.findByIdAndDelete(id)
            res.status(200).json({
                status:"success",
                message: "deleted"
            })
        }
   
});
