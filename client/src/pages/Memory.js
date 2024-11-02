import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Memory = ({username, socket}) => {
    
    const [memory, setMemory] = useState('');

    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitting memory: %s", memory);
        socket.emit("memory submit", username, memory);
    };

    return (
        <div>
            <h1>Memory Page</h1>
            <p>Welcome to the Memory Page!</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Memory: </label>
                    <input
                        type="text"
                        id="memory"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit memory</button>
            </form>
        </div>
        
    );
};

export default Memory;