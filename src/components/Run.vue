<template>
  <div class="row">
    <div class="col-lg-12">
      <!-- Default Card Example -->
      <div class="card shadow mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-primary">接口</h6>
        </div>
        <div class="card-body">
          <div class="form-row">
            <div class="col-md-10 mb-2 input-group">
              <div class="input-group-prepend">
                <select id="methods_selector" class="form-control">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div class="col-md-10">
                <select id="run_selector" data-live-search="true" class="form-control">
                  <option
                    v-for="(item, index) in apiCases"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="row">
                <button class="btn btn-primary mr-1" @click="postApiCase">
                  <i class="fas fa-paper-plane fa-sm"></i>
                </button>
                <button class="btn btn-warning mr-1" @click="addNewApiCase">
                  <i class="fas fa-plus fa-sm"></i>
                </button>
                <button class="btn btn-danger" @click="saveOldApiCase">
                  <i class="fas fa-save fa-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Run",
  created() {},
  data() {
    return {
      url: ""
    };
  },
  computed: {
    ...mapGetters([
      "apiCases",
      "requestHeaders",
      "requestParams",
    ])
  },
  watch: {
    apiCases: function(newValue, oldValue) {
      let method = 'GET';
      if (Array.isArray(newValue) && newValue.length > 0) {
        method = newValue[0].method;
        this.$store.dispatch("UPDATE_SELECT_API_CASE", newValue[0].id);
      } else {
        this.$store.dispatch("CLEAR_SELECT_API_CASE");
      }
      this.$nextTick(() => {
        $("#run_selector").selectpicker("refresh");
        $("#methods_selector").selectpicker("val", method);
      });
    }
  },
  methods: {
    postApiCase() {
      this.$emit('onSend');
    },
    addNewApiCase() {
      this.$store.dispatch('ADD_NEW_API_CASE')
    },
    saveOldApiCase() {
      this.$emit('onSave');
    },
  },
  mounted() {
    $("#methods_selector").selectpicker();
    $("#run_selector").selectpicker();
    $("#api_selector").selectpicker();
    let context = this;
    $("#run_selector").on("changed.bs.select", function(
      e,
      clickedIndex,
      isSelected,
      newValue,
      previousValue
    ) {
      context.$store.dispatch(
        "UPDATE_SELECT_API_CASE",
        $("#run_selector").val()
      );
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
