import React, { useState, useEffect } from "react";
import axios from "axios";

const UsageMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/metrics")
      .then((response) => setMetrics(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {metrics && (
        <div>
          <h2>Usage Metrics</h2>
          <p>Start Time: {metrics.startTime}</p>
          <p>End Time: {metrics.endTime}</p>
          <p>Internet Usage: {metrics.usage}</p>
          <p>Remaining Data: {metrics.remainingData}</p>
        </div>
      )}
    </div>
  );
};

export default UsageMetrics;
