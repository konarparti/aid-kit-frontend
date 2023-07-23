<template>
  <v-container fluid>
    <ValidationObserver ref="login-form" v-slot="{ handleSubmit }">
      <v-row align="center" style="height: 100vh">
        <v-col cols="12" class="d-flex justify-center">
          <v-card class="rounded-lg">
            <v-sheet class="pa-7" width="600" color="white">
              <v-row class="mb-2">
                <v-col cols="12" class="text-center">
                  <h1>Авторизация</h1>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="controlsAuth.email"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      label="Логин" />
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="controlsAuth.password"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      label="Пароль"
                      @click:append="() => (showPassword = !showPassword)" />
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-center">
                  <div>
                    <v-btn
                      depressed
                      tile
                      class="white--text mx-5"
                      color="background-color"
                      @click="handleSubmit(onSubmitAuth)">
                      Войти
                    </v-btn>
                    <v-btn depressed tile class="white--text mx-5" color="background-color" :to="'/register'">
                      Регистрация
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

import ALERT_TYPES from '@/modules/alert/constants/alert-types';
import { Login, Register } from '../../repositories/auth-repository';

export default {
  name: 'LoginView',

  data() {
    return {
      tab: null,
      items: ['auth', 'register'],
      showPassword: false,
      showPasswordReg: false,
      showPasswordRegAgain: false,

      controlsAuth: {
        email: null,
        password: null,
      },

      controlsReg: {
        fullName: null,
        email: null,
        password: null,
        passwordAgain: null,
      },
    };
  },

  methods: {
    ...mapMutations('alert', ['ADD_ALERT']),
    ...mapMutations('preloader', ['ADD_LOADER', 'REMOVE_LOADER']),
    ...mapMutations('auth', ['SET_AUTH_DATA']),

    async onSubmitAuth() {
      try {
        this.ADD_LOADER();

        const user = await Login({ login: this.controlsAuth.email, password: this.controlsAuth.password });

        this.SET_AUTH_DATA(user);

        this.$router.push({ name: 'home' });
      } catch (error) {
        this.ADD_ALERT({ type: ALERT_TYPES.ERROR, text: error.message });
      } finally {
        this.REMOVE_LOADER();
      }
    },

    async onSubmitRegister() {
      try {
        this.ADD_LOADER();

        const user = await Register({
          fullName: this.controlsReg.fullName,
          login: this.controlsReg.email,
          password: this.controlsReg.password,
        });

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
