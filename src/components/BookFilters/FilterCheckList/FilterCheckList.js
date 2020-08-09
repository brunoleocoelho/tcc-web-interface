import React from 'react'
import { Form } from 'react-bootstrap'
import Separator from '../Separator'
import LoadingLocal from '../../LoadingLocal'
import FilterActions from '../FilterActions'

/** 
 * Rederiza filtros de livros da pagina
 */
function FilterCheckList({ title, filterFields, filteredData, onCheck, cleanAction }) {   
    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAction },
    ]

    const titleLwr = title.toLowerCase().replace(' ', '')
    const id = `filter-${titleLwr}`

    return (
        <div id={id} className="filter-container">
            <Separator />
            
            <h6>{ title }</h6>

            { (filterFields.length === 0)
                ? <LoadingLocal />
                : (<>
                    <FilterActions actions={actions} />

                    { filterFields.sort().map( item => {
                        const idItem = `filter-${titleLwr}-${String(item).replace(' ','')}`
                        const isChecked = filteredData.includes(item)

                        return (
                            <Form.Check 
                                key={'key-'+idItem}
                                id={idItem}
                                type="checkbox"
                                label={item}
                                value={item}
                                custom
                                className="checkbox-style"
                                onChange={onCheck}
                                checked={isChecked}
                            />
                        )
                    }) }
                </>)
            }
        </div>
    )
}

export default FilterCheckList
