/* eslint-disable class-methods-use-this */
import http from '../httpShared';

class ProductsApiRoutes {
    getAll = () => http.get('/products');

    get(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http.post('/orders', data);
    }

    update(data, id) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    deleteAll() {
        return http.delete(`/products`);
    }

    findByPage(page, size) {
        return http.get(`/products?page=${page}&size=${size}`);
    }
}

export default new ProductsApiRoutes();
