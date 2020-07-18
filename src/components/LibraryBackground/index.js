import React from 'react'

/**
 * Componente para renderização de uma
 * imagem de background de uma biblioteca
 */
function LibraryBackground() {
    return <div style={styles.bgStyle}></div>
}

// ESTILOS 
const bgImg = require('../../assets/img/library.jpg')
const styles = {
    bgStyle: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        content: "",
        position: 'absolute',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        opacity: 0.9,
        filter: 'blur(4px)',
        zIndex: -1
    }
}

export default LibraryBackground
