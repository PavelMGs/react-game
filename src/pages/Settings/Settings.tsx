import React, { ChangeEvent, ChangeEventHandler, useEffect } from 'react'
import { useHistory } from 'react-router';
import cn from 'classnames';
import Click from '../../assets/Click.ogg'

import s from './Settings.module.scss';

interface ISettings {
    handlePlaySound: (url_ogg: string) => void
}

const Settings: React.FC<ISettings> = (props) => {

    const { handlePlaySound } = props;

    const history = useHistory();

    const handleToMenu = () => {
        if(JSON.parse(localStorage.getItem('sound') || '')) {
            handlePlaySound(Click);
        }
        history.push('/');
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const targetCheck: any = document.getElementById(`${e.target.id}`)
        if(!targetCheck.checked) {
            targetCheck.checked = true;
            return;
        }

        switch (e.target.name) {
            case 'fieldSize': {
                switch(e.target.id) {
                    case 'smallSize': {
                        localStorage.setItem('fieldSize', 'small')

                        const mCheck: any = document.getElementById('mediumSize');
                        mCheck.checked = false;

                        const lCheck: any = document.getElementById('largeSize');
                        lCheck.checked = false;
                        break;
                    }
                    case 'mediumSize': {
                        localStorage.setItem('fieldSize', 'medium')

                        const sCheck: any = document.getElementById('smallSize');
                        sCheck.checked = false;
                        
                        const lCheck: any = document.getElementById('largeSize');
                        lCheck.checked = false;
                        break;
                    }
                    case 'largeSize': {
                        localStorage.setItem('fieldSize', 'large')

                        const sCheck: any = document.getElementById('smallSize');
                        sCheck.checked = false;
                        
                        const mCheck: any = document.getElementById('mediumSize');
                        mCheck.checked = false;
                        break;
                    }
                }
                break;
            }
            case 'speed': {
                switch(e.target.id) {
                    case 'lowSpeed': {
                        localStorage.setItem('speed', '150')

                        const mCheck: any = document.getElementById('mediumSpeed');
                        mCheck.checked = false;

                        const fCheck: any = document.getElementById('fast');
                        fCheck.checked = false;
                        break;
                    }
                    case 'mediumSpeed': {
                        localStorage.setItem('speed', '100')

                        const lCheck: any = document.getElementById('lowSpeed');
                        lCheck.checked = false;

                        const fCheck: any = document.getElementById('fast');
                        fCheck.checked = false;
                        break;
                    }
                    case 'fast': {
                        localStorage.setItem('speed', '50')

                        const lCheck: any = document.getElementById('lowSpeed');
                        lCheck.checked = false;

                        const mCheck: any = document.getElementById('mediumSpeed');
                        mCheck.checked = false;
                        break;
                    }
                }
                break;
            }

            case 'walls': {
                switch(e.target.id) {
                    case 'wallsOn': {
                        localStorage.setItem('walls', 'true')

                        const check: any = document.getElementById('wallsOff');
                        check.checked = false;

                        break;
                    }
                    case 'wallsOff': {
                        localStorage.setItem('walls', 'false')

                        const check: any = document.getElementById('wallsOn');
                        check.checked = false;

                        break;
                    }
                }
                break;
            }

            case 'sound': {
                switch(e.target.id) {
                    case 'soundOn': {
                        localStorage.setItem('sound', 'true')

                        const check: any = document.getElementById('soundOff');
                        check.checked = false;

                        break;
                    }
                    case 'soundOff': {
                        localStorage.setItem('sound', 'false')

                        const check: any = document.getElementById('soundOn');
                        check.checked = false;

                        break;
                    }
                }
                break;
            }
        }
    }

    useEffect(() => {
        const fieldSizeLocal = localStorage.getItem('fieldSize') || 'medium';
        switch (fieldSizeLocal) {
            case "small": {
                const check: any = document.getElementById('smallSize');
                check.checked = true;
                break;
            }
            case "medium": {
                const check: any = document.getElementById('mediumSize');
                check.checked = true;
                break;
            }
            case "large": {
                const check: any = document.getElementById('largeSize');
                check.checked = true;
                break;
            }
        }

        const speedLocal = parseInt(localStorage.getItem('speed') || '100')
        switch (speedLocal) {
            case 150: {
                const check: any = document.getElementById('lowSpeed');
                check.checked = true;
                break;
            }
            case 100: {
                const check: any = document.getElementById('mediumSpeed');
                check.checked = true;
                break;
            }
            case 50: {
                const check: any = document.getElementById('fast');
                check.checked = true;
                break;
            }
        }

        const wallsLocal = JSON.parse(localStorage.getItem('walls') || 'false')
        switch (wallsLocal) {
            case true: {
                const check: any = document.getElementById('wallsOn');
                check.checked = true;
                break;
            }
            case false: {
                const check: any = document.getElementById('wallsOff');
                check.checked = true;
                break;
            }
        }

        const soundLocal = JSON.parse(localStorage.getItem('sound') || 'true');
        switch (soundLocal) {
            case true: {
                const check: any = document.getElementById('soundOn');
                check.checked = true;
                break;
            }
            case false: {
                const check: any = document.getElementById('soundOff');
                check.checked = true;
                break;
            }
        }

    }, [])

    return (
        <div className={s.root}>

            <div className={s.checkBlock}>
                <span className={cn(s.text, "nes-text is-primary")}>FIELD SIZE</span>
                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="fieldSize"
                        id='smallSize'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>SMALL </span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="fieldSize"
                        id='mediumSize'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>MEDIUM</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="fieldSize"
                        id='largeSize'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>LARGE</span>
                </label>

            </div>

            <div className={s.checkBlock}>
                <span className={cn(s.text, "nes-text is-primary")}>SPEED</span>
                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="speed"
                        id='lowSpeed'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>LOW</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="speed"
                        id='mediumSpeed'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>MEDIUM</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="speed"
                        id='fast'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>FAST</span>
                </label>

            </div>

            <div className={s.checkBlock}>
                <span className={cn(s.text, "nes-text is-primary")}>WALLS</span>
                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="walls"
                        id='wallsOn'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>ON</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="walls"
                        id='wallsOff'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>OFF</span>
                </label>

            </div>

            <div className={s.checkBlock}>
                <span className={cn(s.text, "nes-text is-primary")}>SOUND</span>
                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="sound"
                        id='soundOn'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>ON</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        className="nes-checkbox"
                        name="sound"
                        id='soundOff'
                        onChange={(e) => handleCheck(e)}
                    />
                    <span>OFF</span>
                </label>

            </div>

            <button
                type="button"
                className={cn(s.back, "nes-btn is-error")}
                onClick={() => handleToMenu()}
            >
                BACK
        </button>
        </div>
    )
}

export default Settings;