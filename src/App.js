import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    fetch('/config/snippet.html')
      .then((res) => res.text())
      .then((html) => {
        const container = document.getElementById('injected-snippet');
        if (container) {
          container.innerHTML = html;
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="injected-snippet" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;