import React from "react";
import axios from "axios";

const PlanDetails = ({ plan, onActivate }) => {
  const activatePlan = () => {
    axios
      .post("/api/v1/activate", { planId: plan._id })
      .then((response) => onActivate(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Plan Details</h2>
      <p>{plan.name}</p>
      <p>{plan.description}</p>
      <p>{plan.price}</p>
      <button onClick={activatePlan}>Activate</button>
    </div>
  );
};

export default PlanDetails;
