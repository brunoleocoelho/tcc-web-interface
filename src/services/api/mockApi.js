import { REQUEST_TIME_MS } from "../../utils/constants"

// Simulando o tempo de espera de uma requisição
export async function mockApiRequest(prom) {
    return prom.then(
        (val) => new Promise(resolve => {
            setTimeout(() => resolve(val), REQUEST_TIME_MS)
        })
    ).then(response => response.json())
}

