import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

import { setCategoryrFilter } from '../../../services/actions'
import { getAllCategories, getSelectedCategories, storeSelectedCategories } from '../../../services/CategoryService'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'

/**
 * Componente que renderiza um filtro de categorias
 */
function CategoryFilter(props) {
    // STATE
    const [categorias] = useState( getAllCategories() )
    const [selected, setSelected] = useState( props.bookFilters.categories )
    
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

    // componentDidupdate
    useEffect(() => {
        setSelected(props.bookFilters.categories)
    }, [props.bookFilters.categories])

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        // { label: "Sel.Todos", onClick: checkAllOptions },
    ]

    return (
        <div className="filter-container">
            <Separator />

            <h6>Categorias</h6>

            <FilterActions actions={actions}/>

            { categorias.map(category => {
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
        </div>
    )
}

const mapStateToProps = ({ bookFilters }) => ({
    bookFilters
})

const mapDispatchToProps = {
    setCategoryrFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
