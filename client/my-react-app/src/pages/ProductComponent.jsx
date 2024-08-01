import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [load,setLoad] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/products-by-category',
        params: {
          category_id: '2478868012',
          page: '1',
          country: 'US',
          sort_by: 'RELEVANCE',
          product_condition: 'ALL'
        },
        headers: {
          'x-rapidapi-key': '4f3fbbad60msh1af2bd2925ee763p197bd2jsn1861642727e6',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response);
        setProducts(response.data.data.products);
        setLoad(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='revsec' >
      <div className='revhead'>Product Listings</div>
      <div className="products-container">
        {load && products.map((product) => (
          <div key={product.asin} className="product-card">
            <img src={product.product_photo} alt={product.product_title} />
            <h2>{product.product_title}</h2>
            <p>Price: {product.product_price}</p>
            <p>Original Price: {product.product_original_price}</p>
            <p>Rating: {product.product_star_rating} ({product.product_num_ratings} ratings)</p>
            <p>Sales Volume: {product.sales_volume}</p>
            <a href={product.product_url} target="_blank" rel="noopener noreferrer">View on Amazon</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsComponent;
