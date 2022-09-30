const express = require('express');
const bodyParser = require('body-parser')
const { sequelize } = require('./models');
//const PORT = require('./config')

const app = express();

const userRoute = require('./routes/user');
const questionsRoute = require('./routes/questions');
const answersRoute = require('./routes/answers');

app.use(express.json());
app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/questions', questionsRoute);
app.use('/answers', answersRoute);

app.listen({ port: 3000 }, async () => {
    console.log(`Sever running on port 3000`)
    await sequelize.authenticate()
    console.log('Database connected!')
    
})

module.exports = app
