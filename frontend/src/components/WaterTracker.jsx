import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getWaterData, addWaterData, deleteWaterRecord } from '../api';

const WaterTracker = () => {
  const [intakeData, setIntakeData] = useState({ records: [], totalIntake: 0 });
  const [weeklyData, setWeeklyData] = useState([]);
  const [newIntake, setNewIntake] = useState({
    amount: '',
    unit: 'ml',
    note: '',
  });

  const fetchData = async () => {
    const { daily, weekly } = await getWaterData();
    setIntakeData(daily);
    setWeeklyData(Object.entries(weekly.dailyTotals).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString(),
      amount: Math.round(amount),
    })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWaterData(newIntake);
    setNewIntake({ amount: '', unit: 'ml', note: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteWaterRecord(id);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Add Water Intake</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={newIntake.amount}
                      onChange={(e) =>
                        setNewIntake({ ...newIntake, amount: e.target.value })
                      }
                      required
                      min="0"
                    />
                    <select
                      className="form-select"
                      value={newIntake.unit}
                      onChange={(e) =>
                        setNewIntake({ ...newIntake, unit: e.target.value })
                      }
                    >
                      <option value="ml">ml</option>
                      <option value="oz">oz</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Note (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newIntake.note}
                    onChange={(e) =>
                      setNewIntake({ ...newIntake, note: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Entry
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Today's Intake</h3>
              <h4 className="text-primary mb-4">
                Total: {intakeData.totalIntake} ml
              </h4>
              <div className="list-group">
                {intakeData.records.map((record) => (
                  <div
                    key={record._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>
                        {record.amount} {record.unit}
                      </strong>
                      {record.note && <p className="mb-0 text-muted">{record.note}</p>}
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Weekly Overview</h3>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#0d6efd"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;