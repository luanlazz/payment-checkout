# Instruções

Para incorporar o componente de pagamento a outra aplicação, se faz necessários algumas configurações. Nele utiliza-se um context para armazenar os dados informados e a função para realizar a requisição ao serviço de pagamentos. Além de um hook para facilitar o uso do context.

O serviço de pagamento, encontra-se na pasta services, onde realiza um post ao end-point '/pagar' com os dados armazenados no context.

Vale destacar que o projeto utiliza imagens .png, sendo assim deve-se realizar o devido tratamento para compilação. Bem como o typescript utilizado nos componentes.

## Scripts

1. npm start: executa a aplicação a partir do build (localhost:3000);
2. npm dev: executa a aplicação em modo de desenvolvimento (localhost:8080);
3. build: executa o build do projeto, gerando a pasta dist na raiz;