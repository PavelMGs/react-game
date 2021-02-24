import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PickUpOgg from './assets/PickUp.ogg';
import Hit from './assets/Hit.ogg'
import Click from '../../assets/Click.ogg';

import s from './Playground.module.scss';
import { useHistory } from 'react-router';

interface IPlayground {
  handlePlaySound: (url_ogg: string) => void
}

type SectionType = {x: number, y: number};

const Playground: React.FC<IPlayground> = (props) => {
  const { handlePlaySound } = props;

  useEffect(() => {
    const initSNake = [
      { x: 100, y: 100 },
      { x: 110, y: 100 },
      { x: 120, y: 100 },
      { x: 130, y: 100 },
      { x: 140, y: 100 },
    ]

    const X = Math.floor((Math.random() * 200) / 10) * 10
    const Y = Math.floor((Math.random() * 150) / 10) * 10

    localStorage.getItem('snake') ? null : localStorage.setItem('snake', JSON.stringify(initSNake))

    localStorage.getItem('direction') ? null : localStorage.setItem('direction', 'right');

    localStorage.getItem('apple') ? null : localStorage.setItem('apple', JSON.stringify({x: X, y: Y}))
    
  }, [])

  const canvasRef = React.createRef<HTMLCanvasElement>();
  const history = useHistory();

  
  const [fieldSize, setFieldSize] = useState({x: 0, y: 0})
  const [onUpdate, setOnUpdate] = useState(false);
  const [styleReplay, setStyleReplay] = useState('modal_hidden')
  const [apple, setApple] = useState({
    x: Math.floor((Math.random() * 200) / 10) * 10,
    y: Math.floor((Math.random() * 150) / 10) * 10,
  });

  const handleSetFieldSize = () => {
    const localSize = localStorage.getItem('fieldSize') || 'medium'
    switch(localSize) {
      case "small": {
        setFieldSize({x: 200, y: 150})
        break;
      }
      case "medium": {
        setFieldSize({x: 320, y: 240})
        break;
      }
      case "large": {
        setFieldSize({x: 480, y: 360})
        break;
      }
    } 
  };



  const handleSetApple = () => {
    const X = Math.floor((Math.random() * fieldSize.x) / 10) * 10;
    const Y = Math.floor((Math.random() * fieldSize.y) / 10) * 10 ;
    let collapse = false;
    if(JSON.parse(localStorage.getItem('sound') || '')) {
      handlePlaySound(PickUpOgg);
    }
    const localSnake = JSON.parse(localStorage.getItem('snake') || '');
    localSnake.map((section: SectionType) => {
      if(section.x === X && section.y === Y) {
        collapse = true;
        handleSetApple();
      }
    })
    if(!collapse) {
      localStorage.setItem('apple', JSON.stringify({ x: X, y: Y}))
      setApple({ x: X, y: Y});
      let currentCount = parseInt(localStorage.getItem('score') || '0');
      currentCount++;
      localStorage.setItem('score', `${currentCount}`)
    }
  };

  const handleUpdate = () => {
    const localDirection = localStorage.getItem('direction');
    const appleLocal = JSON.parse(localStorage.getItem('apple') || '{x: 0, y: 0}')
    const wallsLocal = JSON.parse(localStorage.getItem('walls') || 'false')
    const localSnake = JSON.parse(localStorage.getItem('snake') || '');

    switch (localDirection) {

      case 'right': {
        let newSnake = localSnake;
        if (localSnake[localSnake.length - 1].x !== appleLocal.x || localSnake[localSnake.length - 1].y !== appleLocal.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (localSnake[localSnake.length - 1].x >= fieldSize.x -10 && fieldSize.x > 10) {
          wallsLocal 
          ? newSnake.push({x: localSnake[2].x, y: localSnake[2].y})
          : newSnake.push({ x: 0, y: localSnake[localSnake.length - 1].y });
        } else {
          newSnake.push({ x: localSnake[localSnake.length - 1].x + 10, y: localSnake[localSnake.length - 1].y });
        }
        localStorage.setItem('snake', JSON.stringify(newSnake))
        setOnUpdate(!onUpdate)
        break;
      }
      case 'left': {
        
        let newSnake = localSnake;
        if (localSnake[localSnake.length - 1].x !== appleLocal.x || localSnake[localSnake.length - 1].y !== appleLocal.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (localSnake[localSnake.length - 1].x <= 0 && fieldSize.x > 10) {
          wallsLocal 
          ? newSnake.push({x: localSnake[2].x, y: localSnake[2].y})
          : newSnake.push({ x: fieldSize.x - 10, y: localSnake[localSnake.length - 1].y });
        } else {
          newSnake.push({ x: localSnake[localSnake.length - 1].x - 10, y: localSnake[localSnake.length - 1].y });
        }
        localStorage.setItem('snake', JSON.stringify(newSnake));
        setOnUpdate(!onUpdate)
        break;
      }
      case 'up': {
        
        let newSnake = localSnake;
        if (localSnake[localSnake.length - 1].x !== appleLocal.x || localSnake[localSnake.length - 1].y !== appleLocal.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (localSnake[localSnake.length - 1].y <= 0 && fieldSize.y > 10) {
          wallsLocal 
          ? newSnake.push({x: localSnake[2].x, y: localSnake[2].y})
          : newSnake.push({ x: localSnake[localSnake.length - 1].x, y: fieldSize.y - 10});
        } else {
          newSnake.push({ x: localSnake[localSnake.length - 1].x, y: localSnake[localSnake.length - 1].y - 10 });
        }
        
        localStorage.setItem('snake', JSON.stringify(newSnake));
        setOnUpdate(!onUpdate)
        break;
      }
      case 'down': {
        
        let newSnake = localSnake;
        if (localSnake[localSnake.length - 1].x !== appleLocal.x || localSnake[localSnake.length - 1].y !== appleLocal.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (localSnake[localSnake.length - 1].y >= fieldSize.y - 10 && fieldSize.y > 10) {
          wallsLocal 
          ? newSnake.push({x: localSnake[2].x, y: localSnake[2].y})
          : newSnake.push({ x: localSnake[localSnake.length - 1].x, y: 0 });
        } else {
          newSnake.push({ x: localSnake[localSnake.length - 1].x, y: localSnake[localSnake.length - 1].y + 10 });
        }
        
        localStorage.setItem('snake', JSON.stringify(newSnake));
        setOnUpdate(!onUpdate)
        break;
      }
    }
  };

  const handleSetDirection = (e: KeyboardEvent) => {
    const { keyCode } = e; //key возвращает символ, что создаёт проблемы с совместимостью с разными языковыми раскладками
    const localDirection = localStorage.getItem('direction');
    if (keyCode === 87 && localDirection !== 'up') {
      localStorage.setItem('direction', 'up');
    } else if (keyCode === 65 && localDirection !== 'left') {
      localStorage.setItem('direction', 'left')
    } else if (keyCode === 83 && localDirection !== 'down') {
      localStorage.setItem('direction', 'down')
    } else if (keyCode === 68 && localDirection !== 'right') {
      localStorage.setItem('direction', 'right')
    }
  };

  const handleGameover = () => {
    if(JSON.parse(localStorage.getItem('sound') || '')) {
      handlePlaySound(Hit);
    }
    handleSetDefault()
    
    setStyleReplay('modal_visible');
  }

  const handleOnReplay = () => {
    if(JSON.parse(localStorage.getItem('sound') || '')) {
      handlePlaySound(Click);
    }
      localStorage.setItem('score', '0')
    setApple({
      x: Math.floor((Math.random() * 200) / 10) * 10,
      y: Math.floor((Math.random() * 150) / 10) * 10,
    });
    const newSNake = [
      { x: 100, y: 100 },
      { x: 110, y: 100 },
      { x: 120, y: 100 },
      { x: 130, y: 100 },
      { x: 140, y: 100 },
    ];
    localStorage.setItem('snake', JSON.stringify(newSNake))
    setStyleReplay('modal_hidden')
    setOnUpdate(!onUpdate);
    localStorage.setItem('direction', 'right')
  }

  const handleToMenu = () => {
    if(JSON.parse(localStorage.getItem('sound') || '')) {
      handlePlaySound(Click);
  } 
    handleSetDefault()
    history.push('/')
  }

  const handleSetDefault = () => {
    const initSNake = [
      { x: 100, y: 100 },
      { x: 110, y: 100 },
      { x: 120, y: 100 },
      { x: 130, y: 100 },
      { x: 140, y: 100 },
    ]

    const X = Math.floor((Math.random() * 200) / 10) * 10
    const Y = Math.floor((Math.random() * 150) / 10) * 10

    localStorage.setItem('snake', JSON.stringify(initSNake))

    localStorage.setItem('direction', 'right');

    localStorage.setItem('apple', JSON.stringify({x: X, y: Y}))

    localStorage.setItem('score', '0')
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    handleSetFieldSize()
    ctx?.clearRect(0, 0, 800, 500);
    let gameOver = false;

    const localSnake = JSON.parse(localStorage.getItem('snake') || '')
    
    localSnake.map((item: SectionType) => {
      ctx ? ctx.fillStyle = 'green' : null;
      ctx?.fillRect(item.x, item.y, 10, 10);
      
    });

    const appleLocal = JSON.parse(localStorage.getItem('apple') || '{x: 100, y: 100}')

    ctx ? ctx.fillStyle = 'red' : null;
    ctx?.fillRect(appleLocal.x, appleLocal.y, 10, 10, );

    for(let i = 0; i < localSnake.length - 1; i++) {
      if(localSnake[localSnake.length - 1].x === localSnake[i].x && localSnake[localSnake.length - 1].y === localSnake[i].y) {
        
        gameOver = true;
      }
    }

    let interval = setTimeout(() => {
      
      
      !gameOver ? handleUpdate() : handleGameover();
    }, parseInt(localStorage.getItem('speed') || '100'));

    let keysListener = window.addEventListener('keydown', handleSetDirection);

    return () => {
      clearInterval(interval);


      window.removeEventListener('keydown', handleSetDirection);
    };
  }, [onUpdate]);

  return (
    <div>
      <div className={cn(s.count, "nes-text is-primary")}>Score: {parseInt(localStorage.getItem('score') || '0')}</div>
      <canvas className={s.root} ref={canvasRef} width={fieldSize.x} height={fieldSize.y} />
      <div className={s[styleReplay as keyof typeof s]}>
      <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-primary")}
          onClick={() => handleOnReplay()}
        >
          REPLAY
        </button>
        <button 
          type="button"
          className={cn(s.buttons, "nes-btn is-primary")}
          onClick={() => handleToMenu()}
        >
          MENU
        </button>
      </div>

      <button 
          type="button"
          className={cn(s.back, "nes-btn is-error")}
          onClick={() => handleToMenu()}
        >
          BACK
        </button>
    </div>
  );
};

export default Playground;
