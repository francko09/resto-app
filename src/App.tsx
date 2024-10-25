import React, { useState, useEffect, useCallback } from 'react';
import { Menu, MenuItemType } from './components/Menu';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { OrderConfirmation } from './components/OrderConfirmation';
import { AdminView } from './components/AdminView';
import type { User, Order } from './types';
import axios from 'axios';
import { Menu as MenuIcon, ShoppingBag } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<MenuItemType[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [showCart, setShowCart] = useState(false);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get<MenuItemType[]>(`${API_URL}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
    const menuInterval = setInterval(fetchMenuItems, 5000);
    return () => clearInterval(menuInterval);
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
      const orderInterval = setInterval(fetchOrders, 3000);
      return () => clearInterval(orderInterval);
    }
  }, [user, fetchOrders]);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleAddToCart = (item: MenuItemType) => {
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    
    try {
      await axios.post(`${API_URL}/orders`, { 
        items: cart,
        username: user.username 
      });
      setOrderPlaced(true);
      setCart([]);
      setShowCart(false);
      if (user.role === 'admin') {
        await fetchOrders();
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleBackToMenu = () => {
    setOrderPlaced(false);
  };

  const handleServeOrder = async (orderId: string) => {
    try {
      await axios.patch(`${API_URL}/orders/${orderId}`, { status: 'served' });
      await fetchOrders();
    } catch (error) {
      console.error('Error serving order:', error);
    }
  };

  const handleMenuUpdate = async () => {
    await fetchMenuItems();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === 'admin') {
    return <AdminView 
      orders={orders} 
      onServeOrder={handleServeOrder}
      onMenuUpdate={handleMenuUpdate}
    />;
  }

  if (orderPlaced) {
    return <OrderConfirmation onBackToMenu={handleBackToMenu} />;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-orange-600 text-white p-4 md:p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Saveur Bistro</h1>
            <p className="text-orange-50 text-sm md:text-base">Welcome, {user.username}</p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="md:hidden relative p-2"
          >
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
            {showCart ? <MenuIcon className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-6">
        <div className={`${showCart ? 'hidden' : 'block'} md:block md:w-2/3`}>
          <Menu menuItems={menuItems} onAddToCart={handleAddToCart} />
        </div>
        <div className={`${showCart ? 'block' : 'hidden'} md:block md:w-1/3`}>
          <Cart 
            cart={cart} 
            onPlaceOrder={handlePlaceOrder} 
            onRemoveItem={handleRemoveFromCart}
            onClose={() => setShowCart(false)}
          />
        </div>
      </main>
    </div>
  );
}

export default App;