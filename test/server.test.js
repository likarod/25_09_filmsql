// const { response } = require("express");
// const { Body } = require("node-fetch");
let Request = require("request");

describe('Abrir y cerrar el Server.', ()=> {
    let server;
    beforeAll(()=>{
        server = require("../server")
    });
    afterAll(()=>{
        server.close()
    });
     
    /*-- 1. BDD */
    describe('Test para simular: GET "/"', ()=>{
        let data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/", (e, response, body) =>  {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        });

        test('Status 200', () => {
            expect(data.status).toBe(200);
            })

        test('Body not null', () => {
            expect(data.body).not.toBe(null)
        })
    })

    /*-- 2. BDD */ 
    describe("Test para simular: GET /films/form/create/", ()=>{
        let data = {}
        beforeAll((done) => {
            Request.get("http://localhost:3000/films/form/create",(e, response) =>{
                data.status = response.statusCode;
                done();
            }) 
            Request.post("http://localhost:3000/films/form/create", (e, body) => {
              data.body = JSON.parse(body);  
              done();
            })
        }); 

        test("Status 200", () => {
            expect(data.status).toBe(200)
        })
 
        test("Body not null", () => {
            expect(data.body).not.toBe(null)
        }) 
        
        })
    })