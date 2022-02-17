import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandigPage from './Componentes/LandingPage';
import Home from './Componentes/Home';
import CharacterCreate from './Componentes/CharacterCreate';
import Detail from './Componentes/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>BREAKING BAD APP</h1>
      <Routes>
        <Route exact path = '/' element={<LandigPage/>} />
        <Route path = '/home' element={<Home/>} />
        <Route path='/character' element={<CharacterCreate/>} />
        <Route path='/home/:id' element={<Detail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
