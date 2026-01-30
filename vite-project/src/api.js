import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = async () => {
  const res = await api.get("/allitems");
  const items = res.data.items.map(item => ({
    ...item,
    image: item.image?.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`
  }));
  return { ...res.data, items };
};

export const createItem = async (data, token) => {
  const res = await api.post("/additem", data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateItem = async (id, data, token) => {
  const res = await api.put(`/updateitems/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

export const deleteItem = async (id, token) => {
  const res = await api.delete(`/deleteitems/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const getMyItems = async (token) => {
  const res = await api.get("/myitems", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

