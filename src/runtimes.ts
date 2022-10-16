export const DORuntime = (name: string, targeter: DOTargeter): DORuntime => {
    let runtime: DORuntime = {
        name: name,
        targeter: targeter,
        handled: [],
        handles: (tbh: Middleware) => {
            runtime.handled.push(tbh);
            return tbh as DOMiddleware;
        },
        alarm: undefined,
        onCreate: undefined,
        onReceive: undefined,
        onRespond: undefined,
        onWSOpen: undefined,
        onWSClose: undefined,
        onWSMessage: undefined,
        onWSBroadcast: undefined
    };
    return runtime;
}

export const D1Runtime = (name: string): D1Runtime => {
    let runtime: D1Runtime = {
        name: name,
        handled: [],
        handles: (tbh: D1Procedure) => {
            runtime.handled.push(tbh);
            return tbh as D1Procedure
        }
    };
    return runtime;
}

export const Origin: OriginRuntime = {
    handled: [],
    handles: (tbh: OriginMiddleware) => {
        Origin.handled.push(tbh);
        return tbh as OriginMiddleware;
    }
}