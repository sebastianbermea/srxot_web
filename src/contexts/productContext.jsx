import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/credentials"; // Ajusta tu ruta
import { collection, getDocs, query, where } from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductosConPrecios = async () => {
            setLoading(true);
            try {
                const collectionRef = collection(db, "products");
                const filtrarActivos = query(collectionRef, where("active", "==", true));
                const snaps = await getDocs(filtrarActivos);

                const productosCompletos = [];

                // Usamos for...of para manejar las llamadas asíncronas de los precios
                for (const snap of snaps.docs) {
                    const producto = snap.data();
                    producto.id = snap.id;

                    // Obtenemos la subcolección de precios de Stripe
                    const precioSnaps = await getDocs(collection(snap.ref, "prices"));
                    
                    if (!precioSnaps.empty) {
                        producto.price = precioSnaps.docs[0].data();
                        producto.priceId = precioSnaps.docs[0].id;
                        
                        if(producto.metadata?.discount){
                            if (producto.metadata?.discount_limit*1000 > Date.now()){
                                producto.discountId = producto.metadata.discount;
                                producto.discount = precioSnaps.docs.find(doc => doc.id === producto.metadata.discount).data();
                            }
                        }
                    }

                    productosCompletos.push(producto);
                }

                console.log(productosCompletos);

                setProducts(productosCompletos);
            } catch (error) {
                console.error("Error cargando productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductosConPrecios();
    }, []);
    return (
        <ProductContext.Provider value={{ products, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook personalizado para usarlo fácilmente
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context)
        throw new Error(
            "useProductContext must be used within a ProductContextProvider"
        );
    return context;
}