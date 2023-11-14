import { useState } from 'react'
import './App.css'
import ProductService from './services/Product'


const ProductEdit = ({setMuokkaustila, muokattavaProduct, setIsPositive, setShowMessage, setMessage}) => {

    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierID, setNewSupplierID] = useState(muokattavaProduct.supplierId)
    const [newCategoryID, setNewCategoryID] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
    const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)


    const handleSubmit = event => {
        event.preventDefault()
        
        var ProductUp = {
            productId: newProductId,
            productName: newProductName,
            supplierID: newSupplierID,
            categoryID: newCategoryID,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued,
            imageLink: newImageLink
        }
        
        ProductService.update(ProductUp)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui muokkaus: ' + ProductUp.productName)
                setIsPositive(true)
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                },5000)
                window.scrollBy(0, -10000)
                setMuokkaustila(false)
            }
        })
        .catch(error => {
            setMessage('Jotain meni nyt vikaan! Damn! ' + error)
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },7000)
            window.scrollBy(0, -10000)
        })
    }


  return (
    <div className='formDiv'>
        <h2>Product Edit</h2>
        <form onSubmit={handleSubmit} className='formi'>
        <div className='formtiedot'>
                <label>Product Id</label>
                <input type="text" value={newProductId} disabled />
            </div>
            <div className='formtiedot'>
                <label>Product Name</label>
                <input type="text" value={newProductName} 
                onChange={({target}) => setNewProductName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Supplier ID</label>
                <input type="text" value={newSupplierID} 
                onChange={({target}) => setNewSupplierID(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Category ID</label>
                <input type="text" value={newCategoryID} 
                onChange={({target}) => setNewCategoryID(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Quantity Per Unit</label>
                <input type="text" value={newQuantityPerUnit} 
                onChange={({target}) => setQuantityPerUnit(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Unit Price</label>
                <input type="text"value={newUnitPrice} 
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
                <input type="button" value="Takaisin" className='btnn punainenBtn' onClick={() => setMuokkaustila(false)}></input>
            </div>
        </form>
    <br></br>
    </div>
  )
}
export default ProductEdit
