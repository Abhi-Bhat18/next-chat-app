import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // withCredentials: true,
});

const getToken = () => localStorage.getItem("token");

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const fetchData = async (
  url: string,
  method: METHODS,
  isAuthenticated: boolean,
  body?: {},
  config?: AxiosRequestConfig<any>
) => {
  let configObj = {
    ...config,
  };
  if (isAuthenticated) {
    configObj = {
      ...configObj,
      headers: {
        ...configObj?.headers,
        Authorization: `Bearer ${getToken()}`,
      },
    };
  }

  switch (method) {
    case "GET": {
      return axiosInstance.get(url, configObj);
    }
    case "POST": {
      return axiosInstance.post(url, body, configObj);
    }
    case "PUT": {
      return axiosInstance.put(url, body, configObj);
    }
    case "DELETE": {
      return axiosInstance.delete(url, configObj);
    }
  }
};

export default axiosInstance;
