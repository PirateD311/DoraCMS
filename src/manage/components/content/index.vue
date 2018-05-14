<template>
    <div class="content">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="content"></TopBar>
                <el-row :span="24" :gutter='20' >
                    <el-col :md='4'>
                        <el-select size="mini" v-model="query.status" placeholder="文章状态">
                            <el-option v-for="status in postStatus" :key="status.value" :value="status.value" :label="status.label"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :md='4'>
                        <el-select size="mini" v-model="query.isTop" placeholder="是否置顶">
                            <el-option v-for="item in postTop" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
                        </el-select>
                    </el-col>
                    <el-col :md='4'>
                        <el-select size="mini" v-model="query.sortby" placeholder="排序">
                            <el-option v-for="item in postSort" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
                        </el-select>
                    </el-col>
                    <el-col :md='4'>
                        <el-select size="mini" v-model="query.sortbypre" placeholder="顺序">
                            <el-option  value="+" >低->高</el-option>
                            <el-option  value="-" >高->低</el-option>
                        </el-select>
                    </el-col>
                    <el-col :md='4'>
                        <el-button size="mini" @click="getList()">应用</el-button>
                    </el-col>
                </el-row>
                <DataTable :dataList="contentList.docs"></DataTable>
                <Pagination :pageInfo="contentList.pageInfo" pageType="content"></Pagination>
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

    const postStatus = [{label:'全部',value:'all'},{label:'已发布',value:'publish'},{label:'草稿',value:'draft'},{label:'待审核',value:'pending'}]
    const postTop = [{label:'全部',value:-1},{label:'顶置',value:1},{label:'非置顶',value:0}]
    const postSort = [{label:'日期',value:'date'},{label:'阅读',value:'clickNum'},{label:'评论',value:'commentNum'},{label:'点赞',value:'likeNum'}]

    export default {
        name: 'index',
        data() {
            return {
                query:{
                    model:'all',
                    status:'publish',
                    sortby:'date',
                    sortbypre:'-',
                    isTop:-1,
                    status:'all',
                },
                // contentList:{docs:[],pageInfo:{}},
                postStatus,postTop,postSort
            }
        },
        components: {
            DataTable,
            TopBar,
            // ContentForm,
            Pagination
        },
        methods: {
            async getList(){
                this.query.sortby = this.query.sortbypre + this.query.sortby
                await this.$store.dispatch('getContentList',this.query);
            }
        },
        // async created(){
        //     await this.getList()
        // }
        computed: {
            ...mapGetters([
                'contentList'
            ])
        },
        mounted() {
            console.log('query:',this.query)
            this.$store.dispatch('getContentList',this.query);
        }
    }
</script>

<style lang="">

</style>