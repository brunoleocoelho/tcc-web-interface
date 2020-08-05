import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

import { setCategoryrFilter } from '../../../services/actions/BookFilterActions'
import { setAllCategories } from '../../../services/actions/BookActions'
import { getAllCategories } from '../../../services/api/BookServiceApi'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'
import LoadingLocal from '../../LoadingLocal'

/**
 * Componente que renderiza um filtro de categories
 */
function CategoryFilter(props) {
    // PROPS
    const { categoriesFilter } = props.filters
    const { categories } = props.data

    // STATE
    const [selected, setSelected] = useState( categoriesFilter )
    
    // FUNCTIONS
    const handleCategoryChecked = e => {
        const categ = e.target.value
        let newSelected = []

        if (!selected.includes(categ))
            newSelected = ([...selected, categ])
        else 
            newSelected = (selected.filter(cat => cat !== categ))

        props.setCategoryrFilter(newSelected)
    }

    /** Limpa todos os itens marcados */
    const cleanAllChecked = () => {
        props.setCategoryrFilter([])
    }

    // componentDidMount
    useEffect(() => {
        const getCategs = async () => {
            const data = await getAllCategories()
            props.setAllCategories(data)
        }

        if (categories.length === 0) getCategs()
    }, [])

    // componentDidupdate
    useEffect(() => {
        setSelected(categoriesFilter)
    }, [categoriesFilter])

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        // { label: "Sel.Todos", onClick: checkAllOptions },
    ]

    return (
        <div className="filter-container">
            <Separator />

            <h6>Categorias</h6>

            { (categories.length === 0) 
                ? <LoadingLocal />
                : (<>
                    <FilterActions actions={actions}/>

                    { categories.sort().map(category => {
                        const idChk = `filter-category-${String(category).replace(' ','_')}`
                        const isChecked = selected.includes(category)
                        
                        return (
                            <Form.Check 
                                key={'key-'+ idChk}
                                id={idChk}
                                type="checkbox"
                                label={category}
                                value={category}
                                custom
                                className="checkbox-style"
                                onChange={handleCategoryChecked}
                                checked={isChecked}
                            />
                        )
                    }) }
                </>)
            }
        </div>
    )
}

const mapStateToProps = ({ filters, data }) => ({
    filters,
    data
})

const mapDispatchToProps = {
    setCategoryrFilter, setAllCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
