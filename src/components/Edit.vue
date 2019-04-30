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
        <input class="form-control col-lg-10" v-model="url">
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">请求参数</h6>
      </div>
      <div class="card-body">
        <div class="col-lg-12">
          <div class="form-group">
            <label>Headers</label>
            <table class="table table-bordered table-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Key</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in headers" :key="index">
                  <td>
                    <input
                      type="checkbox"
                      class="form-control"
                      v-model="item.checked"
                      @input="onHeaderChecked(item)"
                    >
                  </td>
                  <td>
                    <input class="form-control" v-model="item.key">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.value">
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="onHeaderDelete(item, index)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-for="(item, index) in newHeaders" :key="'new' + index">
                  <td>
                    <input type="checkbox" class="form-control" v-model="item.checked">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.key">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.value">
                  </td>
                  <td v-if="index === newHeaders.length - 1">
                    <button class="btn btn-info" @click="onNewHeaderAdded">
                      <i class="fas fa-plus"></i>
                    </button>
                  </td>
                  <td v-else>
                    <button class="btn btn-danger" @click="onNewHeaderDelete(item, index)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="form-group">
            <label>Params</label>
            <table class="table table-bordered table-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Key</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in params" :key="index">
                  <td>
                    <input
                      type="checkbox"
                      class="form-control"
                      v-model="item.checked"
                      @input="onParamChecked(item)"
                    >
                  </td>
                  <td>
                    <input class="form-control" v-model="item.key">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.value">
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="onParamDelete(item, index)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-for="(item, index) in newParams" :key="'new' + index">
                  <td>
                    <input type="checkbox" class="form-control" v-model="item.checked">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.key">
                  </td>
                  <td>
                    <input class="form-control" v-model="item.value">
                  </td>
                  <td v-if="index === newParams.length - 1">
                    <button class="btn btn-info" @click="onNewParamAdded">
                      <i class="fas fa-plus"></i>
                    </button>
                  </td>
                  <td v-else>
                    <button class="btn btn-danger" @click="onNewParamDelete(item, index)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">校验</h6>
      </div>
      <div class="card-body">
        {{selectedApi.valid}}
      </div>
    </div>
    <Result></Result>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Result from "./Result";

import JSON5 from "json5";

export default {
  name: "Edit",
  components: {
    Result
  },
  data() {
    return {
      url: '',
      headers: [],
      params: [],
      newHeaders: [
        {
          checked: false,
          key: "",
          value: ""
        }
      ],
      newParams: [
        {
          checked: false,
          key: "",
          value: ""
        }
      ]
    };
  },
  watch: {
    selectedApi: {
      immediate: true,
      handler: function(val) {
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
        this.url = this.selectedApi.url;
        this.headers = result;
        this.newHeaders = [
          {
            checked: false,
            key: "",
            value: ""
          }
        ];
        this.newParams = [
          {
            checked: false,
            key: "",
            value: ""
          }
        ];
      }
    },
    selectedApiCase: {
      immediate: true,
      handler: function(val) {
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
        this.params = result;
      }
    }
  },
  computed: {
    ...mapGetters(["selectedApi", "selectedApiCase", "showResult"])
  },
  methods: {
    onHeaderChecked(headerItem) {
      this.$store.commit("UPDATE_EDIT_HEADERS", this.headers);
    },
    onParamChecked(paramItem) {
      this.$store.commit("UPDATE_EDIT_PARAMS", this.params);
    },
    onNewHeaderAdded() {
      this.newHeaders.push({
        checked: false,
        key: "",
        value: ""
      });
    },
    onNewHeaderDelete(item, index) {
      this.newHeaders = this.newHeaders.filter((header, i) => i !== index);
    },
    onNewParamAdded() {
      this.newParams.push({
        checked: false,
        key: "",
        value: ""
      });
    },
    onNewParamDelete(item, index) {
      this.newParams = this.newParams.filter((param, i) => i !== index);
    },
    onHeaderDelete(item, index) {
      this.headers = this.headers.filter((header, i) => i !== index);
    },
    onParamDelete(item, index) {
      this.params = this.params.filter((param, i) => i !== index);
    },
    getAllEditData() {
      return {
        url: this.url,
        headers: this.headers,
        params: this.params,
        newHeaders: this.newHeaders,
        newParams: this.newParams,
      }
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
td {
  text-align: center;
}
</style>
