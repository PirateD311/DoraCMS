<template>
    <div>
        <!-- 横向筛选列 -->
        <el-row>
            <el-col :span="24">
                <el-form :model="form" ref="form" label-width="80px" :inline="true">
                    <el-form-item label="">
                        <el-input v-model="listQuery.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getList">应用</el-button>
                </el-form>            
            </el-col>
        </el-row>
        <!-- 中心表格 -->
        <el-row>
            <el-col :span="24">
                <el-table :data="listData" v-loading="loading" ref="mainTable" tooltip-effect="dark" style="width: 100%" align="center">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="Id" width="55" show-overflow-tooltip>
                        <template scope="scope">
                            {{scope.row.id}}
                        </template>
                    </el-table-column>
                </el-table>                
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[3,10,20,30, 50]" :page-size="listQuery.entry" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>          
            </el-col>
        </el-row>
        <!-- 表单对话框 -->
        <el-dialog :title="dialog1.title" :visible.sync="dialog1.visible">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="名称" prop="label">
                <el-input v-model="temp.label"></el-input>
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
        }
    },
    methods:{
        async getList(){

        },
        async createData(){},
        async updateData(){},
        async resetTemp(){},

        async handleSizeChange(val){this.listQuery.pageSize = val;await this.getList()},
        async handleCurrentChange(val){this.listQuery.current = val;await this.getList()},

    },
    computed:{},
    async created(){},
    async mounted(){},
    async asyncData(){},
}
</script>
<style lang="scss">
    
</style>
