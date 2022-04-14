<template>
  <div id="line-item">
    <v-list-item-avatar>
      <v-img :src="pessoas.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title> {{pessoas.name}}</v-list-item-title>
      <v-list-item-subtitle>{{pessoas.typedoc}}</v-list-item-subtitle>
      <v-list-item-subtitle>{{pessoas.document}}</v-list-item-subtitle>
    </v-list-item-content>
    <EditButtom :pessoasid="pessoas._id" @atualizar="$emit('atualizar')" class="pa-2" />
    <DeleteButtom @deletar="deletarPessoa(pessoas._id) && $emit('atualizardel')" />
  </div>
</template>

<script>
  import DeleteButtom from './DeleteButtom.vue';
  import EditButtom from './EditButtom.vue';

  export default {
    name: 'ItemPessoa',
    props: ['pessoas'],
    data() {
      return {
        _id: '',
        attrs: false,
        on: false,
      };
    },
    components: {
      DeleteButtom,
      EditButtom,
    },
    methods: {
      editarPessoa() {
        console.log('editando');
      },
      async deletarPessoa(_id) {
        const req = await fetch(
          `http://localhost:3000/box_5189bd45fb5b962bb02f/${_id}`,
          {
            method: 'DELETE',
          },
        );
        const res = await req.json();
        console.log(res);
      },
      editOn() {
        this.attrs = true;
        this.on = true;
      },
    },
    emits: ['atualizardel', 'atualizar'],
  };
</script>

<style>
  #line-item {
    display: flex;
    width: 100%;
  }
</style>