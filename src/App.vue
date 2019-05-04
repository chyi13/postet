<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <api-list></api-list>
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <TopBar></TopBar>
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Masthead -->
          <section class="features-icons bg-light">
            <div class="container-fluid main-container">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-8">
                  <Run @onSend="onRunSend"></Run>
                </div>
              </div>
            </div>
          </section>
          <section v-if="selectedApiCase" class="features-icons bg-light">
            <div class="container-fluid main-container">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-8">
                  <Edit ref="edit"></Edit>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <add-api v-if="addModalType === 'modalNewApi'"></add-api>
    <add-api-case v-else-if="addModalType === 'modalNewApiCase'"></add-api-case>
  </div>
</template>
<script>
import Run from "./components/Run.vue";
import Edit from "./components/Edit.vue";
import Result from "./components/Result.vue";
import TopBar from "./components/TopBar.vue";
import ApiList from "./components/APIList.vue";

import { mapGetters } from "vuex";
import AddApi from "./components/AddApi.vue";
import AddApiCase from "./components/AddApiCase.vue";

export default {
  name: "home",
  mounted() {
    let checkInterval = setInterval(() => {
      if (window.crossRequest) {
        this.$store.dispatch("UPDATE_API_IDS");
        clearInterval(checkInterval);
      }
    }, 100);
  },
  computed: {
    ...mapGetters([
      "selectedApiCase",
      "addModalType",
    ])
  },
  data() {
    return {
      tabSelected: "preview",
      showModal: false
    };
  },
  components: {
    AddApiCase,
    AddApi,
      ApiList,
    Edit,
    Run,
    Result,
    TopBar
  },
  methods: {
    onRunSend() {
      if (this.$refs.edit) {
        const editData = this.$refs.edit.getAllEditData();
        this.$store.dispatch("DO_REQUEST", editData);
      }
    }
  }
};
</script>
<style>
#wrapper {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.modal-lg {
  min-width: 55%;
}
</style>
