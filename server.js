const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let menuItems = [
  { _id: '1', name: 'Burger', price: 10 },
  { _id: '2', name: 'Pizza', price: 12 },
  { _id: '3', name: 'Salad', price: 8 },
];
let orders = [];

// Routes
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.post('/api/menu', (req, res) => {
  const newItem = {
    _id: String(Date.now()),
    ...req.body
  };
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/menu/:id', (req, res) => {
  const id = req.params.id;
  const index = menuItems.findIndex(item => item._id === id);
  if (index !== -1) {
    menuItems.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    _id: String(Date.now()),
    items: req.body.items,
    username: req.body.username,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.patch('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex(o => o._id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: req.body.status,
      servedAt: req.body.status === 'served' ? new Date().toISOString() : undefined
    };
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});