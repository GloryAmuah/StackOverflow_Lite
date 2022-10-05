const axios = require('axios')
const { expect } = require('chai')
const models = require('../models')


const QUES_URL = 'http://localhost:3000/questions'

//const id = userId


describe('Test Questions', function () {
    describe('Valid Test', function () {
        it('should successfully add a question', async () => {
            const payload = {
                title: 'Javascript Question',
                question: 'How many data types are present in Javascript',
                userId: 2 
            }
            let response = null
            try {
                response = await axios.post(QUES_URL, payload)
            } catch (error) {
                console.error('---', error.message)
            }

            expect(response.data.message).to.be.equal('Question added')
            expect(response.data.data.userId).to.be.equal(payload.userId)
        })

        this.afterAll(async () => {
            await models.questions.destroy({
                where: { id: id }
            })
        })
    })
})
