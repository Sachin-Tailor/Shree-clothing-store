'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, isFirebaseConfigured } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// ─────────────────────────────────────────────
// Products data — 20 clothing items for women
// ─────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: '1',
    name: 'Terracotta Silk Saree',
    category: 'Sarees',
    price: 2499,
    originalPrice: 3299,
    badge: 'Bestseller',
    tag: 'Handwoven',
    description: 'Exquisite terracotta silk saree with intricate gold zari border. Perfect for festive occasions and weddings.',
    sizes: ['Free Size'],
    colors: ['Terracotta', 'Navy', 'Emerald'],
    image: '/red_zari_saree.png',
    images: [
      '/red_zari_saree.png',
      '/blue_pink_saree.png',
    ],
    stock: 15,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Zari Work Lehenga Choli',
    category: 'Lehengas',
    price: 5999,
    originalPrice: 8500,
    badge: 'New Arrival',
    tag: 'Handcrafted',
    description: 'Stunning bridal lehenga with intricate zari embroidery. Includes matching blouse and dupatta.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Royal Blue', 'Maroon', 'Pink'],
    image: 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 8,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: '3',
    name: 'Banarasi Silk Dupatta',
    category: 'Dupattas',
    price: 899,
    originalPrice: 1299,
    badge: null,
    tag: 'Pure Silk',
    description: 'Authentic Banarasi silk dupatta with rich brocade work. Adds elegance to any outfit.',
    sizes: ['Free Size'],
    colors: ['Gold', 'Silver', 'Red'],
    image: 'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 30,
    rating: 4.6,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Embroidered Linen Kurti',
    category: 'Kurtis',
    price: 1299,
    originalPrice: 1799,
    badge: 'Popular',
    tag: 'Premium',
    description: 'Breathable linen kurti with delicate thread embroidery. Perfect for office and casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Beige', 'Mint'],
    image: 'https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 50,
    rating: 4.7,
    reviews: 203,
  },
  {
    id: '5',
    name: 'Anarkali Suit Set',
    category: 'Suits',
    price: 3499,
    originalPrice: 4999,
    badge: 'Sale',
    tag: 'Festive',
    description: 'Floor-length Anarkali suit in georgette fabric with mirror work embellishments.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Peach', 'Lavender'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 12,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: '6',
    name: 'Cotton Block Print Kurti',
    category: 'Kurtis',
    price: 799,
    originalPrice: 1099,
    badge: null,
    tag: 'Everyday Wear',
    description: 'Comfortable pure cotton kurti with traditional hand block printing. Ideal for daily wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Indigo', 'Mustard', 'Rust'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 75,
    rating: 4.4,
    reviews: 312,
  },
  {
    id: '7',
    name: 'Bridal Bandhani Saree',
    category: 'Sarees',
    price: 3999,
    originalPrice: 5499,
    badge: 'Bridal',
    tag: 'Tie-Dye',
    description: 'Traditional Bandhani saree from Gujarat in pure silk with intricate tie-dye patterns.',
    sizes: ['Free Size'],
    colors: ['Red', 'Pink', 'Orange'],
    image: '/yellow_bridal_saree.png',
    images: [
      '/yellow_bridal_saree.png',
    ],
    stock: 20,
    rating: 4.9,
    reviews: 45,
  },
  {
    id: '8',
    name: 'Georgette Palazzo Set',
    category: 'Sets',
    price: 1899,
    originalPrice: 2599,
    badge: 'Trending',
    tag: 'Chic',
    description: 'Flowy georgette palazzo pants with matching tunic top. Perfect for parties and celebrations.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Wine', 'Navy'],
    image: 'https://images.unsplash.com/photo-1583391733958-6c682531fda6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583391733958-6c682531fda6?q=80&w=800&auto=format&fit=crop',
    ],
    stock: 35,
    rating: 4.6,
    reviews: 98,
  },
];

export const CATEGORIES = ['All', 'Sarees', 'Lehengas', 'Kurtis', 'Suits', 'Sets', 'Dupattas'];

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState(null); // null = use cart
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shreeA_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (_) {}
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shreeA_cart', JSON.stringify(cart));
    } catch (_) {}
  }, [cart]);

  // ─────────────────────────────────────────────
  // Notification helper
  // ─────────────────────────────────────────────
  const showNotification = useCallback((msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // ─────────────────────────────────────────────
  // Cart operations
  // ─────────────────────────────────────────────
  const addToCart = useCallback((product, selectedSize, selectedColor, qty = 1) => {
    setCart(prev => {
      const key = `${product.id}-${selectedSize}-${selectedColor}`;
      const existing = prev.find(item => item.key === key);
      if (existing) {
        return prev.map(item =>
          item.key === key ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, key, selectedSize, selectedColor, qty }];
    });
    showNotification(`${product.name} added to cart!`);
    setIsCartOpen(true);
  }, [showNotification]);

  const removeFromCart = useCallback((key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    setCart(prev => prev.map(item => item.key === key ? { ...item, qty } : item));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ─────────────────────────────────────────────
  // Checkout
  // ─────────────────────────────────────────────
  const openCheckout = useCallback((buyNowItems = null) => {
    setCheckoutItems(buyNowItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setCheckoutItems(null);
  }, []);

  // ─────────────────────────────────────────────
  // Place Order (Firebase or localStorage fallback)
  // ─────────────────────────────────────────────
  const placeOrder = useCallback(async (orderData) => {
    const orderId = 'SHREE' + Date.now().toString().slice(-8);
    const items = checkoutItems || cart;
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = {
      orderId,
      ...orderData,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        size: item.selectedSize,
        color: item.selectedColor,
        image: item.image,
      })),
      total,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Try Firebase first, fallback to localStorage
    if (isFirebaseConfigured() && db) {
      try {
        await addDoc(collection(db, 'orders'), {
          ...order,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Firebase save failed, using localStorage:', err.message);
        saveToLocalStorage(order);
      }
    } else {
      saveToLocalStorage(order);
    }

    // Clear cart after successful order (only if not buyNow)
    if (!checkoutItems) {
      clearCart();
    }

    return orderId;
  }, [cart, checkoutItems, clearCart]);

  const saveToLocalStorage = (order) => {
    try {
      const existing = JSON.parse(localStorage.getItem('shreeA_orders') || '[]');
      existing.push(order);
      localStorage.setItem('shreeA_orders', JSON.stringify(existing));
    } catch (_) {}
  };

  // ─────────────────────────────────────────────
  // Filtered products
  // ─────────────────────────────────────────────
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <AppContext.Provider value={{
      // Products
      products: PRODUCTS,
      filteredProducts,
      categories: CATEGORIES,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      // Cart
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      // Checkout
      isCheckoutOpen,
      setIsCheckoutOpen,
      checkoutItems,
      openCheckout,
      closeCheckout,
      placeOrder,
      // Notification
      notification,
      showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
