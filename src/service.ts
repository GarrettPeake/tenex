function stubber(service: Service, method: HTTPMethod | "cron"): (stub: string, ...handlers: Middleware[]) => void{
    return (stub: string, ...handlers: Middleware[]) => {
        service.mappings[method].push([[stub, ...handlers]]);
    }
}


export const Service = (name: string, runtimes: TenexRuntime[], options: ServiceOptions): Service => {
    return {
        name: name,
        bundled: options.bundled || false,
        routes: options.routes,
        dev_domain: options.dev_domain || true,
        kv_namespaces: options.kv_namespaces,
        minify: options.minify || true,
        r2_buckets: options.r2_buckets,
        static_folder: options.static_folder,
        live_mock: options.live_mock || false,
        passthroughOnException: options.passthroughOnException || false,
        runtimes: runtimes,
        mappings: {},
        get: stubber(this, "get"),
        head: stubber(this, "head"),
        post: stubber(this, "post"),
        put: stubber(this, "put"),
        delete: stubber(this, "delete"),
        connect: stubber(this, "connect"),
        options: stubber(this, "options"),
        trace: stubber(this, "trace"),
        patch: stubber(this, "patch"),
        any: stubber(this, "any"),
        cron: stubber(this, "cron")
    } as Service;
};