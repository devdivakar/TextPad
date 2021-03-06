import './App.css';
import React, { useState, useEffect } from "react";
import share from '../src/assets/share.png';
import save from '../src/assets/floppy-disk.png';
import add from '../src/assets/add.png';
import convert from '../src/assets/file.png'
import upload from '../src/assets/upload.png'
import download from '../src/assets/download.png';
import user from '../src/assets/user.svg'
import logo from '../src/assets/document.svg';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  const [showEditor, setShowEditor] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');


let d = {
  background:'#008080',
  width: '80%'
}
let config = {}
config.uiColor = '#AADC6E';
config.width = '75%';   // CSS unit.


  return (
    <div className="App">
      <div className="header">
        <div className="name-icon">
          <span className="title">TextPad<img className="logo" src={logo}/></span>
        </div>
        <div className="user-auth">
          <img className="user-icon" src={user}/>
        </div>
      </div>
      <div className="filename-wrapper">
          <input className="filename" placeholder="Note Title Ex- sample.txt" onChange= {(e)=>{setNoteTitle(e.currentTarget.value)}}/>
          <div className="toggle-wrapper">
            <span className="toggle-text">Rich Text Editor</span>
              <label class="switch">
                  <input type="checkbox" onChange={()=>setShowEditor(!showEditor)}/>
                  <span class="slider round"></span>
              </label>
          </div>
      </div>
      <div className="wrapper">
      <div className="sidenav">
                <div className="sidenav-opt">Share
                  <img className="sidenav-opt-icon" src={share}/>
                </div>
                <div className="sidenav-opt">Save
                  <img className="sidenav-opt-icon" src={save} onClick = {()=>saveTextAsFile(text,`${noteTitle}.txt`)}/>
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
            { showEditor===false ? <textarea className= "textbox" placeholder= "// Write your text here because simple is the best"   name="text" onChange = {(e)=>{setText(e.currentTarget.value)}} id="text1" style={{width: '100%', minHeight: '50vh',fontWeight:'400',pointer:'text', fontSize : '20px', color : 'rgb(179 243 255)', backgroundColor: '#002b36',border:'none',height:'calc(100% - 22px)'}}  spellcheck="true"></textarea>
             : <CKEditor
              // config={      {
              //   width: "800px",
              //   height: "800px"
        
              //   }}
              editor={ ClassicEditor }

                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />        }      
                <div className="sidenav">
                <div className="sidenav-opt">Share
                  <img className="sidenav-opt-icon" src={share}/>
                </div>
                <div className="sidenav-opt">Save
                  <img className="sidenav-opt-icon"src={save} onClick = {()=>saveTextAsFile(text,'textpad.txt')}/>
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
      
      {/* <button style = {{background:'#5b5bd3', outline:'none', fontWeight:'-100', padding: '0px', color : '#fff',borderRadius:'5px',border:'none',padding:'10px',position:'Fixed',left:'10px',bottom:'10px',cursor:'pointer'}} onClick = {()=>saveTextAsFile(text,'textpad.txt')}><span className="btn-text">Download</span><img className="download" src={download}/></button> */}
      <div className="footer">

</div>
    </div>
  );
}

export default App;
