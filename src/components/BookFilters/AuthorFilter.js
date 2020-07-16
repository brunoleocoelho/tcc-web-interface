import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAllAuthors, getSelectedAuthors, storeSelectedAuthors } from '../../services/AuthorService'
import Separator from './Separator'

/**
 * Componente que renderiza um filtro de autores
 */
function AuthorFilter() {
    // STATE
    const [autores] = useState( getAllAuthors() )
    const [selected, setSelected] = useState( getSelectedAuthors() )
    
    // FUNCTIONS
    const handleAuthorChecked = e => {
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

    return (
        <div style={styles.filterContainer}>
            <Separator />
            
            <h6>Autores</h6>

            { autores.map(autor => {
                const idKey = `filter-author-${String(autor).replace(' ','_')}`
                const isChecked = selected.includes(autor)

                return (
                    <Form.Check 
                        key={'key-'+idKey}
                        type="checkbox"
                        id={'id-'+idKey}
                        label={autor}
                        value={autor}
                        custom
                        style={styles.checkboxStyle}
                        onChange={handleAuthorChecked}
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
export default AuthorFilter
