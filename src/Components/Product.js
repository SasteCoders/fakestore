import React from 'react'

function Product({ productData, cartFunc }) {
  return (
    <div className='card shadow'>
        <img src={ productData.image } className='img-fluid' style={{ height: "350px", margin: "0.8rem" }} />
        <div className='card-body'>
            <h4>{ productData.title.substr(0, 20) }...</h4>
            <p style={{ marginBottom: "0" }}>
                { productData.description.substr(0, 80) }...
            </p>
            <small className='text-muted' style={{ marginTop: "0" }}>{productData.rating.count} Ratings | {productData.rating.rate} Stars</small>
        </div>
        <div className='card-footer'>
            <div className='row'>
                <div className='col-lg-6'>
                    <h5 className='text-muted' style={{ display: "inline" }}><strike>${ parseInt(parseInt(productData.price) + parseInt(Math.random() * 100)) }</strike></h5>
                    <h2 className='text-success' style={{ display: "inline", marginLeft: "6px" }}>${(parseInt(productData.price))}</h2>
                </div>
                <div className='col-lg-6'>
                    <button className='btn btn-primary btn-block' onClick={ (e) => {
                        e.target.innerText = 'Added To Cart'
                        e.target.className = 'btn btn-success btn-block'
                        setTimeout(() => {
                            e.target.innerText = 'Add To Cart'
                            e.target.className = 'btn btn-primary btn-block'
                        }, 1000);
                        cartFunc(productData)
                    } } style={{ width: "100%" }}>Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product