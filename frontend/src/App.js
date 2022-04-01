import React from 'react';
import Body from './components/Body';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        <Body />
      </div>

    </div>
  );
}

export default App;
