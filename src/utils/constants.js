// Do mais CLARO para o mais ESCURO
// fundos claros
const white = "#FFFFFF";
const steel = "#EEF1F5";
const grey = "#DFDFDF";
const dust = "#E5E5E5";

// fundos escuros
const greymint = "#232729";
const darker = "#1e2225";
const ebonyclay = "#1a1c1d";
const almost = "#161616";
const black = "#000000";

// REPRESENTA OS ESTILOS PARA TEMA ESCURO
// fundos claros, fontes escuras
const dark = {
    themeName: 'dark',
    first: {
        backgroundColor: almost,
        color: steel,
    },
    second: {
        backgroundColor: ebonyclay,
        color: steel,
    },
    third: {
        backgroundColor: darker,
        color: steel,
    },
    fourth: {
        backgroundColor: greymint,
        color: white,
    },
}

// REPRESENTA OS ESTILOS PARA TEMA CLARO
// fundos escuros, fontes claras
const light = {
    themeName: 'light',
    fourth: {
        backgroundColor: white,
        color: almost,
    },
    third: {
        backgroundColor: steel,
        color: darker,
    },
    second: {
        backgroundColor: grey,
        color: almost,
    },
    first: {
        backgroundColor: dust,
        color: black,
    },
}

export const themes = { light, dark }
