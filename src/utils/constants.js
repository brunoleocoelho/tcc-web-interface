// Do mais CLARO para o mais ESCURO
// fundos claros
export const white = "#FFFFFF";
export const smoke = "#f5f5f5";
export const steel = "#EEF1F5";
export const dust = "#E5E5E5";
export const grey = "#D5D5D5";

// fundos escuros
export const greymint = "#343a40";
export const darker = "#1e2225";
export const ebony = "#1a1c1d";
export const graphite = "#1a1a1a";
export const black = "#000000";

// Cores linhas HR
export const lineLight = "#0000002a";
export const lineDark = "#ffffff2a";

// REPRESENTA OS ESTILOS PARA TEMA ESCURO
// fundos escuros, fontes claras
const dark = {
    themeName: 'dark',
    line: lineDark,
    primary: {
        backgroundColor: graphite,
        color: steel,
    },
    second: {
        backgroundColor: ebony,
        color: steel,
    },
    third: {
        backgroundColor: darker,
        color: white,
    },
    fourth: {
        backgroundColor: greymint,
        color: white,
    },
}

// REPRESENTA OS ESTILOS PARA TEMA CLARO
// fundos claros, fontes escuras
const light = {
    themeName: 'light',
    line: lineLight,
    primary: {
        backgroundColor: dust,
        color: black,
    },
    second: {
        backgroundColor: steel,
        color: graphite,
    },
    third: {
        backgroundColor: smoke,
        color: darker,
    },
    fourth: {
        backgroundColor: white,
        color: graphite,
    },
}

export const themes = { light, dark }

// Formato de layout usado nas listas
export const layouts = {grid:'grid', list:'list'}

// MOCK para tempo de requisição
export const REQUEST_TIME_MS = 1000

// URL base conforme ambiente
export const baseUrl = process.env.REACT_APP_BASEURL || ''
