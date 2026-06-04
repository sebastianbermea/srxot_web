import { costoEnvioGratis, MAX_TOTAL_CART } from "../Data";
import { db } from "../firebase/credentials";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";

import { trackStartCheckout } from '../functions/events'; 
import ReactPixel from 'react-facebook-pixel';

async function createCheckoutSession(uid, cart, guest = true) {
    return new Promise(async (resolve, reject) => {
        try {

            const totalUnidades = cart.reduce((acc, item) => acc + item.quantity, 0);
            if (totalUnidades > MAX_TOTAL_CART) {
                alert(`Error: El carrito excede el máximo de ${MAX_TOTAL_CART} unidades.`);
                return reject("Exceso de unidades");
            }

            // --- 2. VALIDACIÓN DE STOCK INDIVIDUAL ---
            // Revisamos cada item contra su metadata de stock
            for (const item of cart) {
                const stockDisponible = item.metadata?.stock ?? 24;
                // Si tienes el stock en metadata.stock como String, usa parseInt
                const stockNumerico = parseInt(stockDisponible);

                if (item.quantity > stockNumerico) {
                    alert(`Lo sentimos, el producto ${item.name} ya no tiene stock suficiente (Disponible: ${stockNumerico}).`);
                    return reject("Stock insuficiente");
                }
            }

            const collectionRef = collection(db, `customers/${uid}/checkout_sessions`);
            const subtotal = cart.reduce((acc, item) => {
                // Si hay un descuento activo, usamos ese precio, si no, el normal
                const precioParaSumar = item.discount?.active
                    ? item.discount.unit_amount
                    : item.price.unit_amount;

                return acc + (precioParaSumar / 100 * item.quantity);
            }, 0); 
            
            const resumenTallas = cart
                .filter(item => item.selectedSize) // Solo productos con talla
                .map(item => `${item.name}: ${item.selectedSize} (x${item.quantity})`)
                .join(" | "); // Resultado: "Playera: M (x2) | Pantalón: L (x1)"

            const shippingOptions = subtotal >= costoEnvioGratis
                ? [{ shipping_rate: 'shr_1SpXHhHZyfVLj4KNnNdQ9ayb' }] // Solo envío gratis
                : [{ shipping_rate: 'shr_1SpXHRHZyfVLj4KNATLziOXt' }]; // Solo envío pagado

            // const shippingOptions = subtotal >= costoEnvioGratis //Test
            //     ? [{ shipping_rate: 'shr_1SpZ8lH5q3LGQ4gRKbMoLlqD' }] // Solo envío gratis
            //     : [{ shipping_rate: 'shr_1SpZJlH5q3LGQ4gRumjCBUHr' }]; // Solo envío pagado

            trackStartCheckout(guest, subtotal, totalUnidades);

            ReactPixel.track('InitiateCheckout', {
                value: subtotal,
                currency: 'MXN',
                num_items: totalUnidades,
                content_type: 'product',
            });

            // añadimos documento para indicar a stripe inteción de compra
            const sessionData = {
                mode: "payment",
                allow_promotion_codes: true,
                success_url: `${window.location.origin}/success`,
                cancel_url: window.location.origin,
                collect_shipping_address: true,
                shipping_options: shippingOptions,
                shipping_address_collection: {
                    allowed_countries: ['MX'],
                },
                phone_number_collection: {
                    enabled: true,
                },
        

                metadata: {
                    tallas_detalle: resumenTallas || "Sin tallas",
                    usuario_id: uid, 
                    user_agent_custom: window.navigator.userAgent
                },

                line_items: cart.map((item) => {
                    const isDiscountValid = item.discount &&
                        (item.metadata?.discount_limit * 1000 > Date.now());

                    return {
                        quantity: item.quantity,
                        price: isDiscountValid ? item.discountId : item.priceId,
                    };
                }),
            };
            const { id } = await addDoc(collectionRef, sessionData);
            // escuchamos los cambios para obtener la url de stripe
            const cancelarStreaming = onSnapshot(
                doc(db, `customers/${uid}/checkout_sessions/${id}`),

                (snapshot) => {
                    const data = snapshot.data();
                    const url = data?.url;
                    const error = data?.error;

                    if (error) {
                        cancelarStreaming();
                        console.error("Error de Stripe:", error.message);
                        alert("Hubo un error al procesar el pago");
                        reject(error.message);
                    }

                    if (url) {
                        cancelarStreaming();
                        // Redirección externa (Stripe Checkout)
                        window.location.assign(url);
                        resolve();
                    }
                }
            );
        } catch (e) {
            reject(e.message);
        }
    });
}

export default createCheckoutSession;