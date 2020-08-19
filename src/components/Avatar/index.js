import React from 'react'

const imgDft = require('../../assets/img/no-image-profile.jpg')

/** Componente contendo a imagem de usuário */
function Avatar({ userImg, width, style }) {

    const customStyle = {
        ...styles.avtContainer,
        ...(style ? style : {})
    }

    return (
        <div style={customStyle}>
            <img 
                src={userImg}
                width={width} 
                style={styles.avtImg}
                alt="user"
            />
        </div>
    )
}

Avatar.defaultProps = {
    userImg: imgDft,
    width: 50
}

// ESTILOS
const styles = {
    avtContainer: {
        margin: 0
    },
    avtImg: {
        borderRadius: '50%',
    }
}

export default Avatar
