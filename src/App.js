import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import share from '../src/assets/share.png';
import save from '../src/assets/floppy-disk.png';
import add from '../src/assets/add.png';
import convert from '../src/assets/file.png'
import upload from '../src/assets/upload.png'
import download from '../src/assets/download.png';
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
const App =()=> {
  const [text, setText] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
            <textarea className= "textbox" placeholder= "// Write your text here because simple is the best"   name="text" onChange = {(e)=>{setText(e.currentTarget.value)}} id="text1" style={{width: '100%', minHeight: '100vh',fontWeight:'400',pointer:'text', fontSize : '20px', color : 'rgb(179 243 255)', backgroundColor: '#002b36',border:'none',height:'calc(100% - 22px)'}}  spellcheck="true"></textarea>
              <div className="sidenav">
                <div className="sidenav-opt">Share
                  <img className="sidenav-opt-icon" src={share}/>
                </div>
                <div className="sidenav-opt">Save
                  <img className="sidenav-opt-icon" src={save} onClick = {()=>saveTextAsFile(text,'textpad.txt')}/>
                </div>
                <div className="sidenav-opt">Convert
                  <img className="sidenav-opt-icon" src={convert}/>
                </div>
                <div className="sidenav-opt">Upload
                  <img className="sidenav-opt-icon" src={upload}/>
                </div>
                <div className="sidenav-opt">New
                  <img className="sidenav-opt-icon" src={add}/>
                </div>
              </div>
      </div>
      
      <button style = {{background:'#5b5bd3', outline:'none', fontWeight:'-100', padding: '0px', color : '#fff',borderRadius:'5px',border:'none',padding:'10px',position:'Fixed',left:'10px',bottom:'10px',cursor:'pointer'}} onClick = {()=>saveTextAsFile(text,'textpad.txt')}><span className="btn-text">Download</span><img className="download" src={download}/></button>
    </div>
  );
}

export default App;
