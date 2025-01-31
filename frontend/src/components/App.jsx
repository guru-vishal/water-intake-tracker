/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import GoalSetter from './GoalSetter';
import WaterLog from './WaterLog';
import ProgressBar from './ProgressBar';
import ReminderSettings from './ReminderSettings';
import DailyReset from './DailyReset';

const App = () => {
  const [goal, setGoal] = useState(2); // Default 2 liters
  const [currentIntake, setCurrentIntake] = useState(0);

  useEffect(() => {
    // Load saved data
    const savedIntake = localStorage.getItem('waterIntake');
    const lastUpdate = localStorage.getItem('lastUpdate');
    const today = new Date().toDateString();

    if (savedIntake && lastUpdate === today) {
      setCurrentIntake(parseFloat(savedIntake));
    } else {
      // Reset if it's a new day
      localStorage.setItem('lastUpdate', today);
      localStorage.setItem('waterIntake', '0');
      setCurrentIntake(0);
    }
  }, []);

  const handleWaterAdd = (amount) => {
    const newIntake = currentIntake + amount;
    setCurrentIntake(newIntake);
    localStorage.setItem('waterIntake', newIntake.toString());
  };

  const handleReset = () => {
    setCurrentIntake(0);
    localStorage.setItem('waterIntake', '0');
  };

  return (
    <div>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <GoalSetter onGoalSet={setGoal} />
            <WaterLog onWaterAdd={handleWaterAdd} />
          </div>
          <div className="col-md-6">
            <ProgressBar current={currentIntake} goal={goal} />
            <ReminderSettings />
            <DailyReset onReset={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;