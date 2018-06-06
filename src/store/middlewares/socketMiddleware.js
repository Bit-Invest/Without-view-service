import { EMIT, SUBSCRIBE } from './types';

export const socketMiddleware = (io) => {

  return ({getState, dispatch}) => next => action => {
    if (action.payload.socket) {
      const socket = action.payload.socket;
      switch (action.payload.socket.type) {
        case EMIT:
          io.emit(socket.message, socket.payload);
          break;
        case SUBSCRIBE:
          io.on(socket.message, () => {dispatch(socket.actionType)})
          break;
      }
    }
    next(action);
  }
}
