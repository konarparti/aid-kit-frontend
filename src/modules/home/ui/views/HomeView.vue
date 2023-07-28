<template>
  <v-container color style="max-width: 1400px" class="text-left pa-5 mx-auto" fluid>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h6 text-sm-h5 font-weight-bold">Список лекарств</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn small tile depressed color="main-color" class="white--text mr-2" @click="showCreateModal = true">
              Добавить
              <v-icon right dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <template v-if="!medicines.length">
              <p>Записи отсутствуют</p>
            </template>
            <template v-else>
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">Идентификатор</th>
                      <th class="text-center">Название</th>
                      <th class="text-center">Тип</th>
                      <th class="text-center">Применение</th>
                      <th class="text-center">Количество</th>
                      <th class="text-center">Срок годности</th>
                      <th class="text-center">Наличие</th>
                      <th class="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="medicine in medicines" :key="medicine.id" class="text-center">
                      <td>{{ medicine.id }}</td>
                      <td>{{ medicine.name }}</td>
                      <td>{{ medicine.typeMedicineName }}</td>
                      <td>{{ medicine.painKindName }}</td>
                      <td>{{ medicine.amount }}</td>
                      <td :class="checkDate(medicine.expired)">
                        {{ new Date(medicine.expired).toLocaleDateString() }}
                      </td>
                      <td>
                        <v-icon>{{ medicine.available ? checkIcon : uncheckIcon }}</v-icon>
                      </td>
                      <td>
                        <v-btn v-ripple="false" title="Изменить" plain small icon @click="clickUpdateModal(medicine)">
                          <v-icon>mdi-18px mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn v-ripple="false" title="Удалить" plain small icon @click="clickDeleteModal(medicine)">
                          <v-icon>mdi-18px mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <SidebarModal v-model="showCreateModal" title="Добавить лекарство"> </SidebarModal>
    <SidebarModal v-model="showUpdateModal" title="Изменить лекарство"> </SidebarModal>
    <CenterModal :is-open="showDeleteModal" title="Удалить лекарство" @close="showDeleteModal = false"> </CenterModal>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import ALERT_TYPES from '@/modules/alert/constants/alert-types';
import { GetAllMedicine } from '../../repositories/medicine-repository';
import { GetUserData } from '../../../user/repositories/user-repository';

export default {
  name: 'HomeView',

  data() {
    return {
      showCreateModal: false,
      showUpdateModal: false,
      showDeleteModal: false,

      checkIcon: 'mdi-24px mdi-check',
      uncheckIcon: 'mdi-24px mdi-close',

      medicines: [],
      currentMedicine: null,
    };
  },
  created() {
    this.fetchMedicines();
  },
  methods: {
    ...mapMutations('alert', ['ADD_ALERT']),
    ...mapMutations('preloader', ['ADD_LOADER', 'REMOVE_LOADER']),

    async fetchMedicines() {
      try {
        this.ADD_LOADER();
        const user = await GetUserData();
        this.medicines = await GetAllMedicine(user.id);
      } catch (error) {
        this.ADD_ALERT({ type: ALERT_TYPES.ERROR, text: error.message });
      } finally {
        this.REMOVE_LOADER();
      }
    },

    checkDate(date) {
      const now = new Date();
      const expired = new Date(date);
      if (expired < now) return 'red--text';
      return 'green--text';
    },

    clickUpdateModal(medicine) {
      this.showUpdateModal = true;
    },

    clickDeleteModal(medicine) {
      this.showDeleteModal = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
