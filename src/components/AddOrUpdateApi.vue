<template>
    <div>
        <div v-if="showAddModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true"
             :class="[showAddModal ? 'show modal-display' : 'fade']">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
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
                                        <label for="apiName" class="control-label">name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-sm" :class="{invalid: apiNameValid === 0}" id="apiName" v-model="apiNameVal" placeHolder="接口名称..."/>
                                    </div>
                                    <!--<div class="mb-1 small">创建时间:</div>-->
                                    <!--<p>{{selectedApiCase.create_time}}</p>-->
                                    <div class="form-group">
                                        <label for="apiUrl" class="control-label">url<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-sm" :class="{invalid: apiUrlValid === 0}" id="apiUrl" v-model="apiUrlVal" placeHolder="https://"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="apiStageUrl" class="control-label">stage url<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-sm" :class="{invalid: apiStageUrlValid === 0}" id="apiStageUrl" v-model="apiStageUrlVal" placeHolder="https://"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="apiOnlineUrl" class="control-label">online url<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-sm" :class="{invalid: apiOnlineUrlValid === 0}" id="apiOnlineUrl" v-model="apiOnlineUrlVal" placeHolder="https://"/>
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
                                        <label>Headers</label>
                                        <select id="commonHeaderSelector" data-live-search="true" class="form-control form-control-sm">
                                          <option
                                            v-for="(item, index) in commonHeaders"
                                            :key="index"
                                            :value="item.id"
                                          >{{item.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Params</label>
                                        <select id="commonParamSelector" data-live-search="true" class="form-control form-control-sm">
                                          <option
                                            v-for="(item, index) in commonParams"
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
                                <h6 class="m-0 font-weight-bold text-primary">校验</h6>
                            </div>
                            <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>参数</label>
                                        <select id="commonValidSelector" data-live-search="true" class="form-control form-control-sm">
                                          <option
                                            v-for="(item, index) in commonValid"
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
                                <h6 class="m-0 font-weight-bold text-primary">前置操作</h6>
                            </div>
                            <div class="card-body">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>参数</label>
                                        <select id="setupSelector" data-live-search="true" class="form-control form-control-sm">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="save" 
                            :disabled="apiNameValid < 1 || apiUrlValid < 1 || apiStageUrlValid < 1 || apiOnlineUrlValid <1">
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
  import {checkIfUrl} from "../utils";

  import {MODE_ADD, MODE_EDIT} from '../constants';
  
  export default {
    name: "add-or-update-api",
    props: {},
    data() {
      return {
        apiId: -1,
        apiNameVal: '',
        apiNameValid: -1,
        apiUrlVal: '',
        apiUrlValid: -1,
        apiStageUrlVal: '',
        apiStageUrlValid: -1,
        apiOnlineUrlVal: '',
        apiOnlineUrlValid: -1,
      }
    },
    computed: {
      ...mapGetters([
        'showAddModal',
        'modalType',
        'modalMode',
        'commonHeaders',
        'defaultCommonHeader',
        'commonParams',
        'defaultCommonParam',
        'commonValid',
        'defaultCommonValid',
        'setup',
        'defaultSetup',
        'selectedApi',
      ]),
      modalTitle() {
        return this.modalMode === MODE_ADD ? '添加新的API': '编辑API';
      }
    },
    watch: {
        selectedApi: {
          immediate: true,
          handler: function(val = {}) {
            
          }
        },
        apiNameVal: {
            handler: function(val) {
                if (val === '') {
                    this.apiNameValid = 0;
                } else {
                    this.apiNameValid = 1;
                }
            }
        },
        apiUrlVal: {
            handler: function(val) {
                if (checkIfUrl(val)) {
                    this.apiUrlValid = 1;
                } else {
                    this.apiUrlValid = 0;
                }
            }
        },
        apiStageUrlVal: {
            handler: function(val) {
                if (checkIfUrl(val)) {
                    this.apiStageUrlValid = 1;
                } else {
                    this.apiStageUrlValid = 0;
                }
            }
        },
        apiOnlineUrlVal: {
            handler: function(val) {
                if (checkIfUrl(val)) {
                    this.apiOnlineUrlValid = 1;
                } else {
                    this.apiOnlineUrlValid = 0;
                }
            }
        }
    },
    methods: {
      onBackdropClicked() {
        this.$store.commit('HIDE_MODAL');
      },
      save() {
        if (this.modalMode === MODE_ADD) {
          this.$store.dispatch('SAVE_NEW_API', {
            name: this.apiNameVal,
            url: this.apiUrlVal,
            stag_url: this.apiStageUrlVal,
            online_url: this.apiOnlineUrlVal,
            param: $("#commonParamSelector").val(),
            header: $("#commonHeaderSelector").val(),
            valid: $("#commonValidSelector").val(),
            setup_suite: $("#setupSelector").val(),
          });
        } else if (this.modalMode === MODE_EDIT) {
          this.$store.dispatch('SAVE_OLD_API', {
            id: this.apiId,
            name: this.apiNameVal,
            url: this.apiUrlVal,
            stag_url: this.apiStageUrlVal,
            online_url: this.apiOnlineUrlVal,
            param: $("#commonParamSelector").val(),
            header: $("#commonHeaderSelector").val(),
            valid: $("#commonValidSelector").val(),
            setup_suite: $("#setupSelector").val(),
          });
        }
      }
    },
    mounted() {
      if (this.modalMode === MODE_EDIT) {
        const {id, name, url, stag_url, online_url} = this.selectedApi;
        this.apiId = id;
        this.apiNameVal = name;
        this.apiUrlVal = url;
        this.apiStageUrlVal = stag_url;
        this.apiOnlineUrlVal = online_url;
      }
      this.$nextTick(() => {
          $("#commonHeaderSelector").selectpicker();            
          $("#commonParamSelector").selectpicker();      
          $("#commonValidSelector").selectpicker();      
          $("#setupSelector").selectpicker();
          if (this.modalMode === MODE_ADD) {
            $("#commonHeaderSelector").selectpicker("val", this.defaultCommonHeader.id);
            $("#commonParamSelector").selectpicker("val", this.defaultCommonParam.id);
            $("#commonValidSelector").selectpicker("val", this.defaultCommonValid.id);
            $("#setupSelector").selectpicker("val", this.defaultSetup.id);
          } else if (this.modalMode === MODE_EDIT){
            const {header, param, valid, setup_suite} = this.selectedApi;
            $("#commonHeaderSelector").selectpicker("val", header);
            $("#commonParamSelector").selectpicker("val", param);
            $("#commonValidSelector").selectpicker("val", valid);
            $("#setupSelector").selectpicker("val", setup_suite);
          }
      });
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
