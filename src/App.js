import React, { useEffect } from "react";
import { Switch, Route, withRouter} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Header from '../src/components/Header/Header';
import TextPad from '../src/views/TextPad/TextPad';
import Auth from '../src/views/Auth/Auth'
import VoiceToText from '../src/views/VoiceToText/VoiceToText'
import './App.css';

const App = (props)=> {

  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path='/' component={TextPad} />
           <Route path='/auth' component = {Auth} />
          <Route path='/voice-to-text' component = {VoiceToText}/>
          {/* <Route path='/analytics' component = {TestAnalytics} /> */}
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

