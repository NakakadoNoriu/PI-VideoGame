import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './components/Landing/landing';
import Home from './components/Home/Home';
import Creategame from './components/CreateGames/CreateGame';
import Detail from './components/Detail/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/'>
          <Landing/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/create'>
          <Creategame/>
        </Route>
        <Route exact path='/videogame/:id'>
          <Detail/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
