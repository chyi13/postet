<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">基本设置</div>
          <div class="panel-body">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <label>接口名称</label>
                <div role="form">
                  <div class="form-group input-group">
                    <input class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" @click="send">
                        <i class="fa fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <form role="form">
                  <div class="form-group">
                    <label>Headers</label>
                    <codemirror v-model="code" :options="cmOptions"></codemirror>
                  </div>
                  <div class="form-group">
                    <label>Body</label>
                    <codemirror v-model="code" :options="cmOptions"></codemirror>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

export default {
  name: "Run",
  components: {
    codemirror
  },
  data() {
    return {
      code: "const a = 10",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        showCursorWhenSelecting: false
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  methods: {
    send() {
       crossRequest({
          url: 'http://testm.10jqka.com.cn/eq/newOpinion/app/main.php?question=&user_id=428865213&user_name=%D0%A1%BA%CD%C9%D0Bql&source=ths_mobile_yuyinzhushou&add_info={%22create_voice%22:{%22voiceName%22:%22%E6%9E%97%E5%BF%97%E7%8E%B2%E7%9A%84%E5%A3%B0%E9%9F%B3%22}}&control=ControlCenterV2&action=getAnswer&version=1.8&transmit=true&_=1552997561480',
          method: 'GET',
          success: function(res, header){
            console.log(res, header);
          }
      })
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
.vue-codemirror {
  height: auto;
  border: 1px solid silver;
}
.CodeMirror-empty {
  outline: 1px solid #c22;
}
.CodeMirror-empty.CodeMirror-focused {
  outline: none;
}
.CodeMirror pre.CodeMirror-placeholder {
  color: #999;
}
</style>
