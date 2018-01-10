<template>
    <div class="content">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="content"></TopBar>
                <DataTable :dataList="tuijianList"></DataTable>
                <Pagination :pageInfo="tuijianList.pageInfo" pageType="content"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import DataTable from './dataTable.vue';
    import TopBar from '../common/TopBar.vue';
    import Pagination from '../common/Pagination.vue';
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'index',
        data() {
            return {

            }
        },
        components: {
            DataTable,
            TopBar,
            // ContentForm,
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'tuijianList'
            ])
        },
        mounted() {
            this.$store.dispatch('getTuijianList');
        }
    }
</script>

<style lang="">

</style>