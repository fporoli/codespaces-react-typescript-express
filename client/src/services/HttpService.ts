import ApiClient from "./ApiClient";

class HttpService {
    endPoint: string;

    constructor(endPoint: string) {
        this.endPoint = endPoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = ApiClient.get<T[]>(this.endPoint, { signal: controller.signal });
        return { request, cancel: () => controller.abort() }
    }

    get<T>(itemId: number) {
        return ApiClient.get<T>(this.endPoint + "/" + itemId);
    }

    delete<T>(id: number) {
        return ApiClient.delete<T>(this.endPoint + "/" + id);
    }

    create<T>(entity: T) {
        return ApiClient.post<T>(this.endPoint, entity);
    }

    update<T>(id: number, entity: T) {
        return ApiClient.put<T>(this.endPoint + "/" + id, entity)
    }

    reset<T>() {
        return ApiClient.patch<T>(this.endPoint);
    }
}

function create(endPoint: string) {
    return new HttpService(endPoint);
}

export default create;