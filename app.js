const express = require('express');
const bodyParser = require('body-parser')
const { includes } = require('lodash');
const { REPL_MODE_SLOPPY } = require('repl');
const { sequelize } = require('./models');

const app = express();

const userRoute = require('./routes/user');
const questionsRoute = require('./routes/questions');
const answersRoute = require('./routes/answers');

app.use(express.json());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/questions', questionsRoute);
app.use('/', answersRoute);

app.listen({ port: 3000 }, async () => {
    console.log('Server is running on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database connected!')
})

module.exports = app