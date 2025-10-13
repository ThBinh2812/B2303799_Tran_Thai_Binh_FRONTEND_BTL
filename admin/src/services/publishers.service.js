import axios from 'axios';

const DB_URL = import.meta.env.VITE_DB_URL;

export const getPublishers = async () => {
  try {
    const res = await axios.get(`${DB_URL}/api/publishers`)
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        status: 'error',
        message: error.message,
        data: null,
      }
    );
  }
};

export const addPublisher = async (formData) => {
  try {
    const res = await axios.post(`${DB_URL}/api/publishers`, formData)
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        status: 'error',
        message: error.message,
        data: null,
      }
    )
  }
}

export const updatePublisher = async (id, formData) => {
  try {
    const res = await axios.put(`${DB_URL}/api/publishers/${id}`, formData)
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        status: 'error',
        message: error.message,
        data: null,
      }
    )
  }
}


export const deletePublisher = async (id) => {
  try {
    const res = await axios.delete(`${DB_URL}/api/publishers/${id}`);
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        status: 'error',
        message: error.message,
        data: null,
      }
    );
  }
};
