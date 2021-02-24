import React, { useEffect, useState } from 'react';
import Playground from './pages/Playground/Playground';
import s from './App.module.scss';
import { Route, Switch } from 'react-router';
import Menu from './pages/Menu/Menu';
import Settings from './pages/Settings/Settings';

const App = () => {

  useEffect(() => {
    if(!localStorage.getItem('fieldSize')) {
      localStorage.setItem('fieldSize', 'medium');
    }

    if(!localStorage.getItem('speed')) {
      localStorage.setItem('speed', JSON.stringify(100));
    }

    if(!localStorage.getItem('sound')) {
      localStorage.setItem('sound', JSON.stringify(true));
    }

    if(!localStorage.getItem('walls')) {
      localStorage.setItem('walls', JSON.stringify(false));
    }
  }, [])

  

  ////code from bit.ly/3senvab /////////////////////////
  const handlePlaySound = (url_ogg: string) => {  
    const audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = url_ogg;
    audio.autoplay = true;
    audio.onended = function(){
      audio.remove() //Remove when played.
    };
  }
//////////////////////////////////////////////////////

  return (
    <div className={s.root}>

            <Switch>
              <Route path='/' exact>
                <Menu 
                  handlePlaySound={handlePlaySound}
                />
              </Route>
              <Route path='/playground'>
                <Playground
                  handlePlaySound={handlePlaySound}
                />
              </Route>
              <Route path='/settings'>
                <Settings
                handlePlaySound={handlePlaySound  }
                />
              </Route>
            </Switch>

      {/* <Playground size="small"/> */}
    </div>
  );
};

export default App;

//webpack --config webpack.config.js
