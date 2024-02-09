import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/homePage/homePage';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <HomePage></HomePage>
      </header>
    </div>
  );
};

export default App;
