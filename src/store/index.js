import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import noAvatar from "@/assets/no-avatar.png";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    professions: [
      { id: 1, value: "Tech Director" },
      { id: 2, value: "Accountant" },
      { id: 3, value: "Manager" },
      { id: 4, value: "Frontend dev" },
      { id: 5, value: "Backend dev" },
      { id: 6, value: "Fullstack dev" },
      { id: 7, value: "TeamLid" },
      { id: 8, value: "Product owner" }
    ],
    employees: null,
    employeesFullList: null,
    switchModal: false,
    currentEmployee: null,
    editProfession: false,
    newEmployee: {
      name: {
        first: "name",
        last: "surname"
      },
      dob: { date: "1980-01-01T12:00:00.001Z" },
      login: { md5: "" },
      picture: { large: noAvatar },
      profession: {
        id: "",
        value: ""
      }
    },
    blankEmployee: {
      name: {
        first: "name",
        last: "surname"
      },
      dob: { date: "1980-01-01T12:00:00.001Z" },
      login: { md5: "" },
      picture: { large: noAvatar },
      profession: {
        id: "",
        value: ""
      }
    },
    searchQuery: ""
  },
  getters: {
    EMPLOYEES: state => {
      return state.employees;
    },
    PROFESSIONS: state => {
      return state.professions;
    },
    SHOWMODAL: state => {
      return state.switchModal;
    },
    CURRENT_EMPLOYEE: state => {
      return state.currentEmployee;
    },
    NEW_EMPLOYEE: state => {
      return state.newEmployee;
    },
    EDITPROFESSION: state => {
      return state.editProfession;
    },
    SEARCH_QUERY: state => {
      return state.searchQuery;
    }
  },
  mutations: {
    SET_EMPLOYEES: (state, payload) => {
      state.employees = payload;
      state.employeesFullList = payload;
    },
    ADD_EMPLOYEE: (state, payload) => {
      payload.login.md5 = Math.floor(Math.random() * 3428627576346).toString();
      state.newEmployee = state.blankEmployee;
      state.employees.unshift(payload);
    },
    REMOVE_EMPLOYEES: (state, payload) => {
      state.employees = state.employees.filter(item => item.login.md5 !== payload.login.md5);
    },
    SAVE_EMPLOYEES: (state, payload) => {
      if(payload === "none") Object.assign(state.currentEmployee.profession, {id: 0, value: payload})
        else state.currentEmployee.profession = state.professions.find(item => item.value === payload);
    },
    ADD_PROFESSION: (state, payload) => {
      !state.professions.find(item => item.value === payload)&&
      state.professions.push({id: state.professions[state.professions.length-1].id+1,value: payload})
    },
    REMOVE_PROFESSION: (state, payload) => {
      state.professions = state.professions.filter(item => item.id !== payload.id);
    },
    SWITCH_MODAL: state => {
      state.switchModal = !state.switchModal;
    },
    SWITCH_EDIT_PROFESSIONS: state => {
      state.editProfession = !state.editProfession;
    },
    SET_SEARCH_QUERY: (state, payload) => {
      state.searchQuery = payload;
    },
    SEARCH_RESULT: (state, payload) => {
      state.employees = state.employeesFullList;
      payload
        ? (state.employees = state.employees.filter(item =>
            item.name.first.concat(" ", item.name.last).includes(payload)
          ))
        : state.employees;
    }
  },
  actions: {
    GET_EMPLOYEES: async (context, payload) => {
      let { data } = await axios.get("https://randomuser.me/api/?results=10");
      let workers = data.results.map(
        item =>
          (item = {
            ...item,
            ...{
              profession:
                context.state.professions[
                  Math.floor(Math.random() * context.state.professions.length)
                ]
            }
          })
      );
      context.commit("SET_EMPLOYEES", workers);
    },
    ADD_EMPLOYEE: (context, payload) => {
      context.commit("ADD_EMPLOYEE", payload);
    },
    REMOVE_EMPLOYEES: (context, payload) => {
      context.commit("REMOVE_EMPLOYEES", payload);
    },
    SAVE_EMPLOYEES: (context, payload) => {
      context.commit("SAVE_EMPLOYEES", payload);
    },
    ADD_PROFESSION: (context, payload) => {
      context.commit("ADD_PROFESSION", payload);
    },
    REMOVE_PROFESSION: (context, payload) => {
      context.commit("REMOVE_PROFESSION", payload);
    },
    SWITCH_MODAL: (context, payload) => {
      context.state.currentEmployee = payload;
      context.commit("SWITCH_MODAL");
    },
    SET_SEARCH_QUERY: (context, payload) => {
      context.commit("SET_SEARCH_QUERY", payload);
    },
    SEARCH_RESULT: (context, payload) => {
      context.commit("SEARCH_RESULT", payload)
    }
  },
  modules: {}
});
