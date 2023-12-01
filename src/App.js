import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import { useState } from 'react';
import Interface from './components/color-gen-interface';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Controller from './components/color-gen-controller';

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

  function handleMoveColor(fromIndex, toIndex) {
    const updatedColors = [...colors];
    const [movedColor] = updatedColors.splice(fromIndex, 1);
    updatedColors.splice(toIndex, 0, movedColor);
    setColors(updatedColors);
  }

  function generateRandomColors() {
    const newColors = colors.map((colorObj) => {
        return {
          color: generateRandomHex(),
          locked: colorObj.locked,
        };
      }
    );
    setColors(newColors);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Controller
          generateRandomColors={generateRandomColors}
        />
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route
              path='/'
              element={
                <Interface 
                  colors={colors}
                  setColors={setColors}
                  handleMoveColor={handleMoveColor}
                />
              }
            />
          </Routes>
        </DndProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
