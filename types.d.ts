// ============================================================================
//               Types used in Durable Object targeting
// ============================================================================

declare type DOTarget = {
        name?: string;
        idstring?: string;
        id?: DurableObjectId;
    }

declare type DOTargeter = (context: Manifest, targetNS: DurableObjectNamespace) => DOTarget;


// ============================================================================
//               Types for the different runtimes
// ============================================================================

declare type OriginRuntime = {
    handled: OriginMiddleware[];
    handles: (tbh: OriginMiddleware) => OriginMiddleware;
};

declare type DORuntime = {
    name: string;
    targeter: DOTargeter;
    handled: Middleware[];
    handles: (tbh: Middleware) => DOMiddleware;
    alarm: (...middlewares: Middleware[]) => void;
    onCreate: Middleware;
    onReceive: Middleware;
    onRespond: Middleware;
    onWSOpen: Middleware;
    onWSClose: Middleware;
    onWSMessage: Middleware;
    onWSBroadcast: Middleware;
};

declare type D1Runtime = { // Do we want to add an upgrade/rollback path?
    name: string;
    handled: D1Procedure[];
    handles: (tbh: D1Procedure) => D1Procedure;
};

declare type TenexRuntime = OriginRuntime | DORuntime | D1Runtime;


// ============================================================================
//               Types for methods used in each runtime
// TODO: We want the D1Procedure signatures to transfer
// TODO: We want to be able to call any function on any runtime
// NOTE: We only need to type-restrict middleware, other functions are brought
//       in during the bundling process
// ============================================================================

declare type DOMiddleware = (manifest: DOManifest) => never;
declare type D1Procedure = (...params: any[]) => any;
declare type OriginMiddleware = (manifest: Manifest) => void;
declare type Middleware = DOMiddleware | OriginMiddleware;


// ============================================================================
//                            Other useful types
// ============================================================================
declare type HTTPMethod =
    "get" |
    "head" |
    "post" |
    "put" |
    "delete" |
    "connect" |
    "options" |
    "trace" |
    "patch" |
    "any";


// ============================================================================
//             Service types defining Infrastructure as Code
// ============================================================================

declare type ServiceOptions = {
    bundled?: boolean; // usage_model
    routes?: {pattern: string, zone: string}[]; // route / routes
    dev_domain?: boolean; // workers_dev
    kv_namespaces?: {binding: string, id: string, dev_id: string}[] // kv_namespaces
    minify?: boolean; // minify
    r2_buckets?: {binding: string, id: string, dev_id: string}[] // r2_buckets
    static_folder?: {folder: string, include: string[], exclude: string[]};
    live_mock?: boolean; // Create name-mock to test service bindings
    passthroughOnException?: boolean; // ctx.passthroughOnException()
}

declare type Service = {
        [key in HTTPMethod | "cron"]: (stub: string, ...middlewares: Middleware[]) => void
    } & {
        name: string;
        mappings: any;
    } & Required<ServiceOptions>;


// ============================================================================
//                          Middleware input types
// ============================================================================

declare type Manifest = {
    req: {
        url: {
            host: string;
            protocol: string;
            stub: string;
            port: number;
            query: any;
            embed: any; // Embedded parameters
        };
        headers: Headers;
        __raw: string;
        __json: any;
        raw: () => string;
        json: () => any;
        original: Request;
    },

    sesh: {
        id: string;
        ws: WebSocket;
        config: any;
    },

    res: {
        code: number;
        headers: Headers;
        body: any;
        attachWS: (ws: WebSocket) => void;
        wsAttached: boolean;
    }

    kv: any; // An object containing string: KVNamespace mappings

    r2: any; // An object containing string: R2Bucket mappings

    d1: any; // An object containing string: D1Database mappings

    services: any; // Service bindings

    vars: any; // Environment variables

    keepAliveUntil: (promise: Promise<any>) => void;

    serialize: () => string;
    deserialize: (serial: string) => void;
}

declare type DOManifest = Manifest & {
    ram: any;
    storage: DurableObjectStorage;
    DOId: DurableObjectId;
}


/**
 * Build Script Responsibilities:
 * tsconfig
 * rules
 * entry point (main)
 * build
 * account_id
 * node_compat
 * vars
 * migrations
 * service bindings
 * env
 * compatibility_flags
 * compatibility_date
 * dev
 */