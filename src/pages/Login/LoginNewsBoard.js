import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { getLoginNews } from '../../services/api/NewsServiceApi'
import LoadingLocal from '../../components/LoadingLocal'
import { setTitleBarText } from '../../services/InterfaceService'

/** 
 * Componente que serve para exibição de notícias na pagina de login
 */
function LoginNewsBoard() {
    setTitleBarText('Login')
    
    // STATE
    const [avisos, setAvisos] = useState(null)
    
    //componentDidMount
    useEffect(() => {
        const getNews = async () => {
            try {
                const news = await getLoginNews()
                setAvisos(news || [])
            }
            catch (err) {
                console.log('[ERRO] getNews', err)
            }
        }
        if (!avisos) getNews()
    })

    // RENDER
    return (
        <Container className="p-3 h-100 bg-light rounded-sm">
            <h4 className="text-center">Avisos</h4>
            { !avisos
                ? <LoadingLocal />
                : (avisos.length === 0)
                    ? (
                        <div className="text-center text-secondary">
                            <h6>Não há avisos a serem exibidos</h6>
                            <i className="fa fa-fw fa-newspaper-o" style={{ fontSize:'10rem' }}/>
                        </div>
                    )
                    : (
                        avisos.map((noticia, idx) => (
                            <div key={`noticia-${idx}`} >
                                <hr/>
                                <h5>{ noticia.titulo }</h5>
                                <p className="text-justify" dangerouslySetInnerHTML={{ __html: noticia.conteudo }}></p>
                            </div>
                        ))
                    )
            }
        </Container>
    )
}

export default LoginNewsBoard
