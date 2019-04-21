<template>
    <div id="wrapper">
        <!-- Sidebar -->
        <api-list></api-list>
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!-- Topbar -->
                <TopBar></TopBar>
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Masthead -->
                    <section class="features-icons bg-light">
                        <div class="container-fluid main-container">
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <Run></Run>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="features-icons bg-light">
                        <div class="container-fluid main-container">
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <Edit></Edit>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <!-- Navigation -->
        <!-- <nav class="navbar navbar-light bg-light static-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Postet</a>
                    <a class="btn btn-primary" href="#">Sign In</a>
                </div>
        </nav>-->

        <!-- Masthead -->
        <!-- <header class="masthead text-white text-center">
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-9 mx-auto">
                            <h1 class="mb-5">Postet</h1>
                        </div>
                        <Run></Run>
                    </div>
                </div>
        </header>-->
        <!-- Icons Grid -->

        <Result></Result>
    </div>
</template>
<script>
    import Run from "./components/Run.vue";
    import Edit from "./components/Edit.vue";
    import Result from "./components/Result.vue";
    import TopBar from "./components/TopBar.vue";
    import ApiList from "./components/APIList.vue";

    export default {
        name: "home",
        created() {
            this.$store.dispatch("UPDATE_API_IDS");
        },
        data() {
            return {
                tabSelected: "preview",
                showModal: false
            };
        },
        components: {
            ApiList,
            Edit,
            Run,
            Result,
            TopBar
        },
        methods: {
            onTabClicked(tabName) {
                this.tabSelected = tabName;
            }
        }
    };
</script>
<style>
    #wrapper {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
    }

    .modal-lg {
        min-width: 65%;
    }
</style>
