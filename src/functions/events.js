import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/credentials";

/**
 * Registra cuando un usuario hace clic en un producto para ver su detalle.
 * @param {Object} product - El objeto del producto desde Firestore
 */
export const trackProductClick = (product, isDiscounted = false) => {
    if (!analytics) return; // Protección por si no se ha inicializado

    logEvent(analytics, 'open_item', {
        item_id: product.id,
        item_name: product.name,
        discounted: isDiscounted
    });
};

/**
 * Registra cuando un usuario añade un producto al carrito
 * @param {Object} product - El objeto del producto desde Firestore
 * @param {Int} price - Precio del producto
 * @param {Int} quantity - La cantidad del producto
 * @param {Int} isDiscounted - Si el producto esta descontado
*/
export const trackAddToCart = (product, price, quantity = 1, isDiscounted = false) => {
    if (!analytics) return;
    logEvent(analytics, 'add_to_cart', {
        item_id: product.id,
        item_name: product.name,
        item_price: price,
        quantity: quantity,
        discounted: isDiscounted
    });
};

export const trackStartCheckout = (guest, totalPrice, totalItems) => {
    if (!analytics) return;
    logEvent(analytics, 'checkout', {
        guest: guest,
        total_price: totalPrice,
        total_items: totalItems,
    });
};