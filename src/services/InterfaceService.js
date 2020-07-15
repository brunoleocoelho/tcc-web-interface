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
        ]
    }
    return headerData;
}

export {
    getNavbarData
}