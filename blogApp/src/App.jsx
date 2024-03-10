import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route element={<Home/>} path='/' />
        <Route element={<Signin/>} path='/sign-in' />
        <Route element={<Signup/>} path='/sign-up' />
        <Route element={<Dashboard/>} path='/dashboard' />
        <Route element={<About/>} path='/about' />
        <Route element={<Projects/>} path='/projects' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
