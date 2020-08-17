import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import FormBuilder from '../../components/FormBuilder'
import AlertCustom from '../../components/AlertCustom'
import { setAuthUser, getUser } from '../../services/AuthenticationService'
import { authUser } from '../../services/api/AuthUserServiceApi'

import LibraryBackground from '../../components/LibraryBackground'
import LoadingLocal from '../../components/LoadingLocal'
import LoginNewsBoard from './LoginNewsBoard'

/**
 * Tela para login dos usuários estudante e profissional de biblioteca
 */
function Login(props) {
    // STATE
    const [userName, setUserName] = useState('')
    const [pwd, setPwd] = useState('')
    const [doingAuth, setDoingAuth] = useState(false) 

    // Se já estiver logado, redireciona a home
    const isUsrLgd = getUser()
    if (isUsrLgd) return <Redirect to={"/home"} />

    /** Envia os dados de login */
    const doLogin = async () => {
        const completed = (userName.length > 0 && pwd.length > 0)
        if (!completed) return
        
        const userValid = await authUser(userName)
        
        setDoingAuth(false)
        if (!userValid) {
            AlertCustom.show({
                show: true, 
                message: 'Usuário e senha inválidos!', 
                icon: 'frown-o',
                type: 'danger'
            })
            return
        }

        AlertCustom.show({
            show: true, 
            message: `Seja bem-vindo(a) ${userValid.name}!`,
            icon: 'smile-o',
            type: 'success'
        })

        setAuthUser(userValid)

        // vai para HomePage
        props.history.replace("/home")
    }

    // Objeto com propriedades do formulário de login
    const formProps = {
        title: 'Login de usuário',
        classes: 'p-3 ',
        fields: [
            {
                id: 'userName',
                label: 'Nome de usuário',
                placeholder: 'Digite o nome de usuário',
                description: 'Utilize o e-mail institucional da FAETERJ Petrópolis.',
                type: 'text',
                autoCapitalize: 'off',
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
                onClick: () => {
                    setDoingAuth(true)
                    doLogin()
                },
                disabled: !(userName.length > 0 && pwd.length > 0)
            }
        ]
    }

    return (
        <Container id="login-page" className="py-3">
            <LibraryBackground />

            <Row id="login-content">
                
                <Col id="login-news-col" className="py-2 p-md-2 col-12 col-md-6 col-lg-8 order-2 order-md-1" >
                   <LoginNewsBoard />
                </Col>

                <Col id="login-form-col" className='py-2 p-md-2 col-md-6 col-lg-4 order-1 order-md-2'>
                    <div style={{ 
                        border: '1px solid lightgrey', 
                        borderRadius: 4,
                        backgroundColor: 'lightgrey',
                        height: 330,
                        maxHeight: 330
                    }}>
                        { doingAuth
                            ? <LoadingLocal message="Autenticando..." />
                            : <FormBuilder formProps={formProps} />
                        }
                    </div> 
                </Col>

            </Row>
        </Container>
    )
}

// REDUX
const mapStateToProps = ({ userInfo }) => ({
    user: userInfo.user
})

const mapDispatchToProps = {}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
