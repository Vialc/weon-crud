<template>
  <div>
    <v-text-field type="text" v-mask="'##.###.###/####-##'" v-model="valor" label="CNPJ" :rules="documentRules" required @change="verificarDocumento(); cnpjToCache();"></v-text-field>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
   name: 'ValidaCNPJ',
    data() {
      return {
        valor: null,
        valido: false,
        formatado: false,
        documentRules: [(v) => !!v || 'Preencha o CNPJ'],
      };
    },
    directives: {mask},
    methods: {
      cnpjToCache() {
        this.$store.dispatch('cnpjCache', this.valor)
      },
      verificarDocumento() {
        this.formatado = this.formataDocument(this.valor);
        if (this.formatado) {
          this.valor = this.formatado;
          this.documentRules = []
        } else {
          this.documentRules = ['CNPJ Inválido!'];
        }
      },

      verificaCnpj(valor) {
        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        if (valor.length === 14) {
          return 'CNPJ';
        }
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
            posicoes = 9;
          }
        }

        soma_digitos = soma_digitos % 11;

        if (soma_digitos < 2) {
          soma_digitos = 0;
        } else {
          soma_digitos = 11 - soma_digitos;
        }
        var cnpj = digitos + soma_digitos;

        return cnpj;
      },

      validaCnpj(valor) {
        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        var cnpj_original = valor;

        var primeiros_numeros_cnpj = valor.substr(0, 12);

        var primeiro_calculo = this.calcDigitosPosicoes(
          primeiros_numeros_cnpj,
          5,
        );

        var segundo_calculo = this.calcDigitosPosicoes(primeiro_calculo, 6);

        var cnpj = segundo_calculo;

        if (cnpj === cnpj_original) {
          return true;
        }

        return false;
      },

      formataDocument(valor) {
        var formatado = false;

        var valida = this.verificaCnpj(valor);

        valor = valor.toString();

        valor = valor.replace(/[^0-9]/g, '');

        if (valida === 'CNPJ') {
          if (this.validaCnpj(valor)) {
            formatado = valor.substr(0, 2) + '.';
            formatado += valor.substr(2, 3) + '.';
            formatado += valor.substr(5, 3) + '/';
            formatado += valor.substr(8, 4) + '-';
            formatado += valor.substr(12, 14) + '';
          }
        }

        return formatado;
      },
    },
}
</script>

<style>

</style>