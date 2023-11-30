import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import { useState } from 'react';
import Interface from './components/color-gen-interface';

function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {

  const [colors, setColors] = useState([
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
  ]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Interface 
          colors={colors}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
