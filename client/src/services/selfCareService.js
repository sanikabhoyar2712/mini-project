import axios from 'axios';

const API_URL = 'http://localhost:5000/api/selfcare';

export const selfCareService = {
  // Get all self-care data for a user
  getSelfCareData: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Save/update self-care data
  saveSelfCareData: async (userId, data) => {
    try {
      const response = await axios.post(API_URL, {
        userId,
        updatedData: data
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 