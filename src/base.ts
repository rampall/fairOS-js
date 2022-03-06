import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Config = {
  baseUrl: string;
};

export abstract class Base {
  private axiosInstance: AxiosInstance;

  constructor(config: Config) {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: config.baseUrl,
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  protected async getRequest<T>(endpoint: string, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .get<any, AxiosResponse<T>, any>(endpoint, config)
      .then((result) => result.data)
      .catch((error) => {
        throw error;
      });
  }

  protected async postRequest<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.axiosInstance
      .post<any, AxiosResponse<T>, any>(endpoint, data, config)
      .then((result) => result.data)
      .catch((error) => {
        throw error;
      });
  }

  protected async deleteRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) {
    return this.axiosInstance
      .delete<any, AxiosResponse<T>, any>(endpoint, config)
      .then((result) => result.data)
      .catch((error) => {
        throw error;
      });
  }
}
