import React from 'react'
import Product from './Product'

function Shop({ getProducts, products, categories, addToCart, search }) {
  return (
    <>
        <div className='row mb-4'>
        <div className='col-lg-2'>
          <div className='card mt-3'>
            <div className='card-body'>
              { 
                (categories.length == 0) ? 'Loading...' : categories.map((val, ind) => {

                    // val
                    let selectedCat = (localStorage.getItem("cat") != null) ? localStorage.getItem("cat") : ''
                    let mainSelect = (selectedCat == val) ? 'bg-primary text-white' : '';
                    

                  return(
                    <div className={"card mb-3 shadow-sm " + mainSelect} onClick={(e) => {
                      getProducts(val)
                    }}>
                      <div className='card-body'>
                        { val }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='col-lg-10'>
            <div className='row'>
            { (products.length == 0) ? 'Loading...' : products.filter(sldc => (sldc.title).toLowerCase().includes(search) || sldc.description.includes(search)).map((val, ind) => {
              return (
                <div className='col-lg-4 mt-3'>
                  <Product productData={ val } cartFunc={ addToCart } />
                </div>
              )
            }) }
            
          </div>
        </div>
      </div>

    </>
  )
}

export default Shop