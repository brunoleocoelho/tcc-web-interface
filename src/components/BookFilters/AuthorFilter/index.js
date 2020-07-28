import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAllAuthors, getSelectedAuthors, storeSelectedAuthors } from '../../../services/AuthorService'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'

/**
 * Componente que renderiza um filtro de autores
 */
function AuthorFilter() {
    // STATE
    const [autores] = useState( getAllAuthors() )
    const [selected, setSelected] = useState( getSelectedAuthors() )
    
    // FUNCTIONS
    const handleAuthorChecked = (e) => {
        const autor = e.target.value
        let newSelected = []

        if (!selected.includes(autor))
            newSelected = ([...selected, autor])
        else 
            newSelected = (selected.filter(aut => aut !== autor))
        
        newSelected.sort()
        setSelected(newSelected)
        storeSelectedAuthors(newSelected)
    }

    /** Limpa todos os itens marcados */
    const cleanAllChecked = () => {
        setSelected([])
        storeSelectedAuthors([])
    }

    /** Marca todos os itens da lista */
    const checkAllOptions = () => {
        setSelected(autores)
        storeSelectedAuthors(autores)
    }

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        { label: "Sel.Todos", onClick: checkAllOptions },
    ]

    return (
        <div id="author-filters" className="filter-container">
            <Separator />
            
            <h6>Autores</h6>

            <FilterActions actions={actions} />

            { autores.map( autor => {
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

export default AuthorFilter
