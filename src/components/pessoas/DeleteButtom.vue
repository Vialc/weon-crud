<template>
  <div>
    <v-btn class="rounded-xl" @click="$emit('deletar')">
      <v-icon center color="red darken-3">
        {{ icons.mdiDelete }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
  import { mdiDelete } from '@mdi/js';

  export default {
    name: 'DeleteButton',
    data() {
      return {
        icons: {
          mdiDelete,
        },
      };
    },
    props: ['pessoas'],
    emits: ['deletar'],
  };
</script>