import React from 'react';
import Playground from './components/Playground/Playground';
import s from './App.module.scss';

const App = () => {
  return (
    <div className={s.root}>
      <Playground size="small"/>
    </div>
  );
};

export default App;

//webpack --config webpack.config.js
