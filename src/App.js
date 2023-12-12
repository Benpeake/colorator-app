import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Interface from "./components/color-gen-interface";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useUndo from "./services/useUndo";
import ColorFetcher from "./services/colorFetcher";
import { useState } from "react";
import SignUp from "./components/sign-up";
import Notification from "./components/notification";
import Login from "./components/log-in";
import MyAccount from "./components/my-account";
import AddPalette from "./components/add-palette";
import AllPalettes from "./components/all-palettes";
import MyPalettes from "./components/my-palettes";

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

  const [colors, setColors, undo, redo, history, historyIndex] =
    useUndo(initialColors);

  const ApiBlock = "http://localhost:8080/api";
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayLogin, setDisplaylogin] = useState(false);
  const [token, setToken] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [accountUpdateSuccess, setAccountUpdateSuccess] = useState(false);
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState(false);
  const [addPaletteSuccess, setAddPaletteSuccess] = useState(false);
  const [diplayAddPalette, setDisplayAddPalette] = useState(false);
  const [userId, setUserId] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

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
      setColors(newColors);
    }
  }

  function removeColorPanel(index) {
    const newColors = [...colors];
    if (colors.length > 2) {
      newColors.splice(index, 1);
      setColors(newColors);
    }
  }

  function handleLockStatus(index) {
    const updatedColors = [...colors];
    updatedColors[index].locked = !updatedColors[index].locked;
    setColors(updatedColors, false);
  }

  function tempUpdateColor(index, newColor) {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = { ...updatedColors[index], color: newColor };
      return updatedColors;
    }, false);
  }

  function updateColor(index, newColor) {
    const updatedColors = [...colors];
    updatedColors[index].color = newColor;
    setColors(updatedColors);
  }

  function updateColorsWithSavedPalette(savedPaletteColors) {
    const newColors = savedPaletteColors.map((color) => {
      return {
        color: color,
        locked: false,
        name: "",
        fontColor: "",
      };
    });
    setColors(newColors);
  }

  function getContrastColor(hexColor) {
    const hex = hexColor.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "var(--black)" : "var(--white)";
  }

  return (
    <div className="App" id="root">
      <ColorFetcher colors={colors} setColors={setColors} />
      <BrowserRouter>
        <Nav
          displaySignUp={displaySignUp}
          setDisplaySignUp={setDisplaySignUp}
          token={token}
          setToken={setToken}
          username={username}
          ApiBlock={ApiBlock}
          setUsername={setUsername}
          setLogoutSuccess={setLogoutSuccess}
          setDisplaylogin={setDisplaylogin}
          setUserEmail={setUserEmail}
          setUserId={setUserId}
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
                  handleLockStatus={handleLockStatus}
                  updateColor={updateColor}
                  tempUpdateColor={tempUpdateColor}
                  generateRandomColor={generateRandomColor}
                  undo={undo}
                  redo={redo}
                  addColorPanel={addColorPanel}
                  history={history}
                  historyIndex={historyIndex}
                  setDisplayAddPalette={setDisplayAddPalette}
                  setDisplaySignUp={setDisplaySignUp}
                  token={token}
                  copySuccess={copySuccess}
                  setCopySuccess={setCopySuccess}
                />
              }
            />
            <Route
              path="/my-account"
              element={
                <MyAccount
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                  username={username}
                  setUsername={setUsername}
                  token={token}
                  setToken={setToken}
                  setAccountUpdateSuccess={setAccountUpdateSuccess}
                  ApiBlock={ApiBlock}
                  setDeleteAccountSuccess={setDeleteAccountSuccess}
                  setUserId={setUserId}
                />
              }
            />
            <Route
              path="/all-palettes"
              element={
                <AllPalettes
                  ApiBlock={ApiBlock}
                  updateColorsWithSavedPalette={updateColorsWithSavedPalette}
                  token={token}
                  setDisplaylogin={setDisplaylogin}
                  setCopySuccess={setCopySuccess}
                  getContrastColor={getContrastColor}
                />
              }
            />
            <Route
              path="/my-palettes"
              element={
                <MyPalettes
                  ApiBlock={ApiBlock}
                  updateColorsWithSavedPalette={updateColorsWithSavedPalette}
                  token={token}
                  setDisplaylogin={setDisplaylogin}
                  setCopySuccess={setCopySuccess}
                  getContrastColor={getContrastColor}
                />
              }
            />
          </Routes>
        </DndProvider>
        <Footer />
        {displaySignUp && (
          <SignUp
            displaySignUp={displaySignUp}
            setDisplaySignUp={setDisplaySignUp}
            ApiBlock={ApiBlock}
            token={token}
            setToken={setToken}
            registrationSuccess={registrationSuccess}
            setRegistrationSuccess={setRegistrationSuccess}
            setUsername={setUsername}
            setUserEmail={setUserEmail}
            setUserId={setUserId}
          />
        )}
        {displayLogin && (
          <Login
            setDisplaylogin={setDisplaylogin}
            ApiBlock={ApiBlock}
            setToken={setToken}
            setUsername={setUsername}
            setLoginSuccess={setLoginSuccess}
            setUserEmail={setUserEmail}
            setUserId={setUserId}
          />
        )}
        {diplayAddPalette && (
          <AddPalette
            colors={colors}
            token={token}
            setAddPaletteSuccess={setAddPaletteSuccess}
            setDisplayAddPalette={setDisplayAddPalette}
            ApiBlock={ApiBlock}
            userId={userId}
          />
        )}
        {registrationSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Welcome aboard!"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {logoutSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"See you later!"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {loginSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Welcome back!"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {accountUpdateSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Account updated"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {deleteAccountSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Your account has been removed"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {addPaletteSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Palette added!"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {copySuccess && (
        <Notification
          noteIconSrc={'../../icons/tick_white.svg'}
          noteCopy={'Color copied to clipboard!'}
          noteIconSrcCopy={'tick icon'}
        />
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
