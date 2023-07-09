<template>
  <v-container fluid>
    <ValidationObserver ref="login-form" v-slot="{ handleSubmit }">
      <v-row align="center" style="height: 100vh">
        <v-col cols="12" class="d-flex justify-center">
          <v-sheet class="pa-7" width="600" color="white" elevation="3">
            <v-row class="mb-2">
              <v-col cols="12">
                <h1>Авторизация</h1>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field
                    v-model="controls.email"
                    :error-messages="errors"
                    outlined
                    color="primary1"
                    label="Введите Логин" />
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field
                    v-model="controls.password"
                    :error-messages="errors"
                    outlined
                    color="primary1"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    label="Введите Пароль"
                    @click:append="() => (showPassword = !showPassword)" />
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12">
                <v-btn depressed tile class="white--text" color="main-color" @click="handleSubmit(onSubmit)">
                  Войти
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

import ALERT_TYPES from '@/modules/alert/constants/alert-types';
import { Login } from '../../repositories/auth-repository';

export default {
  name: 'LoginView',

  data() {
    return {
      showPassword: false,

      controls: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    ...mapMutations('alert', ['ADD_ALERT']),
    ...mapMutations('preloader', ['ADD_LOADER', 'REMOVE_LOADER']),
    ...mapMutations('auth', ['SET_AUTH_DATA']),

    async onSubmit() {
      try {
        this.ADD_LOADER();

        const user = await Login({ login: this.controls.email, password: this.controls.password });

        this.SET_AUTH_DATA(user);

        this.$router.push({ name: 'home' });
      } catch (error) {
        this.ADD_ALERT({ type: ALERT_TYPES.ERROR, text: error.message });
      } finally {
        this.REMOVE_LOADER();
      }
    },
  },
};
</script>
