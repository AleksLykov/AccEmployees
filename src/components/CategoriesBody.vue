<template>
  <div class="categories-body">
    <div class="professions_add">
      <h3>{{ message }}</h3>
      <input v-model.lazy="prof" type="text" placeholder="input profession..." />
      <button @click="addProf">ADD</button>
    </div>
    <button class="btn-edit" v-if="!EDITPROFESSION" @click="switchProfession">EDIT PROFESSIONS</button>
    <button class="btn-edit" v-else @click="switchProfession">SAVE PROFESSIONS</button>
    <div class="profession" v-for="prof in PROFESSIONS" :key="prof.id">
      <p v-if="!EDITPROFESSION">{{ prof.value }}</p>
      <input class="profession__input" v-else type="text" v-model="prof.value" :key="prof.id" />
      <div class="btns">
        <button @click="removeProf(prof)">REMOVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "CategoriesBody",
  computed: {
    ...mapGetters(["PROFESSIONS", "EDITPROFESSION"])
  },
  methods: {
    ...mapActions(["ADD_PROFESSION", "REMOVE_PROFESSION"]),
    ...mapMutations(["SWITCH_EDIT_PROFESSIONS"]),
    addProf() {
      this.ADD_PROFESSION(this.prof);
      this.prof = ''
    },
    removeProf(prof) {
      this.REMOVE_PROFESSION(prof);
    },
    switchProfession() {
      this.SWITCH_EDIT_PROFESSIONS();
    }
  },
  data() {
    return {
      message: "Add profession:",
      prof: ""
    };
  }
};
</script>

<style scoped lang="less">
.categories-body{
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
}
.professions_add {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  * { 
    margin: 0 .5em;
  }
  input{
    text-decoration: none;
    border: solid 1px #ddd;
    border-radius: .2em;
    outline: none;
    font-weight: lighter;
    font-size: inherit;
  }
}
.profession{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  padding: 0 .8em;
  margin: .2em 0;
  border: 2px solid #ddd;
  border-radius: .5em;
  p{
    padding: 0 .5em;
  }
  box-sizing: border-box;
}
button{
  font-weight: 700;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin: 2px 0;
  border: solid 1px #ddd;
  border-radius: .5em;
  padding: 0.5em 1em;
  outline: none;
  &:hover{
    background-color: #ddd;
  }
  &:active{
    background-color: #ccc;
  }
}
.profession__input {
  text-decoration: none;
  border: solid 1px #ddd;
  border-radius: .2em;
  outline: none;
  padding: 0.06em .5em;
  margin: 1em 0;
  font-weight: lighter;
  font-size: inherit;
}
.btn-edit{
  margin: 1em 0;
  width: 350px;
  height: 3em;
  background-color: #eee;
}
</style>
