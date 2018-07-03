import { EMIT, SUBSCRIBE, UNSUBSCRIBE_ALL } from './types';

export const socketMiddleware = (io) => {

  return ({getState, dispatch}) => next => action => {
    if (action.payload && action.payload.socket) {
      const socket = action.payload.socket;
      switch (action.payload.socket.type) {
        case EMIT:
          io.emit(
            socket.message,
            socket.payload,
            (res) => {dispatch({type: `${action.type}_SUCCESS`, payload: res})}
          );
          break;
        case SUBSCRIBE:
          io.on(
            socket.message,
            socket.payload.callback
          );
          break;
        case UNSUBSCRIBE_ALL:
          io.removeAllListeners(socket.message);
          break;
        default:
          break;
      }
    }
    next(action);
  }
}
