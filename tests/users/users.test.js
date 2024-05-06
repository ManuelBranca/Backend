import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:8080")

describe("testeando endpoints del usuario", () => {
    let newUser = {
        name: "manuel",
        lastname: "branca",
        email: "manuelbranca1234@gmail",
        password: "123455",
        age: "22"
    }
    it("tiene que crear un usuario nuevo", async () => {

        const registerResponse = await requester.post("/users/register").send(newUser)
        expect(registerResponse.statusCode).to.eql(302)
    })

    it("tiene que loguearse correctamente", async () => {
        const loginResponse = await requester.post("/users/login").send(newUser)
        expect(loginResponse.statusCode).to.eql(200)
        expect(loginResponse.text).to.eql("Se logueo exitosamente")
    })

})




