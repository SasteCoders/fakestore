import React, { useState } from 'react'

function Cart({ cartData, getCartData, clearCart, search }) {

    const [otp, setOtp] = useState('')
    const [username, setUsername] = useState('')

    const sumAllUp = () => {
        let totalL = 0;
        cartData.forEach(element => {
            totalL += Math.ceil(element.price);
        });
        return (totalL);
    }

    const renderCartProducts = () => {
        const result = Object.groupBy(cartData, ({ id }) => id);
        return Object.keys(result).map((vl, ind) => {
            let data = result[vl][0];
            let total_quantity = result[vl].length
            if(search == ''){
                return(
                    <>
                        <div className='col-lg-12 mb-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <img src={ data.image } style={{ height: "50px", marginRight: "20px" }} /> <h4 style={{ display: "inline" }}>{ data.title.substr(0, 30) }... <span className='badge text-bg-success' style={{ float: "right" }}>{total_quantity} - ${ Math.ceil(data.price) }</span></h4>
                                </div>
                            </div>
                        </div>
                    </>
                )
            } else {
                if(data.title.toLowerCase().includes(search) || data.description.toLowerCase().includes(search)){
                    return(
                        <>
                            <div className='col-lg-12 mb-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <img src={ data.image } style={{ height: "50px", marginRight: "20px" }} /> <h4 style={{ display: "inline" }}>{ data.title.substr(0, 30) }... <span className='badge text-bg-success' style={{ float: "right" }}>{total_quantity} - ${ Math.ceil(data.price) }</span></h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            }
        })
    }

    if(cartData.length > 0){
        return (
            <>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div className='card mt-3'>
                            <div className='card-body row'>
                                { renderCartProducts() }
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3' style={{  }}>
                        <div className='card mt-3'>
                            <div className='card-body'>
                                <h4 style={{ margin: "0px" }}>Total Due Today : ${ sumAllUp() }</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <button className='btn btn-success mt-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ width: "100%", }}>Pay Now</button>
                            </div>
                            <div className='col-lg-6'>
                                <button className='btn btn-danger mt-2' style={{ width: "100%", }} onClick={(e) => {
                                    clearCart()
                                }}>Clear Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
               


<div class="modal modal-lg fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Make Payment | thundrPay &copy;</h1>
        <button type="button" class="btn-close bg-white text-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        


        <div className='form-group'>
            <label>thundrPay Username</label>
            <input type='text' className='form-control' placeholder='Enter Username...' onKeyUp={(e) => {
                setUsername(e.target.value)
                
                if(username == 'anudeep'){
                    setOtp(Math.ceil(Math.random() * 999999))
                }
            }} />
        </div>

        {
            (username == 'anudeep') ? (
                <>
                    Enter OTP { otp }
                    
                </>
            ) : ''
        }
        


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
            </>
  )
    } else {
        return (
            <>
                <div className='card mt-3 shadow' style={{ height: "500px" }}>
                
                    <div className='card-body' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        
                        <h1>No Product in Cart</h1>

                    </div>
                
                </div>
            </>    
        )
    }
  
}

export default Cart