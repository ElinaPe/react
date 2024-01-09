import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductAdd from './ProductAdd';
import ProductService from './services/Product';
import '@testing-library/jest-dom'

jest.mock('./services/Product', () => ({
    create: jest.fn().mockResolvedValue({ status: 200 }), // mockResolvedValue palauttaaa halutun arvon
  }));

test('ProductAdd komponentti toimii oikein', async () => {
    const user = userEvent.setup();
    const mockSetIsPositive = jest.fn();
    const mockSetMessage = jest.fn();
    const mockSetShowMessage = jest.fn();
    
    render(<ProductAdd setIsPositive={mockSetIsPositive} setMessage={mockSetMessage} setShowMessage={mockSetShowMessage} />);
  
    const productNameInput = screen.getByTestId('newProductName');
    const supplierIDInput = screen.getByTestId('newSupplierID');
    const categoryIDInput = screen.getByTestId('newCategoryID');
    const quantityPerUnitInput = screen.getByTestId('newQuantityPerUnit');
    const unitPriceInput = screen.getByTestId('newUnitPrice');
    const unitsInStockInput = screen.getByTestId('newUnitsInStock');
    const unitsOnOrderInput = screen.getByTestId('newUnitsOnOrder');
    const reorderLevelInput = screen.getByTestId('newReorderLevel');
    const discontinuedInput = screen.getByTestId('newDiscontinued');

    await user.type(productNameInput, 'TESTproduct');
    await user.type(supplierIDInput, '1');
    await user.type(categoryIDInput, '2');
    await user.type(quantityPerUnitInput, '12 box');
    await user.type(unitPriceInput, '12');
    await user.type(unitsInStockInput, '3');
    await user.type(unitsOnOrderInput, '2');
    await user.type(reorderLevelInput, '1');
    await user.click(discontinuedInput, true);

    const submitButton = screen.getByTestId('lähetä');
    user.click(submitButton);

    await waitFor(() => {
        expect(ProductService.create).toHaveBeenCalledWith({
          productName: 'TESTproduct',
          supplierID: '1',
          categoryID: '2',
          quantityPerUnit: '12 box',
          unitPrice: '12',
          unitsInStock: '3',
          unitsOnOrder: '2',
          reorderLevel: '1',
          discontinued: true,
        });
      });

});

// Aijehna että meni moti tämän kanssa. Koko edellisen päivän tappelin tämän parissa ja antoi pelkkiä tyhjiä arvoja. 
// Tuolta usereventistä puuttui siis ratkaiseva "await" sana edestä.
// Taas hyvä muistutus siitä, että kannattaisi pitää niitä taukoja, eikä paahtaa vaan.. :D