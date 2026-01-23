import axios from "axios";
const BASE_URL="http://127.0.0.1:8000/api";
const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
    },
});

export const getItems =async()=> {
 const res= await api.get("/allitems");
 return res.data;
};

export const createItem =async(data)=> {
 const res= await api.post("/additem",data);
 return res.data;
};

export const login =async()=> {
 const res= await api.post("/login",data);
 return res.data;
};

export const register =async()=> {
 const res= await api.post("/Register",data);
 return res.data;
};

