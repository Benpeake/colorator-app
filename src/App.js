import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';

function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
