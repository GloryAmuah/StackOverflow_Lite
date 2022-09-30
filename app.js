const express = require('express');
const bodyParser = require('body-parser')
const { sequelize } = require('./models');

const app = express();

const userRoute = require('./routes/user');
const questionsRoute = require('./routes/questions');
const answersRoute = require('./routes/answers');

app.use(express.json());
app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/questions', questionsRoute);
app.use('/answers', answersRoute);

var PORT = process.env.PORT || 3000;
app.listen({ port: PORT }, async () => {
    console.log(`Sever running on port ${PORT}`)
    await sequelize.authenticate()
    console.log('Database connected!')
    
})

module.exports = app
