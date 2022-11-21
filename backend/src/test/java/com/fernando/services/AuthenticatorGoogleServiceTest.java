package com.fernando.services;

import com.fernando.dto.google.GoogleAccount;
import io.quarkus.test.junit.QuarkusTest;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
class AuthenticatorGoogleServiceTest {

    @Inject
    AuthenticatorGoogleService service;
    @ConfigProperty(name = "JWT_TEST_GOOGLE")
    String jwtOfTest;


    @Test
    @DisplayName("Testar um token valido")
    public void testTokenValid() {
        Optional<GoogleAccount> googleAccount = null;
        try {
            googleAccount = service.validadeJWT(jwtOfTest);
            assertTrue(googleAccount.isPresent());
        } catch (GeneralSecurityException | IOException  e) {
            assertTrue(false);
        }

    }

    @Test
    @DisplayName("Testar um token invalidovalido")
    public void testTokenInvalid() {

        try {
            String jwtInvalid = jwtOfTest + "a";
            Optional<GoogleAccount> googleAccount = service.validadeJWT(jwtInvalid);
            assertTrue(googleAccount.isEmpty());
        } catch (GeneralSecurityException | IOException e) {
            fail("Não deve cair aqui");
        }

    }

    @Test
    @DisplayName("Testar sem token")
    public void testWithotToken() {
        try {
            service.validadeJWT(null);
            fail("Não deve cair aqui");
        } catch (GeneralSecurityException | IOException e) {
            fail("Não deve cair aqui");
        }catch (IllegalArgumentException e){
            assertTrue(true);
        }
    }

}