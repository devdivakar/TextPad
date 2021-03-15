import './VoiceToText.css';
import React, { useState, useEffect } from "react";
import user from '../../assets/user.svg'
import logo from '../../assets/document.svg';
import {Link } from 'react-router-dom';

const VoiceToText = ()=>{
    const destroyClickedElement=(event)=>{
        document.body.removeChild(event.target);
      }

    const saveTextAsFile = (textToWrite, fileNameToSaveAs)=> {
        let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        let downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
        }
        downloadLink.click();
  }
    const [text, setText] = useState([]);
    const [users, setUsers] = useState(['Ram', 'Mohan', 'Sohan', 'Pulkit'])
    const [isRecording, setIsRecording] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    let SpeechRecognition = window.webkitSpeechRecognition;
  
    let recognition = new SpeechRecognition();
    
    let Content = '';
    
    recognition.continuous = true;
    
    recognition.onresult = function(event) {
    
        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;
        let objDiv = document.getElementById("your_div");
        objDiv.scrollTop = objDiv.scrollHeight;
        if(Array.isArray(JSON.parse(localStorage.getItem("chat")))){
            let c = [...JSON.parse(localStorage.getItem("chat"))]
            Content = users[Math.floor((Math.random() * 3) + 1)] +' : ' + transcript;
            c.push(Content)
            localStorage.setItem('chat', JSON.stringify(c))
            setText(c)
        }
        else{
            let c = []
            Content = users[Math.floor((Math.random() * 3) + 1)] +' : ' + transcript;
            c.push(Content)
            localStorage.setItem('chat', JSON.stringify(c))
            setText(c)
        }
    };
    
    recognition.onstart = function() {
        console.log("---Voice recognition is ON.----",Content)
    }
    
    recognition.onspeechend = function() {
            setIsFinished(true)
            setIsRecording(false)

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
    const download = ()=>{
        let str = ''
        for(let i = 0; i <text.length; i++){
            str = str + text[i]
        }
        saveTextAsFile(str, 'sample.txt')
    }
    const save = ()=>{
        let str = ''
        for(let i = 0; i <text.length; i++){
            str = str + text[i]
        }
        // saveTextAsFile(str, 'sample.txt')
    }

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
                    <button id="start-btn" title="Start" onClick={download}>Download</button>

                    <p>{isRecording===true ? 'Recording is running' : null}</p>
                    <p>{isFinished===true ? 'Finished' : null}</p>

                </div>
                </div>
    </div>

}
export default VoiceToText;
