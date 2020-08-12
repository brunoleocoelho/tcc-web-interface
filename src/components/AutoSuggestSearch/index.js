import React, { useState, useContext, useRef } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import CustomThemeContext from '../../services/CustomThemeContext'
import InputSuggestCustom from './InputSuggestCustom'
import { setGetinfoBook } from '../../services/actions/GetinfoActions'

import './AutoSuggestSearch.css'
import { Link } from 'react-router-dom'

/** Renderiza o componente de inut customizado */
const renderInputComponent = (inputProps, inputRef) => (
    <InputSuggestCustom {...inputProps} ref={inputRef} />
)

/** Retorna o valor a ser usado na escolha do usuário a ser mostrado no input */
const getSuggestionValue = (suggestion) => suggestion.title;

/** Renderiza um item de sugestão */
const renderSuggestion = (suggestion) => {
    return (
        <div className="row">
            <div class="col-2">
                <img src={suggestion.image_url} width={44} />
            </div>
            <div class="col-10">
                <div>
                    <p>{ suggestion.title }</p>
                    <small>{ suggestion.author }</small>
                </div>
                <hr />
            </div>
        </div>
    )
}

/** Renderiza o container de sugestões */
const renderSuggestionsContainer = ({ containerProps, children, query }, theme) => {
    if (!children) return null
    return (
        <div style={theme.fourth} {...containerProps}>
            <div className="container-top">
                { (children && query.length > 0) && (<>
                    Enter para buscar "<strong>{query}</strong>"
                </>) }
            </div>
            { children }
        </div>
    )
}

/**
 * Componente que encapsula o Autosuggest para busca
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

        const result = (inputLength > 2)
            ? books.filter(lang => String(lang.title).toLowerCase().includes(inputValue))
            : []

        return result
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

    /**
     * Chamado quando um item de sugestão é selecionado
     * @param {*} event o evento em si de escolha
     * @param {{
     *  suggestion: string,
     *  suggestionValue: string,
     *  suggestionIndex: number,
     *  sectionIndex: number,
     *  method: any
     * }} suggestontext conjunto de informações referente a busca
     * @see https://github.com/moroshko/react-autosuggest#onsuggestionselected-optional
     */
    const onSuggestionSelected = (event, suggestontext) => {
        const { suggestion } = suggestontext
        props.setGetinfoBook(suggestion)
    }

    // Props para input
    const inputProps = {
        placeholder: 'Buscar livro...',
        value,
        onChange,
        onCloseInput,
        onFocus: (e,a) => console.log("onFocus",{e,a}),
        onBlur: (e,a) => console.log("onBlur",{e,a})
    };

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
            renderSuggestionsContainer={(props) => renderSuggestionsContainer(props, theme)}
            onSuggestionSelected={onSuggestionSelected}
            // focusInputOnSuggestionClick
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
