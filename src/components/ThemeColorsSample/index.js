import React from 'react'

import { themes } from '../../utils/constants';
import Separator from '../BookFilters/Separator';


/** Componente para exibir as cores dos temas dark e light */
function ThemeColorSample() {
    const renderItems = (items) => {
        return (
            <>
                { Object.keys(items).map( (item, key) => {
                    if (typeof items[item] === 'string') return null;
        
                    return (
                        <div className="col" key={`color-${key}-${items[item].color}`} style={{
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
        <div style={{ padding: '1rem' }} >
            { 
                Object.keys(themes).reverse().map((chave, key) => (
                    <div key={`theme-${key}-${chave}`} style={{
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
                ))
            }
        </div>
    )
}

export default ThemeColorSample
