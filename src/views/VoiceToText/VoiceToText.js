import './VoiceToText.css';
import React, { useState, useEffect } from "react";
import user from '../../assets/user.svg'
import logo from '../../assets/document.svg';
import {Link } from 'react-router-dom';

const VoiceToText = ()=>{

    // localStorage.setItem('chat', [])
    const [text, setText] = useState([]);
    const [users, setUsers] = useState(['Ram', 'Mohan', 'Sohan', 'Pulkit'])
    const [isRecording, setIsRecording] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    var SpeechRecognition = window.webkitSpeechRecognition;
  
    var recognition = new SpeechRecognition();
    
    // var Textbox = $('#textbox');
    // var instructions = $('instructions');
    
    var Content = '';
    
    recognition.continuous = true;
    
    recognition.onresult = function(event) {
    
      var current = event.resultIndex;
    
      var transcript = event.results[current][0].transcript;
    var objDiv = document.getElementById("your_div");
            objDiv.scrollTop = objDiv.scrollHeight;
        if(Array.isArray(JSON.parse(localStorage.getItem("chat")))){
            let c = [...JSON.parse(localStorage.getItem("chat"))]
            console.log("---old",c)
            Content = users[Math.floor((Math.random() * 3) + 1)] +' : ' + transcript;
            c.push(Content)
            console.log("---new",c)
            localStorage.setItem('chat', JSON.stringify(c))
            setText(c)
        }
        else{
            let c = []
            Content = users[Math.floor((Math.random() * 3) + 1)] +' : ' + transcript;
            c.push(Content)
            console.log("---new",c)
            localStorage.setItem('chat', JSON.stringify(c))
            setText(c)
        }
      
    };
    
    recognition.onstart = function() {
        console.log("---Voice recognition is ON.----",Content)

    //   instructions.text('Voice recognition is ON.');
    }
    
    recognition.onspeechend = function() {
    //   instructions.text('No activity.');
            setIsFinished(true)
    console.log("---No activity.----")

    }
    
    recognition.onerror = function(event) {
      if(event.error == 'no-speech') {
        console.log("---Try again.----")
      }
    }
    
    const start = (e)=> {
      if (Content.length) {
        Content += ' ';
      }
      setIsRecording(true)
      recognition.start();
    }
    
    // Textbox.on('input', function() {
    //   Content = $(this).val();
    // })
    // console.log("-------text-----",text)

    return   <div className="voice-to-text">
                <div className="header">
                <div className="name-icon">
                <span className="title">TextPad<img className="logo" src={logo}/></span>
                </div>
                <div className="user-auth">
                    <Link to='/auth'>
                    <img className="user-icon" src={user}/>
                    </Link>
                </div>
            </div>
            <div class="mycontainer">

                <h1>Speech to text conversion</h1>

                <div class="mywebapp"> 
                    <div class="output" id="your_div">
                        {text.map((data,i)=>{
                            return <p>{data}</p>
                        })}
                    </div>         
                    <button id="start-btn" title="Start" onClick={start}>Start</button>
                    <p>{isRecording===true ? 'Recording is running' : null}</p>
                    <p>{isFinished===true ? 'Finished' : null}</p>

                </div>
                </div>
    </div>

}
export default VoiceToText;
