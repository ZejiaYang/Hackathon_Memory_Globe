import React from 'react';
import Anger from '../assets/Anger.webp';
import Sadness from '../assets/Sadness.webp';
import Joy from '../assets/Joy.webp';
import Fear from '../assets/Fear.webp';
import Disgust from '../assets/Disgust.webp';
import Header from '../components/Header';

const Memory = () => {
    return (
        <>
        <style>{`
        body { background: radial-gradient(circle, #0776aa, #032045);
        }
        `}</style>
        <div>
            <Header />
            <h1>Memory Page</h1>

            <img src={Anger} alt="Anger" style={{ height: '200px', padding: '30px' }} />
            <img src={Sadness} alt="Sadness" style={{ height: '200px', padding: '30px' }} />
            <img src={Joy} alt="Joy" style={{ height: '200px', padding: '30px' }} />
            <img src={Fear} alt="Fear" style={{ height: '200px', padding: '30px' }} />
            <img src={Disgust} alt="Disgust" style={{ height: '200px', padding: '30px' }} />
            <p>Welcome to the Memory Page!</p>
        </div>
        </>
    );
};

export default Memory;