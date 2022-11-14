/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

// axios.get('https://comix-server.vercel.app/products').then((res) => res.data)

const Products = () => {
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [productPerPage, setProductPerPage] = useState(10);
    // const {
    //     data: { products, count },
    // } = useQuery(['products'], () =>
    //     ProductsApiRoute.findByPage(page, productPerPage).then((res) => res.data)
    // );
    // console.log(products, count);
    useEffect(() => {
        fetch(`https://comix-server.vercel.app/products?page=${page}&size=${productPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count);
                setProducts(data.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [page, productPerPage]);

    const pages = Math.ceil(count / productPerPage);

    const onPageChange = (value) => {
        setPage(value);
    };
    console.log(products);

    return (
        <div className="container ">
            {/* <div className="flex">
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={page}
                        layout="pagination"
                        onPageChange={onPageChange}
                        showIcons
                        totalPages={pages}
                        previousLabel={false}
                        nextLabel={false}
                    />
                </div>
                <select
                    defaultValue="Pick items per page"
                    onChange={(e) => setProductPerPage(e.target.value)}
                    className="select select-success  "
                >
                    <option disabled>Pick items per page</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div> */}
            <div className="mt-10 grid grid-cols-2 gap-5">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
