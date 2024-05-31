const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
//router imports
const eventsRouter = require('./routers/events.js');

//global middlewares
app.use(morgan('short'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server attivo');
})

app.use('/events', eventsRouter);


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);

})