<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">接口信息</h6>
      </div>
      <div class="card-body">
        <div class="mb-1 small">接口名称:</div>
        <p>{{selectedApiCase.name}}</p>
        <div class="mb-1 small">创建时间:</div>
        <p>{{selectedApiCase.create_time}}</p>
        <div class="mb-1 small">路径:</div>
        <input class="form-control col-lg-10" :value="selectedApi.url">
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">请求参数</h6>
      </div>
      <div class="card-body">
        <div class="col-lg-12">
          <form role="form">
            <div class="form-group">
              <label>Headers</label>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in headers" :key="index">
                    <td>
                        <input type="checkbox" class="form-control" v-model="item.checked" @input="onHeaderChecked(item)">
                    </td>
                    <td>
                      <input class="form-control" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control" v-model="item.value">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <label>Params</label>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in params" :key="index">
                    <td>
                      <input type="checkbox" class="form-control" v-model="item.checked" @input="onParamChecked(item)">
                    </td>
                    <td>
                        <input class="form-control" v-model="item.key">
                    </td>
                    <td>
                       <input class="form-control" v-model="item.value">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">返回参数</h6>
      </div>
      <div class="card-body"></div>
    </div>
    <Result></Result>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Result from "./Result";

import JSON5 from 'json5';

export default {
  name: "Edit",
  components: {
    Result
  },
  computed: {
    ...mapGetters(["selectedApi", "selectedApiCase", "showResult"]),
    headers() {
      let result = [];
      try {
        let header = JSON5.parse(this.selectedApi.header.header);
        for (let [key, value] of Object.entries(header)) {
          result.push({
            checked: true,
            key,
            value
          });
        }
      } catch (e) {
        console.error(e);
      }
      this.$store.commit('UPDATE_EDIT_HEADERS', result);
      return result;
    },
    params() {
      let result = [];
      try {
        let params = JSON5.parse(this.selectedApiCase.param);
        for (let [key, value] of Object.entries(params)) {
          result.push({
            checked: true,
            key,
            value
          });
        }
      } catch (e) {
        console.error(e);
      }
      this.$store.commit('UPDATE_EDIT_PARAMS', result);
      return result;
    }
  },
  methods: {
    onHeaderChecked(headerItem) {
      this.$store.commit('UPDATE_EDIT_HEADERS', this.headers);
    },
    onParamChecked(paramItem) {
      this.$store.commit('UPDATE_EDIT_PARAMS', this.params);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
