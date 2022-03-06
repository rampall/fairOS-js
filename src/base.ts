import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

type Config = {
  baseUrl: string;
  username: string;
  password: string;
};

export abstract class Base {
  private baseUrl: string;
  private username: string;
  private password: string;
  private axiosInstance: AxiosInstance;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl;
    this.username = config.username;
    this.password = config.password;

    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: config.baseUrl,
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  protected async getRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .get(endpoint, config)
      .then((result) => result.data)
      .catch((error) => {
        throw error;
      });
  }

  protected async postRequest<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .post(endpoint, data, config)
      .then((result) => result.data)
      .catch((error) => {
        throw error;
      });
  }
}
