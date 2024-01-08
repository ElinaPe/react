import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Customer from './Customer';

test('Customer tiedot', async () => {
  const customer = {
    companyName: 'Test',
    contactName: 'Name',
    phone: '1234567890',
    address: 'Test Address 123',
    city: 'Test City',
    country: 'Test Country',
  };

  render(
    <Customer
      customer={customer}
    />
  );

  // Company namen klikkaus, jotta lisätiedot näkyvät
  const companyElement = screen.getByText(customer.companyName);
  fireEvent.click(companyElement);

  // Odotetaan, että Customer-komponentin lisätiedot tulevat näkyviin
  await waitFor(() => {
    screen.getByText(customer.contactName);
    screen.getByText(customer.phone);
    screen.getByText(customer.address);
    screen.getByText(customer.city);
    screen.getByText(customer.country);
  });

  // Tarkistetaan, että kaikki tiedot ovat näkyvissä Customer-komponentissa
  expect(screen.getByText(customer.contactName)).toBeInTheDocument();
  expect(screen.getByText(customer.phone)).toBeInTheDocument();
  expect(screen.getByText(customer.address)).toBeInTheDocument();
  expect(screen.getByText(customer.city)).toBeInTheDocument();
  expect(screen.getByText(customer.country)).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
});


test('Poistonappi toimii oikein', async () => {
    const mockDeleteCustomer = jest.fn();
  
    const customer = {
        companyName: 'Test',
        contactName: 'Name',
        phone: '1234567890',
        address: 'Test Address 123',
        city: 'Test City',
        country: 'Test Country',
      };
    
      render(
        <Customer
          customer={customer}
          deleteCustomer={mockDeleteCustomer}/>
      );
    
      // Company namen klikkaus, jotta lisätiedot näkyvät
      const companyElement = screen.getByText(customer.companyName);
      fireEvent.click(companyElement);

      // Odotetaan, että Customer-komponentin lisätiedot tulevat näkyviin
      await waitFor(() => {
        screen.getByText('Delete');
      });

    // Poistonapin etsintä ja klik
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  
    expect(mockDeleteCustomer).toHaveBeenCalledTimes(1);
  });