import React, { useState } from "react";
import PlanList from "./Components/PlanList";
import PlanDetails from "./Components/PlanDetails";
import UsageMetrics from "./Components/UsageMetrics";

const App = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleActivate = (plan) => {
    setActivePlan(plan);
    setSelectedPlan(null);
  };

  return (
    <div style={{ margin: "5px" }}>
      {!selectedPlan && !activePlan && (
        <PlanList onSelectPlan={handleSelectPlan} />
      )}
      {selectedPlan && (
        <PlanDetails plan={selectedPlan} onActivate={handleActivate} />
      )}
      {activePlan && <UsageMetrics />}
    </div>
  );
};

export default App;
