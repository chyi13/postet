<template>
    <div class="col-lg-12 col-md-9">
        <div class="form-row">
            <div class="col-12 col-md-11 mb-2 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">GET</span>
                </div>
                <input type="text" class="form-control form-control-lg" placeholder="Enter your url..." v-model="url">
            </div>
            <div class="col-12 col-md-1">
                <button class="btn btn-block btn-lg btn-primary" @click="send">Send!</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Run",
        data() {
            return {
                url: '',
            }
        },
        methods: {
            send() {
                this.$store.dispatch('DO_REQUEST', {url: this.url});
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
