import axios from 'axios'

const DB_URL = import.meta.env.VITE_DB_URL

export const getBooks = async () => {
  try {
    const res = await axios.get(`${DB_URL}/api/books`)
    return res.data
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

export const addBook = async (formData) => {
  try {
    const res = await axios.post(`${DB_URL}/api/books`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
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

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(`${DB_URL}/api/books/${id}`);
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

export const updateBook = async (id, formData) => {
  try {
    const res = await axios.put(`${DB_URL}/api/books/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
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
