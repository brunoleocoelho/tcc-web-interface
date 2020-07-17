import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAllCategories, getSelectedCategories, storeSelectedCategories } from '../../services/CategoryService'
import Separator from './Separator'
import FilterActions from './FilterActions'

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
        { label: "Selc.Todos", onClick: checkAllOptions },
    ]

    return (
        <div style={styles.filterContainer}>
            <Separator />

            <h6>Categorias</h6>

            <FilterActions actions={actions}/>

            { categorias.map(category => {
                const idKey = `filter-category-${String(category).replace(' ','_')}`
                const isChecked = selected.includes(category)
                
                return (
                    <Form.Check 
                        key={'key-'+ idKey}
                        type="checkbox"
                        id={'id-'+ idKey}
                        label={category}
                        value={category}
                        custom
                        style={styles.checkboxStyle}
                        onChange={handleCategoryChecked}
                        checked={isChecked}
                    />
                )
            }) }
        </div>
    )
}

const styles = {
    filterContainer: {
        marginBottom: 28
    },
    checkboxStyle: {
        fontSize: 12, 
        cursor: 'pointer',
        padding: '4px 0px',
    },
    trucatedBar: {
        'background': 'linear-gradient(0deg,#fff,rgba(255,255,255,0) 100%)',
        content: "",
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 60,
        width: '100%',
    }
}
export default CategoryFilter
