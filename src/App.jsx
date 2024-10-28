import './App.css'
import { Routes,Route, BrowserRouter } from "react-router-dom"
import Home from './pages/homepage'
import Supplyer from './pages/supplyer'
import HomeContent from './pages/homecontent'
import Items from './pages/items'


function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}>
                  <Route path='' element={<HomeContent/>} />
                  <Route path="supplier" element={<Supplyer/>}/>
                  <Route path="items" element={<Items/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
