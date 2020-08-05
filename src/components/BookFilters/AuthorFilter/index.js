import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

import { setAuthorFilter } from '../../../services/actions'
import { getAllAuthors } from '../../../services/AuthorService'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'

/**
 * Componente que renderiza um filtro de autores
 */
function AuthorFilter(props) {
    // console.log('AuthorFilters', props)

    // STATE
    const [autores] = useState( getAllAuthors() )
    const [selected, setSelected] = useState( props.bookFilters.authors )
    
    // FUNCTIONS
    /** Atua na marcação do item de filtros */
    const handleAuthorChecked = (e) => {
        const autor = e.target.value
        let newSelected = []

        if (!selected.includes(autor))
            newSelected = ([...selected, autor])
        else 
            newSelected = (selected.filter(aut => aut !== autor))

        props.setAuthorFilter(newSelected)
    }

    /** Limpa todos os itens marcados */
    const cleanAllChecked = () => {
        if (selected.length > 0) {
            props.setAuthorFilter([])
        }
    }

    // componentDidUpdate
    useEffect(() => {
        setSelected(props.bookFilters.authors)
    }, [props.bookFilters.authors])

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        // { label: "Sel.Todos", onClick: checkAllOptions },
    ]

    return (
        <div id="author-filters" className="filter-container">
            <Separator />
            
            <h6>Autores</h6>

            <FilterActions actions={actions} />

            { autores.sort().map( autor => {
                const idAuthor = `filter-author-${String(autor).replace(' ','')}`
                const isChecked = selected.includes(autor)

                return (
                    <Form.Check 
                        key={'key-'+idAuthor}
                        id={idAuthor}
                        type="checkbox"
                        label={autor}
                        value={autor}
                        custom
                        className="checkbox-style"
                        onChange={handleAuthorChecked}
                        checked={isChecked}
                    />
                )
            }) }
        </div>
    )
}

// REDUX
const mapStateToProps = ({ bookFilters }) => ({
    bookFilters
})

const mapDispatchToProps = {
    setAuthorFilter,
}

// export default AuthorFilter
export default connect(mapStateToProps, mapDispatchToProps)(AuthorFilter)
