import axios from "axios";

const authFetch = axios.create({
  baseURL: "https://course-api.com",
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers.common["Accept"] = "application/json";
    console.log("Request sent");
    return request;
  },
  (error) => {
    console.log("Request error");
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    console.log("Response received");

    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      console.log("404 error");
    }

    return Promise.reject(error);
  }
);

export default authFetch;
