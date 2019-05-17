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
                                        <input type="text" class="form-control" :class="{invalid: newApiNameValValid === 0}" id="newApiCaseName" v-model="newApiNameVal" placeHolder="接口名称..."/>
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
                                <h6 class="m-0 font-weight-bold text-primary">校验</h6>
                            </div>
                            <div class="card-body">
                                <input class="form-control" v-model="valid" :class="{invalid: validValid === 0}"/>
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
                                        <select id="apiCaseSetupSelector" data-live-search="true" class="form-control">
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
                                        <select id="apiCaseTeardownSelector" data-live-search="true" class="form-control">
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
                            :disabled="newApiNameValValid < 1 && validValid < 1">
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
  import {isJSON} from "../utils";

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
            checked: false,
            key: "",
            value: ""
          }
        ],
        params: [
          {
            checked: false,
            key: "",
            value: ""
          }
        ],
        valid: '',
        validValid: -1,
      }
    },
    computed: {
      ...mapGetters([
        "showAddModal",
        "selectedApi",
        "selectedCommonHeaders", 
        "selectedCommonParams",
        "setup",
        "teardown",
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
                    $("#apiCaseSetupSelector").selectpicker("refresh");
                });
            }
        },
        teardown: {
            immediate: true,
            handler: function(val) {
                this.$nextTick(() => {
                    $("#apiCaseTeardownSelector").selectpicker("refresh");
                });
            }
        },
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
          checked: false,
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
          headers: this.headers.filter((item) => item.key && item.value),
          params: this.params.filter((item) => item.key && item.value),
          valid: this.valid,
        });
      }
    },
    mounted() {
      $("#apiCaseSetupSelector").selectpicker();
      $("#apiCaseTeardownSelector").selectpicker();
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
