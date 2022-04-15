<template>
  <v-app id="inspire">
    <NavDrawer/>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue'
import Footer from './components/Footer.vue'

  export default {
    data: () => ({ 
      }),
    components: {
      NavDrawer,
      Footer
    },
    
  }
</script>