var createError = require('http-errors');
var express = require('express');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var taskRouter = require('./routes/task');

var app = express();

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
