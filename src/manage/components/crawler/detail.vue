<template>
    <div class="dr-adminGroupForm">
        <el-form :model="task" :inline="true" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="爬虫任务名" prop="name">
                <el-input size="small" v-model="task.name"></el-input>
            </el-form-item>
            <el-form-item label="重置" prop="state">
                <el-switch on-text="是" off-text="否" v-model="task.opt.reload"></el-switch>
            </el-form-item>
            <el-form-item label="文章列表地址" prop="articleList">
                <el-input size="small" v-model="task.opt.articleList"></el-input>
            </el-form-item>
            <br>
            <el-form-item  label="文章匹配规则" prop="articleUrlMatch">
                <el-select size="mini" v-model="task.opt.articleUrlMatch.type"></el-select>
            </el-form-item>
            <el-form-item  label="" prop="articleUrlMatch">
                <el-input  size="mini" v-model="task.opt.articleUrlMatch.value"></el-input>
            </el-form-item>  
            <br>          
            <el-form-item label="标题匹配规则" prop="articleTitleMatch">
                <el-input size="small" v-model="task.opt.articleTitleMatch.type"></el-input>        
            </el-form-item>
            <el-form-item><el-input size="small" v-model="task.opt.articleTitleMatch.value"></el-input></el-form-item>   
            <el-form-item label="正文匹配规则" prop="articleContentMatch">
                <el-input size="small" v-model="task.opt.articleContentMatch.type"></el-input> 
            </el-form-item>
            <el-form-item><el-input size="small" v-model="task.opt.articleContentMatch.value"></el-input></el-form-item>
            <br>
            <el-form-item>
                <el-button size="medium" type="primary" @click="excTask()">执行</el-button>
                <el-button v-if="!isRealTimeData" size="medium" type="warning" @click="realTimeData()">实时监控</el-button>
                <el-button v-else size="medium" type="success"><i class="el-icon-loading"></i>实时监控中</el-button>
            </el-form-item>
        </el-form>
        <el-card class="box-card">
            <div class="text item">
                <el-row>
                    <el-col class="info-item" :span="8">总文章数:{{task.articleTasks.length}}</el-col>
                    <el-col class="info-item" :span="8">已完成:{{task.info.done}}</el-col>
                    <el-col class="info-item" :span="8">待完成:{{task.articleTasks.length - task.info.done}}</el-col>
                    <el-col class="info-item" :span="8">执行信息:
                        <el-tag v-if="task.info.running" size="mini" type="success"><i class="el-icon-loading"></i>{{task.info.running?'执行中':'停止'}}</el-tag>
                        <el-tag v-else size="mini" type="danger">{{task.info.running?'执行中':'停止'}}</el-tag>
                    </el-col>
                    <el-col class="info-item" :span="8">阶段:<el-tag size="mini">{{task.info.step||'无阶段'}}</el-tag></el-col>
                    <el-col class="info-item" :span="8">启动时间:<el-tag size="mini">{{task.info.startTime||'暂无'}}</el-tag></el-col>
                    <el-col class="info-item" :span="8">终止时间:<el-tag size="mini">{{task.info.stopTime||'暂无'}}</el-tag></el-col>
                    <el-col class="info-item" :span="8">进度:<el-progress style="width:200px;display: inline-block;" :text-inside="true" :stroke-width="18" :percentage="calProgress()"></el-progress></el-col>
                </el-row>
                <el-tabs v-model="tabName" type="card">
                    <el-tab-pane label="列表" name="first">              
                <el-row>
                    <div>

                    </div>
                    <el-table :data="cutPage(task.articleTasks,currentPage)" stripe fit="false" style="width: 100%;" height="600"
                        :default-sort = "{prop: 'sortId', order: 'descending'}"
                    >
                        <el-table-column prop="content" label="正文" type="expand" >
                            <template slot-scope="props">
                                <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>{{props.row.title}}</span>
                                </div>
                                <div v-html="props.row.content"  class="text item">
                                    
                                </div>
                                </el-card>                       
                            </template>                
                        </el-table-column>         
                        <el-table-column prop="sortId" label="序号" width="100" sortable>
                        </el-table-column>
                        
                        <el-table-column class="success-row"
                            prop="lable"
                            label="标签"
                            width="200">
                        </el-table-column>
                        <el-table-column width="400"
                            prop="url"
                            label="地址"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column prop="content" label="状态" >
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.row.content">
                                        <el-tag type="success"><i class="el-icon-success"></i>已完成</el-tag>
                                        <el-tag v-if="scope.row.doneTime" type="success"><i class="el-icon-success"></i>{{scope.row.doneTime}}</el-tag>
                                    </div>
                                    <div v-else><el-tag type="warning"><i class="el-icon-warning"></i>待执行</el-tag></div>
                                </div>
                            </template>
                        </el-table-column>                
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="" @click="editContentInfo(scope.row)">发布</el-button>
                                
                            </template>
                        </el-table-column>
                        
                    </el-table>                    
                </el-row>
                <el-row>
                    <div class="block">
                        <el-pagination
                            @current-change="switchPage" layout="prev, pager, next" :total="task.articleTasks.length" :page-size="pageSize">
                        </el-pagination>
                    </div>
                </el-row>                      
                    </el-tab-pane>
                    <el-tab-pane label="发布" name="second">
                        
                    </el-tab-pane>
                    
                </el-tabs>

            </div>
        </el-card>
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
            tabName:'first',
            rules: {
                name: [{
                    required: true,
                    message: '请输入广告名称',
                    trigger: 'blur'
                }, {
                    min: 2,
                    max: 15,
                    message: '请输入2-15个字符',
                    trigger: 'blur'
                }],
                comments: [{
                    required: true,
                    message: '请填写备注',
                    trigger: 'blur'
                }, {
                    min: 5,
                    max: 30,
                    message: '请输入5-30个字符',
                    trigger: 'blur'
                }]
            },
            task:{},
            currentPage:1,
            pageSize:20
        };
    },
    components: {
        // ItemForm
    },
    methods: {
         editContentInfo(rowData) {
            
            rowData.title = rowData.title
            rowData.comments = rowData.content
            console.log('rowData:',rowData)
            this.$store.dispatch('showContentForm', {
                crawlerPublish:true,
                formData: rowData
            });
            this.$router.push('/addContent');
        },       
        calProgress(){
            if(this.task.articleTasks.length>0){
                let done = 0
                for(let i of this.task.articleTasks){
                    if(i.title && i.content)done++
                }
                this.task.info.done = done
                return parseInt(done/this.task.articleTasks.length*10000)/100
            }else{
                return 0
            }
        },
        getTotalPage(array,pageSize=20){
            return parseInt(array.length/pageSize)+1
        },
        calTagType(flag){
            return flag?'success':'danger'
        },
        switchPage(currentPage){
            this.currentPage = currentPage
        },
        cutPage(array,pageNo=1 ){
            if(this.reverse){
                array = array.reverse()
            }
            let pageSize = this.pageSize||20
            let offset = (pageNo - 1) * pageSize;  
            return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);  
        },
        async realTimeData(){
            let task = this.task
            this.isRealTimeData = true
            if(task.info.running){
                console.log('任务执行中.');
                await this.getCrawlerTaskDetail(task.name)
                setTimeout(()=>{
                    this.realTimeData();
                },5000)
            }else{
                this.isRealTimeData = false
                this.$message(`请先启动任务!`,'error')
            }
        },
        async getCrawlerTaskDetail(name){
            let result = await services.getOneCrawlerTask({name})
            console.log('result:',result)
            if (result.data.state === 'success') {
                if (result.data.doc) {
                    this.task = result.data.doc.data
                    this.$forceUpdate()
                    console.log('Task:',this.task)
                } else {
                    this.$message(`查询任务详情错误!`);
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        async excTask() {
            let resp = await services.excCrawlerTask({name:this.task.name})
            this.task.info.running = true
            console.log(resp);
        }
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