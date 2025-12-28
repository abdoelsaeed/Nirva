// src/utils/localCart.js
// simple helper for guest cart stored in localStorage

const KEY = "orderItems";

export function getLocalCart() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("getLocalCart parse error", e);
    return null;
  }
}

export function setLocalCart(cart) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("setLocalCart error", e);
  }
}

export function clearLocalCart() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error("clearLocalCart error", e);
  }
}

// add an item (merge if same product+color+size)
export function addToLocalCart(item) {
  // item: { productId, quantity, color, size, productSnapshot? }
  const cart = getLocalCart() || { cartItems: [], totalPrice: 0 };
  const idx = cart.cartItems.findIndex(
    (it) =>
      it.productId === item.productId &&
      it.color === item.color &&
      it.size === item.size
  );

  if (idx > -1) {
    cart.cartItems[idx].quantity += item.quantity;
  } else {
    cart.cartItems.push(item);
  }

  // allow caller to set price snapshot on item.productSnapshot.price
  cart.totalPrice = cart.cartItems.reduce((sum, it) => {
    const price = (it.productSnapshot && it.productSnapshot.price) || 0;
    return sum + price * it.quantity;
  }, 0);

  setLocalCart(cart);
  return cart;
}

// remove an item from local cart
export function removeFromLocalCart(itemId, itemData = null) {
  // itemId can be the index or a unique identifier
  // itemData is optional: { productId, color, size } for more reliable matching
  const cart = getLocalCart();
  if (!cart || !cart.cartItems) return null;

  let idx = -1;

  // If itemData is provided, use it for matching (most reliable)
  if (itemData && itemData.productId) {
    idx = cart.cartItems.findIndex(
      (it) =>
        it.productId === itemData.productId &&
        it.color === itemData.color &&
        it.size === itemData.size
    );
  } else {
    // Fallback to itemId parsing
    if (typeof itemId === 'number') {
      idx = itemId;
    } else if (typeof itemId === 'string') {
      // Try to parse itemId (format: "index-productId")
      const parts = itemId.split('-');
      if (parts.length > 1) {
        const parsedIdx = parseInt(parts[0]);
        if (!isNaN(parsedIdx)) {
          idx = parsedIdx;
        }
      }
      
      // If still not found, try to find by productId only
      if (idx < 0 || idx >= cart.cartItems.length) {
        idx = cart.cartItems.findIndex((it) => it.productId === itemId);
      }
    }
  }

  if (idx >= 0 && idx < cart.cartItems.length) {
    cart.cartItems.splice(idx, 1);
    cart.totalPrice = cart.cartItems.reduce((sum, it) => {
      const price = (it.productSnapshot && it.productSnapshot.price) || 0;
      return sum + price * it.quantity;
    }, 0);
    setLocalCart(cart);
    return cart;
  }
  return cart;
}
