import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductsApiRoutes from '../../Routes/ProductsApiRoutes';

const ProductsDetail = () => {
    const { id } = useParams();
    const { data: productDetails } = useQuery(['product'], () =>
        ProductsApiRoutes.get(id).then((res) => res.data)
    );

    console.log(productDetails);

    return (
        <div>
            <Link to={`/checkout/${id}`}>
                <button type="button" className="button">
                    Checkout
                </button>
            </Link>
        </div>
    );
};

export default ProductsDetail;
