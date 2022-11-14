import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product: { _id, img, name, seller } }) => {
    const handleClick = () => {
        console.log('test click');
    };
    return (
        <div>
            <div className="w-full h-full rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <img
                    src={img}
                    alt=""
                    className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">{seller}</h2>
                        <p className="dark:text-gray-100">{name}</p>
                    </div>
                    <Link to={`/products/${_id}`}>
                        <button type="button" onClick={handleClick} className="button w-full">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
