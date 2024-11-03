import React, { useState, useEffect } from 'react';
import Anger from '../assets/Anger.webp';
import Sadness from '../assets/Sadness.webp';
import Joy from '../assets/Joy.webp';
import Fear from '../assets/Fear.webp';
import Disgust from '../assets/Disgust.webp';
import Logo from '../components/LogoStraight';
import CytoscapeComponent from 'react-cytoscapejs';
import { useNavigate } from 'react-router-dom';

const Memory = ({ username, socket }) => {

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
                data: { source: Math.floor(Math.random() * 20), target: Math.floor(Math.random() * 20) }
            });
        }

        for (var i = 0; i < 20; i++) {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            elements.push({
                data:
                {
                    id: i,
                    label: 'node' + i,
                    grad: "rgb(" + r + "," + g + "," + b + ") rgb(" + r * 0.25 + "," + g * 0.25 + "," + b * 0.25 + ")"
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
                <Logo />

                <div style={{ position: 'relative', height: '20vh', width: '50%', marginLeft: '50px' }}>
                    <img src={Joy} className="wobble" alt="Joy" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>
                </div>

                <div style={{ position: 'relative', height: '15vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Disgust} className="wobble" alt="Disgust" style={{ position: 'absolute', height: '100%', right: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>
                </div>

                <div style={{ position: 'relative', height: '15vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Sadness} className="wobble" alt="Sadness" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>
                </div>


                <div style={{ position: 'relative', height: '17vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Fear} className="wobble" alt="Fear" style={{ position: 'absolute', height: '100%', right: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>

                </div>


                <div style={{ position: 'relative', height: '10vh', width: '50%', marginLeft: '50px', marginTop: '10px' }}>
                    <img src={Anger} className="wobble" alt="Anger" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>I'm angry!!! And I will be even angrier if this text doesn't wrap!</span>
                </div>





                <div style={{ position: 'relative', height: '20vh', width: '50%', marginLeft: '50px', marginTop: '20px' }}>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center', // Horizontally centers the content
                            alignItems: 'center', // Vertically centers the content
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <label htmlFor="username" style={{
                                position: 'absolute', width: '25%', height: '20%', left: '2%', 'font-size': '25pt', fontFamily: 'Impact', color: 'white'
                            }}>Memory: </label>
                            <input
                                style={{
                                    position: 'absolute', width: '60%', height: '20%', 'font-size': '20pt', fontFamily: 'Dimitri'
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
                                right: '2%',

                                height: '20%',
                                fontFamily: 'Impact',
                                fontSize: '15pt'
                            }}>Submit</button>
                        </div>
                    </form>

                </div>


                <div className="memgraph" style={{
                    position: 'absolute',
                    width: '40vw',
                    height: '40vw',
                    top: '200px',
                    left: '55%',
                    borderRadius: '50%', // Makes the div circular
                    overflow: 'hidden', // Ensures any overflow is clipped
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))'
                }}>
                    <CytoscapeComponent elements={elements} style={{
                        position: "absolute", width: "100%", height: "100%", top: "50%", left: "50%", transform: 'translate(-50%, -50%)'
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
                                    "background-gradient-stop-colors": 'data(grad)',
                                    "background-gradient-stop-positions": '0px 60px',
                                    "font-size": '5',
                                    opacity: 0.5
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    width: 1,
                                    'line-color': '#fffdf1' // Change edge color here
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