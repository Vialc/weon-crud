<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class="my-8">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            WeON
          </v-list-item-title>
          <v-list-item-subtitle>
            CRUD de Pessoas
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar prominent src="https://weon.com.br/wp-content/uploads/2021/06/Banner_projetos-1.png" alt="Banner da WeON" color="#4a4c4e" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img lazy-src="https://weon.com.br/wp-content/uploads/2020/09/Logo_WeON_Oficial-1-1.png" max-height="115" max-width="175" src="https://weon.com.br/wp-content/uploads/2020/09/Logo_WeON_Oficial-1-1.png"></v-img>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'NavDrawer',
    data() {
      return {
        drawer: null,
        items: [
          { title: 'Pessoas', icon: 'mdi-account-details', to: '/pessoas' },
          {
            title: 'Cadastrar Pessoa',
            icon: 'mdi-account-multiple-plus',
            to: '/cadastrar',
          },
        ],
      };
    },
  };
</script>
