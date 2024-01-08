import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import Product from './Product'

test('Product komponentti renderöityy oikein', async () => {
    const product = {
        productId: 3,
        productName: "Tikkari",
        supplierId: 1,
        categoryId: 2,
        quantityPerUnit: "12",
        unitPrice: "13.3",
        unitsInStock: 5,
        unitsInOrder: 1,
        reorderLevel: 1
    }
    
    render(<Product product={product} />)
  
    const element = screen.getByText(product.productName)
    fireEvent.click(element);

    await waitFor(() => {
        screen.getByTestId("id");
        screen.getByText(product.productName);
        screen.getByTestId("sup-id");
        screen.getByTestId("cat-id");
        screen.getByTestId("quant");
        screen.getByTestId("price");
        screen.getByTestId("unitsStock");
        screen.getByTestId("unitsOrder");
        screen.getByTestId("reorder");

      });
      expect(screen.getByTestId("id")).toBeInTheDocument();
      expect(screen.getByText(product.productName)).toBeInTheDocument();
      expect(screen.getByTestId("sup-id")).toBeInTheDocument();
      expect(screen.getByTestId("cat-id")).toBeInTheDocument();
      expect(screen.getByTestId("quant")).toBeInTheDocument();
      expect(screen.getByTestId("price")).toBeInTheDocument();
      expect(screen.getByTestId("unitsStock")).toBeInTheDocument();
      expect(screen.getByTestId("unitsOrder")).toBeInTheDocument();
      expect(screen.getByTestId("reorder")).toBeInTheDocument();

    console.log(element.innerHTML);
})

