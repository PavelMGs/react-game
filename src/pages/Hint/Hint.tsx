import React from 'react'
import { useHistory } from 'react-router';
import cn from 'classnames';
import Click from '../../assets/Click.ogg';

import s from './Hint.module.scss'

interface IHint{
    handlePlaySound: (url_ogg: string) => void
}

const Hint: React.FC<IHint> = (props) => {
    const history = useHistory();
    
    const { handlePlaySound } = props;

    return (
        <div className={s.root}>
            

            <span className={s.text}>
                -Press W to move UP
            </span>

            <span className={s.text}>
                -Press S to move DOWN
            </span>

            <span className={s.text}>
                -Press A to move LEFT
            </span>

            <span className={s.text}>
                -Press D to move RIGHT
            </span>

            <span className={s.text}>
                -Press R to RESTART the game
            </span>

            <span className={s.text}>
                -Press F to set FULLSCREEN
            </span>

            <span className={cn(s.fun, "nes-text is-primary")}>
                HAVE FUN :)
            </span>

            <button
                type="button"
                className={cn(s.back, "nes-btn is-error")}
                onClick={() => {
                    if (JSON.parse(localStorage.getItem('sound') || '')) {
                        handlePlaySound(Click);
                    }
                    history.push('/');
                }}
            >
                BACK
        </button>
        </div>
    )
}

export default Hint;
