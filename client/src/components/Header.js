import logo from '../assets/logo.png';
import React, { useState } from 'react';

function Header() {
    return (
        <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img src={logo} alt="Logo" style={{ height: '80px', padding:'30px'}} />
            <h1 style={{color:'white', textAlign: 'center', fontFamily: 'Dimitri', fontSize:'60px'}}>Memory Globe</h1>
        </header>
    );
}

export default Header;