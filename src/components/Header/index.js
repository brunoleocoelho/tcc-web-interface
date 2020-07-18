import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { Navbar, Container } from 'react-bootstrap'
import NavCollapse from './NavCollapse'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'

/** 
 * Menu header principal do topo da página
 */
function Header(props) {
    // PROPS
    const{ pathname } = props.location

    // STATE
    const [isNavShown, setIsNavShown] = useState(false)
    const [isLoginPage, setIsLoginPage] = useState((pathname === '/login'))

    useEffect(() => {
        setIsLoginPage((pathname === '/login'))
    }, [ pathname ])

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
                
                { (isLoginPage) 
                    ? <NavBrand />
                    : (<>
                        <NavToggle />

                        <NavBrand />
                        <NavCollapse />
                        <NavSearch />
                    </>)
                }
                


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
            <i className="fa fa-bars"></i>
        </Navbar.Toggle>
    )
}

export default withRouter(Header)


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