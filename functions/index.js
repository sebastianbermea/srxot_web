const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const { Resend } = require("resend");

const cors = require("cors")({ origin: true }); // Permite peticiones de cualquier origen

if (admin.apps.length === 0) {
    admin.initializeApp();
}
exports.sendMailSuccess = onDocumentUpdated(
    {
        document: "customers/{uid}/payments/{paymentId}",
        secrets: ["RESEND_API_KEY"]
    }
    , async (event) => {
    const newValue = event.data.after.data();
    const oldValue = event.data.before.data();

    const IMAGENES_PRODUCTOS = {
        "prod_TkzUoKBclAB7Ju": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfeEJGVXhSeDBCeFB2R3dBNTh1aTMxYWUy00dkx243yi",
        "prod_Tl07wQD22TP4xp": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfMnh4TEZBbk00dFdhM1BZejlaUUNlanlS00sLC4ReCs",
        "prod_Tl084N7kpNl0JO": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfQTNjVFBVR3dqa0tXeXZHODFEdE1tQnpG00QKOf3QDV",
        "prod_Tl0AMDFO6IBANs": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfa285SFkxNHFDWHFWUG5nbERpeUpXajN600kyBShB72",
        "prod_Tl0C3YvZpjOQ2b": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfcmFPdG5Md2lQOHB6ZWdLdWRlaThxSjha00s7esWzpb",
        "prod_UW86SBXBKYwZd1": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfNTVIOWNpWXBCYk1xTXFLNUFvSmlDUmpS000XEqkI0a",
        "prod_UW897jSZIUtl95": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfOFJkMnN0a0pKSk5rbGRadDRsS3BjYmth001Ylj8ZZ9",
        "prod_UW8CoLFlsvqRxt": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfb1kweExhV21CVFFHMFFOcFExVFJCNGRr00LsjOA8d0",
        "prod_UW8GQjojlaJGPB": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfWXo1eFRDYngxVG9zTmViaGJkUFU3MlQ000frtmHPRn",
        "prod_UW8QkVRuOU8Xb9": "https://files.stripe.com/links/MDB8YWNjdF8xU2lpeTNIWnlmVkxqNEtOfGZsX2xpdmVfa0JhaXVFRW1tR1F0TWZTNlNGY1IxeTN100hc7KmpfK"
    };


    // Monitoreamos que el estatus cambie a exitoso (succeeded)
    if (newValue.status === "succeeded" && oldValue.status !== "succeeded") {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const uid = event.params.uid;
        let customerEmail = newValue.receipt_email;
        let botonReciboUrl = "https://srxot.com/account";

        const customerName = newValue.shipping?.name || "Cliente";

        const granTotal = newValue.amount_received ? newValue.amount_received / 100 : 0;
        const costoEnvio = newValue.amount_details?.shipping?.amount ? newValue.amount_details.shipping.amount / 100 : 0;
        const subtotalProductos = granTotal - costoEnvio;


        if (!customerEmail) {
            console.log("Cancelando envío: No se encontró dirección de correo electrónico.");
            return null;
        }

        const shippingData = newValue.shipping || {};
        const direccionName = shippingData.name || customerName;
        const direccionPhone = shippingData.phone || "No proporcionado";
        const address = shippingData.address || {};

        const calle1 = address.line1 || "";
        const calle2 = address.line2 ? `, ${address.line2}` : "";
        const ciudad = address.city || "";
        const estado = address.state || "";
        const cp = address.postal_code || "";
        const pais = address.country === "MX" ? "México" : (address.country || "");

        const listaProductos = newValue.items || [];
        let filasProductosHtml = "";

        listaProductos.forEach((item) => {
            const nombreProducto = item.description || "Producto Sr. Xot";
            const cantidad = item.quantity || 1;
            const totalItem = item.amount_total ? item.amount_total / 100 : 0;

            const stripeProductId = item.price?.product;

            // 🖼️ URL de imagen por defecto o placeholder.
            let imagenUrl = "https://firebasestorage.googleapis.com/v0/b/srxot-web.firebasestorage.app/o/srxotlogo.png?alt=media&token=3c6de493-2673-46e3-8a58-4be1b30a753f";
            
            if (stripeProductId && IMAGENES_PRODUCTOS[stripeProductId]) {
                imagenUrl = IMAGENES_PRODUCTOS[stripeProductId];
            }

            filasProductosHtml += `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 15px 0; width: 70px;">
                    <img src="${imagenUrl}" alt="${nombreProducto}" width="60" style="display: block; border-radius: 4px; border: 1px solid #eee;">
                </td>
                <td style="padding: 15px 10px; font-size: 15px; color: #333333;">
                    <span style="font-weight: bold; display: block;">${nombreProducto}</span>
                    <span style="font-size: 13px; color: #777777;">Cantidad: ${cantidad}</span>
                </td>
                <td align="right" style="padding: 15px 0; font-size: 15px; font-weight: bold; color: #111111; width: 90px;">
                    $${totalItem.toFixed(2)} MXN
                </td>
                </tr>
            `;
        });

        try {
            // 🚀 Mandamos el correo directo usando la API de Resend sin extensiones
            await resend.emails.send({
                from: "Sr. Xot <info@srxot.com>", // Aquí pones tu correo corporativo cuando lo configures en Resend
                to: [customerEmail],
                subject: "¡Tu orden de Sr. Xot está confirmada! 🥂",
                html: `
                 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9f9f9; padding: 20px 0; font-family: Arial, sans-serif;">
              <tr>
                  <td align="center">

                      <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #f8efe8; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

                          <tr>
                              <td align="center" style="padding: 40px 20px 20px 20px;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/srxot-web.firebasestorage.app/o/srxotlogo.png?alt=media&token=3c6de493-2673-46e3-8a58-4be1b30a753f" alt="Sr. Xot Logo" width="120" style="display: block; border: 0; height: auto;">
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 20px 40px; color: #333333; font-size: 16px; line-height: 1.6;">
                                  <h2 style="margin-top: 0; color: #111111; font-size: 26px; text-align: center;">¡Tu orden está lista! 🥂</h2>
                                  <p style="font-weight: 600;">Hola ${customerName}, tu pago ha sido procesado con éxito y nuestro equipo ya está preparando tus botellas.</p>
                                  <p style="font-weight: 600;">¡Gracias por tu compra!</p>

                                  <div style="text-align: center; margin: 30px 0;">
                                      <a href="${botonReciboUrl}" target="_blank" style="background-color: #111111; color: #f8efe8; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block; box-shadow: 0 3px 5px rgba(0,0,0,0.1);">
                                          Ver compra
                                      </a>
                                  </div>

                                  <h3 style="font-size: 18px; color: #111; border-bottom: 2px solid #111; padding-bottom: 5px; margin-top: 35px;">Resumen del Pedido</h3>
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                                      ${filasProductosHtml}
                                  </table>

                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 15px; border-top: 2px solid #e0e0e0; padding-top: 10px;">
                                      <tr>
                                          <td style="padding: 5px 0; color: #666;">Subtotal productos:</td>
                                          <td align="right" style="padding: 5px 0; color: #333;">$${subtotalProductos.toFixed(2)} MXN</td>
                                      </tr>
                                      <tr>
                                          <td style="padding: 5px 0; color: #666;">Envío:</td>
                                          <td align="right" style="padding: 5px 0; color: #333;">$${costoEnvio.toFixed(2)} MXN</td>
                                      </tr>
                                      <tr style="font-size: 18px; font-weight: bold;">
                                          <td style="padding: 10px 0; color: #111;">Total:</td>
                                          <td align="right" style="padding: 10px 0; color: #111;">$${granTotal.toFixed(2)} MXN</td>
                                      </tr>
                                  </table>

                                  <div style="background-color: rgba(255, 255, 255, 0.5); padding: 20px; border-radius: 6px; border: 1px solid #e8dec0; line-height: 1.5; color: #555555; font-size: 15px;">
                                      <strong style="color: #111111; display: block; font-size: 16px; margin-bottom: 10px;">Dirección de envío</strong>
                                      <span style="display: block; font-weight: bold; color: #222222; margin-bottom: 4px;">${direccionName}</span>
                                      <span style="display: block;">${calle1}${calle2}</span>
                                      <span style="display: block;">${cp} ${ciudad.toUpperCase()} ${estado.toUpperCase()}</span>
                                      <span style="display: block; margin-bottom: 10px;">${pais}</span>
                                      <span style="display: block; border-top: 1px dashed #e0e0e0; padding-top: 10px; font-size: 14px;">
                                          <strong>Teléfono:</strong> ${direccionPhone}
                                      </span>
                                  </div>

                                  <p style="font-size: 12px; color: #555555; margin-top: 15px;">
                                      Recuerda que una vez se haya preparado tu pedido suele tardar entre 3 y 10 días hábiles en llegar a tu dirección.
                                      Si tienes cualquier duda, no dudes en contactarnos en <strong>info@srxot.com</strong>.
                                  </p>
                              </td>
                          </tr>

                          <tr>
                              <td align="center" style="padding: 30px 40px; background-color: #f1f1f1; color: #777777; font-size: 12px;">
                                  <p style="margin: 0;">Este es un correo automático de Sr. Xot.</p>
                                  <p style="margin: 5px 0 0 0;">Saltillo, Coahuila, México.</p>
                              </td>
                          </tr>

                      </table>

                  </td>
              </tr>
          </table>
                `
            });

            console.log(`Correo enviado de forma directa mediante Resend a: ${customerEmail}`);
        } catch (error) {
            console.error("Error directo al enviar con Resend:", error);
        }
    }

    return null;
});

exports.getTrackingStatus = onRequest({
    secrets: ["ENVIA_TOKEN"]
}, (req, res) => {
    // Usamos el middleware CORS para gestionar OPTIONS y headers automáticamente
    return cors(req, res, async () => {

        // 🚀 Parseo seguro del cuerpo de la petición
        const body = (typeof req.body === 'string') ? JSON.parse(req.body) : req.body;
        const { trackingNumber } = body;

        logger.info("Procesando consulta para tracking:", { trackingNumber });

        if (!trackingNumber) {
            return res.status(200).json({
                trackUrl: null,
                statusEspañol: "Creado",
                currentStep: 0,
                isErrorStatus: false
            });
        }

        try {
            const response = await fetch("https://api.envia.com/ship/generaltrack/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.ENVIA_TOKEN}`
                },
                body: JSON.stringify({
                    trackingNumbers: [trackingNumber.toString()]
                })
            });

            const result = await response.json();
            logger.info(result);
            if (result && result.meta === "generaltrack" && result.data && result.data.length > 0) {
                const trackingData = result.data[0];
                const apiStatus = trackingData.status;

                const statusMapper = {
                    "Created": { text: "Creado", step: 0, isError: false },
                    "Picked Up": { text: "Enviado", step: 1, isError: false },
                    "Shipped": { text: "En tránsito", step: 2, isError: false },
                    "In Transit": { text: "En tránsito", step: 2, isError: false },
                    "In_Transit": { text: "En tránsito", step: 2, isError: false },
                    "Out for Delivery": { text: "En reparto", step: 3, isError: false },
                    "Out_For_Delivery": { text: "En reparto", step: 3, isError: false },
                    "Delivered": { text: "Entregado", step: 4, isError: false },
                    "Canceled": { text: "Cancelado", step: -1, isError: true },
                    "Information": { text: "Información adicional requerida", step: -1, isError: false },
                    "Pending": { text: "Pendiente de procesar", step: -1, isError: false },
                    "Lost": { text: "Paquete extraviado", step: -1, isError: true },
                    "Returned": { text: "Devuelto al remitente", step: -1, isError: true },
                    "Pickup at Office": { text: "Disponible en oficina", step: -1, isError: false },
                    "Delivered at Origin": { text: "Devuelto en origen", step: -1, isError: true },
                    "Damaged": { text: "Paquete dañado", step: -1, isError: true },
                    "Redirected": { text: "Dirección redireccionada", step: -1, isError: false },
                    "Out for Pickup": { text: "Listo para recolección", step: -1, isError: false },
                    "1 delivery attempt": { text: "Primer intento fallido", step: -1, isError: true },
                    "2 delivery attempts": { text: "Segundo intento fallido", step: -1, isError: true },
                    "3 delivery attempts": { text: "Tercer intento fallido", step: -1, isError: true },
                    "Return problem": { text: "Problema con la devolución", step: -1, isError: true },
                    "Address error": { text: "Error en la dirección", step: -1, isError: true },
                    "Undeliverable": { text: "Inentregable", step: -1, isError: true },
                    "Delayed": { text: "Envío demorado", step: -1, isError: false },
                    "Rejected": { text: "Rechazado", step: -1, isError: true },
                    "1 pickup attempt": { text: "Intento de recolección fallido", step: -1, isError: false },
                    "Partially Shipped": { text: "Envío parcial enviado", step: -1, isError: false },
                    "Partially Delivered": { text: "Envío parcial entregado", step: -1, isError: false },
                    "Delivery Attempt": { text: "Intento de entrega realizado", step: -1, isError: false }
                };

                const mapped = statusMapper[apiStatus] || { text: `Estatus: ${apiStatus}`, step: -1, isError: false };

                return res.status(200).json({
                    trackUrl: trackingData.trackUrl || `https://envia.com/rastreo?label=${trackingData.trackingNumber}`,
                    statusEspañol: mapped.text,
                    currentStep: mapped.step,
                    isErrorStatus: mapped.isError
                });
            } else {
                return res.status(404).json({ error: "Guía no encontrada en el sistema" });
            }
        } catch (error) {
            logger.error("Error consultando envia.com:", error);
            return res.status(500).json({ error: "Error interno" });
        }
    });
});