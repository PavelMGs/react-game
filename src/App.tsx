import React, { useEffect, useState } from 'react';
import Playground from './pages/Playground/Playground';
import s from './App.module.scss';
import { Route, Switch } from 'react-router';
import Menu from './pages/Menu/Menu';
import Settings from './pages/Settings/Settings';
import SongOne from './assets/SongOne.ogg'
import SongTwo from './assets/SongTwo.ogg'
import SongThree from './assets/SongThree.ogg'
import Scores from './pages/Scores/Scores';
import Hint from './pages/Hint/Hint';

const App = () => {

  const [songNumber, setSongNumber] = useState(1);

  const handleFullscreen = (event: KeyboardEvent) => {

      if (event.keyCode !== 70) return;
    
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
  } 

  useEffect(() => {
    document.addEventListener('keydown', handleFullscreen, false)

    return () => {
      document.removeEventListener('keydown', handleFullscreen);
    }
  }, [])

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

    localStorage.getItem('scores') 
    ? null 
    : localStorage.setItem('scores', JSON.stringify([]))

  }, [])


  useEffect(() => {
    handlePlayMusic();
  }, [songNumber])

  const handlePlayMusic = () => {
    let songUrl;
    let nextS: number;
    if(songNumber === 1) {
      songUrl = SongOne;
      nextS = 2;
    } else if(songNumber === 2) {
      songUrl = SongTwo;
      nextS = 3;
    } else if(songNumber === 3) {
      songUrl = SongThree;
      nextS = 1;
    }
      console.log(songNumber)
      const audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = songUrl;
    audio.autoplay = true;
    document.body.appendChild(audio)
    audio.id = 'audio';
    
    audio.onended = function(){
      audio.remove() //Remove when played.
      setSongNumber(nextS)
    };


  }

  

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
                handlePlaySound={handlePlaySound}
                handlePlayMusic={handlePlayMusic}
                />
              </Route>
              <Route path="/scores">
                <Scores 
                  handlePlaySound={handlePlaySound}
                />
              </Route>
              <Route path="/hint">
                <Hint
                  handlePlaySound={handlePlaySound}
                />
              </Route>
            </Switch>
    </div>
  );
};

export default App;

//webpack --config webpack.config.js
