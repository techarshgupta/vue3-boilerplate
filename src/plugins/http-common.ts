import router from '@/router';
import _axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios';
import { Data } from './http.types';

// var is responsible for the base URL of the axios
let baseURL: string;

/**
 * switch case to choose the base URL for axios request config
 */
switch (process.env.VUE_APP_BUILD) {
  case 'production':
    baseURL = 'https://www.google.com/';
    break;
  case 'uat':
    baseURL = 'https://www.google.com/';
    break;
  case 'development':
    baseURL = 'https://www.google.com/';
    break;
  default:
    baseURL = 'https://www.google.com/';
    break;
}

export class Axios {
  protected readonly instance: AxiosInstance;
  protected setAuthHeader = false;
  public constructor() {
    this.instance = _axios.create({
      baseURL,
      timeout: 3000, // indicates, 3000ms ie. 3 second
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  /**
   * Initialize request interceptor is used to takeover the request
   * to customize the headers of the axios request.
   */
  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest, this._handleErrors);
  };

  /**
   * Handle request is used to overwrite the headers
   * of axios request config
   * @param config
   * @returns {AxiosRequestConfig}
   */
  private _handleRequest = (config: AxiosRequestConfig) => {
    if (this.setAuthHeader) {
      // config.headers['Authorization'] = this._getAuthToken();
      config.headers['Authorization'] = 'Bearer ...';
      return config;
    }
    return config;
  };

  /**
   * Initialize response interceptor is used to takeover the response
   * to customize the response and body of the axios response.
   */
  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse);
  };

  private _handleResponse = (response: AxiosResponse) => {
    switch (response.status) {
      case 200:
        // yay!
        break;
      // any other cases
      default:
      // default case
    }
    return response;
  };

  // private _getAuthToken = () => localStorage.getItem('token');
  /**
   * Handle errors is used to handle all the axios request errors
   * @param {AxiosError} error
   */
  private _handleErrors = (error: AxiosError) => {
    // all the error responses
    const status: number = error.response && error.response ? error.response.status : 400;
    switch (status) {
      case 400:
        console.error(status, error.message);
        console.error('Nothing to display', 'Data Not Found');
        break;
      case 401: // authentication error, logout the user
        console.error(status, error.message);
        console.error('Please login again', 'Session Expired');
        router.replace('/login');
        break;
      case 404:
        console.error(status, error.message);
        console.error('Nothing to display', 'Page Not Found');
        break;
      case 500:
        console.error(status, error.message);
        console.error('Please try again after sometime!');
        break;
      default:
        console.error(status, error.message);
        break;
    }
  };

  /**
   * Request method to call axios.
   *
   * @access public
   * @param {Method} type - request type.
   * @param {string} url - endpoint you want to reach.
   * @param {boolean} isAuth - request with authorization header or not
   * @param {object} data - request payload.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Axios
   *
   */

  async request(type: Method, url: string, isAuth: boolean, data?: Data): Promise<AxiosResponse> {
    this.setAuthHeader = isAuth;
    try {
      let response: AxiosResponse;
      switch (type) {
        case 'get':
          response = await this.instance.get(url, { params: data });
          break;
        case 'post':
          response = await this.instance.post(url, data);
          break;
        case 'put':
          response = await this.instance.put(url, { params: data });
          break;
        case 'patch':
          response = await this.instance.patch(url, { params: data });
          break;
        case 'delete':
          response = await this.instance.delete(url, { params: data });
          break;
        default:
          response = await this.instance.get(url, { params: data });
          break;
      }
      return response && response.data ? response.data : response;
    } catch (error) {
      this._handleErrors(error);
      return Promise.reject(error);
    }
  }
}
