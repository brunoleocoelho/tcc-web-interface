import React, { useState } from 'react'
import { Container, Form, Button, Row } from 'react-bootstrap'

// tipos de campos e componentes aceitos
const fieldTypes = [
    'text',
    'password',
    'checkbox',
    'button'
]

// auxiliar para action do form
let onSubmitAction = null

/**
 * Monta um formulário através de um array 
 * de objetos contento propriedades dos campos 
 */
function FormBuilder({ formProps }) {
    const { title, classes, validate, fields, actions, ...rest } = formProps

    const [validated, setValidated] = useState(false);

    /** manusei */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const isFormValid = form.checkValidity()
        console.log('=== handleSubmit', {isFormValid, event})

        event.preventDefault();
        if (isFormValid === false) {
            event.stopPropagation();
        }
        
        setValidated(true);
        return isFormValid
    };

    // Action para submit do form
    const formSubmitAction = (e) => onSubmitAction(e)
    
    return (
        <Form 
            noValidate
            className={classes && classes}
            validated={validated} 
            onSubmit={formSubmitAction}
            {...rest}
        >
            { title && <Form.Text className="h4 text-center">{ title }</Form.Text> }

            { fields && fields.map( field => {
                if (!fieldTypes.includes(field.type)) return null
                
                const fieldKey = `field-${field.type}-${field.id}`
                switch (field.type) {
                    case 'text':
                    case 'password':
                        return <TextInputForm key={fieldKey} {...field} />

                    case 'checkbox':
                        return <CheckboxForm key={fieldKey} {...field} />
                
                    default:
                        return null
                }
            }) }

            { actions && (
                <ButtonGroupForm>
                    { actions.map( (act, idx) => {
                        const keyBtn = `btnform-${idx}`

                        if (act.type && act.type === 'submit') {
                            onSubmitAction = (e) => {
                                const isValid = handleSubmit(e)
                                const action = JSON.parse(JSON.stringify(act.onClick))
                                if (isValid && action) action(e)
                            }
                        }

                        return <ButtonForm key={keyBtn} {...act}/> 
                    }) }
                </ButtonGroupForm>
            ) }
        </Form>
    )
}

function ButtonGroupForm({ children }) {
    return (
        <Container className="m-0 p-2 justify-content-center">
            { children }
        </Container>
    )
}

function ButtonForm({ type, label, style, block, onClick, ...rest }) {
    return (
        <Button 
            variant={style ? style : 'primary'}
            type={type}
            block={block || false}
            onClick={onClick && onClick}
            {...rest}
        >
            { label }
        </Button>
    )
}

function TextInputForm({ id, label, placeholder, type, description, onChange, feedback, ...rest }) {
    return (
        <Form.Group controlId={id}>
            { label &&
                <Form.Label>{ label }</Form.Label>
            }

            <Form.Control 
                type={ type } 
                placeholder={ placeholder ? placeholder : '' }
                onChange={ onChange && onChange }
                {...rest}
            />

            { feedback && Object.keys(feedback).map( keyVal => {
                return (
                    <Form.Control.Feedback key={`fbk-${id}-${keyVal}`} type={keyVal}>
                        <small>{ feedback[keyVal] }</small>
                    </Form.Control.Feedback>
                )
            }) }

            { description && 
                <Form.Text className="text-muted">
                    { description }
                </Form.Text>
            }
        </Form.Group>
    )
}

function CheckboxForm({ id, label, value, onChange, isChecked, ...rest }) {
    return (
        <Form.Group controlId={id}>
            <Form.Check 
                type="checkbox"
                id={'checkbox-id-'+id}
                label={label}
                value={value}
                onChange={onChange && onChange}
                checked={isChecked}
                {...rest}
            />
        </Form.Group>
    )
}

export default FormBuilder
