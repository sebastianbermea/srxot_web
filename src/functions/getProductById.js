import { db } from "../firebase/credentials";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";

async function getProductById(id) {
    try {
        const collectionRef = collection(db, "products");
        const docuRef = doc(collectionRef, id);
        const snapDoc = await getDoc(docuRef);
        const producto = snapDoc.data();

        producto.id = id;
        const precioSnaps = await getDocs(collection(snapDoc.ref, "prices"));
        producto.price = precioSnaps.docs[0].data();
        producto.priceId = precioSnaps.docs[0].id;
        if (producto.metadata?.discount) {
            if (producto.metadata?.discount_limit * 1000 > Date.now()) {
                producto.discountId = producto.metadata.discount;
                producto.discount = precioSnaps.docs.find(doc => doc.id === producto.metadata.discount).data();
            }
        }
        return producto;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default getProductById;