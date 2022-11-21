package com.fernando.services;

import com.fernando.dto.google.UserAcount;
import com.fernando.enums.AuthenticatorProvider;
import com.fernando.exceptions.InvalidTokenException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.security.GeneralSecurityException;

@ApplicationScoped
public class AuthenticatorService {

    @Inject
    AuthenticatorGoogleService authenticatorGoogleService;


    public UserAcount authenticate(AuthenticatorProvider authenticatorProvider, String jwt) throws
            InvalidTokenException, GeneralSecurityException, IOException {
        UserAcount userAcount = new UserAcount();
        userAcount.tokenvalidated = false;
        if (authenticatorProvider == null || jwt == null) {
            throw new IllegalArgumentException("Informe os campos authenticatorProvider  e jwt ");
        }
        if (authenticatorProvider == AuthenticatorProvider.GOOGLE) {
            userAcount = authenticatorGoogleService.validadeJWT(jwt)
                    .orElseThrow(() -> new InvalidTokenException("Token is invalid"));
        }
        return userAcount;
    }


}
