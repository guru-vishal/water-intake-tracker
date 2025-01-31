import { useState, useEffect } from 'react';
import { getProfile } from '../api';
import WaterTracker from '../components/WaterTracker';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.token);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Dashboard</h2>
          {profile && (
            <div className="mt-3">
              <h4>Welcome, {profile.name}!</h4>
              <p>Email: {profile.email}</p>
            </div>
          )}
        </div>
      </div>
      <WaterTracker />
    </div>
  );
};

export default Dashboard;