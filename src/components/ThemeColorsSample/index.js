import React, { useContext } from 'react'

import Page from '../Page'
import { themes } from '../../utils/constants';
import Separator from '../BookFilters/Separator';

const actions = [
    {
        label: 'Teste',
        onClick: () => alert('Teste'),
        icon: 'smile-o'
    }
] 

/** Componente para exibir as cores dos temas dark e light */
function ThemeColorSample() {
    const renderItems = (items) => {
        return (
            <>
                { Object.keys(items).map( item => {
                    if (typeof items[item] === 'string') return null;
        
                    return (
                        <div className="col" style={{
                            padding: 10, 
                            height: 100,
                        }}>
                            <div style={{
                                ...items[item],
                                borderRadius: 5, 
                                content: '',
                                height: 'inherit'
                            }}>
                                { item  }
                            </div>
                        </div>
                    )
                }) }
            </>
        )
        
    }

    return (
        <Page title="Sample de Cores dos Temas" actions={actions}>
            { Object.keys(themes).reverse().map( chave => (
                <div style={{
                    boarder:'1px solid black',
                    padding: 10
                }}>
                    <h3>{ chave }</h3>
                    <Separator />
                    <div className="row p-4" style={{
                        color: themes[chave].primary.color,
                        backgroundColor: themes[chave].primary.backgroundColor
                    }}>
                        { renderItems(themes[chave]) }
                    </div>
                </div>
            )) }
        </Page>
    )
}

export default ThemeColorSample
