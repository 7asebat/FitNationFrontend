import Vue from "vue";
import { EventBus } from "@/plugins/eventBus.js";

const errorsHandler = (err) => {
  if (!err.response || !err.response.data)
    return EventBus.$emit("errorNotification", err.message);

  const operationalErrors = err.response.data.errors
    ? err.response.data.errors
    : null;

  if (operationalErrors) {
    Object.keys(operationalErrors).forEach((key) => {
      EventBus.$emit(
        "errorNotification",
        `${key} : ${operationalErrors[key][0]}`
      );
    });
  } else {
    EventBus.$emit("errorNotification", `${err.response.data.message}`);
  }
};

const errorsHandlerPlugin = {
  install() {
    Vue.errorsHandler = errorsHandler;
    Vue.prototype.$errorsHandler = errorsHandler;
  },
};

Vue.use(errorsHandlerPlugin);
