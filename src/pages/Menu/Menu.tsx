import React from 'react';
import cn from 'classnames';
import s from './Menu.module.scss';
import { useHistory } from 'react-router';
import Click from '../../assets/Click.ogg';

interface IMenu {
  handlePlaySound: (url_ogg: string) => void
  sound: boolean
}

const Menu: React.FC<IMenu> = (props) => {
    const { handlePlaySound, sound } = props;

    const history = useHistory();


    return (
        <div className = {s.root}>
            <span className={cn(s.header, "nes-text is-error")}>WELCOME TO SNAKE</span>
            <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-success")}
          onClick={() => {
            if(sound) {
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
            if(sound) {
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
            if(sound) {
                handlePlaySound(Click);
            } 
            
        }}
        >
          SCORES
        </button>
        </div>
    )
}

export default Menu;
