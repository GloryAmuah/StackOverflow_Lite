const axios = require('axios')
const { expect } = require('chai')
const models = require('../models')


const ANS_URL = 'http://localhost:3000/answers'

const id = userId


describe('Test Questions', function () {
    describe('Valid Test', function () {
        it('should successfully add a question', async () => {
            const payload = {
                
                answer: 'How many data types are present in Javascript',
                userId: 2
            }
            let response = null
            try {
                response = await axios.post(ANS_URL, payload)
            } catch (error) {
                console.error('---', error.message)
            }

            expect(response.data.message).to.be.equal('Answer added')
            expect(response.data.data.userId).to.be.equal(payload.userId)
        })

        this.afterAll(async () => {
            await models.answers.destroy({
                where: { id: id }
            })
        })
    })
})