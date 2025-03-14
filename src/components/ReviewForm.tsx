import React, { FormEvent } from 'react';

interface ReviewFormProps {
  newRating: number;
  newComment: string;
  onRatingChange: (value: number) => void;
  onCommentChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  newRating,
  newComment,
  onRatingChange,
  onCommentChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="review-form">
      <h3>Leave a Review</h3>
      <label>
        Rating:
        <select
          value={newRating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
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
          onChange={(e) => onCommentChange(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;