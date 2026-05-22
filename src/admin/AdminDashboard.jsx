import React, { useState, useEffect } from 'react';
import { db } from "../firebase/credentials"; // Ajusta tu import
import { collectionGroup, query, where, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { useUser } from '../contexts/userContext';

export default function AdminDashboard() {
    const [pedidosPendientes, setPedidosPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    

    // Cargar pedidos sin tracking
    useEffect(() => {
        if(user?.email !== "admin@srxot.com") {
            return;
        }

        const fetchPendientes = async () => {
            try {
                // 1. Usamos collectionGroup para buscar en todas las subcolecciones "payments"
                const q = query(
                    collectionGroup(db, "payments"),
                    where("tracking_number", "==", null)
                );

                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    // Obtenemos la referencia completa para poder actualizarla luego
                    ref: doc.ref,
                    ...doc.data()
                }));

                setPedidosPendientes(data);
            } catch (error) {
                console.error("Error al cargar pedidos:", error);
                // Si sale error de índice, aquí verás el link en la consola
            } finally {
                setLoading(false);
            }
        };
        fetchPendientes();
    }, [user]);

    // Función para marcar como enviado (usando la lógica que ya vimos)
    const marcarComoEnviado = async (pedido, paymentId, trackingNumber) => {
        if (!trackingNumber) return alert("Pon un tracking number primero");

        await updateDoc(pedido.ref,  {
            tracking_number: trackingNumber
        });

        // Quitar de la lista local
        setPedidosPendientes(prev => prev.filter(p => p.id !== paymentId));
        alert("¡Pedido actualizado!");
    };

    if (user?.email !== "admin@srxot.com") {
        return (<div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>🚫 Acceso Denegado</h1>
            <p>No tienes permiso para ver esta sección.</p>
        </div>);
    }

    if (loading) return <div className="dot-typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Pedidos Pendientes de Envío ({pedidosPendientes.length})</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Tracking Number</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosPendientes.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.shipping?.name}</td>
                            <td>${pedido.amount_received/100}</td>
                            <td>
                                <input id={`input-${pedido.id}`} placeholder="Ej. 413395760015" />
                            </td>
                            <td>
                                <button onClick={() => {
                                    const val = document.getElementById(`input-${pedido.id}`).value;
                                    marcarComoEnviado(pedido, pedido.id, val);
                                }}>
                                    Confirmar Envío
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}