<template>
    <div>
        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">基本设置</h6>
            </div>
            <div class="card-body">
                <div class="col-lg-12">
                    <form role="form">
                        <div class="form-group">
                            <label> 接口名称 </label>
                            <input class="form-control">
                            <p class="help-block">Example block-level help text here.</p>
                        </div>
                        <div class="form-group">
                            <label> 接口路径 </label>
                            <input class="form-control" placeholder="Enter text">
                        </div>
                        <div class="form-group">
                            <label>Selects</label>
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">请求参数设置</h6>
            </div>
            <div class="card-body">

            </div>
        </div>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">返回参数设置</h6>
            </div>
            <div class="card-body">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Edit',
    }
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
