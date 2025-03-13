import React, { FormEvent } from 'react';
import { Review } from '../services/api';

interface ReviewListProps {
  reviews: Review[];
  editingReviewId: number | null;
  editRating: number;
  editComment: string;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
  onUpdate: (e: FormEvent) => void;
  onCancelEdit: () => void;
  onEditRatingChange: (value: number) => void;
  onEditCommentChange: (value: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  editingReviewId,
  editRating,
  editComment,
  onEdit,
  onDelete,
  onUpdate,
  onCancelEdit,
  onEditRatingChange,
  onEditCommentChange,
}) => {
  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            {editingReviewId === review.id ? (
              <form onSubmit={onUpdate} className="edit-review-form">
                <label>
                  Rating:
                  <select
                    value={editRating}
                    onChange={(e) => onEditRatingChange(Number(e.target.value))}
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
                    onChange={(e) => onEditCommentChange(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onCancelEdit}>
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
                <button onClick={() => onEdit(review)}>Edit</button>
                <button onClick={() => onDelete(review.id!)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;