import users from '../assets/data/users.json'

const userAuth = 'user-auth'

/**
 * Retorna o usuário autenticado na aplicação
 */
function getUser() {
    const user = JSON.parse(localStorage.getItem(userAuth))
    if (!user) return null
    return user
}

/**
 * Armazena localmente o usuário autenticado aplicação
 * @param {{
 *   id:string,
 *   userName:string, 
 *   name:string,
 *   lastName:string,
 *   role:string
 *   profileImg:string
 * }} user o usuário autenticado
 */
function setAuthUser({ id, userName, name, lastName, role, profileImg }) {
    localStorage.setItem(userAuth, JSON.stringify({ id, userName, name, lastName, role, profileImg }))
    return true
}

/**
 * Remove os dados de autenticaçãodo armazenamento (faz LOGOFF)
 */
function unsetAuthUser() {
    localStorage.removeItem(userAuth)
    return true
}

/**
 * MOCK que faz a "autenticação fake" do usuário
 * @param {string} userName o nome de usuário para acesso
 */
function validateUser(userName = '') {
    if (userName.length === 0) return false

    const foundUser = users.find(usr => usr.userName === userName)
    
    if (!foundUser) return false
    return foundUser
}

/** Armazena o usuário encoded */
function setEncodedUser(user) {
    if (!user) {
        unsetAuthUser()
        return
    }
    const { id, userName, role } = user
    const joined = [id, userName, role].join('-')
    const b64EncdUser = window.btoa(joined)
    localStorage.setItem(userAuth, b64EncdUser)
}

export {
    getUser,
    setAuthUser,
    unsetAuthUser,
    validateUser,
    setEncodedUser
}