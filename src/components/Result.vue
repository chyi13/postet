<template>
    <div>
        <div v-if="showResult" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" :class="[showResult ? 'show modal-display' : 'fade']">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">运行结果</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="onBackdropClicked">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <json-viewer
                                :value="jsonHeader"
                                :expand-depth=5
                                copyable
                                boxed
                                sort></json-viewer>
                        <json-viewer
                                :value="jsonBody"
                                :expand-depth=5
                                copyable
                                boxed
                                sort></json-viewer>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onBackdropClicked">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal">
            <div v-if="showResult" class="modal-backdrop" :class="[showResult ? 'show' : 'fade']"></div>
        </transition>
    </div>
</template>

<script>
    import JsonViewer from 'vue-json-viewer';

    import { mapGetters } from 'vuex';
    import {isJSON} from "../utils";

    export default {
        name: "Result",
        props: {
        },
        components: {
            JsonViewer
        },
        computed: {
            ...mapGetters([
                'showResult',
                'resultHeader',
                'resultBody',
            ]),
            jsonHeader() {
                if (isJSON(this.resultHeader)) {
                    return JSON.parse(this.resultHeader);
                } else {
                    return this.resultHeader;
                }
            },
            jsonBody() {
                if (isJSON(this.resultBody)) {
                    return JSON.parse(this.resultBody);
                } else {
                    return this.resultBody;
                }
            }
        },
        methods: {
            onBackdropClicked() {
                this.$store.commit('HIDE_RESULT');
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
        display: block; padding-right: 15px;
    }
</style>
