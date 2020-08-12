import { 
    USER_SET_INFO,
    USER_CLEAN_INFO,
    USER_SET_BOOK_INFO
} from "./types"
import { setEncodedUser } from "../AuthenticationService"

/**
 * Armazena do usuário autenticado no store Redux
 * @param {{
 *   id:string,
 *   userName:string, 
 *   name:string,
 *   lastName:string,
 *   role:string
 *   profileImg:string
 * }} user o usuário autenticado
 */
export function setUserInfo(user) {
    // setEncodedUser(user)
    return {
        type: USER_SET_INFO,
        user
    }
}

/** Limpa as informações do usuário do REDUX */
export function cleanUserInfo() {
    // setEncodedUser(null)
    return {
        type: USER_CLEAN_INFO,
        user: null
    }
}

/** Armazena informações de livros em contexto do usuário */
export function setUserBooks(userBooks) {
    return {
        type: USER_SET_BOOK_INFO,
        payload: userBooks
    }
}