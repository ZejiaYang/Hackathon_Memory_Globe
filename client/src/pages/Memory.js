import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CytoscapeComponent from 'react-cytoscapejs';

const Memory = ({username, socket}) => {
    
    const [memory, setMemory] = useState('');

    const [elements, setElements] = useState([]);

    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();

        setElements(elements => [...elements, {
            data: {
                id: 100, 
                label: 'node 100',
                grad: "#FFFFFF #FFFFFF"
            }
        }]);

        console.log("Submitting memory: %s", memory);
        socket.emit("memory submit", username, memory);
    };

    useEffect(() => {

        for (var i = 0; i < 20; i++) {
            elements.push({
                data: {source: Math.floor(Math.random()*20), target: Math.floor(Math.random()*20)}
            });
        }

        for (var i = 0; i < 20; i++) {
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            elements.push({data: 
                {
                    id: i, 
                    label: 'node' + i, 
                    grad: "rgb("+r+","+g+","+b+") rgb("+r*0.25+","+g*0.25+","+b*0.25+")"
                },
            })
        }
    }, []);

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
            <div className="memgraph">
                <CytoscapeComponent elements={elements} style={{
                    width: "100%", height: "100%"
                }} layout={
                    {
                        name: 'circle'
                    }
                    }
            stylesheet={[
                {
                    selector: 'node',
                    style: {
                    width: 30,
                    height: 30,
                    shape: 'circle',
                    label: 'data(id)',
                    'background-color': 'data(background_color)',
                    "background-fill": 'radial-gradient',
                    "background-gradient-stop-colors":'data(grad)',
                    "background-gradient-stop-positions": '0px 60px',
                    "font-size": '5',
                    opacity: 0.5
                    }
                },
                {
                    selector: 'edge',
                    style: {
                    width: 1
                    }
                },
                ]}
                    />
            </div>
        </div>
        
    );
};

export default Memory;