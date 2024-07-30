import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanList = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/plans")
      .then((response) => setPlans(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Available Internet Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <button onClick={() => onSelectPlan(plan)}>{plan.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;
