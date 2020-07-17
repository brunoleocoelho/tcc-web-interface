import { unsetAuthUser } from "./AuthenticationService";

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
    const headerData = {
        title: 'Biblioteca',
        items: [
            { label: 'Livros', path: '/', icon: 'book' },
            { label: 'Autores', path: '/', icon: 'users' },
            { label: 'Estante', path: '/', icon: 'bookmark' },
            { label: 'Sobre', path: '/sobre', icon: 'question' },
            { label: 'Logoff', path: null, onClick: unsetAuthUser, icon: 'sign-out' },
        ]
    }
    return headerData;
}

export {
    getNavbarData,
    setTitleBarText
}