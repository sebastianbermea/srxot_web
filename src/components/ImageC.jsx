import React from 'react'
import '../styles/ImageC.css';

function ImageC(props) {
    return (
        <div className='imageC'>
            <img src={props.data.cover} alt="Sr. xot foto" />
            <div className= "content">
                <h2>{props.data.title}</h2>
                <p>{props.data.description}</p>
            </div>

        </div>
    )
}

export default ImageC