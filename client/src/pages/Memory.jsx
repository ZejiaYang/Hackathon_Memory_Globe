import React, { useState, useEffect } from 'react';
import Anger from '../assets/Anger.webp';
import Sadness from '../assets/Sadness.webp';
import Joy from '../assets/Joy.webp';
import Fear from '../assets/Fear.webp';
import Disgust from '../assets/Disgust.webp';
import Logo from '../components/LogoStraight';
import CytoscapeComponent from 'react-cytoscapejs';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

function toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16;
    return "rgb(" + [r, g, b].join(",") + ")";
}

function emotionToColour(emotion) {
    const colors = {
        admiration: 0xFFD700,
        amusement: 0xFFB300,
        anger: 0xFF0000,
        annoyance: 0xFFA500,
        approval: 0x00FF00,
        caring: 0x90EE90,
        confusion: 0x808080,
        curiosity: 0x6A5ACD,
        desire: 0xFF69B4,
        disappointment: 0xC0C0C0,
        disapproval: 0xFF4500,
        disgust: 0x8B4513,
        embarrassment: 0xFFC0CB,
        excitement: 0xFFD700,
        fear: 0x0000FF,
        gratitude: 0x32CD32,
        grief: 0x2F4F4F,
        joy: 0xFFFF00,
        love: 0xFF1493,
        nervousness: 0xFFA07A,
        neutral: 0xA9A9A9,
        optimism: 0xFFD700,
        pride: 0x800080,
        realization: 0x4682B4,
        relief: 0x98FB98,
        remorse: 0xB0C4DE,
        sadness: 0x1E90FF,
        surprise: 0xFF6347
    };

    var res = 0;

    for (var emo in emotion) {
        res += colors[emo] * emotion[emo];
    }
    
    return res;
}

const Memory = ({ username, socket }) => {

    const [memory, setMemory] = useState('');

    const [elements, setElements] = useState([]);

    const [sp, setSp] = useState({});

    const [thinking, setThinking] = useState(false);

    const [typewriters, setTypewriters] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        setMemory('');

        console.log("Submitting memory: %s", memory);
        console.log(socket.emit("memory submit", Date.now(), username, memory));
        setSp({
            joy: '. . .',
            disgust: '. . .',
            sadness: '. . .',
            fear: '. . .',
            anger: '. . .'
        });
        setThinking(true);

    };

    useEffect(() => {

        socket.on('emotion response', (id, emotion, neighbour_ids, neighbour_history) => {
            console.log("Id:");
            console.log(id);
            console.log("Emotion:");
            console.log(emotion);
            console.log("Neighbour ids:")
            console.log(neighbour_ids);
            console.log("Neighbour history:")
            console.log(neighbour_history)

            var theta = Math.random() * 2 * Math.PI;

            var r = Math.random() * 300;

            var c = emotionToColour(emotion);
            console.log("Color:")
            console.log(c);
            console.log(toColor(c));

            var highest_emo = Object.keys(emotion).reduce(function(a, b){ return emotion[a] > emotion[b] ? a : b });
            console.log(highest_emo);

            setElements(elements => [...elements, {
                data: {
                    id: id,
                    grad: toColor(c)+" #000000",
                    customLabel: ''
                },
                position: {
                    x: 375+r*Math.cos(theta),
                    y: 375+r*Math.sin(theta)
                }
            },]);

            var new_elems = [];

            for (var tgt_id in neighbour_ids) {
                new_elems.push(
                    {
                        data: { source: id, target: tgt_id, strength: neighbour_ids[tgt_id] }
                    }
                );
            }

            setElements(prevElements => [...prevElements, ...new_elems]);


            
        });

        socket.on('character speech', (speech) => {
            console.log("The characters say:");
            console.log(speech);

            setSp(speech);
            setThinking(false);

        });

        socket.on('send graph', (graph) => {
            console.log("Graph:");
            console.log(graph);
            var new_elems = [];
            for (var node_id in graph) {
                var theta = Math.random() * 2 * Math.PI;
                var r = Math.random() * 300;
                var c = emotionToColour(graph[node_id][1]);
                new_elems.push({
                    data: {
                        id: node_id,
                        grad: toColor(c)+" #000000",
                        customLabel: ''
                    },
                    position: {
                        x: 375+r*Math.cos(theta),
                        y: 375+r*Math.sin(theta)
                    }
                });
            }
            
            setElements(prevElements => [...prevElements, ...new_elems]);

            var new_elems = [];
            for (var node_id in graph) {
                for (var i = 0; i < graph[node_id][0].length; i++) {
                    console.log(graph[node_id][0][i][0]);
                    new_elems.push({
                        data: { source: node_id, target: graph[node_id][0][i][0], strength: graph[node_id][0][i][1]}
                    });
                }
            }

            setElements(prevElements => [...prevElements, ...new_elems]);
        });

        console.log("Requesting graph")

        socket.emit('request graph');

        /*
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

        for (var i = 0; i < 100; i++) {
            elements.push({
                data: { source: Math.floor(Math.random() * 20), target: Math.floor(Math.random() * 20) }
            });
        }*/
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
                    <img src={Joy} className={thinking ? "wobble" : "nowobble"} alt="Joy" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span id='Joy' class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Typewriter
                        key={sp['joy']} // Unique key to reset the effect on text change
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25,
                            deleteSpeed: 0,
                            cursor: '', // Disable the cursor by setting it to an empty string
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(sp['joy']) // Type the text
                                .pauseFor(1000) // Optional: pause for a moment after finishing
                                .start(); // Start the typing effect
                        }}
                        />
                    </span>
                </div>

                <div style={{ position: 'relative', height: '15vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Disgust} className={thinking ? "wobble" : "nowobble"} alt="Disgust" style={{ position: 'absolute', height: '100%', right: '2%' }} />
                    <span id='Disgust' class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Typewriter
                        key={sp['disgust']} // Unique key to reset the effect on text change
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25,
                            deleteSpeed: 0,
                            cursor: '', // Disable the cursor by setting it to an empty string
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(sp['disgust']) // Type the text
                                .pauseFor(1000) // Optional: pause for a moment after finishing
                                .start(); // Start the typing effect
                        }}
                        />
                    </span>
                </div>

                <div style={{ position: 'relative', height: '15vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Sadness} className={thinking ? "wobble" : "nowobble"} alt="Sadness" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span id='Sadness' class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Typewriter
                        key={sp['sadness']} // Unique key to reset the effect on text change
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25,
                            deleteSpeed: 0,
                            cursor: '', // Disable the cursor by setting it to an empty string
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(sp['sadness']) // Type the text
                                .pauseFor(1000) // Optional: pause for a moment after finishing
                                .start(); // Start the typing effect
                        }}
                        />
                    </span>
                </div>


                <div style={{ position: 'relative', height: '17vh', width: '50%', marginLeft: '50px', marginTop: '0px' }}>
                    <img src={Fear} className={thinking ? "wobble" : "nowobble"} alt="Fear" style={{ position: 'absolute', height: '100%', right: '2%' }} />
                    <span id='Fear' class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Typewriter
                        key={sp['fear']} // Unique key to reset the effect on text change
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25,
                            deleteSpeed: 0,
                            cursor: '', // Disable the cursor by setting it to an empty string
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(sp['fear']) // Type the text
                                .pauseFor(1000) // Optional: pause for a moment after finishing
                                .start(); // Start the typing effect
                        }}
                        />
                    </span>

                </div>


                <div style={{ position: 'relative', height: '10vh', width: '50%', marginLeft: '50px', marginTop: '10px' }}>
                    <img src={Anger} className={thinking ? "wobble" : "nowobble"} alt="Anger" style={{ position: 'absolute', height: '100%', left: '2%' }} />
                    <span class='emotionspeech' style={{ position: 'absolute', width: '60%', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Typewriter
                        key={sp['anger']} // Unique key to reset the effect on text change
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25,
                            deleteSpeed: 0,
                            cursor: '', // Disable the cursor by setting it to an empty string
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(sp['anger']) // Type the text
                                .pauseFor(1000) // Optional: pause for a moment after finishing
                                .start(); // Start the typing effect
                        }}
                        />
                    </span>
                </div>





                <div style={{ position: 'relative', height: '20vh', margin: '50px', marginTop: '60px' }}>

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
                            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', width: '90%' }}>
                                <label htmlFor="username" style={{
                                    fontSize: '20pt',
                                    fontFamily: 'Impact',
                                    color: 'white',
                                    marginRight: '30px' // Space between label and input
                                }}>Brainy Keepsake: </label>


                                <textarea
                                    id="memory"
                                    value={memory}
                                    onChange={(e) => setMemory(e.target.value)}
                                    required
                                    style={{
                                        width: '60%',
                                        height: '100px', // Adjust height as needed
                                        fontSize: '16pt',
                                        fontFamily: 'Lazyhand',
                                        marginRight: '40px', // Space between textarea and button
                                        resize: 'none', // Allow vertical resizing
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        border: 'none', // Remove default border
                                        borderRadius: '5px', // Rounded corners
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
                                    }}
                                />
                                <button type="submit" style={{
                                    width: '10%',
                                    height: '50px',
                                    fontFamily: 'Impact',
                                    fontSize: '15pt',
                                    color: 'black', // Black text color
                                    border: 'none', // Remove default border
                                    borderRadius: '5px', // Rounded corners
                                    cursor: 'pointer', // Change cursor to pointer
                                    transition: 'box-shadow 0.3s ease, background 0.3s ease', // Smooth transition for the glow effect
                                    boxShadow: 'none', // No initial shadow
                                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))' // white gradient
                                }}

                                    onMouseOver={(e) => {

                                        e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 0, 0.5), rgba(255, 255, 255, 0))'; // Change background on hover
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.boxShadow = 'none'; // Remove glow when not hovering
                                        e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))'; // Reset background
                                    }}>
                                    Capture!
                                </button>
                            </div>
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
                    <CytoscapeComponent 
                    elements={elements}
                    userPanningEnabled={false}
                    autolock={false} 
                    style={{
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
                                    label: 'data(customLabel)',
                                    'background-color': 'data(background_color)',
                                    "background-fill": 'radial-gradient',
                                    "background-gradient-stop-colors": 'data(grad)',
                                    "background-gradient-stop-positions": '0px 60px',
                                    "font-size": '20',
                                    "font-family": 'Lazyhand',
                                    opacity: 0.5
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    width: 1,
                                    'line-color': '#fffdf1', // Change edge color here,
                                    'opacity': 'data(strength)'
                                }
                            },
                        ]}
                        cy={(cy) => {
                            cy.on('tap', 'node', (event) => {
                                const nodeId = event.target.id();
                                const node = event.target;
                                console.log('Node tapped:', nodeId);
                                
                                socket.on('get memory node', (id, text, emotion) => {
                                    
                                    if (id == nodeId) node.data('customLabel', text);
                                    else node.data('customLabel', '');
                                    node.style();

                                });

                                socket.emit('request node', nodeId);
                                
                            });
                            cy.on('add', (event) => {
                                cy.layout(
                                    {
                                        name: 'circle'
                                    }
                                ).run();
                            });
                        }}

                    />
                </div>
            </div>
        </>
    );
};

export default Memory;