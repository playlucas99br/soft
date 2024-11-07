import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/home/Home'
import Category from './Pages/category/category'
import Product from './Pages/Product/product'
import History from './Pages/History/history'
import Footer from './components/Footer'
import './App.css'

function App(){
  return(
    <BrowserRouter>
      <Header></Header>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/History" element={<History />} />
        </Routes>
      <Footer></Footer>
      </div>
    </BrowserRouter>
  )  
}

export default App