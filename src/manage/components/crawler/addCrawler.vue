<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="dr-adminGroupForm">
                    <el-form :model="task"  size="mini"  label-width="100px" class="demo-ruleForm">
                        <el-form-item label="爬虫任务名" prop="name">
                            <el-input size="small" v-model="task.opt.name"></el-input>
                        </el-form-item>
                        <el-form-item label="重置" prop="state">
                            <el-switch on-text="是" off-text="否" v-model="task.opt.reload"></el-switch>
                        </el-form-item>
                        <el-form-item label="文章列表地址" prop="articleList">
                            <el-input size="small" v-model="task.opt.articleList"></el-input>
                        </el-form-item>
                        <el-form-item  label="文章匹配规则" prop="articleUrlMatch">
                            <el-row :gutter="5">                   
                                <el-col :span="10"><el-select size="mini" v-model="task.opt.articleUrlMatch.type"><el-option key="jquery" label="jquery" value="jquery"></el-option></el-select></el-col>
                                <el-col :span="12"><el-input  size="mini" v-model="task.opt.articleUrlMatch.value"></el-input></el-col>
                            </el-row>        
                            <el-row :gutter="5">
                                <el-col :span="16"><el-input placeholder="测试连接" size="mini" v-model="testArticleListUrl"></el-input></el-col>
                                <el-col :span="8"><el-button  type="success" @click="testArticleList"  size="mini" >测试</el-button></el-col>
                            </el-row>               
                        </el-form-item>            
                        <el-form-item label="标题匹配规则" prop="articleTitleMatch">
                            <el-row :gutter="5">
                                <el-col :span="8"><el-select size="mini" v-model="task.opt.articleTitleMatch.type"><el-option key="jquery" label="jquery" value="jquery"></el-option></el-select></el-col>
                                <el-col :span="12"><el-input  size="mini" v-model="task.opt.articleTitleMatch.value"></el-input></el-col>
                            </el-row>                          
                        </el-form-item>
                        <el-form-item label="正文匹配规则" prop="articleContentMatch">
                            <el-row :gutter="5">                   
                                <el-col :span="8"><el-select size="mini" v-model="task.opt.articleContentMatch.type"><el-option key="jquery" label="jquery" value="jquery"></el-option></el-select></el-col>
                                <el-col :span="12"><el-input  size="mini" v-model="task.opt.articleContentMatch.value"></el-input></el-col>
                            </el-row>     
                            <el-row :gutter="5">
                                <el-col :span="16"><el-input placeholder="测试连接" size="mini" v-model="testPageUrl"></el-input></el-col>
                                <el-col :span="8"><el-button  type="success"  @click="testArticlePage" size="mini" >测试</el-button></el-col>
                            </el-row>                                         
                        </el-form-item>   
                        <br>
                        <el-form-item>
                            <el-button size="medium" type="primary" @click="createCrawlerTask" >创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>            
            </el-col>
            <el-col :span="10">
                <div v-if="articleList">
                    <div>总计:{{articleList.length}}</div>
                    <el-table :data="cutPage(articleList)" stripe height="300">
                        <el-table-column prop="lable" label="标签"></el-table-column>
                        <el-table-column prop="url" label="地址"></el-table-column>
                    </el-table>              
                </div>
                <div v-if="page">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">{{page.title}}</div>
                        <div class="text item" v-html="page.content">                        
                        </div>
                    </el-card>
                </div>
            </el-col>

        </el-row>
    </div>

</template>
<script>
import services from '../../store/services.js';
const validatorUtil = require('../../../../utils/validatorUtil.js')
import _ from 'lodash'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            task:{
                opt:{
                    name:'一念永恒',
                    articleList:'http://www.biquge5200.com/38_38857/',
                    articleUrlMatch:{type:'jquery',value:'#list a'},
                    articleTitleMatch:{type:'jquery',value:'.bookname h1'},
                    articleContentMatch:{type:'jquery',value:'#content'},
                }
            },
            currentPage:1,
            pageSize:20,
            articleList:[{label:'aaa',url:'asgasg'}],
            page:{title:"",content:""}
        };
    },
    components: {
        // ItemForm
    },
    methods: {
        async createCrawlerTask(){
            let option = this.task.opt
            option.articleList = [].concat(option.articleList.split(','))
            console.log('Option:',option)
            option = JSON.stringify(option)
            let resp = await services.createCrawlerTask({option})
            console.log(resp)
            if(resp.data.state === 'success'){
                this.$message('创建成功!')
                this.$router.push('/crawler');
            }else{
                this.$message('创建失败!')
            }

        },
        async testArticleList(){
            if(this.testArticleListUrl){
                let params = {
                    type:'list',
                    option:JSON.stringify(this.task.opt),
                    url:this.testArticleListUrl
                }
                let resp = await services.testCrawlerTask(params)
                if(resp.data.state === 'success'){
                    this.$message('测试成功.')
                    this.articleList = resp.data.doc
                    console.log(resp.data)
                }else{
                    this.$message('测试失败.')
                }
            }else{
                this.$message('缺少测试Url')
            }
        },
        cutPage(array,pageNo=1 ){
            if(this.reverse){
                array = array.reverse()
            }
            let pageSize = this.pageSize||20
            let offset = (pageNo - 1) * pageSize;  
            return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);  
        },
        async testArticlePage(){
            if(this.testPageUrl){
                let params = {
                    type:'page',
                    option:JSON.stringify(this.task.opt),
                    url:this.testPageUrl
                }
                let resp = await services.testCrawlerTask(params)
                if(resp.data.state === 'success'){
                    this.$message('测试成功.')
                    this.page = resp.data.doc

                }else{
                    this.$message('测试失败.')
                }
            }else{
                this.$message('缺少测试Url')
            }
        },
    },
    computed: {
    },
    mounted() {
        // 针对手动页面刷新
        console.log(this.$route.params)
        if (this.$route.params.name) {
            console.log('params:',this.$route.params)
            this.getCrawlerTaskDetail(this.$route.params.name)
        }
    }
}
</script>
<style lang="scss">
.info-item{margin:5 0px;}
.success-row{background: #f0f9eb}
</style>