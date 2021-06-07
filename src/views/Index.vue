<template>
  <div class="container">
    <ImageText
      title="Get the body of the champions"
      imgSrc="workoutsHeader.png"
      description="We are an independent gym that is committed to working with you to gain the results you want. Whether your aim is to loose weight, tone up, build bulk or gain weight we can put together a gym programme or recommend the right classes for you to attend in our studios."
    />

    <ImageText
      title="Get to know us!"
      imgSrc="Login.png"
      :description="[
        'We are an independent gym that is committed to working with you to gain the results you want. Whether your aim is to loose weight, tone up, build bulk or gain weight we can put together a gym programme or recommend the right classes for you to attend in our studios.',
        'Our members benefit from a free gym programme and review every month, free studio classes and price reductions on our personal training sessions. As a member you can also access our pool and tennis courts for free and have priority for booking any of the pre-book activities, classes or sessions that we run.',
        'If you don’t want to commit to being a member you can still use all of our facilities but you will need to have an induction session before using the facilities to ensure that Health and Safety requirements are met – you don’t want to injure yourself on your first visit and ruin all your good intentions!',
      ]"
      imagePosition="left"
    />
  </div>
</template>

<script>
export default {
  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
  },
};
</script>