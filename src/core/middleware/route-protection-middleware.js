import store from '@/store';

import ALERT_TYPES from '@/modules/alert/constants/alert-types';

import { GetUserData } from '@/modules/user/repositories/user-repository';

export default async function checkProtection(to, from, next) {
  const storeUser = store.getters['auth/GET_USER_DATA'];

  if (!storeUser) {
    try {
      const user = await GetUserData();

      store.commit('auth/SET_AUTH_DATA', user);

      return next();
    } catch (error) {
      store.commit('alert/ADD_ALERT', { type: ALERT_TYPES.ERROR, text: error.message });
      return next({
        name: 'login',
      });
    }
  } else {
    return next();
  }
}
