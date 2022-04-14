<template>
  <div>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
    <v-btn class="rounded-xl" v-bind="attrs"
            v-on="on" >
      <v-icon center color="primary">
        {{ icons.mdiPencil }}
      </v-icon>
    </v-btn>
    </template>
        <template v-slot:default="dialog">
          <v-card>
            <Formulario :atualiza="true" :id="pessoasid" />
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false; $emit('atualizar')"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </div>
</template>

<script>
  import { mdiPencil } from '@mdi/js';
  import Formulario from '../cadastrar/Formulario.vue';

  export default {
    name: 'EditButton',
    data() {
      return {
        icons: {
          mdiPencil,
        },
      };
    },
    props: ['pessoasid'],
    components: {
      Formulario
    },
    emits: ['atualizar']
  };
</script>