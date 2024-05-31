import axios from "axios";

export const apiCall = async ({ method = "GET", payload, url }) => {
  try {
    const data = await axios({
      method,
      url: `http://backend:8000/${url}`,
      data: payload || null,
    });
    return data.data;
  } catch (error) {
    console.log(error, "errorr");
    return { error: error?.response?.data ||{message :'server error'} };
  }
};
