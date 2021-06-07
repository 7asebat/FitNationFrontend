<template>
  <div>
    <div v-if="!recipes.length" class="text-center p-5 bg-light round-corner">
      <h1><i class="fas fa-utensils"></i></h1>
      <h1 class="u-title-font">You haven't created any recipes yet!</h1>
      <p class="text-secondary">
        Create your recipe now and share it with all the clients.
      </p>
      <router-link :to="{ name: 'RecipesBuilder' }" class="btn btn-primary">
        Create your own meal
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
};
</script>