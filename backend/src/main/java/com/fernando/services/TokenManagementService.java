package com.fernando.services;

import com.fernando.dto.google.UserAcount;
import com.fernando.enums.AuthenticatorProvider;
import com.fernando.exceptions.ErrorValidateTokenException;
import com.fernando.exceptions.InvalidTokenException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;

@ApplicationScoped
public class TokenManagementService {


    @Inject
    AuthenticatorService authenticatorService;

    public Optional<String> generateToken(AuthenticatorProvider authenticatorProvider, String jwt) throws
            InvalidTokenException, ErrorValidateTokenException {
        if (authenticatorProvider == null || jwt == null || jwt.isEmpty()) {
            throw new IllegalArgumentException("Informe os campos authenticatorProvider e jwt");
        }
        try {
            UserAcount userAcount = authenticatorService.authenticate(authenticatorProvider, trateJWT(jwt));
        } catch (GeneralSecurityException e) {
            throw new ErrorValidateTokenException("Erro geral");
        } catch (IOException e) {
            throw new ErrorValidateTokenException("Erro de conexao");
        }
        return Optional.of("jwt");
    }

    private static String trateJWT(String jwt){
        return jwt.replace("Bearer ", "");
    }


}
