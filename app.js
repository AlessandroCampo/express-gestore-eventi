const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const morgan = require('morgan');

//router imports
const eventsRouter = require('./routers/events.js');

//global middlewares
app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server attivo');
})

app.use('/events', eventsRouter);



//404 routes middlware
app.use((req, res, next) => {
    res.status(404).json({ error: `Could not find route  ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
    console.log(err.status);
    const errorStatus = err.status || 500;
    res.status(errorStatus).json({
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);

})