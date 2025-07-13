import apiClient from './api-client';

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getOdd<T>(url: string) {
    const controller = new AbortController();

    const request = apiClient.get<T>(this.endpoint + url, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint + '/all', {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number, url = '') {
    return apiClient.delete(`${this.endpoint}${url}/${String(id)}`);
  }

  create<T, U>(entity: T, url?: string) {
    if (url) return apiClient.post<U>(this.endpoint + url, entity);

    return apiClient.post<U>(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + '/' + entity.id, entity);
  }

  patch<T, U>(entity: T, url: string) {
    return apiClient.patch<U>(this.endpoint + url, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
export { HttpService };
