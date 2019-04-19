<template>
  <div class="row">
    <div class="col-lg-12">
      <!-- Default Card Example -->
      <div class="card mb-4">
        <div class="card-header">
           <h6 class="m-0 font-weight-bold text-primary">接口</h6>
        </div>
        <div class="card-body">
          <div class="form-row">
            <div class="col-md-11 mb-2 input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">GET</span>
              </div>
              <select
                id="run_selector"
                data-live-search="true"
                class="form-control form-control-lg"
              >
                <optgroup label="Climbing">
                  <option value="pitons">Pitons</option>
                  <option value="cams">Cams</option>
                  <option value="nuts">Nuts</option>
                  <option value="bolts">Bolts</option>
                  <option value="stoppers">Stoppers</option>
                  <option value="sling">Sling</option>
                </optgroup>
                <optgroup label="Skiing" disabled>
                  <option value="skis">Skis</option>
                  <option value="skins">Skins</option>
                  <option value="poles">Poles</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="col-lg-12 col-md-9">
    <div class="form-row">
      <div class="col-md-11 mb-2 input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">GET</span>
        </div>
        <div class="input-group">
          <div class="col-md-9">
            <select id="run_selector" data-live-search="true" class="form-control form-control-lg">
              <optgroup label="Climbing">
                <option value="pitons">Pitons</option>
                <option value="cams">Cams</option>
                <option value="nuts">Nuts</option>
                <option value="bolts">Bolts</option>
                <option value="stoppers">Stoppers</option>
                <option value="sling">Sling</option>
              </optgroup>
              <optgroup label="Skiing" disabled>
                <option value="skis">Skis</option>
                <option value="skins">Skins</option>
                <option value="poles">Poles</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-1">
        <button class="btn btn-block btn-lg btn-primary" @click="send">Send!</button>
      </div>
    </div>
  </div>-->
</template>

<script>
export default {
  name: "Run",
  created() {},
  data() {
    return {
      url: ""
    };
  },
  methods: {
    send() {
      this.$store.dispatch("DO_REQUEST", { url: this.url });
    }
  },
  mounted() {
    $("#run_selector").selectpicker();
    $("#api_selector").selectpicker();
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
