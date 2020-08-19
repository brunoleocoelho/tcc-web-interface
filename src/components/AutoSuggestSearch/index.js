import React, { useState, useContext, useRef } from 'react'
import { connect } from 'react-redux'

import Autosuggest from 'react-autosuggest'
import CustomThemeContext from '../../services/CustomThemeContext'
import InputSuggestCustom from './InputSuggestCustom'
import { setGetinfoBook } from '../../services/actions/GetinfoActions'
import ItemSuggestionCustom from './ItemSuggestionCustom'

import './AutoSuggestSearch.css'

/** Renderiza o componente de inut customizado */
const renderInputComponent = (inputProps, inputRef) => (
    <InputSuggestCustom {...inputProps} ref={inputRef} />
)

/** Retorna o valor a ser usado na escolha do usuário a ser mostrado no input */
const getSuggestionValue = (suggestion) => {
    return suggestion.title;
}

/** Renderiza um item de sugestão */
const renderSuggestion = (book) => {
    if (!book) return null
    if (!book.id) return <p>{ book.title }</p>
    return <ItemSuggestionCustom book={book}/>
}

/** Renderiza o container de sugestões */
const renderSuggestionsContainer = ({ containerProps, children, query }, adicProps) => {
    if (!children) return null

    const { count, theme } = adicProps
    const plural = (count > 1) ?'s' :''
    const textoTop = (count === 0)
        ? 'Nenhum resultado'
        : (<>{count} Resultado{plural} primário{plural} para "<strong>{query}</strong>"</>)
        
    return (
        <div style={theme.fourth} {...containerProps}>
            <div className="container-top">
                { (children && query.length > 0) && textoTop }
            </div>
            { children }
        </div>
    )
}

/**
 * Componente que encapsula o Autosuggest para busca
 * @see https://github.com/moroshko/react-autosuggest
 */
function AutoSuggestSearch(props) {
    // console.log('AutoSuggestSearch', props)
    // PROPS
    const { data, getinfo, closeAction } = props
    const { books } = data
    const { book } = getinfo
    
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // STATE
    const [value, setValue] = useState(book || '')
    const [suggestions, setSuggestions] = useState([])

    // REF
    const inputRef = useRef()

    /** Evento quando input for modificado */
    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    /** Ação especial executada ao clicar em fechar input */
    const onCloseInput = (e) => {
        closeAction(e)
        onChange(e, {newValue: ''})
    }

    /** Retorna os resulados a serem exibidos nas sugestões */
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const numResults = 5
        
        let result = (inputLength > 1) && books 
            .filter(livro => String(livro.title).toLowerCase().includes(inputValue))
            .filter((item, idx) => (idx < numResults))

        return result || []
    }

    /** Chamada a cada atualização das sugestões */
    const onSuggestionsFetchRequested = ({ value }) => {
        const suggVal = getSuggestions(value)
        setSuggestions(suggVal)
    }

    /** Function chamada para limpeza dos valores de input */
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    // Props para input
    const inputProps = {
        placeholder: 'Buscar livro...',
        value,
        onChange,
        onCloseInput,
        // onFocus: (e,a) => console.log("onFocus",{e,a}),
        // onBlur: (e,a) => console.log("onBlur",{e,a})
    };

    // Props adicionais para container
    const adicProps = {
        theme, 
        count: suggestions.length
    }

    // RENDER
    return (
        <Autosuggest
            ref={inputRef}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={props => renderInputComponent(props, inputRef)}
            renderSuggestionsContainer={(props) => renderSuggestionsContainer(props, adicProps)}
            focusInputOnSuggestionClick={false}
            // alwaysRenderSuggestions
        />
    );
}

// REDUX
const mapStateToProps = ({ data, getinfo }) => ({
    data, getinfo
})

const mapDispatchToProps = {
    setGetinfoBook
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoSuggestSearch)
