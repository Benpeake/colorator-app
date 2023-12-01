import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import { useState } from "react";
import Interface from "./components/color-gen-interface";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Controller from "./components/color-gen-controller";
import useUndo from "./components/useUndo";

function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const initialColors = [
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
    { color: generateRandomHex(), locked: false, name: "", fontColor: "" },
  ];

  const [colors, setColors, undo, redo] = useUndo(initialColors);

  function handleMoveColor(fromIndex, toIndex) {
    const updatedColors = [...colors];
    const [movedColor] = updatedColors.splice(fromIndex, 1);
    updatedColors.splice(toIndex, 0, movedColor);
    setColors(updatedColors);
  }

  function generateRandomColor() {
    const newColors = colors.map((colorObj) => {
      if (colorObj.locked) {
        return colorObj;
      } else {
        return {
          color: generateRandomHex(),
          locked: false,
        };
      }
    });
    setColors(newColors);
  }

  function addColorPanel() {
    const newColors = [...colors];
    if (colors.length < 5) {
      newColors.push({ color: generateRandomHex(), locked: false });
    }
    setColors(newColors);
  }

  function removeColorPanel(index) {
    const newColors = [...colors];
    if (colors.length > 2) {
      newColors.splice(index, 1);
    }
    setColors(newColors);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Controller
          generateRandomColor={generateRandomColor}
          undo={undo}
          redo={redo}
          addColorPanel={addColorPanel}
        />
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route
              path="/"
              element={
                <Interface
                  colors={colors}
                  setColors={setColors}
                  handleMoveColor={handleMoveColor}
                  removeColorPanel={removeColorPanel}
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
