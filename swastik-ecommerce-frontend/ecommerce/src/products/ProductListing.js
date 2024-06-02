


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productListing.css';
import swal from 'sweetalert'

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
  const [pageSize, setPageSize] = useState(10); 
  const [sortBy, setSortBy] = useState('price'); 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    fetchProducts();
    
  }, [page, sortBy, minPrice, maxPrice]); 

  const fetchProducts = () => {
    setLoading(true);
    axios.get('http://localhost:3001/products', {
      params: {
        page: page,
        limit: pageSize,
        sort: sortBy,
        minPrice: minPrice,
        maxPrice: maxPrice
      }
    })
      .then(response => {
        const modifiedProducts = response.data.map(product => ({
          id: product.PRODUCT_ID,
          name: product.PRODUCT_NAME,
          model: product.PRODUCT_MODEL,
          availability: product.AVAILABILITY,
          rating: product.RATING,
          type: product.TYPE,
          price: product.PRODUCT_PRICE
        }));
        setProducts(modifiedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const handleProductClick = (product) => {
    swal({
      title: product.name,
      text: `Model: ${product.model}\nAvailability: ${product.availability}\nRating: ${product.rating}\nType: ${product.type}\nPrice: ${product.price}`,
      icon: 'info',
      buttons: false,
    });
  };

  return (
    <div className="product-listing-container">
      <h2 className="product-listing-header">Explore Products</h2>

      <div className="product-listing-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
        <label>Min price:</label>
        <input type="number" value={minPrice} onChange={handleMinPriceChange} />
        <label>Max price:</label>
        <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul className="product-listing-products">
            {products.map(product => (
              <li key={product.id} onClick={() => handleProductClick(product)}>
                <img src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Model: {product.model}</p>
                  <p>Availability: {product.availability}</p>
                  <p>Rating: {product.rating}</p>
                  <p>Type: {product.type}</p>
                  <p>Price: {product.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListing;


