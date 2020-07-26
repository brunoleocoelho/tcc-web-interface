import { unsetAuthUser, getUser } from "./AuthenticationService";

/**
 * Atualiza o título da página concateca 
 * o titulo principal com um sufixo
 * @param {strin} sufix texto após titulo
 */
function setTitleBarText(sufix = '') {
    const mainText = getNavbarData().title
    const finalText = [ mainText, sufix ].join(' | ')

    // Atualizando título da página
    var tituloPrincipal = document.getElementById('titulo-principal')
    tituloPrincipal.innerHTML = finalText
}

/**
 * Função que retorna titulo e menus para as páginas
 */
function getNavbarData() {
    const title = 'Biblioteca'

    // Formato: label: "", path: "", icon: "", elemtype: "", items: []
    const items = [
        { label: 'Livros', path: '/livros', icon: 'book', elemtype: 'link' },
        { label: 'Sobre', path: '/sobre', icon: 'question', elemtype: 'link' },
    ]

    const headerData = { title, items }
    return headerData;
}

function getUserMenu() {
    const user = getUser() 
    // Formato: label: "", path: "", icon: "", elemtype: "", items: []
    const menu = { 
        label: (user? user.name : ''), 
        icon: 'user', 
        elemtype: 'dropdown', 
        items: [
            { label: 'Estante', path: '/', icon: 'bookmark', elemtype:'link', onClick: () => alert('clicou ESTANTE!') },
            { label: '', elemtype: 'divider' },
            { label: 'Sair', path: '/', icon: 'sign-out', elemtype:'link', onClick: doLogout },
        ] 
    }
    return menu
}

/**
 * Retorna as páginas que podem ser exeibidas mesmo
 * que não tenha sido feito login
 */
function exceptionPages() {
    const { items } = getNavbarData()

    const showNotLogged = items.filter( item => item.showNotLogged )
    return showNotLogged
}

/**
 * Efeuta o logoff da aplicação e redireciona a tela de login
 */
function doLogout() {
    unsetAuthUser()
    window.history.pushState(null, null, '/login')
}


/** Retorna avisos a serem mostrados na tela de login */
function getLoginNews() {
    const avisos = require('../assets/data/avisos.json')
    return avisos
}

export {
    getNavbarData,
    setTitleBarText,
    exceptionPages,
    doLogout,
    getLoginNews,
    getUserMenu
}