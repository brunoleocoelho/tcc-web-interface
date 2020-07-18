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
    const user = getUser() 

    const items = [
        { label: 'Livros', path: '/', icon: 'book', elemtype: 'link' },
        { label: 'Autores', path: '/', icon: 'users', elemtype: 'link'  },
        { label: 'Sobre', path: '/sobre', icon: 'question', elemtype: 'link'  },

        { label: ((user && user.name) || 'Usuário'), icon: 'user', elemtype: 'dropdown', items: [
            { label: 'Estante', path: '/', icon: 'bookmark', elemtype:'link', onClick: () => alert('clicou ESTANTE!') },
            { label: '', elemtype:'divider' },
            { label: 'Logoff', path: '/', icon: 'sign-out', elemtype:'link', onClick: doLogout },
        ] },
    ]

    const headerData = { title, items }
    return headerData;
}

/** Efeuta o logoff da aplicação redirecionando a tela de login */
function doLogout() {
    unsetAuthUser()
    window.history.pushState(null, null, '/login')
}

export {
    getNavbarData,
    setTitleBarText
}