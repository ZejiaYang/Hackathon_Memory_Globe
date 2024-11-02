import logo from '../assets/logo.png';
import React, { useState } from 'react';

function Header() {
    return (
        <header style={{ display: 'flex', padding: '10px' , textAlign: 'right', justifyContent: 'space-between'}}>
            <img src={logo} alt="Logo" style={{ height: '100px', padding:'30px'}} />
        </header>
        
    );
}

export default Header;