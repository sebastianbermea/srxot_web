import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    EmailAuthProvider,
    linkWithCredential,
    signInAnonymously,
    signOut,
    linkWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const register = async (email, password, username) => {
    try {
        let user;
        const currentUser = auth.currentUser;

        // Si el usuario ya es anónimo, lo vinculamos en lugar de crear uno nuevo
        if (currentUser && currentUser.isAnonymous) {
            const credential = EmailAuthProvider.credential(email, password);
            const userCredential = await linkWithCredential(currentUser, credential);
            user = userCredential.user;
        } else {
            // Si no es anónimo, creación normal
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
        }

        // Actualizamos el perfil con el username
        await updateProfile(user, { displayName: username });

        return user;
    } catch (error) {
        console.error("Error en registro:", error.code);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error en login:", error.code);
        throw error;
    }
};

export const logout = async () => {
    try {
        signOut(auth);
        return;
    } catch (error) {
        console.error("Error en log out:", error.code);
        throw error;
    }
};

export const loginGoogle = async () => {
    const currentUser = auth.currentUser;

    try {
        if (currentUser && currentUser.isAnonymous) {
            const result = await linkWithPopup(currentUser, googleProvider);
            await updateProfile(currentUser, {
                displayName: result["_tokenResponse"]["displayName"],
            });
            return result.user;
        } else {
            // Si no es anónimo, login normal
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        }
    } catch (error) {
        // Manejo de errores según tu documentación
        if (error.code === 'auth/credential-already-in-use') {
            console.error("El correo de Google ya está ligado a otra cuenta existente.");
            logout();
        }
        throw error;
    }
};

export const logAnon = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error("Error al iniciar sesión anónima:", error.code);
        throw error;
    }
};

export const forgetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.error("Error en resend:", error.code);
        throw error;
        return false;
    }
};