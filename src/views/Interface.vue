<template>
  <div class="home">
    <div class="row">
      <div class="panel-body">
        <ul class="nav nav-tabs">
          <li :class="{active: tabSelected === 'preview'}" @click="onTabClicked('preview')">
            <a data-toggle="tab">预览</a>
          </li>
          <li :class="{active: tabSelected === 'edit'}" @click="onTabClicked('edit')">
            <a data-toggle="tab">编辑</a>
          </li>
          <li :class="{active: tabSelected === 'run'}" @click="onTabClicked('run')">
            <a data-toggle="tab">运行</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
         <div v-if="tabSelected === 'preview'">
        </div>
        <div v-if="tabSelected === 'edit'">
            <Edit/>
        </div>
          <div v-if="tabSelected === 'run'">
            <Run/>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from "@/components/Interface.vue";
import Edit from "@/components/Edit.vue";
import Run from "@/components/Run.vue";

export default {
  name: "home",
  data() {
    return {
      tabSelected: "preview"
    };
  },
  components: {
    Edit,
    Run,
  },
  methods: {
    onTabClicked(tabName) {
      this.tabSelected = tabName;
    }
  }
};
</script>
