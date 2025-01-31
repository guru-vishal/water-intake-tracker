import React from 'react';

const ProgressBar = ({ current, goal }) => {
  const percentage = Math.min((current / (goal * 1000)) * 100, 100);
  const currentLiters = (current / 1000).toFixed(2);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">Today's Progress</h3>
        
        <div className="mb-2">
          <div className="progress" style={{ height: '25px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-0">
            {currentLiters} L / {goal} L
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;