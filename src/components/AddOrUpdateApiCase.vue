<template>
    <div>
        <div v-if="showAddModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true"
             :class="[showAddModal ? 'show modal-display' : 'fade']">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New API Case</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="onBackdropClicked">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">接口信息</h6>
                            </div>
                           <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="newApiCaseName" class="control-label">name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-sm" :class="{invalid: newApiNameValValid === 0}" id="newApiCaseName" v-model="newApiNameVal" placeHolder="接口名称..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">URL</h6>
                            </div>
                           <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="newApiCaseName" class="control-label">URL(粘贴你要添加的地址, 可以快速添加请求params)</label>
                                        <input type="text" class="form-control form-control-sm" v-model="pasteURL" placeHolder="https://"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">前置操作</h6>
                            </div>
                            <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <select id="apiCaseSetupSelector" data-live-search="true" class="form-control form-control-sm">
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
                                <h6 class="m-0 font-weight-bold text-primary">METHOD</h6>
                            </div>
                            <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>参数</label>
                                        <select id="apiCaseMethodsSelector" class="form-control">
                                          <option value="GET">GET</option>
                                          <option value="POST">POST</option>
                                          <option value="PUT">PUT</option>
                                          <option value="DELETE">DELETE</option>
                                        </select>
                                    </div>
                                </div>
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
                                                <th class="h6">Key</th>
                                                <th class="h6">Value</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, index) in selectedCommonHeaders" :key="'new' + index">
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.key" disabled>
                                                </td>
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.value" disabled>
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
                                                <th class="h6">Key</th>
                                                <th class="h6">Value</th>
                                                <th class="h6"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, index) in headers" :key="'new' + index">
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.key">
                                                </td>
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.value">
                                                </td>
                                                <td v-if="index === headers.length - 1">
                                                    <button class="btn btn-info btn-sm" @click="addNewHeader">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td v-else>
                                                    <button class="btn btn-danger btn-sm"
                                                            @click="deleteNewHeader(item, index)">
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
                                                <th class="h6">Key</th>
                                                <th class="h6">Value</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, index) in selectedCommonParams" :key="'new' + index">
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.key" disabled>
                                                </td>
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.value" disabled>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="form-group">
                                        <label>Params</label>
                                        <table class="table table-bordered table-center table-sm">
                                            <thead>
                                            <tr>
                                                <th class="h6">Key</th>
                                                <th class="h6">Value</th>
                                                <th class="h6"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, index) in params" :key="'new' + index">
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.key">
                                                </td>
                                                <td>
                                                    <input class="form-control form-control-sm" v-model="item.value">
                                                </td>
                                                <td v-if="index === params.length - 1">
                                                    <button class="btn btn-info btn-sm" @click="addNewParam">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td v-else>
                                                    <button class="btn btn-danger btn-sm"
                                                            @click="deleteNewParam(item, index)">
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
                                <h6 class="m-0 font-weight-bold text-primary">校验<span class="text-danger">*</span></h6>
                            </div>
                            <div class="card-body">
                                <input class="form-control form-control-sm" v-model="valid" :class="{invalid: validValid === 0}"/>
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
                                        <select id="apiCaseTeardownSelector" data-live-search="true" class="form-control form-control-sm">
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
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-success" data-dismiss="modal" @click="save" 
                            :disabled="newApiNameValValid < 1 || validValid < 1">
                            Save
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onBackdropClicked">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal">
            <div v-if="showAddModal" class="modal-backdrop" :class="[showAddModal ? 'show' : 'fade']"></div>
        </transition>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {isJSON, extractParams} from "../utils";

  export default {
    name: "add-api-case",
    props: {},
    data() {
      return {
        newApiNameVal: '',
        newApiNameValValid: -1,
        commonHeaders: [],
        commonParams: [],
        headers: [
          {
            key: "",
            value: ""
          }
        ],
        params: [
          {
            key: "",
            value: ""
          }
        ],
        valid: '',
        validValid: -1,
        pasteURL: '',
      }
    },
    computed: {
      ...mapGetters([
        "showAddModal",
        "selectedApi",
        "selectedCommonHeaders", 
        "selectedCommonParams",
        "setup",
        "defaultSetup",
        "teardown",
        "defaultTeardown",
      ]),
    },
    watch: {
        newApiNameVal: function(val) {
            if (val === '') {
                this.newApiNameValValid = 0;
            } else {
                this.newApiNameValValid = 1;
            }
        },
        valid: function(val) {
            if (val === '') {
                this.validValid = 0;
            } else {
                this.validValid = 1;
            }
        },
        setup: {
            immediate: true,
            handler: function(val) {
                this.$nextTick(() => {
                    if (this.selectedApi.setup) {
                      $("#apiCaseSetupSelector").selectpicker("val", this.selectedApi.setup);
                    } else {
                      $("#apiCaseSetupSelector").selectpicker("val", this.defaultSetup.id)
                    }
                });
            }
        },
        teardown: {
            immediate: true,
            handler: function(val) {
                this.$nextTick(() => {
                    if (this.selectedApi.teardown) {
                      $("#apiCaseTeardownSelector").selectpicker('val', this.selectedApi.teardown);
                    } else {
                      $("#apiCaseTeardownSelector").selectpicker('val', this.defaultTeardown.id);
                    }
                });
            }
        },
        pasteURL: function(val) {
          let pasteParams = extractParams(val);
          if (Array.isArray(pasteParams)) {
            const filterPasteByCommonParams = pasteParams.filter((param) => !this.selectedCommonParams.find((commonParam) => (commonParam.key === param.key && commonParam.value === param.value)));
            filterPasteByCommonParams.push({
              key: '',
              value: '',
            })
            this.params = filterPasteByCommonParams;
          }
        }
    },
    methods: {
      addNewHeader() {
        this.headers.push({
          key: "",
          value: ""
        });
      },
      deleteNewHeader(item, index) {
        this.headers = this.headers.filter((header, i) => i !== index);
      },
      addNewParam() {
        this.params.push({
          key: "",
          value: ""
        });
      },
      deleteNewParam(item, index) {
        this.params = this.params.filter((param, i) => i !== index);
      },
      onBackdropClicked() {
        this.$store.commit('HIDE_MODAL');
      },
      save() {
        this.$store.dispatch('SAVE_NEW_API_CASE', {
          name: this.newApiNameVal,
          api: this.selectedApi.id,
          method: $("#apiCaseMethodsSelector").val(),
          header: this.headers.filter((item) => item.key && item.value),
          param: this.params.filter((item) => item.key && item.value),
          valid: this.valid,
          setup_suite: $("#apiCaseSetupSelector").val(),
          teardown: $("#apiCaseTeardownSelector").val(),
        });
      }
    },
    mounted() {
      $("#apiCaseSetupSelector").selectpicker();
      $("#apiCaseTeardownSelector").selectpicker();
      $("#apiCaseMethodsSelector").selectpicker();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-enter {
        transition: all .2s ease;
        opacity: 0;
    }

    .modal-leave-active {
        transition: all .2s ease;
        opacity: 0;
    }

    .modal-display {
        overflow-y: auto;
        overflow-x: hidden;
        display: block;
        padding-right: 15px;
    }
    td {
        text-align: center;
    }
</style>
