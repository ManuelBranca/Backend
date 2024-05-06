import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:8080")

describe("testeando endpoint de productos", () => { 
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

    it("Obtener los productos", async() => {
        const getProductsResponse = await requester.get("/api/productos")
        expect(getProductsResponse._body.docs).to.be.instanceOf(Array)
        expect(getProductsResponse._body.docs.length).to.be.greaterThan(5)
    })

    it("crear producto", async() => {
        const producto = 
        {
            "title": "Onceavo Producto",
            "description": "raqueta",
            "price": 10,
            "thumbnail": "imagen10.jpg",
            "code": "L06",
            "stock": 2,
            "status":true
        }
        const postProductResponse = await requester.post("/api/productos")
        .send(producto)
        .set("Cookie",`${cookieName}=${token}`)

        expect(postProductResponse.statusCode).to.eql(200)
    })
    //delete
})