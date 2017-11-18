<style lang='scss'>
    .post-b {
        border-bottom: none;
        margin-bottom: 20px;
        padding: 0px 0px 10px;
        float:left;
         
    }

    .post-b:last-child {
        border: none;
    }
</style>
<template>
    <div  class="post-b"  >
        <el-col :xs="12" :md="8">
            <PictureList v-if="1" :item="item" :key="item._id" />
            <TopItem v-if="0" :item="item" :key="item._id" />
        </el-col>

    </div>
</template>

<script>
    import TopItem from './TopItem'
    import PictureList from './PictureList'
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
            TopItem,
            PictureList,
        },
        methods: {

        },
        computed: {

        }

    }
</script>