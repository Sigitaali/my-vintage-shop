import React, { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ProductDetail.scss';
import { 
  Product, 
  Review, 
  getProductById, 
  getReviewsByProduct, 
  postReview, 
  updateReview, 
  deleteReview 
} from '../services/api';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id!);
        setProduct(productData);
        const reviewData = await getReviewsByProduct(id!);
        setReviews(reviewData);
      } catch (err: any) {
        setError('Error fetching product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleNewReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const review: Review = {
      productId: product.id,
      userId: 1,
      rating: newRating,
      comment: newComment,
    };


    try {
      const newRev = await postReview(review);
      setReviews([...reviews, newRev]);
      setNewRating(5);
      setNewComment('');
    } catch (err: any) {
      alert('Error submitting review.');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err: any) {
      alert('Error deleting review.');
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id || null);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleUpdateReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || editingReviewId === null) return;
    const updatedReview: Review = {
      productId: product.id,
      userId: 1,
      rating: editRating,
      comment: editComment,
    };
    try {
      const result = await updateReview(editingReviewId, updatedReview);
      setReviews(reviews.map((r) => (r.id === editingReviewId ? result : r)));
      setEditingReviewId(null);
    } catch (err: any) {
      alert('Error updating review.');
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail-container">
      <Navbar />
      <div className="product-info">
        <img
          src={product.image ? product.image : '/images/default-product.jpg'}
          alt={product.title}
        />
        <div className="product-details">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="price">Price: ${product.price}</p>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              {editingReviewId === review.id ? (
                <form onSubmit={handleUpdateReview} className="edit-review-form">
                  <label>
                    Rating:
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Terrible</option>
                    </select>
                  </label>
                  <label>
                    Comment:
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      required
                    />
                  </label>
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setEditingReviewId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <p>{review.comment}</p>
                  <button onClick={() => handleEditReview(review)}>Edit</button>
                  <button onClick={() => handleDeleteReview(review.id!)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}

        <form onSubmit={handleNewReviewSubmit} className="review-form">
          <h3>Leave a Review</h3>
          <label>
            Rating:
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
          </label>
          <label>
            Comment:
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;