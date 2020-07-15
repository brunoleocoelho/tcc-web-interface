import React, { useState } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import NavCollapse from './NavCollapse'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'

/** 
 * Menu header principal do topo da página
 */
function Header() {
    // STATE
    const [isNavShown, setIsNavShown] = useState(false)

    // 5 breakpoint sizes (xs, sm, md, large, and xl)
    return (
        <Navbar 
        sticky="top" 
        expand="md" 
        bg="dark" 
        variant="dark" 
        collapseOnSelect
        expanded={isNavShown}
        onToggle={e => setIsNavShown(e)}
        >
        <Container className="d-flex justify-content-start">
            

            <NavToggle />

            <NavBrand />
            
            <NavCollapse />
            
            <NavSearch />

        </Container>
        </Navbar>
    )
}

/** Renderiza o botão de acesso ao menu */
function NavToggle() {
    return (
        <Navbar.Toggle 
            className="p-2 m-0"
            label="Menu" 
            aria-controls="responsive-navbar-nav"
        >
            <i className={'fa fa-fw fa-bars'}></i>
        </Navbar.Toggle>
    )
}

// ESTILOS CUSTOMIZADOS
const styles = {
    grow: {
        flexGrow: 1,
    },
    navBrandText: {
        fontSize: 22,
    },
    navLink: {
        fontSize: '12pt',
    },
    inputCol: {
        flexGrow:1
    },
    btnRegular: {
        position: 'absolute',
        right: 0,
        top: 8,
    },
    btnShowInput : {
        display: 'none'
    },
}

export default Header


/** Atua na busca de livros na API */
// const searchBook = () => {
//     const { searchInput, isSearched } = this.state
//     if (!isSearched) {
//     if (searchInput.length >= 3) {
//         BibliotecaApi.getSearchOfBooks(searchInput).then(response => {
//         this.setState({ books: [...response.books], isSearched: true })
//         })
//     }
//     }
//     else {
//     this.setState({ searchInput: '', pageStart: 1, isSearched: false, books: [] }, () => {
//         this.loadBooks()
//     })
//     }
// }

// {/* INPUT DE BUSCA */}
// <div className="nav-item">
//     {/* <i className={'fa fa-fw fa-search'}></i> */}
//     <InputField type='text'
//         className='input-search'
//         placeholder='Buscar livro...'
//         value={''}
//         onChange={() => { }} />
//     <Button title=''
//         className="button-action"
//         onClick={() => {/* this.searchBook() */ }}
//         icon={/* isSearched ? 'close': */'search'} />
// </div>