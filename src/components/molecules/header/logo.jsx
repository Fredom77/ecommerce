import React from 'react';

const Logo = () => {
  const logoStyle = {
    width: '75px', // Ajusté el tamaño a 75px
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    overflow: 'hidden' // Asegura que la imagen se recorte dentro del contenedor redondeado
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' // Ajusta la imagen para que cubra todo el contenedor
  };

  return (
    <div style={logoStyle}>
      <img src="./static/img/descarga.png" alt="Logo de React" style={imgStyle} />
    </div>
  );
}

export default Logo;
