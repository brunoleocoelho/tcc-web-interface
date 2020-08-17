import { getUser } from "../services/AuthenticationService"

/**
 * Montagem de objeto JS de formulário com 
 * os campos a partir de dados de um livro
 * @param {{
    *  id: string,
    *  title: string,
    *  publisher: string,
    *  isbn: string,
    *  image_url: string,
    *  author: string,
    *  category: string,
    * }} bookData Os dados do livro
    */
export const buildFormJS = (bookData) => {
    const user = getUser()
    const isStudent = (user.role === 'estudante')

    const formulario = {
        style: { width: '100%' },
        row: false,
        fields: []
    }

    Object.keys(bookData).forEach((chave, idx) => {
        const field = {
            id: chave,
            label: chave.toUpperCase(),
            placeholder: chave,
            description: null,
            type: 'text',
            value: bookData[chave],

            // Propriedades conforme tipo de usuário
            readOnly: isStudent,
            ...(!isStudent && {
                required: true,
                feedback: { invalid: `Campo ${chave} obrigatório` },
                onChange: e => console.log(idx, e.target.value)
            }),
        }

        formulario.fields.push(field)
    })

    return formulario
}

/**
 * Devolve no máximo 'n' posições aleatórias de um array
 * @param {array} arr array a ser usado (default `[]`)
 * @param {number} n array a ser usado (default 1)
 */
export const getRandArrPos = (arr = [], n = 1) => {
    const arrLen = arr.length
    if (!arrLen) return []

    const qtd = (arrLen >= n) ? n : arrLen
    let pos = []
    let discard = []

    while (pos.length < qtd || discard.length === pos.length) {
        const rand = Math.floor( Math.random() * arrLen )
        if (!pos.includes(rand)) pos.push(rand)
        else discard.push(rand)
    }
    
    return pos
}

/**
 * Converte query string em array de chaves e valores
 * @param {string} search query string completa
 */
export const parseQueryString = (search) => {
    if (!search) return []

    const firstChar = search.substr(0,1)
    if (firstChar !== '?') return []

    const searchQueries = search.substr(1).split('&').map( item => {
        const [ key, value ] = decodeURI(item).split('=')
        return { key, value }
    })
    return searchQueries
}

/**
 * Constrói a query string para uri
 * @param {*} queries objeto contendo chave e valor
 */
export const buildUriEcoded = (queries) => {
    const params = Object.keys(queries)
    const arrQueries = params.map(chave => {
        return `${chave}=${queries[chave]}`
    })

    const finalQryStrings = '?'+ arrQueries.join('&')
    return encodeURI(finalQryStrings)
}
