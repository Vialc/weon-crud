<template>
  <div>
    <v-text-field type="text" v-mask="'###.###.###-##'"  v-model="valor" label="CPF" :rules="cpfRules" required @change="verificarCPF(); cpfToCache()">
  
    </v-text-field>
   
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'

  export default {
    name: 'ValidaCPF',
    data() {
      return {
        valor: '',
        valido: false,
        formatado: false,
        cpfRules: [(v) => !!v || 'Preencha o CPF'],
      };
    },
    directives: {mask},
    emits: ['newcpf'],
    methods: {
      cpfToCache() {
        this.$store.dispatch('cpfCache', this.valor)
      },
      verificarCPF() {
        this.formatado = this.formataCPF(this.valor);
        if (this.formatado) {
          this.valor = this.formatado;
          this.cpfRules = []
        } else {
          this.cpfRules = ['CPF Inválido!'];
        }
      },

      verificaCpf(valor) {
        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        // Verifica CPF
        if (valor.length === 11) {
          return 'CPF';
        }

        // Não retorna nada
        else {
          return false;
        }
      },

      calcDigitosPosicoes(digitos, posicoes = 10, soma_digitos = 0) {
        digitos = digitos.toString();
        for (var i = 0; i < digitos.length; i++) {
          soma_digitos = soma_digitos + digitos[i] * posicoes;

          posicoes--;

          if (posicoes < 2) {
            // Retorno a posição para 9
            posicoes = 9;
          }
        }

        soma_digitos = soma_digitos % 11;

        if (soma_digitos < 2) {
          soma_digitos = 0;
        } else {
          soma_digitos = 11 - soma_digitos;
        }
        var cpf = digitos + soma_digitos;

        return cpf;
      },

      validaCpf(valor) {
        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        var digitos = valor.substr(0, 9);

        var novo_cpf = this.calcDigitosPosicoes(digitos);

        var novo_cpf = this.calcDigitosPosicoes(novo_cpf, 11);

        if (novo_cpf === valor) {
          return true;
        } else {
          return false;
        }
      },

      formataCPF(valor) {
        var formatado = false;

        var valida = this.verificaCpf(valor);

        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        if (valida === 'CPF') {
          if (this.validaCpf(valor)) {
            formatado = valor.substr(0, 3) + '.';
            formatado += valor.substr(3, 3) + '.';
            formatado += valor.substr(6, 3) + '-';
            formatado += valor.substr(9, 2) + '';
          }
        } 

        return formatado;
      },
    },
  };
</script>

<style>
</style>