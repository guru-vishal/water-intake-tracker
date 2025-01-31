import React, { useState } from 'react';

const WaterLog = ({ onWaterAdd }) => {
  const [customAmount, setCustomAmount] = useState('');

  const quickAddAmounts = [
    { label: '200 ml', value: 200 },
    { label: '500 ml', value: 500 },
    { label: '1 L', value: 1000 }
  ];

  const handleQuickAdd = (amount) => {
    onWaterAdd(amount);
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (customAmount) {
      onWaterAdd(parseFloat(customAmount));
      setCustomAmount('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">Log Water Intake</h3>
        
        <div className="mb-3">
          {quickAddAmounts.map(({ label, value }) => (
            <button
              key={value}
              className="btn btn-primary me-2 mb-2"
              onClick={() => handleQuickAdd(value)}
            >
              +{label}
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomAdd}>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Custom amount in ml"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaterLog;