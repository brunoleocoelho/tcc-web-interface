import users from '../assets/data/users.json'

const userAuth = 'user-auth'

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
    const user = JSON.stringify({ id, userName, name, lastName, role, profileImg })
    const userEnc = setEncodedUser(user)
    localStorage.setItem(userAuth, userEnc)
    return true
}

/**
 * Retorna o usuário autenticado na aplicação
 */
function getUser() {
    const userEnc = localStorage.getItem(userAuth)
    if (!userEnc) return null
        
    const user = JSON.parse(getDecodedUser(userEnc))
    return user
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
    const b64EncdUser = window.btoa(user)
    return b64EncdUser
}


/** Armazena o usuário encoded */
function getDecodedUser(user) {
    return atob(user)
}


export {
    getUser,
    setAuthUser,
    unsetAuthUser,
    validateUser,
    setEncodedUser
}