import React from 'react';
import Body from './components/Body';
import Header from './components/Header'
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Body />
      </div>

    </div>
  );
}

export default App;
