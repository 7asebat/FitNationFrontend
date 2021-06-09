import Vue from "vue";
import { EventBus } from "@/plugins/eventBus.js";

const errorsHandler = (err) => {
  if (err.message) return EventBus.$emit("errorNotification", err.message);
  else
    return EventBus.$emit(
      "errorNotification",
      "Something went wrong, try again later."
    );
};

const errorsHandlerPlugin = {
  install() {
    Vue.errorsHandler = errorsHandler;
    Vue.prototype.$errorsHandler = errorsHandler;
  },
};

Vue.use(errorsHandlerPlugin);
