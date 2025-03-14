import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReviewsByProduct, Review } from '../services/api';
import '../styles/ProductReviews.scss';

const ProductReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProduct(id!);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching reviews.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-reviews-container">
      <h1>Product Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews for this product.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
      <Link to={`/products/${id}`}>Back to Product Details</Link>
    </div>
  );
};

export default ProductReviews;
