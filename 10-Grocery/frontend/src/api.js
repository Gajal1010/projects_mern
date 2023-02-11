import Axios from "axios";

export const API_SERVER =  'http://localhost:5000'

  export const getOrders = async () => {
    const response = await Axios.get(`${API_SERVER}/api/order/all`);
    return response.data;
  };
  export const getMyOrders = async () => {
    
    const response = await Axios.get(`${API_SERVER}/api/order/myorders`);
    return response.data;
  };