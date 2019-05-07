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
                                        <div for="apiName">接口名称</div>
                                        <input type="text" class="form-control" id="apiName" v-model="apiName"/>
                                    </div>
                                    <!--<div class="mb-1 small">创建时间:</div>-->
                                    <!--<p>{{selectedApiCase.create_time}}</p>-->
                                    <div class="form-group">
                                        <label for="apiName">路径</label>
                                        <input type="text" class="form-control" id="apiUrl" v-model="apiUrl"/>
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
                                            <tr v-for="(item, index) in headers" :key="'new' + index">
                                                <td>
                                                    <input type="checkbox" class="form-control" v-model="item.checked">
                                                </td>
                                                <td>
                                                    <input class="form-control" v-model="item.key">
                                                </td>
                                                <td>
                                                    <input class="form-control" v-model="item.value">
                                                </td>
                                                <td v-if="index === headers.length - 1">
                                                    <button class="btn btn-info" @click="addNewHeader">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td v-else>
                                                    <button class="btn btn-danger"
                                                            @click="deleteNewHeader(item, index)">
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
                                            <tr v-for="(item, index) in params" :key="'new' + index">
                                                <td>
                                                    <input type="checkbox" class="form-control" v-model="item.checked">
                                                </td>
                                                <td>
                                                    <input class="form-control" v-model="item.key">
                                                </td>
                                                <td>
                                                    <input class="form-control" v-model="item.value">
                                                </td>
                                                <td v-if="index === params.length - 1">
                                                    <button class="btn btn-info" @click="addNewParam">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td v-else>
                                                    <button class="btn btn-danger"
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
                                <input class="form-control" v-model="valid"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="save">
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
        apiName: '',
        apiUrl: '',
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
      }
    },
    computed: {
      ...mapGetters([
        'showAddModal',
      ]),
    },
    methods: {
      addNewHeader() {
        this.headers.push({
          checked: false,
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
        this.$store.dispatch('SAVE_NEW_API', {
          apiName: this.apiName,
          apiUrl: this.apiUrl,
          headers: this.headers,
          params: this.params,
          valid: this.valid,
        });
      }
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
