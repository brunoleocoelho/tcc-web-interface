import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import FormBuilder from '../components/FormBuilder'
import AlertCustom from '../components/AlertCustom'
import { setAuthUser, validateUser } from '../services/AuthenticationService'

/**
 * Tela para login dos usuários estudante e profissional de biblioteca
 */
function Login() {

    const [userName, setUserName] = useState('')
    const [pwd, setPwd] = useState('')

    /** Envia os dados de login */
    const doLogin = () => {
        if (userName.length === 0 && pwd.length === 0) return
        
        const userValid = validateUser(userName)
        console.log('+++ validateUser', {userValid, userName, pwd})

        if (!userValid) {
            AlertCustom.show(true, 'Usuário e senha inválidos!', 'danger')
            return
        }

        setAuthUser(userValid)
        window.history.pushState(null, null, '/')
    }
  
    // Objeto com propriedades do formulário de login
    const formProps = {
        title: 'Login de usuário',
        classes: 'p-3 col-md-6 col-lg-4 mx-auto mx-lg-0 ml-lg-auto',
        style: { 
            border: '1px solid lightgrey', 
            borderRadius: 4,
            backgroundColor: 'lightgrey'
        },
        fields: [
            {
                id: 'userName',
                label: 'Nome de usuário',
                placeholder: 'Digite o nome de usuário',
                description: 'Utilize o e-mail institucional da FAETERJ Petrópolis.',
                type: 'text',
                value: userName,
                required: true,
                feedback: { invalid: 'Nome de usuário obrigatório.' },
                onChange: e => setUserName(e.target.value)
            },
            {
                id: 'pwd',
                label: 'Senha',
                placeholder: 'Digite sua senha',
                description: '',
                type: 'password',
                value: pwd,
                required: true,
                feedback:{ invalid: 'Senha obrigatória.' },
                onChange: e => setPwd(e.target.value)
            }
        ],
        actions: [
            {
                type: 'submit',
                label: 'Entrar',
                style: 'success',
                block: true,
                onClick: doLogin
            }
        ]
    }

    return (
        <Container className="py-3">
            <div style={styles.bgStyle}></div>
            <FormBuilder formProps={formProps} />

            {/* <AlertCustom isShow={alertShow} message={erroMsg} type="danger" /> */}
        </Container>
    )
}

// ESTILOS
const bgImg = require('../assets/img/library.jpg')
const styles = {
    bgStyle: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        content: "",
        position: 'absolute',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        opacity: 0.9,
        filter: 'blur(4px)'
    }
}

export default Login
