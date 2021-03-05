import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import s from './Menu.module.scss';
import { useHistory } from 'react-router';
import Click from '../../assets/Click.ogg';

interface IMenu {
  handlePlaySound: (url_ogg: string) => void
}

const Menu: React.FC<IMenu> = (props) => {
    const { handlePlaySound } = props;
    const [value, setvalue] = useState<string>();

    const history = useHistory();
    useEffect(() => {
      localStorage.getItem('player') ? null : localStorage.setItem('player', 'Common Snake');
      setvalue(localStorage.getItem('player') || 'Common Snake')
    }, [])


    return (
        <div className = {s.root}>
            <span className={cn(s.header, "nes-text is-error")}>WELCOME TO SNAKE</span>
            <div className="nes-field">
              <label  className={s.label}>Your name</label>
              <input 
                type="text" 
                id="name_field" 
                className={cn(s.input, "nes-input is-success")} 
                value={value}
                onChange={(e) => {
                  setvalue(e.target.value)
                  localStorage.setItem('player', e.target.value)
                }}
              />
            </div>
            <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-success")}
          onClick={() => {
            if(JSON.parse(localStorage.getItem('sound') || '')) {
                handlePlaySound(Click);
            }   
            history.push('/playground')
        }}
        >
          PLAY
        </button>
        <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-success")}
          onClick={() => {
            if(JSON.parse(localStorage.getItem('sound') || '')) {
                handlePlaySound(Click);
            }  
            history.push('/settings')
          }}
        >
          SETTINGS
        </button>
        <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-success")}
          onClick={() => {
            if(JSON.parse(localStorage.getItem('sound') || '')) {
                handlePlaySound(Click);
            } 
            history.push('/scores');
        }}
        >
          SCORES
        </button>

        <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-success")}
          onClick={() => {
            if(JSON.parse(localStorage.getItem('sound') || '')) {
                handlePlaySound(Click);
            } 
            history.push('/hint');
        }}
        >
          HINT
        </button>
        </div>
    )
}

export default Menu;
