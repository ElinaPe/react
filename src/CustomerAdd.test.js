import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerAdd from './CustomerAdd';
import CustomerService from './services/Customer';

jest.mock('./services/Customer');

test('CustomerAdd komponentti toimii oikein', async () => {
    render(<CustomerAdd />);
  
    const IdInput = screen.getByTestId('id');
    const companyNameInput = screen.getByTestId('companyname');
    const contactNameInput = screen.getByTestId('contactname');
    const contactTitleInput = screen.getByTestId('contactTitle');
    const countryInput = screen.getByTestId('country');
    const addressInput = screen.getByTestId('address');
    const cityInput = screen.getByTestId('city');
    const postalCodeInput = screen.getByTestId('postcode');
    const phoneInput = screen.getByTestId('phone');
    const faxInput = screen.getByTestId('fax');

    userEvent.type(IdInput, 'TESTT');
    userEvent.type(companyNameInput, 'Test Company');
    userEvent.type(contactNameInput, 'Name');
    userEvent.type(contactTitleInput, 'President');
    userEvent.type(countryInput, 'Country');
    userEvent.type(addressInput, 'address ');
    userEvent.type(cityInput, 'Helsinki');
    userEvent.type(postalCodeInput, '12345');
    userEvent.type(phoneInput, '123456789');
    userEvent.type(faxInput, '34556');

    const submitButton = screen.getByTestId('lähetä');
    userEvent.click(submitButton);

    // Tarkista, että CustomerService.create on kutsuttu oikeilla tiedoilla
    await waitFor(() => {
        expect(CustomerService.create).toHaveBeenCalledWith({
            customerId: 'TESTT',
            companyName: 'Test Company',
            contactName: 'Name',
            contactTitle: 'President',
            country: 'Country',
            address: 'address',
            city: 'Helsinki',
            postalCode: '12345',
            phone: '123456789',
            fax: '34556'
        });
    });
});