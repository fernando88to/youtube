package com.fernando.controllers;

import com.fernando.dto.api.response.JWTResponse;
import com.fernando.enums.AuthenticatorProvider;
import com.fernando.exceptions.ErrorValidateTokenException;
import com.fernando.exceptions.InvalidTokenException;
import com.fernando.services.TokenManagementService;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("authenticator")
public class AuthenticatorJWTController {

    static final String PARAMS_AUTHORIZATION = "Authorization";

    @Inject
    Logger log;

    @Inject
    TokenManagementService tokenManagementService;


    @Path("/google")
    @POST
    public RestResponse<JWTResponse> authenticatorGoogle(@HeaderParam(PARAMS_AUTHORIZATION) String paramsAuthorization) {
        JWTResponse jwtResponse = new JWTResponse();
        if (paramsAuthorization == null || paramsAuthorization.isEmpty()) {
            return RestResponse.status(Response.Status.UNAUTHORIZED, jwtResponse);
        }
        Response.Status status = null;
        try {
            Optional<String> jwt = tokenManagementService.generateToken(AuthenticatorProvider.GOOGLE,
                    paramsAuthorization);
            jwtResponse.jwt = jwt.orElse("");
            status = Response.Status.OK;
        } catch (InvalidTokenException e) {
            log.error(e.getMessage());
            status = Response.Status.UNAUTHORIZED;
        } catch (ErrorValidateTokenException e) {
            log.error(e.getMessage());
            status = Response.Status.BAD_GATEWAY;
        }
        return RestResponse.status(status, jwtResponse);
    }

}
