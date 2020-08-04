import React, { useContext } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import CustomThemeContext from '../../services/CustomThemeContext'

import './AutoSuggestSearch.css'

/** 
 * Componente para renderizar o campo de busca
 */
function AutoSuggestSearch({ value, placeholder, onChangeText, closeAction, inputRef }) {

    const phText = placeholder ? placeholder : 'Buscar livro...' 

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    return (
        <React.Fragment>
            
            <Button
                variant={theme.themeName}
                onClick={closeAction}
                className="btn-input-close"
            >
                <i className="fa fa-close" />
            </Button>

            {/* o mesmo que imput class="form-control" */}
            <FormControl 
                ref={inputRef}
                type="text" 
                placeholder={phText} 
                value={value} 
                onChange={onChangeText} 
                className="auto-suggest-input"
                style={theme.primary}
            />

        </React.Fragment>
    )
}


export default AutoSuggestSearch
