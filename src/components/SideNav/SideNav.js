import './SideNav.css';
import React, { useState, useEffect } from "react";
import share from '../../assets/share.png';
import save from '../../assets/floppy-disk.png';
import add from '../../assets/add.png';
import convert from '../../assets/file.png'
import upload from '../../assets/upload.png'
import download from '../../assets/download.png';
const SideNav = (props)=>{
    return   <div className="sidenav">
                    <div className="sidenav-opt">Share
                    <img className="sidenav-opt-icon" src={share}/>
                    </div>
                    <div className="sidenav-opt" onClick = {()=>props.saveTextAsFile(props.text,`${props.noteTitle}.txt`)}>Save
                    <img className="sidenav-opt-icon" src={save}/>
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
}
export default SideNav;
