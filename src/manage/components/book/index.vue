<template>
    <div>
        <!-- 横向筛选列 -->
        <el-row>
            <el-col :span="24">
                <el-form :model="listQuery" ref="form" label-width="80px" :inline="true">
                    <el-form-item label="">
                        <el-input size="small" v-model="listQuery.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button size="small" class="filter-item" type="primary"  icon="el-icon-search" @click="getList">应用</el-button>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button size="small" class="filter-item" type="primary"  icon="el-icon-add" @click="handleCreate">新增</el-button>
                    </el-form-item>
                    
                </el-form>            
            </el-col>
        </el-row>
        <br>
        <!-- 中心表格 -->
        <el-row>
            <el-col :span="24">
                <el-table :data="listData"    style="width: 100%"  >
                    <el-table-column type="selection" width="100%">
                    </el-table-column>
                    <el-table-column label="书名/作者" width="100%">
                        <template scope="scope">
                            {{scope.row.name}}/{{scope.row.author}}
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" prop="date" ></el-table-column>
                    <el-table-column label="描述" prop="description" ></el-table-column>
                    <el-table-column label="类别" prop="categories" ></el-table-column>
                    
                    
                </el-table>                
            </el-col>
        </el-row>
        <br><br>
        <el-row>
            <el-col :span="24">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.current" :page-sizes="[3,10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>          
            </el-col>
        </el-row>
        <!-- 表单对话框 -->
        <el-dialog :title="dialog1.title" :visible.sync="dialog1.visible">
            <el-form  ref="dataForm" :model="tempData" label-position="left" label-width="70px" style='width: 90%; margin-left:5%;'>
                <el-form-item label="书名" prop="label">
                    <el-input v-model="tempData.name" ></el-input>
                </el-form-item>      
                <el-form-item label="作者" prop="label">
                    <el-input v-model="tempData.author" ></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="label">
                    <el-input v-model="tempData.categories" ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="label">
                    <el-input v-model="tempData.description" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog1.visible = false">取消</el-button>
                <el-button v-if="dialog1.status=='create'" type="primary" @click="createData">创建</el-button>
                <el-button v-else type="primary" @click="updateData">编辑</el-button>
            </div>
        </el-dialog>                
    </div>
</template>
<script>
import {request} from '../../store/services'

import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name:'',
    components:{},
    data(){
        return {
            listData:[],
            tempData:{},
            listQuery:{current:1,pageSize:10},
            options:{},
            dialog1:{title:'创建',visible:false,status:'create'},       
            total:10     
        }
    },
    methods:{
        async getList(){
            let {docs,current,pageSize,totalItem} = await request('/book',this.listQuery)
            this.listData = docs
            this.listQuery.current = current
            this.listQuery.pageSize = pageSize
        },
        async createData(){
            let data = await request('/book',this.tempData,'post')
            this.listData = [data].concat(this.listData)
            this.dialog1.visible = false
        },
        async updateData(){},
        async resetTemp(){},

        async handleSizeChange(val){this.listQuery.pageSize = val;await this.getList()},
        async handleCurrentChange(val){this.listQuery.current = val;await this.getList()},
        async handleCreate(){
            await this.resetTemp()
            this.dialog1.title = '创建'
            this.dialog1.status = 'create'
            this.dialog1.visible = true
        },

    },
    computed:{},
    async created(){await this.getList()},
    async mounted(){},
    async asyncData(){await this.getList()},
}
</script>
<style lang="scss">
    table{width:100% !important}
</style>
