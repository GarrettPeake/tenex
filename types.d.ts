
// Targeter types
declare type DOTargeter = any;
declare type D1Targeter = any;

// Handler types
declare type DOHandler = any;
declare type D1Handler = any;
declare type OriginHandler = any;
declare type Handler = DOHandler | D1Handler | OriginHandler;

// Executor types
declare type DOExecutor = {
    targeter: DOTargeter;
    handles: (tbh: DOHandler) => DOHandler;
};
declare type D1Executor = {
    handles: (tbh: D1Handler) => DOHandler;
    targeter: D1Targeter;
};
declare type OriginExecutor = {
    handles: (tbh: OriginHandler) => DOHandler;
};
declare type Executor = DOExecutor | D1Executor | OriginExecutor;

// Other types
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

declare type Service = {
    [key in HTTPMethod]: (stub: string, ...handlers: Handler[]) => void
    } & {
    executors: Executor[];
    preHandlers: Handler[];
    postHandlers: Handler[];
}