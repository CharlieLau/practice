export class InterceptorManager {
    interceptors;
    constructor() {
        this.interceptors = [];
    }
    use(resolved, rejected) {
        this.interceptors.push({
            resolved,
            rejected
        });
        return this.interceptors.length - 1;
    }
    eject(id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}
