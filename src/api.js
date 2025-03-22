import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getUsers = async()=>{
    const resposne =  await axios.get(`${API_BASE_URL}/users`);
    return resposne.data;
}


export const getUsersId = async(id)=>{

    console.log(id)
    const resposne = await axios.get(`${API_BASE_URL}/users/${id}`);
    return resposne.data;
}

export const updateUser = async({id,username})=>{
     const resposne = await axios.put(`${API_BASE_URL}/users/${id}`,{username});
    return resposne.data;
}

export const deleteUser = async(id)=>{
    const resposne = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return resposne.data;
}


export const addUser = async({username})=>{
    const resposne = await axios.post(`${API_BASE_URL}/users`,{username});
    return resposne.data;
}