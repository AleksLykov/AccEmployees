<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <Search />
    <button @click="switch_modal(NEW_EMPLOYEE)" class="btn btn-add">ADD NEW EMPLOYEE</button>
    <EmployeeModal v-if="SHOWMODAL" />
    <div class="employee-wrapper">
      <div class="employee" v-bind="employee" v-for="employee in EMPLOYEES" :key="employee.login.md5">
        <img :src="employee.picture.large" alt="" class="photo" />
        <div class="employee_info">
          <p>Name: {{ employee.name.first }}</p>
          <p>Surname: {{ employee.name.last }}</p>
          <p>Birthdate: {{ employee.dob.date.slice(0, 10) }}</p>
          <p>Profession: {{ PROFESSIONS.find(item => item.value === employee.profession.value) ? employee.profession.value: 'none' }}</p>
          <div class="buttons">
            <button class="btn" @click="switch_modal(employee)">EDIT</button>
            <button class="btn" @click="remove(employee)">REMOVE</button>
          </div>
        </div>
      </div>
    </div>
    <p>
      API to get a list of employees downloaded from the 
      <a href="https://randomuser.me/" target="_blank" rel="noopener">site</a>.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import EmployeeModal from "@/components/EmployeeModal.vue";
import Search from "@/components/Search.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["EMPLOYEES", "SHOWMODAL", "NEW_EMPLOYEE", "PROFESSIONS"])
  },
  methods: {
    ...mapActions(["REMOVE_EMPLOYEES", "SAVE_EMPLOYEES", "SWITCH_MODAL"]),
    remove(employee) {
      this.REMOVE_EMPLOYEES(employee);
    },
    switch_modal(employee) {
      this.SWITCH_MODAL(employee);
    }
  },
  components: {
    EmployeeModal,
    Search
  }
};
</script>

<style scoped lang="less">
h2{
  padding: 0;
  margin: .5em 0;
}
.btn{
  height: 2em;
  font-weight: 700;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  border: solid 1px #ddd;
  border-radius: .5em;
  outline: none;
  &:hover{
    background-color: #eee;
  }
  &:active{
    background-color: #ddd;
  }
}
.hello {
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  width: 100%;
}
.employee-wrapper{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.btn-add{
  width: 400px;
  height: 3em;
  margin: 2px 0;
  padding: 0.5em 1em;
}
.employee{
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 2em;
  margin: .5em .5em;
  border: 2px solid #ddd;
  border-radius: .5em;
  width: 400px;
  img {
    object-fit: contain;
  }
}
.employee_info{
  margin-left: 1em;
  button{
    width: 45%;
    margin: .5em .2em;
  }
  p {
    text-align: left;
  }
}
a {
  color: #42b983;
}
</style>
