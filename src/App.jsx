 import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import './App.css'
import Historiques from './pages/Historiques'
import DemandList from './pages/DemandList'
import Bac  from './pages/Bac'
import NavLinks from './pages/NavLinks'
function App() {
 
  return (
    <>
    <BrowserRouter>
    < NavLinks/>
      <Routes>
         <Route  path="/" exact element={< DemandList/>}/>
        <Route  path="/bac" exact element={<Bac/>}/>
        <Route  path="/historique" exact element={<Historiques/>}/>
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
