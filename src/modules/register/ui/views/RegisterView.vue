<template>
  <v-container fluid>
    <ValidationObserver ref="login-form" v-slot="{ handleSubmit }">
      <v-row align="center" style="height: 100vh">
        <v-col cols="12" class="d-flex justify-center">
          <v-card class="rounded-lg">
            <v-sheet class="pa-7" width="600" color="white">
              <v-row class="mb-2">
                <v-col cols="12" class="text-center">
                  <h1>Регистрация</h1>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="controlsReg.fullName"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      label="Имя" />
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="controlsReg.email"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      label="Логин"
                      autocomplete="new-password" />
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required" vid="password">
                    <v-text-field
                      v-model="controlsReg.password"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      :type="showPasswordReg ? 'text' : 'password'"
                      :append-icon="showPasswordReg ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      label="Пароль"
                      autocomplete="new-password"
                      @click:append="() => (showPasswordReg = !showPasswordReg)" />
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" rules="required|confirmed:password">
                    <v-text-field
                      v-model="controlsReg.passwordAgain"
                      :error-messages="errors"
                      outlined
                      color="main-color"
                      :type="showPasswordRegAgain ? 'text' : 'password'"
                      :append-icon="showPasswordRegAgain ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      label="Подтверждение пароля"
                      @click:append="() => (showPasswordRegAgain = !showPasswordRegAgain)" />
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-center">
                  <div>
                    <v-btn
                      depressed
                      tile
                      class="white--text"
                      color="background-color"
                      @click="handleSubmit(onSubmitRegister)">
                      Зарегистрироваться
                    </v-btn>
                    <v-btn depressed tile class="white--text mx-5" color="background-color" :to="'/login'">
                      Назад
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
export default {
  name: 'RegisterView',

  data() {
    return {
      showPasswordReg: false,
      showPasswordRegAgain: false,

      controlsReg: {
        fullName: null,
        email: null,
        password: null,
        passwordAgain: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
