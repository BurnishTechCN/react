 // 提供访问后端的统一接口
import _ from 'lodash';
import cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import { SERVER_URL } from 'config';

export const post = (uri, data = {}, option = {}) => {
  const token = cookie.get('o_jwt_id');
  const options = _.assign({
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  }, option);
  return fetch(`${SERVER_URL}${uri}`, options);
};

export const get = (uri) => {
  const token = cookie.get('o_jwt_id');
  return fetch(`${SERVER_URL}${uri}`, {
    method: 'get',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  });
};
