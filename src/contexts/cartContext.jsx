import React, { useState, useContext, createContext, useEffect } from "react";
import { MAX_TOTAL_CART } from "../Data";
import { useProducts } from "./productContext";
import { trackAddToCart } from '../functions/events'; 
import ReactPixel from 'react-facebook-pixel';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { products, loading: productsLoading } = useProducts();

    const [cartItems, setCartItems] = useState(() => {
        const local = localStorage.getItem('cart');
        return local ? JSON.parse(local) : [];
    });

    useEffect(() => {
        // Solo sincronizamos si los productos ya cargaron
        if (!productsLoading && products.length > 0 && cartItems.length > 0) {
            setCartItems((prevItems) => {
                const updatedCart = prevItems.map(cartItem => {
                    // Buscamos el producto real en la lista de Firebase
                    const freshProduct = products.find(p => p.id === cartItem.id);

                    if (!freshProduct) return null; // El producto ya no existe o está inactivo

                    const stockDisponible = parseInt(freshProduct.metadata?.stock ?? 24);

                    // Ajustamos cantidad si el stock bajó
                    const nuevaCantidad = cartItem.quantity > stockDisponible
                        ? stockDisponible
                        : cartItem.quantity;

                    // Retornamos el producto con precios y descuentos frescos
                    return {
                        ...freshProduct,
                        quantity: nuevaCantidad,
                        selectedSize: cartItem.selectedSize
                    };
                }).filter(item => item !== null && item.quantity > 0);

                // Solo actualizamos el estado si realmente hubo cambios para evitar bucles
                if (JSON.stringify(prevItems) !== JSON.stringify(updatedCart)) {
                    return updatedCart;
                }
                return prevItems;
            });
        }
    }, [products, productsLoading]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (product, q, selectedSize = null) => {
        // 1. Validaciones de Talla y Stock Crítico
        if (product.metadata.hasOwnProperty("sizes") && !selectedSize) {
            alert("Por favor, selecciona una talla para este producto.");
            return;
        }
        if (product.metadata.stock == 0) return;

        trackAddToCart(product, (product.discount?.active
            ? product.discount.unit_amount
            : product.price.unit_amount)/100, q, product.discount?.active);

        ReactPixel.track('AddToCart', {
            content_name: product.name,
            content_ids: [product.id],
            content_type: 'product',
            quantity: q,
            value: (product.discount?.active
                ? product.discount.unit_amount
                : product.price.unit_amount) / 100 * (parseInt(q) || 1), // Valor total del lote añadido
            currency: 'MXN'
        });

        // 2. Cálculo de Totales Actuales
        const stockIndividual = product.metadata.stock ?? 24;
        const totalActualEnCarrito = cartItems.reduce((acc, item) => acc + item.quantity, 0);

        // Buscamos si ya existe este producto/talla para ver su cantidad previa
        const itemExistente = cartItems.find(
            (item) => item.id === product.id && item.selectedSize === selectedSize
        );
        const cantidadPrevia = itemExistente ? itemExistente.quantity : 0;

        // 3. VALIDACIÓN: Límite Global de la Tienda
        if (totalActualEnCarrito + q > MAX_TOTAL_CART) {
            alert(`¡Límite alcanzado! No puedes tener más de ${MAX_TOTAL_CART} productos en total.`);
            return;
        }

        // 4. VALIDACIÓN: Stock Individual
        if (cantidadPrevia + q > stockIndividual) {
            alert(`Alcanzaste el límite de stock disponible (${stockIndividual}).`);
            return;
        }

        // 5. Si pasa todas las validaciones, actualizamos el estado
        setCartItems((prevItems) => {
            if (itemExistente) {
                return prevItems.map((item) =>
                    item.id === product.id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + q }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: q, selectedSize }];
        });

        openCart();
    };

    const updateQuantity = (id, newQuantity, selectedSize = null) => {
        // 1. Buscamos el item fuera del set para obtener su stock
        const itemAEditar = cartItems.find(i => i.id === id && i.selectedSize === selectedSize);
        if (!itemAEditar) return;

        // 2. Calculamos el total de los OTROS productos
        const totalOtrosItems = cartItems
            .filter(item => !(item.id === id && item.selectedSize === selectedSize))
            .reduce((acc, item) => acc + item.quantity, 0);

        const stockMaximo = itemAEditar.metadata.stock ?? 24;
        let cantidadValidada = newQuantity;

        // 3. Validación de Stock Individual
        if (cantidadValidada > stockMaximo) {
            alert(`Solo quedan ${stockMaximo} unidades de este producto.`);
            cantidadValidada = stockMaximo;
        }

        // 4. Validación de Límite Global
        if (totalOtrosItems + cantidadValidada > MAX_TOTAL_CART) {
            alert(`Límite de carrito: ${MAX_TOTAL_CART} unidades totales.`);
            cantidadValidada = MAX_TOTAL_CART - totalOtrosItems;
        }

        // 5. Una vez calculada la cantidad final, actualizamos el estado
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id && item.selectedSize === selectedSize
                        ? { ...item, quantity: Math.max(0, cantidadValidada) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };
    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ isOpen, openCart, closeCart, clearCart, addToCart, updateQuantity, cartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error(
            "useCarritoContext must be used within a UserContextProvider"
        );
    return context;
};