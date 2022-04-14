import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cpfdocumentCache: "",
    cnpjdocumentCache: "",
    pessoas: [{
      avatar: '',
      typedoc: '',
      name: '',
      document: '',
      id: ''
     }],
  },
  getters: { },
  mutations: {
    sendCpftoCache(state, payload) {
      state.cpfdocumentCache = payload;
    },
    sendCnpjToCache(state, payload) {
      state.cnpjdocumentCache = payload;
    },
  },
  actions: {
    cpfCache(context, payload) {
      context.commit("sendCpftoCache", payload);
    },
    cnpjCache(context, payload) {
      context.commit("sendCnpjToCache", payload);
    },
    newPessoa(context, payload) {
      context.commit("cadastrarPessoa", payload);
    },
    async cadastrarPessoa(context, payload) {
      const data = {
        avatar: payload.avatar,
        typedoc: payload.typedoc,
        name: payload.name,
        document: payload.document,
      };

      const dataJson = JSON.stringify(data);

      const req = await fetch("http://localhost:3000/box_5189bd45fb5b962bb02f", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson
          });
      const res = await req.json();

      console.log(res)
    },
    async atualizarPessoa(context, payload) {
      const data = {
        id: payload.id,
        avatar: payload.avatar,
        typedoc: payload.typedoc,
        name: payload.name,
        document: payload.document,
      }
      const dataJson = JSON.stringify(data);
      const req = await fetch(`http://localhost:3000/box_5189bd45fb5b962bb02f/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: dataJson
      });
      const res = await req.json();

      console.log(res)
    }
  },
  modules: {},
});
