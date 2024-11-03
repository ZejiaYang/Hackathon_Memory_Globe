import React, { useState, useEffect } from 'react';
import Anger from '../assets/Anger.webp';
import Sadness from '../assets/Sadness.webp';
import Joy from '../assets/Joy.webp';
import Fear from '../assets/Fear.webp';
import Disgust from '../assets/Disgust.webp';
import Header from '../components/Header';
import CytoscapeComponent from 'react-cytoscapejs';
import { useNavigate } from 'react-router-dom';

const Memory = ({username, socket}) => {

    const [memory, setMemory] = useState('');

    const [elements, setElements] = useState([]);

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
        socket.emit("memory submit", Date.now(), username, memory);
    };

    useEffect(() => {

        for (var i = 0; i < 100; i++) {
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
        <>
        <style>{`
        body { background: radial-gradient(circle, #0776aa, #032045);
        }
        `}</style>
        <div>
            <Header />

            <img src={Anger} className="wobble" alt="Anger" style={{position: 'absolute', height: '175px', left: '1%', top: '150px'}} />
            <span class='emotionspeech' style={{position: 'absolute', left: '12%', top: '16%', textAlign: 'center'}}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>
            <img src={Sadness} alt="Sadness" style={{position: 'absolute', height: '250px', left: '800px', top: '31%'}} />
            <img src={Joy} alt="Joy" style={{position: 'absolute', height: '300px', left: '800px', top: '0px'}} />
            <img src={Fear} alt="Fear" style={{position: 'absolute', height: '250px', left: '825px', top: '535px'}} />
            <img src={Disgust} alt="Disgust" style={{position: 'absolute', height: '30%', left: '1%', top: '40%'}} />
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{position: 'absolute', top: '85%', width: '100%', height: '10%'}}>
                    <label htmlFor="username" style={{
                        position: 'absolute', width: '25%', height: '50%', left: '1%', top: '12%', 'font-size': '25pt', fontFamily: 'Dimitri', color: 'white'
                    }}>Memory: </label>
                    <input
                        style={{
                            position: 'absolute', left: '10%', width: '30%', height: '50%', 'font-size': '20pt', fontFamily: 'Dimitri'
                        }}
                        type="text"
                        id="memory"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                        required
                    />
                    <button type="submit" style={{
                        position: 'absolute',
                        width: '10%',
                        left: '42%',
                        top: '0%',
                        height: '50%',
                        fontFamily: 'Dimitri',
                        fontSize: '15pt'
                    }}>Submit memory</button>
                </div>
            </form>
            <h1 style={{position: "absolute", color:'white', textAlign: 'right', fontFamily: 'Dimitri', fontSize:'115px', left:'55%', top:'-5%', transform: 'rotate(3deg)', textShadow: '4px 4px 10px rgba(0, 0, 0, 0.7)' }}>Memory Globe</h1>
            <div className="memgraph">
                <CytoscapeComponent elements={elements} style={{
                    position: "absolute", width: "40%", height: "75%", top: "200px", left: "55%"
                }} layout={
                    {
                        name: 'random'
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
        </>
    );
};

export default Memory;