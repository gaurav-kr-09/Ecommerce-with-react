import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        }
      }
    });

    user = userEvent.setup();
  });

  it('displays the products correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    // screen.getAllByTestId('product-container'); //ye wait nahi karta hai isiliye niche wala use karenge.
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1])
        .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();


  });

  it('Add to cart button works', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container')

    const quantitySelector1 = within(productContainers[0]).getByTestId('product-quantity-selector');
    await user.selectOptions(quantitySelector1, '2');

    const addToCartButton1 =  within(productContainers[0]).getByTestId('add-to-cart-button');
    await user.click(addToCartButton1);

    const quantitySelector2 = within(productContainers[1]).getByTestId('product-quantity-selector');
    await user.selectOptions(quantitySelector2, '3');

    const addToCartButton2 =  within(productContainers[1]).getByTestId('add-to-cart-button');
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3
    });
    expect(loadCart).toHaveBeenCalledTimes(2);

  })
});


// it('Selects a quantity', async () => {
//     render(<Product product={product} loadCart={loadCart} />);

//     const quantitySelector = screen.getByTestId('product-quantity-selector');
//     expect(quantitySelector).toHaveValue('1');

//     await user.selectOptions(quantitySelector, '3');
//     expect(quantitySelector).toHaveValue('3');

//     const addToCartButton = screen.getByTestId('add-to-cart-button');
//     await user.click(addToCartButton);

//     expect(axios.post).toHaveBeenCalledWith(
//       '/api/cart-items',
//       {
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 3
//       }
//     );
//     expect(loadCart).toHaveBeenCalled();
//   });