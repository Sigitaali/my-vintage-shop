import React, { useEffect, useState, FormEvent, useContext } from 'react';
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
import { CartContext } from '../context/CartContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

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
  
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id!);
        setProduct(productData);
        const reviewData = await getReviewsByProduct(id!);
        setReviews(reviewData);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_ITEM', payload: { productId: product.id, quantity: 1 } });
      alert('Product added to cart!');
    }
  };

  const handleNewReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const newReview: Review = {
      productId: product.id,
      userId: 1,
      rating: newRating,
      comment: newComment,
    };

    try {
      const newRev = await postReview(newReview);
      setReviews([...reviews, newRev]);
      setNewRating(5);
      setNewComment('');
    } catch (err: unknown) {
      console.error(err);
      alert('Error submitting review.');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err: unknown) {
      console.error(err);
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
    } catch (err: unknown) {
      console.error(err);
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
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        <ReviewList
          reviews={reviews}
          editingReviewId={editingReviewId}
          editRating={editRating}
          editComment={editComment}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          onUpdate={handleUpdateReview}
          onCancelEdit={() => setEditingReviewId(null)}
          onEditRatingChange={setEditRating}
          onEditCommentChange={setEditComment}
        />
        <ReviewForm
          newRating={newRating}
          newComment={newComment}
          onRatingChange={setNewRating}
          onCommentChange={setNewComment}
          onSubmit={handleNewReviewSubmit}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
