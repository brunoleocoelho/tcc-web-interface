import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAllCategories, getSelectedCategories, storeSelectedCategories } from '../../../services/CategoryService'
import Separator from '../Separator'
import FilterActions from '../FilterActions'
import '../BookFilters.css'

/**
 * Componente que renderiza um filtro de categorias
 */
function CategoryFilter() {
    // STATE
    const [categorias] = useState( getAllCategories() )
    const [selected, setSelected] = useState( getSelectedCategories() )
    
    // FUNCTIONS
    const handleCategoryChecked = e => {
        const categ = e.target.value
        let newSelected = []

        if (!selected.includes(categ))
            newSelected = ([...selected, categ])
        else 
            newSelected = (selected.filter(cat => cat !== categ))
        
        newSelected.sort()
        setSelected(newSelected)
        storeSelectedCategories(newSelected)
    }

    /** Limpa todos os itens marcados */
    const cleanAllChecked = () => {
        setSelected([])
        storeSelectedCategories([])
    }

    /** Marca todos os itens da lista */
    const checkAllOptions = () => {
        setSelected(categorias)
        storeSelectedCategories(categorias)
    }

    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAllChecked },
        { label: "Sel.Todos", onClick: checkAllOptions },
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

export default CategoryFilter
