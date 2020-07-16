import React from 'react'
import { FormControl, Button } from 'react-bootstrap'

/** 
 * Componente para renderizar o campo de busca
 */
function AutosuggestSearch({ value, placeholder, onChangeText, closeAction, inputRef }) {

    const phText = placeholder ? placeholder : 'Buscar livro...' 

    return (
        <React.Fragment>
            
            <Button variant="light" 
                className="mr-1 d-md-none"
                style={styles.btnClose} 
                onClick={closeAction}
            >
                <i className="fa fa-close" />
            </Button>

            <FormControl 
                ref={inputRef}
                type="text" 
                placeholder={phText} 
                value={value} 
                onChange={onChangeText} 
            />

        </React.Fragment>
    )
}

// ESTILO
const styles = {
    btnClose: {
        position:'absolute', 
        right:0,
    }
}

export default AutosuggestSearch
