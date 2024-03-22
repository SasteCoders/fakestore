import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Product from './Components/Product';
import Shop from './Components/Shop';
import Navbar from './Common/Navbar';
import Cart from './Components/Cart';

function App() {

  const base_uri = 'https://fakestoreapi.com'

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [cart, setCart] = useState([])
  const [page, setPage] = useState('')
  const [search, setSearch] = useState('')
  
  
  const addToCart = (product) => {
    let myCart = []
    if(localStorage.getItem("fakehub_cart") == null){
      myCart.push(product)
      localStorage.setItem("fakehub_cart", JSON.stringify(myCart))
    } else {
      myCart = JSON.parse(localStorage.getItem("fakehub_cart"))
      myCart.push(product)
      localStorage.setItem("fakehub_cart", JSON.stringify(myCart))
    }
    getCartData()
  }

  const clearCart = () => {
    localStorage.clear()
    setCart([])
    getCartData()
  }

  const searchProduct = (term = '') => {
    setSearch(term.toLowerCase())
  }

  const getCartData = () => {
    return (localStorage.getItem("fakehub_cart") == null) ? [] : setCart(JSON.parse(localStorage.getItem("fakehub_cart")))
  }

  const pageSwitch = (page = '') => {
    localStorage.setItem("currpg", page)
    setPage(page)
  }

  useEffect(() => {
    getProducts((localStorage.getItem("cat") != null) ? localStorage.getItem("cat") : '')
    getCategories()
    getCartData()
    setPage((localStorage.getItem("currpg") != null) ? localStorage.getItem("currpg") : '')
    setCategories((localStorage.getItem("currpg") != null) ? localStorage.getItem("currpg") : '')
  }, [])


  

  const getProducts = (categories = '') => {
    localStorage.setItem("cat", categories)
    setProducts([])
    let catData = (categories.length != 0) ? '/category/' + categories : '';
    fetch(base_uri + '/products' + catData).then(rsp => rsp.json()).then(data => {
      setProducts(data)
    })
  }

  const getCategories = () => {
    fetch(base_uri + '/products/categories').then(rsp => rsp.json()).then(data => {
      setCategories(data)
    })
  }

  return (
    <>
     
     <Navbar cartItems = { cart.length } searchProduct = { searchProduct } pageSwitch = { pageSwitch } />

    <div className='container'>
      
      {
        (page == '') ? <Shop search = { search } getProducts={ getProducts } products={ products } addToCart = { addToCart } categories={ categories } /> : ''
      }

      {
        (page == 'cart') ? <Cart search = { search } clearCart = { clearCart } cartData={ cart } getCartData = { getCartData } /> : ''
      }
    

    </div>

    </>
  );
}

export default App;
