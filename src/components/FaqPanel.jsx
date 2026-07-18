import React from 'react';
import '../styles/Faq.css';
import { Link } from 'react-router-dom';

import { useIsMobile } from '../hooks/useIsMobile';

import rightarrow from '../assets/icons/arrow_right.svg';
import faqimg from '../assets/images/FAQImg.png';
import faqimgM from '../assets/images/FAQImgM.png';

const FaqPanel = () => {
   const isMobile = useIsMobile();
    return (
        <div className='faq-panel'>
           <div>
                <h2>¿Tienes alguna pregunta sobre Sr. Xot?</h2>
                <Link className='mobile-cta'
                    to='/faq'>
                    IR A FAQ<img src={rightarrow}></img>
                </Link>
            </div>
            <img className='faq-img' src={isMobile? faqimgM:faqimg}/>
           
        </div>
    );
};

export default FaqPanel;