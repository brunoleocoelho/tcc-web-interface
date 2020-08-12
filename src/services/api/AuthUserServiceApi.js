import { mockApiRequest } from "./mockApi"

/**
 * Faz validação "fake" do 'userName' dentro de "users"
 * @param {string} userName nome do usuario a ser autenticado
 * @param {array} users grupo de usuarios para verificar
 */
function validateUser(userName, users) {
    if (userName.length === 0) return false

    const foundUser = users.find(usr => usr.userName === userName)
    
    if (!foundUser) return false
    return foundUser       
}

/**
 * MOCK que faz a "autenticação fake" do usuário
 * @param {string} userName o nome de usuário para acesso
 */
export function authUser(userName) {
    return mockApiRequest(fetch('./mock/users.json'))
        .then(users => validateUser(userName, users))
        .catch(err => console.error('[ERRO] authUser', err))
}