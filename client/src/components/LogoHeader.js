import logo from '../assets/logo.png';
import React, { useState } from 'react';

function Header() {
    return (
        <header style={{ display: 'flex', padding: '10px' , textAlign: 'right', justifyContent: 'space-between'}}>
            <img src={logo} alt="Logo" style={{ height: '13vh', padding:'30px'}} />
            <h1 style={{color:'white', textAlign: 'right', fontFamily: 'Dimitri', fontSize:'14.5vh', marginTop:'180px', transform: 'rotate(18deg)', textShadow: '4px 4px 10px rgba(0, 0, 0, 0.7)' }}>Memory Globe</h1>
        </header>
        
    );
}

export default Header;