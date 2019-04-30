<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">
        Postet
        <sup>0.1</sup>
      </div>
    </a>
    <li class="nav-item">
      <div class="mb-3 input-group col-lg-12">
        <input
          type="text"
          class="form-control bg-light border-0 small"
          placeholder="Search for..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          v-model="apiSearchInput"
          @input="onSearchInputChange"
        >
        <div class="input-group-append">
          <button class="btn btn-info" type="button">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </li>
    <li v-for="(item, index) in apiIdsDummy" class="list_item_container" :key="index">
      <div class="bg-white py-2 collapse-inner">
        <div class="list_item_inner truncate" @click="onAPIClicked(item)">{{item.name}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "api-list",
  data() {
    return {
      apiSearchInput: ''
    }
  },
  computed: {
    ...mapGetters(["apiIdsDummy"])
  },
  methods: {
    onAPIClicked(item) {
      this.$store.dispatch("UPDATE_API_CASES", item);
    },
    onSearchInputChange() {
      this.$store.dispatch("FILTER_API_CASES", this.apiSearchInput);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_item_container {
  margin: 0 1rem;
}
.list_item_inner {
  padding: 0.5rem 1rem;
  margin: 0 0.3rem;
  display: block;
  color: #3a3b45;
  white-space: nowrap;
  font-size: 0.85rem;
}
.list_item_inner:hover {
  background-color: #eaecf4;
  cursor: pointer;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
