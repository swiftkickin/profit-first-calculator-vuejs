<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Profit First Calculator</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://2frugaldudes.com" target="_blank" rel="noopener noreferrer" text>
        <span class="mr-2">2 Frugal Dudes Podcast</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Calculator />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Calculator from "./components/Calculator.vue";

@Component({
  components: {
    Calculator
  }
})
export default class App extends Vue {}

// export default Vue.extend({
//   name: "App",

//   components: {

//   },

//   data: () => ({
//     //
//   })
// });
</script>
