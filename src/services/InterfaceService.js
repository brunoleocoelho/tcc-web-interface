import { unsetAuthUser } from "./AuthenticationService";
import { themeApplied } from "./storageKeys";

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

/**
 * Efeuta o logoff da aplicação e redireciona a tela de login
 */
function doLogout() {
    unsetAuthUser()
    window.history.pushState(null, null, '/login')
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
    doLogout,
    setThemeToApply,
    getThemeApplied
}