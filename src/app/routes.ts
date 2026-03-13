import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Stores } from './pages/Stores';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'stores', Component: Stores },
      { path: 'account', Component: Account },
      { path: 'wishlist', Component: Wishlist },
      { path: 'login', Component: Login },
    ],
  },
]);
