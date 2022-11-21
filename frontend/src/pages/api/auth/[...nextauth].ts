import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },


        }),

    ],
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt'

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.JWT_SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },
    callbacks: {
        async signIn({account, profile}: any) {
            console.log(account)
            /*if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@example.com")
            }*/
            return true // Do different verification for other providers that don't have `email_verified`
        },
        /* async jwt({ token, account }) {
             // Persist the OAuth access_token to the token right after signin
             if (account) {
                 token.accessToken = account.access_token
             }
             return token
         },*/
        async session({session, token, user}: any) {
            // Send properties to the client, like an access_token from a provider.
            //session.accessToken = token.accessToken
            session.address = "15"
            return session
        }

    }

}

// @ts-ignore
export default NextAuth(authOptions);