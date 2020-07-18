import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import FormBuilder from '../components/FormBuilder'
import AlertCustom from '../components/AlertCustom'
import { setAuthUser, validateUser, getUser } from '../services/AuthenticationService'
import { setTitleBarText } from '../services/InterfaceService'
import LibraryBackground from '../components/LibraryBackground'

/**
 * Tela para login dos usuários estudante e profissional de biblioteca
 */
function Login(props) {
    setTitleBarText('Login')

    // STATE
    const [userName, setUserName] = useState('')
    const [pwd, setPwd] = useState('')

    // Se já estiver logado, redireciona a home
    const isUsrLgd = getUser()
    if (isUsrLgd) return <Redirect to={"/home"} />

    /** Envia os dados de login */
    const doLogin = () => {
        const completed = (userName.length > 0 && pwd.length > 0)
        if (!completed) return
        
        const userValid = validateUser(userName)
        if (!userValid) {
            AlertCustom.show(true, 'Usuário e senha inválidos!', 'danger')
            return
        }

        AlertCustom.show(true, `Seja bem-vindo(a) ${userValid.name}!`, 'success')
        setAuthUser(userValid)

        props.history.replace("/home")
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
            <LibraryBackground />
            <FormBuilder formProps={formProps} />

            {/* <AlertCustom isShow={alertShow} message={erroMsg} type="danger" /> */}
        </Container>
    )
}

export default Login
