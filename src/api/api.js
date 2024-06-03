import axios from "axios";


export const createData = async (data) => {
    return axios.post("/excels", data).then((response) => response.data);
  }

  export const getData =  async () =>{
    return axios.get("/excels").then((response) => response.data);
  }
