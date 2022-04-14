<template>
    <v-navigation-drawer>
      <v-list-item id="drawer-header" >
        <v-img lazy-src="https://weon.com.br/wp-content/uploads/2020/09/Logo_WeON_Oficial-1-1.png" max-height="29" max-width="62" src="https://weon.com.br/wp-content/uploads/2020/09/Logo_WeON_Oficial-1-1.png"></v-img>
        <v-list-item-content id="umacoisa">
          <v-list-item-title class="text-h6">
            WeON
          </v-list-item-title>
          <v-list-item-subtitle>
            CRUD de Pessoas
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav rounded>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavDrawer',
    data() {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Cadastrar Pessoas', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      };
    },
    props: {

    }
  };
</script>

<style lang="scss">
  #drawer-header {
    background: #4a4c4e;

    #umacoisa {
        padding-left: 16px;
    }
  }
</style>