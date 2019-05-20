<template>
  <div>
    <!-- Page Heading -->
    <div id="api_edit_header_name" class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{selectedApi.name}}</h1>
    </div>
    <Run @onSend="onSend" @onSave="onSave"></Run>
    <div v-if="selectedApiCase">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">接口信息</h6>
        </div>
        <div v-if="selectedApiCase" class="card-body">
          <div class="mb-1 small">接口名称:</div>
          <p>{{selectedApiCase.name}}</p>
          <div class="mb-1 small">创建时间:</div>
          <p>{{selectedApiCase.create_time}}</p>
          <div class="mb-1 small">路径:</div>
          <input class="form-control col-lg-10" v-model="url">
        </div>
        <div v-else class="card-body">
          <div class="mb-1 small">接口名称:</div>
            <input class="form-control col-lg-10">
          <div class="mb-1 small">路径:</div>
          <input class="form-control col-lg-10">
        </div>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">请求参数</h6>
        </div>
        <div class="card-body">
          <div class="col-lg-12">
            <div class="form-group">
              <label>公共Headers</label>
                <table class="table table-bordered table-center table-sm">
                  <thead>
                    <tr>
                      <th></th>
                      <th class="h6">Key</th>
                      <th class="h6">Value</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in selectedCommonHeadersDummy" :key="'new' + index">
                      <td>
                        <input type="checkbox" class="form-control" v-model="item.checked">
                      </td> 
                      <td>
                        <input class="form-control form-control-sm" v-model="item.key">
                      </td>
                      <td>
                        <input class="form-control form-control-sm" v-model="item.value">
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="form-group">
              <label>Headers</label>
              <table class="table table-bordered table-center table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th class="h6">Key</th>
                    <th class="h6">Value</th>
                    <th class="h6"></th>
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
                      <input class="form-control form-control-sm" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.value">
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
                      <input class="form-control form-control-sm" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.value">
                    </td>
                    <td v-if="index === newHeaders.length - 1">
                      <button class="btn btn-info btn-sm" @click="onNewHeaderAdded">
                        <i class="fas fa-plus"></i>
                      </button>
                    </td>
                    <td v-else>
                      <button class="btn btn-danger btn-sm" @click="onNewHeaderDelete(item, index)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <label>公共Params</label>
              <table class="table table-bordered table-center table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th class="h6">Key</th>
                    <th class="h6">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedCommonParamsDummy" :key="'new' + index">
                    <td>
                        <input type="checkbox" class="form-control" v-model="item.checked">
                    </td> 
                    <td>
                      <input class="form-control form-control-sm" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.value">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <label>Params</label>
              <table class="table table-bordered table-center  table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th class="h6">Key</th>
                    <th class="h6">Value</th>
                    <th class="h6"></th>
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
                      <input class="form-control form-control-sm" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.value">
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="onParamDelete(item, index)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in newParams" :key="'new' + index">
                    <td>
                      <input type="checkbox" class="form-control" v-model="item.checked">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.key">
                    </td>
                    <td>
                      <input class="form-control form-control-sm" v-model="item.value">
                    </td>
                    <td v-if="index === newParams.length - 1">
                      <button class="btn btn-info btn-sm" @click="onNewParamAdded">
                        <i class="fas fa-plus"></i>
                      </button>
                    </td>
                    <td v-else>
                      <button class="btn btn-danger btn-sm" @click="onNewParamDelete(item, index)">
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
        <div v-if="selectedApiCase" class="card-body">
          {{selectedApiCase.valid}}
        </div>
      </div>
      <div class="card shadow mb-4">
          <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">前置操作</h6>
          </div>
          <div class="card-body">
              <div class="col-lg-12">
                  <div class="form-group">
                      <label>参数</label>
                      <select id="apiCaseEditSetupSelector" data-live-search="true" class="form-control form-control-sm">
                        <option
                          v-for="(item, index) in setup"
                          :key="index"
                          :value="item.id"
                        >{{item.name}}</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">后置操作</h6>
        </div>
        <div class="card-body">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>参数</label>
                    <select id="apiCaseEditTeardownSelector" data-live-search="true" class="form-control form-control-sm">
                      <option
                        v-for="(item, index) in teardown"
                        :key="index"
                        :value="item.id"
                      >{{item.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <Result></Result>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Result from "./Result";
import Run from './Run';

import JSON5 from "json5";

export default {
  name: "Edit",
  components: {
    Run,
    Result
  },
  computed: {
    ...mapGetters(["selectedApi", "selectedApiCase", "selectedCommonHeaders", "selectedCommonParams", "setup", "defaultSetup", "teardown", "defaultTeardown", "showResult"])
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
      ],
      selectedCommonHeadersDummy: [],
      selectedCommonParamsDummy: [],
    };
  },
  watch: {
    selectedApi: {
      immediate: true,
      handler: function(val) {
        this.url = this.selectedApi.url;
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
        if (!val) { // 无数据, 置空
          this.headers = [];
          this.params = [];
          $("#apiCaseEditSetupSelector").selectpicker('val', this.defaultSetup.id);
          $("#apiCaseEditTeardownSelector").selectpicker('val', this.defaultTeardown.id);
          return;
        }
        let resultHeaders = [];
        try {
          if (val.headers) {
            let headers = JSON5.parse(val.headers);
            for (let [key, value] of Object.entries(headers)) {
              resultHeaders.push({
                checked: true,
                key,
                value
              });
            }
          }
        } catch (e) {
          console.error(e);
        }
        this.headers = resultHeaders;
        let resultParams = [];
        try {
          if (val.param) {
            let params = JSON5.parse(val.param);
            for (let [key, value] of Object.entries(params)) {
              resultParams.push({
                checked: true,
                key,
                value
              });
            }
          }
        } catch (e) {
          console.error(e);
        }
        this.params = resultParams;
        if (val.setup_suite) {
          $("#apiCaseEditSetupSelector").selectpicker('val', val.setup_suite);
        } else { // 没有前置方法选择默认前置方法
          $("#apiCaseEditSetupSelector").selectpicker('val', this.defaultSetup.id);
        }
        if (val.teardown) {
          $("#apiCaseEditTeardownSelector").selectpicker('val', val.teardown);
        } else { // 没有后置方法选择默认后置方法
          $("#apiCaseEditTeardownSelector").selectpicker('val', this.defaultTeardown.id);
        }
      }
    },
    selectedCommonHeaders: {
        immediate: true,
        handler: function(val) {
            if (Array.isArray(val)) {
                this.selectedCommonHeadersDummy = val.map(item => {
                    return {
                        ...item,
                        checked: true,
                    }
                });
            }
        }
    },
    selectedCommonParams: {
        immediate: true,
        handler: function(val) {
            if (Array.isArray(val)) {
                this.selectedCommonParamsDummy = val.map(item => {
                    return {
                        ...item,
                        checked: true,
                    }
                });
            }
        } 
    }
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
    onSend() {
      this.$store.dispatch('DO_REQUEST', this.getAllEditData());
    },
    getAllEditData() {
      return {
        url: this.url,
        headers: this.headers,
        params: this.params,
        commonHeaders: this.selectedCommonHeadersDummy,
        commonParams: this.selectedCommonParamsDummy,
        newHeaders: this.newHeaders,
        newParams: this.newParams,
      }
    },
    onSave() {
      this.$store.dispatch('SAVE_OLD_API_CASE', {
        name: this.selectedApiCase.name,
        method: '',
        api: this.selectedApi.id,
        id: this.selectedApiCase.id,
        headers: this.headers.filter((item) => item.key && item.value),
        params: this.params.filter((item) => item.key && item.value),
        valid: this.valid,
        setup_suite: $("#apiCaseEditSetupSelector").val(),
        teardown: $("#apiCaseEditTeardownSelector").val(),
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      $("#apiCaseEditSetupSelector").selectpicker();
      $("#apiCaseEditTeardownSelector").selectpicker();
    });
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
