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
          <section class="features-icons bg-light">
            <div class="container-fluid main-container">
              <div class="row d-flex justify-content-center">
                <div v-if="selectedApi" class="col-lg-8">
                  <Edit ref="edit"></Edit>
                </div>
                <div v-else class="col-lg-12">
                  <readme />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <add-or-update-api v-if="addModalType === 'modalApi'"></add-or-update-api>
    <add-or-update-api-case v-else-if="addModalType === 'modalApiCase'"></add-or-update-api-case>
  </div>
</template>
<script>
import Run from "./components/Run.vue";
import Edit from "./components/Edit.vue";
import Result from "./components/Result.vue";
import TopBar from "./components/TopBar.vue";
import ApiList from "./components/APIList.vue";

import { mapGetters } from "vuex";
import AddOrUpdateApi from "./components/AddOrUpdateApi.vue";
import AddOrUpdateApiCase from "./components/AddOrUpdateApiCase.vue";

export default {
  name: "home",
  mounted() {
    let checkInterval = setInterval(() => {
      if (window.crossRequest) {
        this.$store.dispatch("INIT_CORE");
        clearInterval(checkInterval);
      }
    }, 100);
  },
  computed: {
    ...mapGetters([
      "selectedApi",
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
    AddOrUpdateApi,
    AddOrUpdateApiCase,
    ApiList,
    Edit,
    Run,
    Result,
    TopBar,
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
    .invalid {
        border: 1px solid red;
    }
</style>
