package com.fernando.services;

import com.fernando.dto.google.GoogleAccount;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@ApplicationScoped
public class AuthenticatorGoogleService {
    @ConfigProperty(name = "GOOGLE_CLIENT_ID")
    String CLIENT_ID;


    public Optional<GoogleAccount> validadeJWT(String id_token) throws GeneralSecurityException, IOException {
        GoogleAccount googleAccount = new GoogleAccount();
        googleAccount.tokenvalidated = false;
        if (id_token == null) {
            throw  new IllegalArgumentException("Informe o campo id token");
        }
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
        GoogleIdToken idToken = verifier.verify(id_token);
        if(idToken==null){
            return Optional.empty();
        }
        googleAccount = new GoogleAccount();
        GoogleIdToken.Payload payload = idToken.getPayload();
        googleAccount.userId = payload.getSubject();
        googleAccount.email = payload.getEmail();
        googleAccount.emailVerified = Boolean.valueOf(payload.getEmailVerified());
        googleAccount.name = (String) payload.get("name");
        googleAccount.pictureUrl = (String) payload.get("picture");
        googleAccount.locale = (String) payload.get("locale");
        googleAccount.familyName = (String) payload.get("family_name");
        googleAccount.givenName = (String) payload.get("given_name");
        googleAccount.tokenvalidated = true;
        return Optional.of(googleAccount);
    }
}
