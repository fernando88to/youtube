package com.fernando.controllers;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class AuthenticatorJWTControllerTest {

    @Test
    public void testHelloEndpoint() {
        given()
                .when().post("/authenticator/google")
                .then()
                .statusCode(200)
                .body(is("autenticação do google"));
    }

}