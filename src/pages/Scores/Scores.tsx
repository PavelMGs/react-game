import React, { useEffect, ChangeEvent, useState } from 'react';
import s from './Scores.module.scss';
import cn from 'classnames';
import { useHistory } from 'react-router';
import Click from '../../assets/Click.ogg';

interface IScores {
    handlePlaySound: (url_ogg: string) => void
}

const Scores: React.FC<IScores> = (props) => {

    const [onUpdate, setOnUpdate] = useState(true);
    const [scoreList, setScoreList] = useState([]);

    const { handlePlaySound } = props;

    const history = useHistory();

    useEffect(() => {

        localStorage.getItem('scoresSpeed')
            ? null
            : 'low'

        localStorage.getItem('scoresSize')
            ? null
            : 'small'

        localStorage.getItem('scoresWalls')
            ? null
            : 'false'

    }, [])

    const handleToMenu = () => {
        if (JSON.parse(localStorage.getItem('sound') || '')) {
            handlePlaySound(Click);
        }
        history.push('/');
    }

    useEffect(() => {
        let newList = [];
        const localScores = JSON.parse(localStorage.getItem('scores') || '[]')
        newList = localScores.filter((item: any) => { //прописать тип!!!!!!
            if (item.size === localStorage.getItem('scoresSize')) {
                if (item.speed === localStorage.getItem('scoresSpeed')) {
                    if (item.walls === localStorage.getItem('scoresWalls')) {
                        return true;
                    }
                }
            }
        });
        setScoreList(newList);
    }, [onUpdate])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setOnUpdate(!onUpdate);
        const targetCheck: any = document.getElementById(`${e.target.id}`)
        if (!targetCheck.checked) { //при клике на отмеченный, метка снимается. Этот условие, чтобы этого избежать
            targetCheck.checked = true;
            return;
        }

        switch (e.target.name) {
            case 'fieldSize': {
                switch (e.target.id) {
                    case 'smallSizeScore': {
                        localStorage.setItem('scoresSize', 'small')

                        const mCheck: any = document.getElementById('mediumSizeScore');
                        mCheck.checked = false;

                        const lCheck: any = document.getElementById('largeSizeScore');
                        lCheck.checked = false;
                        break;
                    }
                    case 'mediumSizeScore': {
                        localStorage.setItem('scoresSize', 'medium')

                        const sCheck: any = document.getElementById('smallSizeScore');
                        sCheck.checked = false;

                        const lCheck: any = document.getElementById('largeSizeScore');
                        lCheck.checked = false;
                        break;
                    }
                    case 'largeSizeScore': {
                        localStorage.setItem('scoresSize', 'large')

                        const sCheck: any = document.getElementById('smallSizeScore');
                        sCheck.checked = false;

                        const mCheck: any = document.getElementById('mediumSizeScore');
                        mCheck.checked = false;
                        break;
                    }
                }
                break;
            }

            case 'speed': {
                switch (e.target.id) {
                    case 'lowSpeedScore': {
                        localStorage.setItem('scoresSpeed', 'low')

                        const mCheck: any = document.getElementById('mediumSpeedScore');
                        mCheck.checked = false;

                        const fCheck: any = document.getElementById('fastScore');
                        fCheck.checked = false;
                        break;
                    }
                    case 'mediumSpeedScore': {
                        localStorage.setItem('scoresSpeed', 'medium')

                        const lCheck: any = document.getElementById('lowSpeedScore');
                        lCheck.checked = false;

                        const fCheck: any = document.getElementById('fastScore');
                        fCheck.checked = false;
                        break;
                    }
                    case 'fastScore': {
                        localStorage.setItem('scoresSpeed', 'fast')

                        const lCheck: any = document.getElementById('lowSpeedScore');
                        lCheck.checked = false;

                        const mCheck: any = document.getElementById('mediumSpeedScore');
                        mCheck.checked = false;
                        break;
                    }
                }
                break;
            }

            case 'walls': {
                switch (e.target.id) {
                    case 'wallsOnScore': {
                        localStorage.setItem('scoresWalls', 'true')

                        const check: any = document.getElementById('wallsOffScore');
                        check.checked = false;

                        break;
                    }
                    case 'wallsOffScore': {
                        localStorage.setItem('scoresWalls', 'false')

                        const check: any = document.getElementById('wallsOnScore');
                        check.checked = false;

                        break;
                    }
                }
                break;
            }
        }
    }

    useEffect(() => {
        const fieldSizeLocal = localStorage.getItem('scoresSize') || 'medium';
        switch (fieldSizeLocal) {
            case "small": {
                const check: any = document.getElementById('smallSizeScore');
                check.checked = true;
                break;
            }
            case "medium": {
                const check: any = document.getElementById('mediumSizeScore');
                check.checked = true;
                break;
            }
            case "large": {
                const check: any = document.getElementById('largeSizeScore');
                check.checked = true;
                break;
            }
        }

        const speedLocal = localStorage.getItem('scoresSpeed') || 'medium'
        switch (speedLocal) {
            case 'low': {
                const check: any = document.getElementById('lowSpeedScore');
                check.checked = true;
                break;
            }
            case 'medium': {
                const check: any = document.getElementById('mediumSpeedScore');
                check.checked = true;
                break;
            }
            case 'fast': {
                const check: any = document.getElementById('fastScore');
                check.checked = true;
                break;
            }
        }

        const wallsLocal = JSON.parse(localStorage.getItem('scoresWalls') || 'false')
        switch (wallsLocal) {
            case true: {
                const check: any = document.getElementById('wallsOnScore');
                check.checked = true;
                break;
            }
            case false: {
                const check: any = document.getElementById('wallsOffScore');
                check.checked = true;
                break;
            }
        }

    }, [])

    return (
        <div className={s.root}>
            <div className={s.settings}>
                <div className={s.checkBlock}>
                    <span className={cn(s.text, "nes-text is-primary")}>FIELD SIZE</span>
                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="fieldSize"
                            id='smallSizeScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>SMALL </span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="fieldSize"
                            id='mediumSizeScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>MEDIUM</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="fieldSize"
                            id='largeSizeScore'
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
                            id='lowSpeedScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>LOW</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="speed"
                            id='mediumSpeedScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>MEDIUM</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="speed"
                            id='fastScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>FASTScore</span>
                    </label>

                </div>

                <div className={s.checkBlock}>
                    <span className={cn(s.text, "nes-text is-primary")}>WALLS</span>
                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="walls"
                            id='wallsOnScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>ON</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="nes-checkbox"
                            name="walls"
                            id='wallsOffScore'
                            onChange={(e) => handleCheck(e)}
                        />
                        <span>OFF</span>
                    </label>

                </div>
            </div>
                <table className="nes-table is-bordered is-dark"><thead>
                    <tr>
                    
                        <th><div className={s.scoreEl}>Name</div></th>
                        <th><div className={s.scoreEl}>Score</div></th>
                        
                    </tr></thead>
                    <tbody>
                    {
                        scoreList.map((item: any, index) => {
                            if (index < 7) {
                                return (
                                    <tr>
                                        <td><div className={s.scoreEl}>{index + 1}.{item.name}</div></td>
                                        <td><div className={s.scoreEl}>{item.score}</div></td>
                                    </tr>
                                )
                            }

                        })
                    }
                    </tbody>
                </table>

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

export default Scores;
