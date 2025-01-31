import React, { useState, useEffect } from 'react';

const ReminderSettings = () => {
  const [interval, setInterval] = useState(60);
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isEnabled) {
      timer = setInterval(() => {
        // Using browser notification API
        if (Notification.permission === "granted") {
          new Notification("Water Reminder", {
            body: "Time to drink water!",
          });
        }
      }, interval * 60000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [interval, isEnabled]);

  const handleToggle = async () => {
    if (!isEnabled && Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
    }
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">Reminder Settings</h3>
        
        <div className="mb-3">
          <label className="form-label">Reminder Interval (minutes)</label>
          <select
            className="form-select"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value))}
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            id="reminderToggle"
          />
          <label className="form-check-label" htmlFor="reminderToggle">
            Enable Reminders
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettings;