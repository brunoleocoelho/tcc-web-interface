import React from 'react'

const imgDft = require('../../assets/img/no-image-profile.jpg')

/** Componente contendo a imagem de usuário */
function Avatar(props) {
    const { userImg } = props

    return (
        <div style={styles.avtContainer}>
           <img src={userImg || imgDft} style={styles.avtImg} />
        </div>
    )
}

// ESTILOS
const styles = {
    avtContainer: {
        width: 'fit-content'
    },
    avtImg: {
        borderRadius: '50%',
        width: 48,
        height: 48
    }
}

export default Avatar
