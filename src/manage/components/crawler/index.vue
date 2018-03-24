<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="crawler"></TopBar>
                <DataTable :dataList="crawlerList"></DataTable>
                <Pagination :pageInfo="crawlerList.pageInfo" pageType="ads"></Pagination>
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

        Pagination
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'crawlerList'
        ]),
        formState() {
            return this.$store.getters.adsInfoForm
        }
    },
    mounted() {
        this.$store.dispatch('getCrawlerList');
    }
}
</script>

<style lang="">

</style>