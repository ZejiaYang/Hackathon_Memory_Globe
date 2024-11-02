import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = ({socket}) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);

        console.log(socket);
        navigate('/');
    };

    return (
        <div className="login-container">
            <Header />
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
    );
};

export default Login;
