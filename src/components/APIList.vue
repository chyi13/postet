<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
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
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>APIs</span>
      </a>
    </li>
    <li v-for="(item, index) in apiIds" class="list_item_container" :key="index">
      <div class="bg-white py-2 collapse-inner">
        <div class="list_item_inner" @click="onAPIClicked(item)">{{item.name}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "api-list",
  computed: {
    ...mapGetters(["apiIds"])
  },
  methods: {
    onAPIClicked(item) {
      this.$store.dispatch("UPDATE_API_CASES", item);
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
  text-decoration: none;
  border-radius: 0.35rem;
  white-space: nowrap;
  font-size: 0.85rem;
  border: none;
}
.list_item_inner:hover {
  background-color: #eaecf4;
}
</style>
