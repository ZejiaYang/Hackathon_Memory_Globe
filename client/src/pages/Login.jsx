import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Characters from '../assets/colourful.jpg';



const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        navigate('/Memory');
    };

    return (
        <>
        <style jsx global>{`
            body { background: radial-gradient(circle, #0776aa, #032045);
        }
        `}</style>
        <div className="login-container">
            <Header />

            {/* <img src={Characters} alt="Characters" style={{ height: '75vh', paddingLeft: '160px' , paddingTop:'30px', float: 'left'}} /> */}

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    );
};

export default Login;
