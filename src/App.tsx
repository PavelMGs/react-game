import React, { useState } from 'react';
import Playground from './pages/Playground/Playground';
import s from './App.module.scss';
import { Route, Switch } from 'react-router';
import Menu from './pages/Menu/Menu';
import Settings from './pages/Settings/Settings';

const App = () => {
  const [fieldSize, setFieldSize]= useState("small");
  const [speed, setSpeed] = useState(100);
  const [sound, setSound] = useState(true);

  const handleChandgeFieldSize = (size: string) => {
    setFieldSize(size);
  };

  const handleChangeSpeed = (speedNow: number) => {
    setSpeed(speedNow)
  }

  const handleSetSound = (isOn: boolean) => {
    setSound(!sound);
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
                  sound={sound}
                />
              </Route>
              <Route path='/playground'>
                <Playground
                  size={fieldSize}
                  speed={speed}
                  sound={sound}
                  handlePlaySound={handlePlaySound}
                />
              </Route>
              <Route path='/settings'>
                <Settings
                changeFieldSize={handleChandgeFieldSize}
                changeSpeed={handleChangeSpeed}
                setSound={handleSetSound}
                fieldSize={fieldSize}
                speed={speed}
                sound={sound}
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
