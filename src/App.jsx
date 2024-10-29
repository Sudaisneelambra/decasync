import './App.css'
import { Routes,Route, BrowserRouter } from "react-router-dom"
import Home from './pages/homepage'
import Supplyer from './pages/supplyer'
import HomeContent from './pages/homecontent'
import Items from './pages/items'
import Purchase from './pages/purchase'
import ShowItems from './pages/showitems'
import ShowSuppliers from './pages/showsuppliers'
import ShowPurchase from './pages/showpurchse'


function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}>
                  <Route path='' element={<HomeContent/>} />
                  <Route path="supplier" element={<Supplyer/>}/>
                  <Route path="items" element={<Items/>}/>
                  <Route path="purchase" element={<Purchase/>}/>
                  <Route path="showitems" element={<ShowItems/>}/>
                  <Route path="showsuppliers" element={<ShowSuppliers/>}/>
                  <Route path="showpurchase" element={<ShowPurchase/>}/>

              </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
