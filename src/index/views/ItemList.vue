<style lang='scss'>
    .post-b {
        border: 1px solid #f0f0f0;
        margin-bottom: 20px;
        padding: 0px 0px 10px;
        float:left;
        width:30%;
        margin:5px;
    }

    .post-b:last-child {
        border: none;
    }
</style>
<template>
    <div class="post-b">
        <TopItem :item="item" :key="item._id" />
    </div>
</template>

<script>
    import TopItem from './MovieItem'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'itemlist',
        props: ['item'],
        data() {
            return {
                // displayedItems: this.$store.getters.contentList
            }
        },
        components: {
            // Pagination,
            TopItem
        },
        methods: {

        },
        computed: {

        }

    }
</script>