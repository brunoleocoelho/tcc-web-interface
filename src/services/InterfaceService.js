import { unsetAuthUser, getUser } from "./AuthenticationService";

// Chaves de informações localStorage
const themeApplied = 'theme-applied'

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
        { label: 'Livros', href: '/livros', icon: 'book', elemtype: 'link' },
        { label: 'Sobre', href: '/sobre', icon: 'question', elemtype: 'link' },
        { label: "Resumo", href:"", icon: "bookmark" },
        { label: "Leituras", href:"", icon: "glass" },
        { label: "Entregas", href:"", icon: "warning" },
        { label: "Reservas", href:"", icon: "book" },
        { label: "Favoritos", href:"", icon: "star" },
        { label: "Histórico", href:"", icon: "history" },
    ]

    const headerData = { title, items }
    return headerData;
}

function getUserMenu() {
    const user = getUser() 
    // Formato: label: "", href: "", icon: "", elemtype: "", items: []
    const menu = { 
        label: (user? user.name : ''), 
        icon: 'user', 
        elemtype: 'dropdown', 
        items: [
            { label: 'Estante', href: '/', icon: 'bookmark', elemtype:'link', onClick: () => alert('clicou ESTANTE!') },
            { label: '', elemtype: 'divider' },
            { label: 'Sair', href: '/', icon: 'sign-out', elemtype:'link', onClick: doLogout },
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

/** Armazena o tema visual escolhido pelo usuário */
function setThemeToApply(theme) {
    localStorage.setItem(themeApplied, JSON.stringify(theme))
}

/** Retorna o tema visual armazenado */
function getThemeApplied() {
    const thm = JSON.parse(localStorage.getItem(themeApplied))
    return thm
}

export {
    getNavbarData,
    setTitleBarText,
    exceptionPages,
    doLogout,
    getLoginNews,
    getUserMenu,
    setThemeToApply,
    getThemeApplied
}