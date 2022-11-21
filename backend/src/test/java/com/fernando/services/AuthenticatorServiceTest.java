package com.fernando.services;

import com.fernando.dto.google.GoogleAccount;
import com.fernando.dto.google.UserAcount;
import com.fernando.enums.AuthenticatorProvider;
import com.fernando.exceptions.InvalidTokenException;
import io.quarkus.test.junit.QuarkusTest;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
class AuthenticatorServiceTest {

    @Inject
    AuthenticatorService service;

    @ConfigProperty(name = "JWT_TEST_GOOGLE")
    String jwtOfTest;


    @Test
    @DisplayName("Testar com todos parametros inválidos")
    void testAuthenticateWithParamsWrongs() {
        try {
            service.authenticate(null, null);
            fail("Não é para cair aqui");
        } catch (InvalidTokenException e) {
            fail("Não é para cair aqui");
        } catch (IllegalArgumentException e) {
            assertTrue(true);
        }

    }

    @Test
    @DisplayName("Testar com todos parametros inválidos")
    void testAuthenticateWithParamsWrongs2() {
        try {
            service.authenticate(AuthenticatorProvider.GOOGLE, null);
            fail("Não é para cair aqui");
        } catch (InvalidTokenException e) {
            fail("Não é para cair aqui");
        } catch (IllegalArgumentException e) {
            assertTrue(true);
        }

    }


    @Test
    @DisplayName("Testar com todos parametros inválidos")
    void testAuthenticateSucess() {
        try {
            UserAcount userAcount = service.authenticate(AuthenticatorProvider.GOOGLE, jwtOfTest);
            assertNotNull(userAcount);
            assertTrue(userAcount.tokenvalidated);
        } catch (InvalidTokenException e) {
            fail("Não é para cair aqui");
        }
    }


}