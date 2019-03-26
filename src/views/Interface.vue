<template>
    <div class="home">
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">接口</h2>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <Edit/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Preview from '@/components/Interface.vue';
    import Edit from '@/components/Edit.vue';

    export default {
        name: 'home',
        components: {
            Edit
        }
    }
</script>
