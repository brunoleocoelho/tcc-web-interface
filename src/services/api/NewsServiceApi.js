import { mockApiRequest } from "./mockApi"
import { baseUrl } from "../../utils/constants"

/** Retorna avisos a serem mostrados na tela de login */
export async function getLoginNews() {
    return mockApiRequest(fetch(baseUrl + '/mock/avisos.json'))
}