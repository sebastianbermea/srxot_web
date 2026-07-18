import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getProductById } from "../functions";
import '../styles/Product.css';

import { useCart } from '../contexts/cartContext';

import rightarrow from '../assets/icons/right_arrow_pink.svg';
import lefttarrow from '../assets/icons/left_arrow_pink.svg';
import ListProductPopular from '../components/ListProductPopular';
import ImageFooter from '../components/ImageFooter';
import best_icon from '../assets/icons/Best-seller.svg';
import stock_icon from '../assets/icons/casi-agotado.svg';
import ProductTimer from '../components/ProductTimer';

import img from '../assets/images/banners/BottomBanner3.jpg';
import sticker from '../assets/icons/sticker_play.svg';

import ReactPixel from 'react-facebook-pixel';
import { flavors_data } from '../Data.js';

function Producto() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [productInfo, setProductInfo] = useState(null);
    const [currentImg, setImg] = useState("../assets/images/to_load.png");
    const [selectedSize, setSelectedSize] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [count, setCount] = useState(1);


    useEffect(() => {
        async function getProductInfo() {
            const product = await getProductById(id);
            console.log("producto", product);
            if (!product) {
                window.location = "/notfound";
                return;
            }

            const allImages = [product.images[0]];

            if (product.metadata.hasOwnProperty("img_1")) {
                allImages.push(product.metadata.img_1);

                if (product.metadata.hasOwnProperty("img_2")) {
                    allImages.push(product.metadata.img_2);

                    if (product.metadata.hasOwnProperty("img_3")) {
                        allImages.push(product.metadata.img_3);
                    }
                }
            }

            setProductInfo({ ...product, allImages });
            setImg(product.images[0]);

            const precioReal = product.discount
                ? product.discount.unit_amount / 100
                : product.price.unit_amount / 100;

            const pixelInstance = ReactPixel.default || ReactPixel;
            if (pixelInstance && typeof pixelInstance.init === 'function') {
                try {
                    pixelInstance.track('ViewContent', {
                        content_name: product.name,
                        content_ids: [product.id],
                        content_type: 'product',
                        value: precioReal,
                        currency: 'MXN'
                    });
                } catch (error) {
                    console.error("Error al mandar el Pixel de Facebook:", error);
                }
            }
        }
        getProductInfo();
    }, [id]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            checkStock('');
            return;
        }
        const num = parseInt(value);
        if (!isNaN(num)) {
            checkStock(num);
        }
    };

    const checkStock = (q) => {
        if (!productInfo) return;
        if (q > 24) {
            alert("Si requieres un pedido mayor, ¡contáctanos para recibir descuentos!");
            return;
        }
        if (productInfo.metadata.stock && productInfo.metadata.stock < q) {
            return;
        }
        setCount(q);
    };

    const flavors = productInfo?.metadata?.flavors
        ? productInfo.metadata.flavors.replace(/"/g, '').split(',')
        : [];

    const handleBlur = () => {
        if (count === '') checkStock(1);
    };

    return (
        <div>
            <div className='product-main-wrapper'>

                {/* Columna Izquierda Multimedia */}
                <div className='product-main'>

                    {/* Contenedor Flex Intermedio para alinear Galería e Imagen en PC */}
                    <div className='product-media-layout'>
                        <div className='product-main-gallery'>
                            {productInfo?.allImages.map((src, i) => (
                                <button key={i} onClick={() => setImg(src)}>
                                    <img className='product-main-image-selct' src={src} alt={`Galería ${i}`} />
                                </button>
                            ))}
                        </div>

                        <div className='product-main-image-container' onMouseMove={handleMouseMove}>
                            <img
                                src={currentImg}
                                alt={productInfo?.name}
                                className='product-main-image'
                                style={{ transformOrigin: `${position.x}% ${position.y}%` }}
                            />
                            {productInfo?.metadata?.best && <img className='best-icon' src={best_icon} alt={"best seller"} />}
                            {productInfo?.metadata?.stock && productInfo?.metadata?.stock > 0 && productInfo?.metadata?.stock < 20 && <img className='casi-agotado' src={stock_icon} alt="Casi Agotado" />}
                        </div>
                    </div>
                    {flavors &&
                        <div className='flavors-pills-list'>
                            {flavors.map((flavorKey) => {
                                const flavor = flavors_data[flavorKey];
                                if (!flavor) return null;

                                return (
                                    <div
                                        key={flavorKey}
                                        className='flavor-pill'
                                        style={{
                                            backgroundColor: flavor.back_color,
                                            borderColor: flavor.out_color
                                        }}
                                    >
                                        <img
                                            src={flavor.image}
                                            alt={flavor.title}
                                            className='flavor-pill-icon'
                                            draggable="false"
                                        />
                                        <span
                                            className='flavor-pill-title'
                                            style={{ color: flavor.out_color }}
                                        >
                                            {flavor.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>}
                </div>

                <div className='product-main-description'>
                    <h2>{productInfo?.name}</h2>
                    <div className='price-wrapper'>
                        <h3 className={productInfo?.discount ? 'price-discount' : ''}>
                            ${productInfo?.price.unit_amount / 100}.00 MXN
                        </h3>
                        {productInfo?.discount && (
                            <h3>${productInfo?.discount.unit_amount / 100}.00 MXN</h3>
                        )}
                    </div>

                    {productInfo?.discount && (
                        <ProductTimer deadline={productInfo?.metadata?.discount_limit} />
                    )}

                    <h4>{productInfo?.description}</h4>

                    <div className='size-section'>
                        <p>Tamaño:</p>
                        {!productInfo?.metadata.sizes ? (
                            <p>
                                <span style={{ fontStyle: 'italic' }}>
                                    {productInfo?.metadata.size ?? "UNITALLA"}
                                </span>
                            </p>
                        ) : (
                            <select onChange={(e) => setSelectedSize(e.target.value)}>
                                <option value="">Selecciona Talla</option>
                                <option value="S">Chica (S)</option>
                                <option value="M">Mediana (M)</option>
                                <option value="L">Grande (L)</option>
                                <option value="XL">Extra Grande (XL)</option>
                            </select>
                        )}
                    </div>

                    <div>
                        {productInfo?.metadata.stickers === "true" && (
                            <div className='product-stickers'>
                                <img src={sticker} /> <p>Contiene stickers</p>
                            </div>
                        )}
                    </div>

                    <div className='product-quantity'>
                        <button onClick={() => count > 1 && checkStock(count - 1)}>
                            <img src={lefttarrow} alt="Restar" />
                        </button>
                        <input
                            type="text"
                            className="product-quantity-input"
                            value={count}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                        <button onClick={() => checkStock(count + 1)}>
                            <img src={rightarrow} alt="Sumar" />
                        </button>
                    </div>

                    {productInfo?.metadata?.stock && productInfo?.metadata?.stock > 0 && productInfo?.metadata?.stock < 20 && (
                        <h6>{`Solo ${productInfo?.metadata?.stock} disponibles`}</h6>
                    )}

                    <button
                        onClick={() => addToCart(productInfo, count, selectedSize)}
                        className={`product-main-add ${productInfo?.metadata?.stock === 0 ? 'out-stock-button' : ''}`}
                        disabled={productInfo?.metadata?.stock === 0}
                    >
                        {productInfo?.metadata?.stock === 0 ? "AGOTADO" : "AÑADIR AL CARRITO"}
                    </button>
                </div>
            </div>

            <ListProductPopular />
            <ImageFooter data={{ img: img }} />
        </div>
    );
}

export default Producto;