import assert from "assert"
import request from "supertest"
import mongoose from "mongoose"
import app from "app"
import { User } from "app/user/models"
import connectDB from "config/connectDB"

const username = "testaccount"
const password = "testpassword"

describe("User", () => {
    before(async () => {
        connectDB()
        await User.deleteMany({}, () => {})
    })

    describe("Registration", function () {
        describe("Success Case", async function () {
            it("Proper Information", async function () {
                await request(app)
                    .post("/user/register")
                    .send({
                        username: username,
                        password: password,
                    })
                    .expect(201)
            })
        })

        describe("Failure Case", async function () {
            it("Duplicate User", async () => {
                await request(app)
                    .post("/user/register")
                    .send({
                        username: username,
                        password: password,
                    })
                    .expect(400)
            })
        })
    })

    describe("Authentication", function () {
        describe("Success Case", async function () {
            it("Proper Information", async function () {
                const res = await request(app).post("/user/auth/token").send({
                    username: username,
                    password: password,
                })
                const data = JSON.parse(res.text)
                assert.strictEqual(username, data.user.username)
            })
        })

        describe("Failure Case", async function () {
            it("Wrong Username", async function () {
                await request(app)
                    .post("/user/auth/token")
                    .send({
                        username: "wrongusername",
                        password: password,
                    })
                    .expect(400)
            })
            it("Wrong Password", async function () {
                await request(app)
                    .post("/user/auth/token")
                    .send({
                        username: username,
                        password: "wrongpassword",
                    })
                    .expect(400)
            })
        })
    })

    after(async () => {
        await User.deleteMany({}, () => {})
        await mongoose.disconnect()
    })
})
