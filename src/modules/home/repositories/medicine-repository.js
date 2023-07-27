import httpClient from '@/core/plugins/http-client';

const apiRoute = '/api/Medicine';

export async function GetAllMedicine(id) {
  const result = await httpClient
    .get(`${apiRoute}/GetAllByUserId/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error?.response?.data?.message || 'Ошибка получения списка лекарств');
    });

  return result;
}
