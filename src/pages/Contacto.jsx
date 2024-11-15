import React, { useRef } from 'react'
import '../styles/Contacto.css';
import emailjs from '@emailjs/browser';

import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook2.svg';
import tiktok from '../assets/icons/tiktok.svg';

function Contacto() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_q4ganxu', 'template_jah7dv7', form.current, {
                publicKey: 'NcwtDYatGMwyXLUCn',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
                
            );
            e.target.reset();
    };

    return (
        <div className='contacto'>
            <h1>Contacto</h1>
            <div className='contact-div'>
                <form ref={form} className='contact-form' onSubmit={sendEmail}>
                    <h4>¿Tienes alguna duda o sugerencia?</h4>
                    <input name='from_name' type="text" className='field' placeholder='Ingresa tu nombre' required />
                    <input name='from_email' type="email" className='field' placeholder='Ingresa tu email' required />
                    <textarea name='message' id="" className='field-mess' placeholder='Ingresa tu mensaje' required></textarea>
                    <button type='submit'>Enviar mensaje</button>
                </form>
                <div className='social-media'>
                    <a href="https://www.instagram.com/sr.xot">
                        <img src={instagram} alt="instagram" />
                        @sr.xot
                    </a>
                    <a href='https://www.tiktok.com/@srxot'>
                        <img src={tiktok} alt="tiktok" />
                        @srxot
                    </a>
                    <a href="https://www.facebook.com">
                        <img src={facebook} alt="facebook" />
                        Sr. Xot
                    </a>

                </div>
            </div>
        </div>
    )
}

export default Contacto