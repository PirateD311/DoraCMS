<template>
    <div class="adminUser">
        <el-tabs v-model="tabName"
            type="card">
            <el-tab-pane label="爬虫列表" name="first">
                    <el-row class="dr-datatable">
                    <el-col :span="24">
                        <DataTable :dataList="crawlerList"></DataTable>
                        <Pagination :pageInfo="crawlerList.pageInfo" pageType="ads"></Pagination>
                    </el-col>
                </el-row>               
            </el-tab-pane>
            <el-tab-pane label="创建爬虫" name="second">
                <AddCrawler></AddCrawler>
            </el-tab-pane>
            <el-tab-pane label="通用配置" name="thrid">
                    通用配置
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>
<script>

import DataTable from './dataTable.vue';
import TopBar from '../common/TopBar.vue';
import Pagination from '../common/Pagination.vue';
import AddCrawler from './AddCrawler'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'index',
    data() {
        return {
            tabName:'first'
        }
    },
    components: {
        DataTable,
        TopBar,
        AddCrawler,
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