/**
 * 捕获http状态码, 并返回给reducer:
 *   + 401
 *   + 不是以2开头
 *   + 以2开头的
 * */

import cookie from 'js-cookie';
import {
  Q_PENDING,
  Q_SUCCESS,
  Q_ERROR,
} from 'constants/common';
import {
  AUTH_USER,
} from 'constants/auth';

function APIError(code, json) {
  this.code = code;
  this.json = json;
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;


export default function inspectorMiddleWare({ dispatch, getState }) {
  return next => action => {
    const { module, promise, payload, onSuccess, onError } = action;
    if (!promise) {
      return next(action);
    }
    next({ ...payload, type: Q_PENDING, module });

    return promise()
      // 捕获非2开头的http状态
      .then((response) => {
        return response.json()
          .then(resJSON => {
            if (!/^2/g.test(response.status)) {
              if (onError) {
                onError(resJSON, dispatch, getState);
              }
              if (response.status === 400) {
                throw new APIError(400, resJSON);
              }
              if (response.status === 401) {
                dispatch({
                  type: AUTH_USER,
                  user: response,
                });
                cookie.remove('sso_id');
                throw new APIError(401, resJSON);
              }
              if (response.status === 403) {
                throw new APIError(403, resJSON);
              }
              if (response.status === 404) {
                throw new APIError(404, resJSON);
              }
              if (response.status === 500) {
                throw new APIError(500, resJSON);
              }
              throw new APIError('uncatched http error', response);
            }
            return resJSON;
          })
          .catch((error) => {
            if (error.code !== 'uncatched http error') {
              next({
                ...payload,
                type: Q_ERROR,
                response: error,
                module,
              });
            }
            throw error;
          });
      })
      // 捕获以2开头的http状态
      .then(resJSON => {
        next({
          ...payload,
          response: resJSON,
          type: Q_SUCCESS,
          module,
        });
        if (onSuccess) {
          onSuccess(resJSON, dispatch, getState);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
