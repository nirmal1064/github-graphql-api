import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const getRequest = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response: AxiosResponse = (await axios.get(url, config)).data;
    return response;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const postRequest = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response: AxiosResponse = (await axios.post(url, data, config)).data;
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
