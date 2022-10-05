const { expect } = require('chai')
const models = require('../models')
const axios = require('axios')

const LOGIN_URL = "http://localhost:3000/user/login"
const REG_URL = "http://localhost:3000/user/register"

const user = {
    name: 'Mr Tester',
    email: 'wedeytest@stack.com',
    password: 'na-you-sabi'
}

describe('Test Login', function () {
    this.beforeAll(async () => {
        await axios.post(REG_URL, user)
    });

    describe('Valid Tests', function () {
        it('should successfully login', async () => {
            const response = await axios.post(LOGIN_URL, {
                email: user.email,
                password: user.password
            });

            expect(response.data.isSuccess).to.be.true
            expect(response.data.message).to.contain('You are now signed in')
            expect(response.data.data.token).to.not.be.undefined
        });
    });

    describe('Error Tests', () => {
        it('should throw error when user does not exist', async () => {
            try {
                const response = await axios.post(LOGIN_URL, {
                    email: "idontexist@example.com",
                    password: user.password
                })
            } catch (error) {
                const errorData = error.response.data
                expect(errorData.isSuccess).to.be.false
                expect(errorData.message).to.contain('User does not exist')
                expect(errorData.data).to.be.null
            }
        })

        it('should throw error when email and password do not match', async () => {
            try {
                const response = await axios.post(LOGIN_URL, {
                    email: user.email,
                    password: "a-wrong-password"
                })
            } catch (error) {
                const errorData = error.response.data
                expect(errorData.isSuccess).to.be.false
                expect(errorData.message).to.be.equal('Invalid password')
                expect(errorData.data).to.be.null
            }
        })
    })

   this.afterAll(async () => {
        await models.User.destroy({
            where: {email: user.email}
        })
    });
});
