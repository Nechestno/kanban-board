import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '@/entities/user';
import { setCookies } from '@/shared/lib';
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.accessToken && action.payload.refreshToken ) {
      setCookies({ refreshToken: action.payload.refreshToken, accessToken: action.payload.accessToken  });
    } else {
      console.log('accessToken is not available');
    }
  },
});

listenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.accessToken && action.payload.refreshToken) {
      setCookies({refreshToken: action.payload.refreshToken, accessToken : action.payload.accessToken});
    }
  },
});
