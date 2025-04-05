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

  delete(id: number) {
    return apiClient.delete(this.endpoint + '/' + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + '/' + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
export { HttpService };
