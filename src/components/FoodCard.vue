<template>
  <div class="c-food-card d-flex align-items-center shadow-sm round">
    <div class="c-food-card__image">
      <img
        class="w-100"
        src="https://cdnprod.mafretailproxy.com/sys-master-root/h8c/hc7/10187581554718/32634_main.jpg_480Wx480H"
        alt=""
      />
    </div>
    <div class="c-food-card__info ml-2">
      <h4>{{ food.name }}</h4>
      <p class="m-0">
        <i class="fas fa-heartbeat text-success"></i>
        <span class="text-success mx-2">Nutrition Facts:</span>
        <span>Calorie dense</span>
      </p>
      <p>
        <i class="fas fa-utensils text-success"></i>
        <span class="text-success mx-2">Food Type:</span>
        <span>Vegetables</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-food-card {
  border-radius: $border-radius;
  overflow: hidden;
}

.c-food-card__image {
  flex: 0 0 150px;
}

.c-food-card__info {
}
</style>