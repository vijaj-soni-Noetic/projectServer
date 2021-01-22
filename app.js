const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
var cors = require('cors');

const ApiError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const app =express();

//Security HTTP header
app.use(helmet());

//Development logging
if(process.env.NODE_EVN ==='development'){
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
// Data sanitization to prevent NOSQL INJECTION
app.use(mongoSanitize());

// DATA sanitization against Xss
app.use(xss());


// prevent parameter polluion

app.use(express.static(`${__dirname}/public`));



app.use((req, res, next) => {
    req.requestTime= new Date().toDateString();
   // console.log(req.headers);
    next();
});
app.use('/api/v1/tvSeries', require('./router/tvSeries'));
app.use('/api/v1/genre', require('./router/genre'));

app.all('*', (req, res, next)=>{
   
    next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
module.exports = app;