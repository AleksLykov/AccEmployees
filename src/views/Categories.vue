<template>
  <div class="categories">
    <h2>Edit database categories</h2>
    <CategoriesBody />
  </div>
</template>

<script>
import CategoriesBody from "@/components/CategoriesBody.vue";

export default {
  name: "Categories",
  components: {
    CategoriesBody
  }
};
</script>
