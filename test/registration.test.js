const axios = require('axios')
const { expect } = require('chai')
const models = require('../models')

const REG_URL = 'http://localhost:3000/user/register'

describe('Test Registration', function () {
    describe('Valid Test', function () {
        it('should successful register user', async () => {
            const payload = {
                email: 'james@example.com',
                name: 'James Bond',
                password: 'uiewhruwhfihns'
            }
            let response = null
            try {
                response = await axios.post(REG_URL, payload)
            } catch (error) {
                console.error('---', error.message)
            }

            expect(response.data.isSuccess).to.be.true
            expect(response.data.message).to.be.equal('Successfully registered James Bond')
            expect(response.data.data.email).to.be.equal(payload.email)
        })

        describe('Error Tests', () => {
            it('should throw error when email already exists', async () => {
                try {
                    const response = await axios.post(REG_URL, {
                        email: "idontexist@example.com",
                        password: user.password
                    })
                } catch (error) {
                    const errorData = error.response.data
                    expect(errorData.isSuccess).to.be.false
                    expect(errorData.message).to.contain('User already exist')
                    expect(errorData.data).to.be.null
                }
            })

        this.afterAll(async () => {
            await models.User.destroy({
                where: { email: 'james@example.com' }
            })
        })
    })
})
})
