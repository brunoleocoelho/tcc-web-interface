import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

import { setAuthorFilter } from '../../../services/actions/BookFilterActions'
import { setAllAuthors } from '../../../services/actions/BookActions'
import { getAllAuthors } from '../../../services/api/BookServiceApi'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'
import LoadingLocal from '../../LoadingLocal'

/**
 * Componente que renderiza um filtro de authors
 */
function AuthorFilter(props) {
    // console.log('AuthorFilters', props)
    // PROPS
    const { authorsFilter } = props.filters
    const { authors } = props.data

    // STATE
    const [selected, setSelected] = useState( authorsFilter )
    
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

    //componentDidMount
    useEffect(() => {
        const getAutores = async () => {
            const data = await getAllAuthors()
            props.setAllAuthors(data)
        }
        
        if (authors.length === 0) getAutores()
    }, [])

    // componentDidUpdate
    useEffect(() => {
        setSelected(authorsFilter)
    }, [authorsFilter])

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        // { label: "Sel.Todos", onClick: checkAllOptions },
    ]

    return (
        <div id="author-filters" className="filter-container">
            <Separator />
            
            <h6>Autores</h6>

            { (authors.length === 0)
                ? <LoadingLocal />
                : (<>
                    <FilterActions actions={actions} />

                    { authors.sort().map( autor => {
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
                </>)
            }
        </div>
    )
}

// REDUX
const mapStateToProps = ({ filters, data }) => ({
    filters,
    data
})

const mapDispatchToProps = {
    setAuthorFilter, setAllAuthors
}

// export default AuthorFilter
export default connect(mapStateToProps, mapDispatchToProps)(AuthorFilter)
