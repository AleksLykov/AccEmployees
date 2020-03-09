<template>
  <div class="modal-wrapper">
    <div class="current-employee">
      <img :src="CURRENT_EMPLOYEE.picture.large" alt="" class="photo" />
      <div class="employee_info">
        <p>Name: <input v-model="CURRENT_EMPLOYEE.name.first" type="text" /></p>
        <p>
          Surname: <input v-model="CURRENT_EMPLOYEE.name.last" type="text" />
        </p>
        <p>
          Birthdate: <input v-model="CURRENT_EMPLOYEE.dob.date" type="text" />
        </p>
        <p>
          Profession:
          <select required name="profession" id="profession" v-model="selected">
            <option
              v-for="profession in PROFESSIONS"
              :value="profession.value"
              :key="profession.id"
              >{{ profession.value }}</option
            >
          </select>
        </p>
        <button v-if="CURRENT_EMPLOYEE.login.md5 === ''" @click="add_modal(CURRENT_EMPLOYEE,selected)">ADD EMPLOYEE</button>
        <button v-else @click="switch_modal(selected)">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "EmployeeModal",
  computed: {
    ...mapGetters(["SHOWMODAL", "CURRENT_EMPLOYEE", "PROFESSIONS", "NEW_EMPLOYEE"])
  },
  data() {
    return { selected: this.$store.state.currentEmployee.profession.value };
  },
  methods: {
    ...mapActions(["SAVE_EMPLOYEES", "SWITCH_MODAL", "ADD_EMPLOYEE"]),
    add_modal(employee, val) {
      this.ADD_EMPLOYEE(employee);
      if (!val) val = "none";
      this.SAVE_EMPLOYEES(val);
      this.SWITCH_MODAL();
    },
    switch_modal(val) {
      this.SAVE_EMPLOYEES(val);
      this.SWITCH_MODAL();
    }
  }
};
</script>

<style lang="less" scoped>
.modal-wrapper {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(60, 60, 60, 0.9);
  z-index:100;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.current-employee {
  position: relative;
  z-index: 999;
  background-color: rgba(235, 235, 235, 0.93);
  position: fixed;
  height: 13em;
  width: 27em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  margin: .2em 0;
  border: 2px solid #ddd;
  border-radius: .5em;
  img {
    object-fit: contain;
  }
  button{
    width: 100%;
    margin: .5em 0;
  }
}
.employee_info{
  margin-left: 1em;
  p {
    text-align: left;
  }
}

.moviebtn {
  position: absolute;
  top: -30px;
  right: -30px;
  font-weight: 700;
  font-size: 2em;
  color: red;
}

.moviebtn:hover {
  color: #777;
}
</style>
