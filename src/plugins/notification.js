import Vue from "vue";
import { EventBus } from "@/plugins/eventBus.js";

const notification = (notificationType, message, title) => {
  EventBus.$emit(notificationType, message, title);
};

const notificationPlugin = {
  install() {
    Vue.notification = notification;
    Vue.prototype.$notification = notification;
  },
};

Vue.use(notificationPlugin);
