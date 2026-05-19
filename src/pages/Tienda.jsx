import React, { useState, useEffect } from 'react'
import '../styles/Tienda.css';
import { Link } from 'react-router-dom';
import ImageFooter from '../components/ImageFooter';
import { trackProductClick } from '../functions/events'; 

import { useCart } from '../contexts/cartContext';
import { useProducts } from "../contexts/productContext";

import rightarrow from '../assets/icons/right_arrow_pink.svg';
import lefttarrow from '../assets/icons/left_arrow_pink.svg';
import best_icon from '../assets/icons/Best-seller.svg';
import stock_icon from '../assets/icons/casi-agotado.svg';

import img from '../assets/images/banners/BottomBanner4.png';

function Tienda() {
 const { products } = useProducts();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Asegura que suba al inicio al cambiar página
  };

  console.log(currentProducts);

  return (
    <div className='shop'>
      {currentProducts.length<=0 ?
        <div className="dot-typing" style= {{paddingTop: '25px' }}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        :
        <>
          <div className='tienda'>
            <h1>Productos</h1>
            <div className='shop-grid'>
              {currentProducts.map((p) => (
                <div className='shop-item' key={p.id}>
                  <div className='shop-item-img-viewport'>
                    <Link 
                      onClick={() => trackProductClick(p, p.discount?.active)}
                    to={`/producto/${p.id}`}>
                      <img src={p.images[0]} alt={p.name} />
                    </Link>
                  </div>
                   {p.metadata?.best && <img className='best-icon' src={best_icon} alt={"best seller"} />}
                   {p.metadata?.stock && p.metadata?.stock >0 && p.metadata?.stock <20 && <img className='casi-agotado' src={stock_icon} alt="Casi Agotado" />}
                                                                                     
                  <h3>{p.name}</h3>
                  <div className='price-wrapper'>
                  <h4 className={p.discount  ? 'price-discount' : ''}>${p.price.unit_amount / 100}.00 MXN</h4>
                    {p.discount && (<h4>${p.discount.unit_amount / 100}.00 MXN</h4>)}
                  </div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className={`popular-item-button ${p.metadata?.stock == 0 ? 'out-stock-button': ''}`}>
                      {p.metadata?.stock==0 ? "Agotado" : "Añadir al carrito"}</button>
                </div>
              ))}
            </div>

            {/* 4. Controles de Paginación */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src={lefttarrow}></img>
                </button>

                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <img src={rightarrow}></img>
                </button>
              </div>
            )}

          </div>
          <ImageFooter data={{img:img}} />
        </>
      }
    </div>
  );
}

export default Tienda