<template>
  <div class="card shadow mb-4" id="runningResult">
    <div v-if="showResult">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Reponse</h6>
      </div>
      <div class="card-body">
        <json-viewer :value="jsonHeader" :expand-depth="5" copyable boxed sort></json-viewer>
        <json-viewer :value="jsonBody" :expand-depth="5" copyable boxed sort></json-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

import { mapGetters } from "vuex";
import { isJSON } from "../utils";

export default {
  name: "Result",
  props: {},
  components: {
    JsonViewer
  },
  computed: {
    ...mapGetters(["showResult", "resultHeaders", "resultBody"]),
    jsonHeader() {
      if (isJSON(this.resultHeaders)) {
        return JSON.parse(this.resultHeaders);
      } else {
        return this.resultHeaders;
      }
    },
    jsonBody() {
      if (isJSON(this.resultBody)) {
        return JSON.parse(this.resultBody);
      } else {
        return this.resultBody;
      }
    }
  },
  methods: {
    onBackdropClicked() {
      this.$store.commit("HIDE_RESULT");
    }
  }
};
</script>