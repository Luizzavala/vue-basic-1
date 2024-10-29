const createApp = Vue;
import HeaderComponent from "./components/Header.js";
import BodyComponent from "./components/Body.js";

const app = Vue.createApp({
  data() {
    return {
    };
  },
  components: {
    "header-component": HeaderComponent,
    "body-component": BodyComponent
  }
});

app.component("header-component", HeaderComponent);
app.component("body-component", BodyComponent);
app.mount("#app");
