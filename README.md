# Projeto de TCC

## Resumo

Projeto de interface web de aplicação de biblioteca acadêmica para o Trabalho de Conclusão de Curso (TCC) de Tecnólogo em Tecnologia da Informação e Comunicação da FAETERJ Petrópolis (Faculdade de Educação Tecnológica do Estado do Rio de Janeiro, desenvolvido por Bruno Coelho com React.


## Requisitos do projeto

Para execução do projeto é necessário a instalação de algumas ferramentas.

* **[Node.js](https://nodejs.org/en/)**
* **[Git](https://git-scm.com/)** 


### Execução do projeto

#### Instalar dependências
Para instanciar a aplicação em modo de desenvolvimento, executar os comandos abaixo no diretório da aplicação via terminal:
```bash
# Instala as dependências
npm install

# Inicia a aplicação
npm start
```

> **Problemas de inicialização**: Caso seja apresentado problemas com o recurso `max_user_watches` no Linux, siga as intruções abaixo:
```bash
# Estas são inmplementações para instância corrente

# 1. Verifique o número de arquivos que o sistema monitora simultaneamente
cat /proc/sys/fs/inotify/max_user_watches

## exemplo resposta: 288

# 2. Aplique um aumento considerável no número de arquivos e verifique novamente
sudo sysctl fs.inotify.max_user_watches=524288
```
> Para manter as configurações permanentemente, veja detlahes no link https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers


#### Acessar a aplicação
Caso não abra automaticamente, acessar [http://localhost:3000](http://localhost:3000) em um navegador de internet. A página é atualizada automaticamente a cada alteração salva nos arquivos da aplicação. Erros e avisos aparecem no console do terminal.

<!-- To launch test runner in the interactive watch mode, run: `npm test`.<br />
See the section about [running tests in react documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

#### Realizar _deploy_
Para fazer o _deploy_ para ambiente de produção, executar no terminal o comando:
```bash
npm run build
```
Será gerado o diretório `build` contendo o _bundle_ minificado da aplicação **React** em modo de produção, já otimizado para melhor performance. Assim a aplicação estará pronta para o server.

Acesse a documentação React para mais informações sobre [deploy](https://facebook.github.io/create-react-app/docs/deployment).


## Responsividade Bootstrap

A aplicação utiliza o framework bootstrap para prover responsividade em diferentes telas, portanto devem ser consideradas as siglas baixo utilizadas na aplicação.

* **xs** - Extra small devices (portrait phones, less than 576px)
* **sm** - Small devices (landscape phones, 576px and up)
* **md** - Medium devices (tablets, 768px and up)
* **lg** - Large devices (desktops, 992px and up)
* **xl** - Extra large devices (large desktops, 1200px and up)

> Documentação oficial: https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints


## Outras informações

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

* [Learn React, check out the React documentation](https://reactjs.org/).

* [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

* [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

* [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

* [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

* [Deployment](https://facebook.github.io/create-react-app/docs/deployment)

* [If `npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)