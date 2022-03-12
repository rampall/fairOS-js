import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Config = {
  providerUrl: string;
  authCookie?: string;
};

export abstract class Request {
  private axiosInstance: AxiosInstance;
  public readonly providerUrl: string;

  constructor({ providerUrl, authCookie = "" }: Config) {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: providerUrl,
      headers: {
        "Content-type": "application/json",
        Cookie: authCookie,
      },
    });
    this.providerUrl = providerUrl;
  }

  private setCookies(cookies: string[] | undefined) {
    if (!cookies) return;

    this.axiosInstance.defaults.headers.common["Cookie"] = cookies[0];
  }

  protected async getRequest<T>(endpoint: string, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .get<any, AxiosResponse<T>, any>(endpoint, config)
      .then((response) => {
        const cookies = response.headers["set-cookie"];
        this.setCookies(cookies);

        return {
          ...response.data,
          cookies: cookies ? cookies[0] : undefined,
        };
      })
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
      .then((response) => {
        const cookies = response.headers["set-cookie"];
        this.setCookies(cookies);

        return {
          ...response.data,
          cookies: cookies ? cookies[0] : undefined,
        };
      })
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
      .then((response) => {
        const cookies = response.headers["set-cookie"];
        this.setCookies(cookies);

        return {
          ...response.data,
          cookies: cookies ? cookies[0] : undefined,
        };
      })
      .catch((error) => {
        throw error;
      });
  }
}
