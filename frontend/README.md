## Getting Started


### Parei aqui

https://www.youtube.com/watch?v=3j4F9al12mw

### COnfiguração do OAuth2 do google

1. Acessar https://console.developers.google.com/apis/credentials
2. Criar um projeto
3. Configura tela de permissão oath para o projeto
4. Criar uma credencial  do tipo OAuth 2.0
5. Na configuração 'Origens JavaScript autorizadas' adicionar a url 'http://localhost:3000'
6. Na configuração 'URIs de redirecionamento autorizados' adicionar a url 'http://localhost:3000/api/auth/callback/google'
7. Copiar as CLIENT_ID e CLIENT_SECRET

### Projeto de exemplo do next auth com typescript 


https://github.com/nextauthjs/next-auth-typescript-example


### Carregar a imagem do google

A imagem do usuário do google não estava carregando normalmente.

Para resolver isso foi adicionado no "head" do html

```
<meta name="referrer" content="no-referrer" />
```
