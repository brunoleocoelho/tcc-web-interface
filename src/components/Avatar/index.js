import React from 'react'

const imgDft = require('../../assets/img/no-image-profile.jpg')

/** Componente contendo a imagem de usuário */
function Avatar({ userImg, width, style }) {

    const imgCss = {
        ...styles.avtImg,
        ...(width ? {width} : {})
    }
    const customStyle = {
        ...styles.avtContainer,
        ...(style ? style : {})
    }

    return (
        <div style={customStyle}>
           <img src={userImg || imgDft} style={imgCss} />
        </div>
    )
}

// ESTILOS
const styles = {
    avtContainer: {
        width: 'fit-content',
        margin: 0
    },
    avtImg: {
        borderRadius: '50%',
        width: 48,
        // height: 48
    }
}

export default Avatar
