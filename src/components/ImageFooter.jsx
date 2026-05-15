import '../styles/ImageFooter.css'; // Optional: for styling

const ImageFooter = (props) => {
    return (
        <div className='image-footer'>
               <img src={props.data.img}/>
                <h2>
                    #PREMIO O CASTIGO
                </h2>
        </div>
    );
};

export default ImageFooter;