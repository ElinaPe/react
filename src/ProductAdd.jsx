import { useState } from 'react'
import './App.css'
import ProductService from './services/Product'
// import Checkbox from './Checkbox'

const ProductAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => {

    const [newProductName, setNewProductName] = useState('')
    const [newSupplierID, setNewSupplierID] = useState('')
    const [newCategoryID, setNewCategoryID] = useState('')
    const [newQuantityPerUnit, setQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState(false)


    const handleSubmit = event => {
        event.preventDefault()
        var newProduct = {
            productName: newProductName,
            supplierID: newSupplierID,
            categoryID: newCategoryID,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued
        }

        ProductService.create(newProduct)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui lisäys: ' + newProduct.productName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },5000)

                setLisäystila(false)
            }
        })
        .catch(error => {
            setMessage('Jotain meni nyt vikaan! Damn! ' + error)
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },7000)
        })
    }


  return (
    <div className='formDiv'>
        <h2>Product add</h2>
        <form onSubmit={handleSubmit} className='formi'>
            <div className='formtiedot'>
                <label>Product Name</label>
                <input type="text" value={newProductName} 
                onChange={({target}) => setNewProductName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Supplier ID</label>
                <input type="number"  value={newSupplierID} 
                onChange={({target}) => setNewSupplierID(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Category ID</label>
                <input type="number" value={newCategoryID} 
                onChange={({target}) => setNewCategoryID(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Quantity Per Unit</label>
                <input type="text" value={newQuantityPerUnit} 
                onChange={({target}) => setQuantityPerUnit(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Unit Price</label>
                <input type="text" value={newUnitPrice} 
                onChange={({target}) => setNewUnitPrice(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Units In Stock</label>
                <input type="text" value={newUnitsInStock} 
                onChange={({target}) => setNewUnitsInStock(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Units On Order</label>
                <input type="text" value={newUnitsOnOrder} 
                onChange={({target}) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Reorder Level</label>
                <input type="text" value={newReorderLevel} 
                onChange={({target}) => setNewReorderLevel(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Discontinued: 
                <input className='discontinued'
                type="checkbox"
                checked={newDiscontinued}
                onChange={() => setNewDiscontinued(!newDiscontinued)}
                /></label>
            </div>
            <br/>
            
            <div className='formButtonit'>
                <input id="lähetä" className='btnn vihreäBtn' type="submit" />
                <input type="button" value="Takaisin" className='btnn punainenBtn' onClick={() => setLisäystila(false)}></input>
            </div>
        </form>
    <br></br>
    </div>
  )
}
export default ProductAdd