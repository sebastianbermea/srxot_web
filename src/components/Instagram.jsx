import '../styles/Instagram.css';
import { motion } from 'framer-motion';

import insta from '../assets/icons/instagram_white.svg';

import img1 from '../assets/images/instagram/Instagram1.jpg';
import img2 from '../assets/images/instagram/Instagram2.jpg';
import img3 from '../assets/images/instagram/Instagram3.jpg';
import img4 from '../assets/images/instagram/Instagram4.jpg';
import img5 from '../assets/images/instagram/Instagram5.jpg';
import img6 from '../assets/images/instagram/Instagram6.jpg';



const Instagram = () => {
    const instagramPics = [
        { url: "https://www.instagram.com/p/DRFcpyxAQs3/", src: img1, },
        { url: "https://www.instagram.com/p/DSOis9IFAuC/", src: img2, },
        { url: "https://www.instagram.com/p/DRDT3W6kn_8/", src: img3, },
        { url: "https://www.instagram.com/p/DMJn_f8sOrD/", src: img4, },
        { url: "https://www.instagram.com/p/DQnlS4NEcRm/", src: img5, },
        { url: "https://www.instagram.com/p/DPj9D7fASf2/", src: img6, },

    ]
    const duplicatedPics = [...instagramPics, ...instagramPics];
    return (
        <div className='instagram-wrapper'>
            <h2>@sr.xot</h2>
            <div className='instagram-viewport'>
                <motion.div
                    className='instagram-carousel'
                    animate={{
                        x: ['0%', '-50%'], // Se mueve la mitad (el set original)
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20, // Ajusta la velocidad (más segundos = más lento)
                            ease: "linear",
                        },
                    }}
                    style={{ display: 'flex' }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedPics.map(({ src, url }, index) => (
                        <div className="instagram-item" key={index}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="instagram-link">
                                <img src={src} alt={"Instagram post " + index}/>
                                <div className='instagram-overlay'>
                                    <img src={insta} className='instagram-icon '/>
                                </div>
                    
                            </a>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Instagram;