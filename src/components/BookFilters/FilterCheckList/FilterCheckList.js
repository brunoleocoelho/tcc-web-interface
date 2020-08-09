import React, { useState } from 'react'
import { Form, Accordion } from 'react-bootstrap'
import Separator from '../Separator'
import LoadingLocal from '../../LoadingLocal'
import FilterActions from '../FilterActions'

/** 
 * Rederiza filtros de livros da pagina
 */
function FilterCheckList({ title, filterFields, filteredData, onCheck, cleanAction }) {  
    const [isCollapsed, setIsCollapsed] = useState(false)
    
    // Array de actions para os botões
    const actions = [
        { label: "Limpar", onClick: cleanAction },
    ]

    const titleLwr = title.toLowerCase().replace(' ', '')
    const id = `filter-${titleLwr}`
    const idContent = id + '-content'
    const icon = isCollapsed ? 'down':'up'

    return (
        <Accordion id={id} className="filter-container" defaultActiveKey={idContent}>
            
            <Separator />
            
            <Accordion.Toggle 
                as="div" 
                eventKey={idContent} 
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <i className={`fa fa-chevron-${icon} float-right`}></i>
                <h6>{ title }</h6>
            </Accordion.Toggle>

            { (filterFields.length === 0)
                ? <LoadingLocal />
                : (<Accordion.Collapse eventKey={idContent}>
                    <div>
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
                    </div>
                </Accordion.Collapse>)
            }
        </Accordion>
    )
}

export default FilterCheckList
