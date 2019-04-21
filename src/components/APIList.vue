<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Components</span>
            </a>
        </li>
        <li v-for="(item, index) in apiIds" class="list_item_container" :key="index">
            <div class="bg-white py-2 collapse-inner">
                <a class="list_item_inner" href="buttons.html">{{item.name}}</a>
            </div>
        </li>
    </ul>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'api-list',
        computed: {
            ...mapGetters([
                'apiIds',
            ]),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list_item_container {
        margin: 0 1rem;
    }
    .list_item_inner {
        padding: .5rem 1rem;
        margin: 0 .5rem;
        display: block;
        color: #3a3b45;
        text-decoration: none;
        border-radius: .35rem;
        white-space: nowrap;
        font-size: .85rem;
        border: none;
    }
    .list_item_inner:hover {
        background-color: #eaecf4
    }
</style>
