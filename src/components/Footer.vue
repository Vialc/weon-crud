<template>
    <v-footer elevation="16"
      v-bind="localAttrs"
      :padless="padless"
    >
      <v-card
        flat
        tile
        width="100%"
        class="red lighten-1 text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            :to="icon.to"
            class="mx-4"
            icon
          >
            <v-icon size="24px"> 
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vitor Alcântara</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        {icon: 'mdi-home', to: '/'},
        {icon: 'mdi-account-details', to: '/pessoas'},
        {icon: 'mdi-account-multiple-plus', to: '/cadastrar'},
        {icon: 'mdi-github', to: 'https://github.com/vialc'}
      
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: true,
      variant: 'fixed',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>