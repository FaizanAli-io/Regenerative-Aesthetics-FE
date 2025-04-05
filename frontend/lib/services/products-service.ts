import create from './http-service';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  category: {
    id: number;
    title: string;
    description: string;
  };
}

export interface DBProduct {
  totalProducts: number;
  limit: number;
  products: Product[];
}

interface Entity {
  id: number;
}

// class ProductsService<Product> extends HttpService {
//   getAll<Product>() {
//     const controller = new AbortController();

//     const request = apiClient.get<Product[]>(this.endpoint + '/all', {
//       signal: controller.signal,
//     });

//     return { request, cancel: () => controller.abort() };
//   }

// }

//   endpoint: string;

//   constructor(endpoint: string) {
//     this.endpoint = endpoint;
//   }

//   getAll<T>() {
//     const controller = new AbortController();

//     const request = apiClient.get<T[]>(this.endpoint + '/all', {
//       signal: controller.signal,
//     });

//     return { request, cancel: () => controller.abort() };
//   }

//   delete(id: number) {
//     return apiClient.delete(this.endpoint + '/' + id);
//   }

//   create<T>(entity: T) {
//     return apiClient.post(this.endpoint, entity);
//   }

//   update<T extends Entity>(entity: T) {
//     return apiClient.patch(this.endpoint + '/' + entity.id, entity);
//   }
// }

export default create('/products');
