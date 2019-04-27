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
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in headers" :key="index">
                    <td>
                      <input class="form-control" :value="item.key"/>
                    </td>
                    <td>
                      <input class="form-control" :value="item.value"/>
                    </td>
                    <td>
                      <button class="btn btn-danger mr-2">
                        <i class="fas fa-minus-circle"></i>
                      </button>
                      <button class="btn btn-info">
                        <i class="fas fa-plus fa-sm"></i>
                      </button>
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
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in params" :key="index">
                    <td>{{item.key}}</td>
                    <td>{{item.value}}</td>
                    <td>Collapsed to start, horizontal above breakpoints</td>
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
    <Result v-if="showResult"></Result>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Result from "./Result";

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
        let header = JSON.parse(
          this.selectedApi.header.header.replace(/'/g, '"')
        );
        for (let [key, value] of Object.entries(header)) {
          result.push({
            key,
            value
          });
        }
      } catch (e) {
        console.log(e);
      }
      return result;
    },
    params() {
      let result = [];
      try {
        let params = JSON.parse(this.selectedApiCase.param);
        for (let [key, value] of Object.entries(params)) {
          result.push({
            key,
            value
          });
        }
      } catch (e) {}
      return result;
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
