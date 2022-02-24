const express = require('express');
var cors = require("cors");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var suggestionRoute = require('./routes/suggestionRoute');
var typeRoute = require('./routes/typeRoute');

const app = express();

mongoose.connect('mongodb+srv://alle:Niang2021@cluster0.xbec4.mongodb.net/boite-a-suggestions?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors())
app.use(bodyParser.json());

app.use('/suggestions', suggestionRoute);
app.use('/types', typeRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});


module.exports = app;