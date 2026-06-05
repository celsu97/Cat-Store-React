import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BreedsProvider } from './Context/BreedsContext'
import { CartProvider } from './Context/CartContext'
import { FooterComp } from './Components/FooterComp'
import { NavbarComp } from './Components/NavbarComp'
import HomePage from './Pages/HomePage'
import CatsPage from './Pages/CatsPage'
import CartPage from './Pages/CartPage'
import AboutPage from './Pages/AboutPage'
import CatDetailPage from './Pages/CatDetailsPage'


function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
    <BreedsProvider>
      <CartProvider>
          <BrowserRouter>
            <NavbarComp />
            <main className="flex-grow-1">
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                    <Route path="/cats" element={<CatsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/cats/:id" element={<CatDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
              </Routes>
              </main>
              <FooterComp />
          </BrowserRouter>
      </CartProvider>
    </BreedsProvider> 
    </div>
  )
}

export default App
