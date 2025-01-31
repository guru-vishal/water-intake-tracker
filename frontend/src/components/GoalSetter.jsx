import React, { useState, useEffect } from 'react';

const GoalSetter = ({ onGoalSet }) => {
  const [goal, setGoal] = useState(2); // Default 2 liters

  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    if (savedGoal) {
      setGoal(parseFloat(savedGoal));
      onGoalSet(parseFloat(savedGoal));
    }
  }, []);

  const handleGoalChange = (e) => {
    const newGoal = parseFloat(e.target.value);
    setGoal(newGoal);
    localStorage.setItem('waterGoal', newGoal.toString());
    onGoalSet(newGoal);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">Set Daily Goal</h3>
        <div className="mb-3">
          <label className="form-label">Daily Water Goal (Liters)</label>
          <input
            type="range"
            className="form-range"
            min="0.5"
            max="5"
            step="0.5"
            value={goal}
            onChange={handleGoalChange}
          />
          <div className="text-center mt-2">
            <span className="h4">{goal} L</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSetter;