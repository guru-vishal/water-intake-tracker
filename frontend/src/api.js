import axios from 'axios';

const API_URL = 'https://water-intake-tracker.onrender.com/api';


export const register = async (userData) => {
  const response = await axios.post(API_URL + '/users/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(API_URL + '/users/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + '/users/profile', config);
  return response.data;
};


export const getWaterData = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  
  const [dailyResponse, weeklyResponse] = await Promise.all([
    axios.get(`${API_URL}/water/daily`, config),
    axios.get(`${API_URL}/water/weekly`, config)
  ]);

  return {
    daily: dailyResponse.data,
    weekly: weeklyResponse.data
  };
};

export const addWaterData = async (waterData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post(`${API_URL}/water`, waterData, config);
  return response.data;
};

export const deleteWaterRecord = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/water/${id}`, config);
  return response.data;
};