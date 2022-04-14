<template>
  <div>
    <v-overlay v-if="loading === true"></v-overlay>
    <v-progress-circular :size="70" :width="7" color="purple" class="mx-auto" indeterminate v-if="loading === true"></v-progress-circular>
    <v-list three-line>
      <template>
        <v-subheader>Pessoas Cadastradas</v-subheader>
        <v-list-item id="item-content" v-for="pessoa, index in limiter" :key="index">
          <ItemPessoa :pessoas="pessoa" @atualizardel="refreshPage()" @atualizar="refresh()" />
        </v-list-item>

      </template>
    </v-list>
    <v-snackbar v-model="snackbardel" :timeout="timeout">
      {{ textdel }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div>
      <Pagination
      v-if="pessoas.length"
      :offset="offset"
      :total="total"
      :limit="limit"
      @change-page="changePage"
    />
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination.vue';
  import ItemPessoa from './ItemPessoa.vue';

  export default {
    name: 'Pessoas',
    data: () => ({
      pessoas: [],
      loading: false,
      snackbardel: false,
      textdel: 'Deletado com sucesso',
      timeout: 2000,
      offset: 0,
      total: 0,
      limit: 5,
      limiter: []
    }),
    components: {
      ItemPessoa,
      Pagination,
    },
    methods: {
      changePage(value) {
      this.offset = value;
      this.listarPessoas();
    },
      async listarPessoas() {
        const req = await fetch(
          `http://localhost:3000/box_5189bd45fb5b962bb02f/`,
        );
        const data = await req.json();
        console.log(data)
        this.pessoas = data;
        this.total = data.length
        this.updateLimiter();
      },
      async refreshPage() {
        this.loading = true;
        setTimeout(() => {
          this.listarPessoas();
          this.loading = false;
          this.snackbardel = true;
        }, 3000);
      },
      async refresh() {
        this.loading = true;
        setTimeout(() => {
          this.listarPessoas();
          this.loading = false;
        }, 3000);
      },
      updatePage(pageNumber){
        this.offset = pageNumber;
        this.updateLimiter();
      },
      updateLimiter() {
        this.limiter = this.pessoas.slice(this.offset * this.limit, (this.offset * this.limit) + this.limit)

        if (this.limiter.length === 0 && this.offset > 0) {
          this.updatePage(this.offset - 1);
        };
      }
    },
    mounted() {
      this.listarPessoas();
    },
  };
</script>{
        
       
      },

<style scoped>
  #item-content {
    border-bottom: solid 1px #222;
    border-radius: 0 0 0 25px;

    max-width: 600px;
    margin-left: 16px;
  }
</style>