import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:8080")

describe("testeando endpoints del carrito", () => {
    let token
    let cookieName 
    before(async () => {
        let adminUser = {
            email: "3com",
            password: "3pedroPerez",
        }

        const loginResponse = await requester.post("/users/login").send(adminUser)
        console.log(loginResponse.headers["set-cookie"])
        token = loginResponse.headers["set-cookie"][0].split("=")[1]
        cookieName = loginResponse.headers["set-cookie"][0].split("=")[0]
    })
    
    it("obtener un carrito por id", async() => {
        const getCartById = await requester.get("/api/carts/getOne")
        .set("Cookie",`${cookieName}=${token}`)
        expect(getCartById.statusCode).to.be.eql(200)
    })
    //vaciar carrito
    it("vaciar carrito", async() =>{
        const vaciarCartRequest = await requester.delete("api/carts/allProducts")
        const verifyCartRequest = await requester.delete("api/carts/getOne")
        console.log(verifyCartRequest._body)
        expect(verifyCartRequest._body.products.length).to.be.eql(0)
        expect(vaciarCartRequest.statusCode).to.be.eql(200)
    })
    //purchase
})