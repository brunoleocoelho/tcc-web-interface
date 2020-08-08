import { mockApiRequest } from "./mockApi"


/** Retorna avisos a serem mostrados na tela de login */
export async function getLoginNews() {
    return mockApiRequest(fetch('./mock/avisos.json'))
}