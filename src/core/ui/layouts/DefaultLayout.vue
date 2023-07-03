<template>
  <div>
    <v-navigation-drawer
      v-model="openMenu"
      color="main-color"
      app
      :mini-variant="isMobileMode ? false : !GET_MENU_STATUS"
      :width="isMobileMode ? '100%' : 256"
      :permanent="!isMobileMode"
      :temporary="isMobileMode">
      <DrawerNavigation
        :is-open="isMobileMode ? false : !GET_MENU_STATUS"
        :nav-items="navItems"
        @toggle:menu="TOGGLE_MENU" />
    </v-navigation-drawer>

    <v-app-bar elevation="1" height="56" max-height="56" min-height="56" color="white" app>
      <template v-if="isMobileMode">
        <v-app-bar-nav-icon @click="TOGGLE_MENU">
          <v-icon color="primary1">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </template>

      <!-- <AppLogo /> -->

      <v-spacer></v-spacer>

      <v-btn tile depressed small class="white--text" color="main-color"> Выйти </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import DrawerNavigation from '@/core/ui/components/DrawerNavigation.vue';

export default {
  name: 'DefaultLayout',

  components: {
    DrawerNavigation,
  },

  data() {
    return {
      navItems: [
        {
          title: 'Главная',
          icon: 'mdi-account-supervisor',
          link: '/',
        },
        {
          title: 'О проекте',
          icon: 'mdi-file-link-outline',
          link: '/about',
        },
      ],
    };
  },

  computed: {
    ...mapGetters(['GET_MENU_STATUS']),

    isMobileMode() {
      return this.$vuetify.breakpoint.width < 768;
    },

    openMenu: {
      get() {
        return this.GET_MENU_STATUS;
      },
      set(value) {
        this.SET_STATUS(value);
      },
    },
  },
  created() {
    if (this.isMobileMode) {
      this.SET_STATUS(false);
    }
  },

  methods: {
    ...mapMutations(['TOGGLE_MENU', 'SET_STATUS']),
  },
};
</script>

<style lang="scss" scoped></style>
