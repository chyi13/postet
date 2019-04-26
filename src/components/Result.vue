<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">接口信息</h6>
    </div>
    <div class="card-body">
      <json-viewer :value="jsonHeader" :expand-depth="5" copyable boxed sort></json-viewer>
      <json-viewer :value="jsonBody" :expand-depth="5" copyable boxed sort></json-viewer>
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
    ...mapGetters(["showResult", "resultHeader", "resultBody"]),
    jsonHeader() {
      if (isJSON(this.resultHeader)) {
        return JSON.parse(this.resultHeader);
      } else {
        return this.resultHeader;
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