import React, { useState } from "react";
import axios from "axios";

function Rating({ userId, storeId }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!userId || !storeId) {
      console.error("user_id or store_id is missing");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/new-rating", {
        rating: selectedRating,
        user_id: userId,
        store_id: storeId,
      });
      console.log("Response:", res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return (
    <div className="container mt-2 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "18rem" }}>
        <h5 className="card-title text-center mb-3">Rate This Store</h5>
        <div className="text-center mb-3">
            
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`bi ${
                selectedRating >= star ? "bi-star-fill text-warning" : "bi-star"
              } mx-1 fs-3`}
              role="button"
              onClick={() => setSelectedRating(star)}
              style={{ cursor: "pointer" }}
            ></i>
          ))}
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedRating === 0 || submitted}
          >
            {submitted ? "Rating Submitted" : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rating;
