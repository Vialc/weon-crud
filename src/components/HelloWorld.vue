<template>
  <div class="movearea">
    <v-banner color="#46bd7b" elevation="15" icon="mdi-vuejs">
      Teste Prático - <span>Processo seletivo WeON</span>
    </v-banner>
    <center>
      <v-card max-width="600" class="mx-2 my-8 px-2">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <center>
              <v-list-item-icon>
                <v-icon v-if="item.icon" color="success">
                  mdi-check
                </v-icon>
              </v-list-item-icon>
            </center>

            <v-list-item-content>
              <v-banner class="pa-0"   height="auto"> {{item.title}} </v-banner>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-card>
    </center>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      items: [
        {
          icon: true,
          title: 'Ter uma tela para listar os cadastros com paginação',
        },
        { icon: true, title: 'Ter uma tela para cadastro/edição dos cadastros' },
        { icon: true, title: 'Ter opção para excluir um cadastro' },
        {
          icon: true,
          title: 'Aplicar validação dos campos obrigatórios nos formulários',
        },
        { icon: true, title: 'Aplicar máscaras nos campos de CPF e CNPJ' },
        { icon: true, title: 'Tela responsiva em diversas resoluções' },
      ],
    }),
  };
</script>

<style >
  .movearea {
    height: 100%;
    background-color: #295eba;
  }
  .v-list-item {
    text-align: start;
  }
</style>