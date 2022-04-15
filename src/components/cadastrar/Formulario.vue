<template>
<center>
  <div>
    <v-overlay v-if="loading === true"></v-overlay>
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      class="mx-auto"
      indeterminate
      v-if="loading === true"
    ></v-progress-circular>
    <center>
    <v-radio-group id="radio-container"   v-model="radios" mandatory>
      
      <template v-slot:label>
        <center>
        <div><strong>Selecione o tipo de cadastro que deseja utilizar</strong></div>
        </center>
      </template>
      
      <v-radio value="CPF:">
        <template v-slot:label>
          <div>Pessoa Física</div>
        </template>
      </v-radio>
      <v-radio value="CNPJ:">
        <template v-slot:label>
          <div>Pessoa Jurídica</div>
        </template>
      </v-radio>
    </v-radio-group>
    </center>
    <v-form  ref="form" id="form-container" class="pa-4" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>

      <ValidaCPF v-if="radios === 'CPF:'" />
      <ValidaCNPJ v-else-if="radios === 'CNPJ:'" />

      <div>
        <v-switch v-model="ex11" label="Deseja Cadastrar uma foto?" color="indigo darken-3" value="yes" hide-details></v-switch>
        <div class="avatar-container" v-if="ex11 === 'yes'">
          <v-list-item-avatar size="62">
            <div>
              <v-img v-if="url" :src="url"></v-img>
              <v-avatar v-else color="indigo">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </div>
          </v-list-item-avatar>
          <div id="avatar-url-field">
            <v-text-field v-model="url" placeholder="Coloque a URL da imagem"></v-text-field>
          </div>
        </div>
      </div>

      <v-btn v-if="!atualiza" :disabled="!valid" color="success" class="mr-4 mt-2" @click="validate">
        Cadastrar
      </v-btn>
      <v-btn v-else-if="atualiza" :disabled="!valid" color="success" class="mr-4 mt-2" @click="validateput">
        Atualizar
      </v-btn>

      <v-btn color="warning" class="mr-4 mt-2" @click="reset">
        Limpar Formulário
      </v-btn>
    </v-form>
    <v-snackbar
      v-model="snackbarcadastrar"
      :timeout="timeout"
    >
      {{ textcadastrar }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </center>
</template>

<script>
  import ValidaCPF from './ValidaCPF.vue';
  import ValidaCNPJ from './ValidaCNPJ.vue';

  export default {
    name: 'Formulario',
    data: () => ({
      snackbarcadastrar: false,
      textcadastrar: 'Pessoa Cadastrada com Sucesso',
      timeout: 2000,
      loading: false,
      url: '',
      ex11: 'indigo darken-3',
      radios: null,
      valid: true,
      name: '',
      nameRules: [(v) => !!v || 'Name is required'],
      pessoa: {
        avatar: '',
        typedoc: '',
        name: '',
        document: '',
        id: '',
      },
    }),
    props: ['valor', 'atualiza', 'id'],
    methods: {
      validate() {
        this.$refs.form.validate();
        {this.radios === 'CPF:' ? (this.pessoa.document = this.$store.state.cpfdocumentCache) : (this.pessoa.document = this.$store.state.cnpjdocumentCache) }
        this.pessoa.avatar = this.url
        this.pessoa.typedoc = this.radios;
        this.pessoa.name = this.name;
        this.$store.dispatch('cadastrarPessoa', this.pessoa);
        this.mensagem();

        this.reset()
      },
      validateput() {
        this.$refs.form.validate();
        {this.radios === 'CPF:' ? (this.pessoa.document = this.$store.state.cpfdocumentCache) : (this.pessoa.document = this.$store.state.cnpjdocumentCache) }
        this.pessoa.avatar = this.url
        this.pessoa.typedoc = this.radios;
        this.pessoa.name = this.name;
        this.pessoa.id = this.id
               
        this.$store.dispatch('atualizarPessoa', this.pessoa);
        this.mensagem();
        this.reset()
      },
      reset() {
        this.$refs.form.reset();
      },
      async mensagem() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.snackbarcadastrar = true;
        }, 3000);
      }
    },
    components: {
      ValidaCPF,
      ValidaCNPJ,
    },
  };
</script>

<style>
  .avatar-container {
    display: flex;
  }

  #avatar-url-field {
    width: 80%;
    max-width: 613px;
  }
  #form-container,
  #radio-container {
    max-width: 480px;
  }
  .v-input {
    max-width: 480px;
  }
</style>