import httpClient from '@/core/plugins/http-client';

const apiRoute = '/api/User';

export async function GetUserData() {
  const result = await httpClient
    .get(`${apiRoute}/GetUserData`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error?.response?.data?.message || 'Ошибка получения данных пользователя');
    });

  return result;
}

export async function GetUserById(id) {
  const result = await httpClient
    .get(`${apiRoute}/GetById/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error?.response?.data?.message || 'Ошибка получения данных пользователя');
    });

  return result;
}
