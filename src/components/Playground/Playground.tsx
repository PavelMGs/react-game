import React, { useEffect, useState } from 'react';
import s from './Playground.module.scss';

interface IPlayground {
  size: string
}

const Playground: React.FC<IPlayground> = ({ size }) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();

  const [count, setCount] = useState(0)
  const [fieldSize, setFieldSize] = useState({x: 0, y: 0})
  const [snake, setSnake] = useState([
    { x: 100, y: 100 },
    { x: 110, y: 100 },
    { x: 120, y: 100 },
    { x: 130, y: 100 },
    { x: 140, y: 100 },
  ]);
  const [direction, setDirection] = useState('right');
  const [onUpdate, setOnUpdate] = useState(false);
  const [styleReplay, setStyleReplay] = useState('modal_hidden')
  const [apple, setApple] = useState({
    x: Math.floor((Math.random() * 200) / 10) * 10,
    y: Math.floor((Math.random() * 150) / 10) * 10,
  });

  const handleSetFieldSize = () => {
    switch(size) {
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
  } 

  const handleSetApple = () => {
    const X = Math.floor((Math.random() * fieldSize.x) / 10) * 10;
    const Y = Math.floor((Math.random() * fieldSize.y) / 10) * 10 ;
    let collapse = false;
    snake.map((section) => {
      if(section.x === X && section.y === Y) {
        collapse = true;
        handleSetApple();
      }
    })
    if(!collapse) {
      setApple({ x: X, y: Y});
      setCount(count + 1)
    }
  };

  const handleUpdate = () => {
    
    switch (direction) {
      case 'right': {
        let newSnake = snake;
        if (snake[snake.length - 1].x !== apple.x || snake[snake.length - 1].y !== apple.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (snake[snake.length - 1].x === fieldSize.x -10) {
          newSnake.push({ x: 0, y: snake[snake.length - 1].y });
        } else {
          newSnake.push({ x: snake[snake.length - 1].x + 10, y: snake[snake.length - 1].y });
        }
        setSnake(newSnake);
        break;
      }
      case 'left': {
        
        const newSnake = snake;
        if (snake[snake.length - 1].x !== apple.x || snake[snake.length - 1].y !== apple.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (snake[snake.length - 1].x === 0) {
          newSnake.push({ x: fieldSize.x - 10, y: snake[snake.length - 1].y });
        } else {
          newSnake.push({ x: snake[snake.length - 1].x - 10, y: snake[snake.length - 1].y });
        }
        setSnake(newSnake);
        break;
      }
      case 'up': {
        
        const newSnake = snake;
        if (snake[snake.length - 1].x !== apple.x || snake[snake.length - 1].y !== apple.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (snake[snake.length - 1].y === 0) {
          newSnake.push({ x: snake[snake.length - 1].x, y: fieldSize.y - 10});
        } else {
          newSnake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - 10 });
        }
        setSnake(newSnake);
        break;
      }
      case 'down': {
        
        const newSnake = snake;
        if (snake[snake.length - 1].x !== apple.x || snake[snake.length - 1].y !== apple.y) {
          newSnake.shift();
        } else {
          handleSetApple();
        }
        if (snake[snake.length - 1].y === fieldSize.y - 10) {
          newSnake.push({ x: snake[snake.length - 1].x, y: 0 });
        } else {
          newSnake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + 10 });
        }
        setSnake(newSnake);
        break;
      }
    }
  };

  const handleSetDirection = (e: KeyboardEvent) => {
    const { keyCode } = e; //key возвращает символ, что создаёт проблемы с совместимостью с разными языковыми рас кладками
    if (keyCode === 87 && direction !== 'up' && direction !== 'down') {
      setDirection('up');
    } else if (keyCode === 65 && direction !== 'left' && direction !== 'right') {
      setDirection('left');
    } else if (keyCode === 83 && direction !== 'up' && direction !== 'down') {
      setDirection('down');
    } else if (keyCode === 68 && direction !== 'right' && direction !== 'left') {
      setDirection('right');
    }
  };

  const handleGameover = () => {
    setStyleReplay('modal_visible')
  }

  const handleOnReplay = () => {
    setCount(0)
    setApple({
      x: Math.floor((Math.random() * 200) / 10) * 10,
      y: Math.floor((Math.random() * 150) / 10) * 10,
    });
    setSnake([
      { x: 100, y: 100 },
      { x: 110, y: 100 },
      { x: 120, y: 100 },
      { x: 130, y: 100 },
      { x: 140, y: 100 },
    ]);
    setStyleReplay('modal_hidden')
    setOnUpdate(!onUpdate);
  }

  useEffect(() => {});

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    handleSetFieldSize()
    ctx?.clearRect(0, 0, 800, 500);
    let gameOver = false;
    
    snake.map((item) => {
      ctx ? ctx.fillStyle = 'green' : null;
      ctx?.fillRect(item.x, item.y, 10, 10);
      
    });

    ctx ? ctx.fillStyle = 'red' : null;
    ctx?.fillRect(apple.x, apple.y, 10, 10, );

    for(let i = 0; i < snake.length - 1; i++) {
      if(snake[snake.length - 1].x === snake[i].x && snake[snake.length - 1].y === snake[i].y) {
        gameOver = true;
      }
    }

    let interval = setInterval(() => {
      handleUpdate();
      !gameOver ? setOnUpdate(!onUpdate) : handleGameover();
    }, 100);

    let keysListener = window.addEventListener('keydown', handleSetDirection);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleSetDirection);
    };
  }, [onUpdate]);

  return (
    <div>
      <div>{count}</div>
      <canvas className={s.root} ref={canvasRef} width={fieldSize.x} height={fieldSize.y} />
      <div className={s[styleReplay as keyof typeof s]}>
        <button
          onClick={() => handleOnReplay()}
        >
          replay
        </button>
      </div>
    </div>
  );
};

export default Playground;
