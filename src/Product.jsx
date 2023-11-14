import { useState } from 'react'
import './App.css'
import ProductService from './services/Product'

const Product = ({product, editProduct, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => {

const [showDetails, setShowDetails] = useState(false)


const deleteProduct = (product) => {

    if(window.confirm(`Remove product ${product.productName}?`) === true){
    
        ProductService.remove(product.productId)
    .then(res => {
        if(res.status === 200) {
            setMessage(`Successfully removed product ${product.productName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
            setTimeout(() => {
                setShowMessage(false)
            },5000)
            
        }reloadNow(!reload)
    })
    .catch(error => {
        setMessage('Jotain meni nyt vikaan! Damn! ' + error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => {
            setShowMessage(false)
        },7000)
    })
    }
    else {
        setMessage(`Ei poistettukaan ${product.productName} tuotetta!`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => {
            setShowMessage(false)
        },5000)
        
    }
    }



  return (
    <div className='custDiv'>
        <p onClick={() => setShowDetails(!showDetails)}>
            {product.productName} 
        </p>
        {showDetails && <div className='details'>
       
        <table>
            <thead>
                <tr >
                    <th>Id</th>
                    <th>Product name</th>
                    <th>Supplier id</th>
                    <th>Category id</th>
                    <th>Quantity per unit</th>
                    <th>Unit price</th>
                    <th>Units in stock</th>
                    <th>Units on order</th>
                    <th>Reorder level</th>
                    <th>Discontinued</th>
                </tr>
            </thead>
            <tbody>
                <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.supplierId}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.unitsOnOrder}</td>
                    <td>{product.reorderLevel}</td>
                    <td>
                        {product.discontinued ? (
                            <span style={{ color: 'red' }}>Discontinued</span> ) : (
                            <span style={{ color: 'green' }}>Active</span>
                        )}
                    </td>

                </tr>
            </tbody>
        </table>
            <button className='btnn punainenBtn' onClick={() => deleteProduct(product)}>Delete</button>
        <button className='btnn sininenBtn' onClick={() => editProduct(product)}>Edit</button>
            </div>
        }
    </div> 
  )
}

export default Product
