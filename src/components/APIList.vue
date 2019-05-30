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
          <button class="btn btn-info" type="button" @click="addNewApi">
            <i class="fas fa-plus fa-sm"></i>
          </button>
        </div>
      </div>
    </li>
    <li v-for="(item, index) in apiIdsDummy" class="list_item_container" :key="index">
      <div class="bg-white py-2 collapse-inner">
        <div
          class="list_item_inner"
          @mouseover="onAPIHover(item)"
          @click="onAPIClicked(item)"
        ><span class="d-inline-block text-truncate" :class="{'max_width_hover': item.hover, 'max_width': !item.hover}">{{item.name}}</span>
        </div>
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
      apiSearchInput: "",
      apiIdsDummy: []
    };
  },
  computed: {
    ...mapGetters(["apis"])
  },
  watch: {
    apis: {
      immediate: true,
      handler: function(val) {
        if (Array.isArray(val)) {
          this.apiIdsDummy = val.map(item => {
            return {
              ...item,
              hover: false
            };
          });
        }
      }
    }
  },
  methods: {
    onAPIClicked(item) {
      this.$store.dispatch("UPDATE_SELECTED_API", item);
      this.$nextTick(() => {
            // scroll to location
            document.getElementById("api_edit_header_name").scrollIntoView();
      })
    },
    onAPIHover(hoverItem) {
      this.apiIdsDummy = this.apiIdsDummy.map(item => {
        return {
          ...item,
          hover: item.id === hoverItem.id
        };
      });
    },
    onSearchInputChange() {
      if (this.apiSearchInput) {
        this.apiIdsDummy = this.apis.filter(
          item => item.name.indexOf(this.apiSearchInput) > -1
        );
      } else {
        this.apiIdsDummy = this.apis.map(item => {
          return { ...item };
        });
      }
    },
    addNewApi() {
      this.$store.dispatch("ADD_NEW_API");
    },
    editApi(item) {
      this.$store.dispatch("DELETE_API", item);
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
.max_width {
  max-width: 13rem;
}
.max_width_hover {
  max-width: 11rem;
}
</style>
