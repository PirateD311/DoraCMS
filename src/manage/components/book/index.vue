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
     
                    <el-table-column label="书名/作者" width="100%">
                        <template scope="scope">
                            {{scope.row.name}}/{{scope.row.author}}
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" prop="date" ></el-table-column>
                    <el-table-column label="描述" prop="description" ></el-table-column>
                    <el-table-column label="类别"  >
                        <template scope="scope">
                            <el-tag type="info" v-for="item in ([].concat(scope.row.categories))" > 
                                {{item | parseObj('name')}}
                             </el-tag>            
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="" @click="handleRemove(scope.row._id)">删除</el-button>
                            <el-button type="" @click="dialog1.status='edit';dialog1.visible=true;tempData=scope.row">编辑</el-button>
                        </template>
                    </el-table-column>
                    
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
               <el-form-item label="文章类别" prop="categories">
                    <el-tag type="info" v-for="item in tempData.categories" >{{item.name||item }}</el-tag>
                    <el-cascader size="small" expand-trigger="hover" :options="contentCategoryList.docs" v-model="tempData.categories"  :props="categoryProps">
                    </el-cascader>
                </el-form-item>   
                <el-form-item label="缩略图" prop="sImg">
                    <el-upload class="avatar-uploader" action="/system/upload?type=images" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tempData.sImg" :src="tempData.sImg" class="avatar" style="width:100%">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
            tempData:{categories:[]},
            listQuery:{current:1,pageSize:10},
            options:{},
            dialog1:{title:'创建',visible:false,status:'create'},       
            total:10,
            categoryProps: {
                value: '_id',
                label: 'name',
            },  
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
            await this.getList()
            this.dialog1.visible = false
        },
        async updateData(){
            await request('/book/update',Object.assign(this.tempData,{id:this.tempData._id}),'get')
            await this.getList()
            dialog1.visible=false
            this.$forceUpdate();
        },
        async resetTemp(){},
        async handleRemove(id){
            try{
                await this.$confirm('确定删除？')
                await request('/book/remove?id='+id,'get')
                await this.getList()
            }catch(error){
                this.$message(error)
            }
        },
        
        handleAvatarSuccess(res, file) {
            let imageUrl = res;
            this.tempData.sImg = res
            this.$forceUpdate();
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isGIF = file.type === 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG && !isGIF) {
                this.$message.error('上传头像图片只能是 JPG,PNG,GIF 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG || isGIF) && isLt2M;
        },
        async handleSizeChange(val){this.listQuery.pageSize = val;await this.getList()},
        async handleCurrentChange(val){this.listQuery.current = val;await this.getList()},
        async handleCreate(){
            await this.resetTemp()
            this.dialog1.title = '创建'
            this.dialog1.status = 'create'
            this.dialog1.visible = true
        },

    },
    computed:{
        ...mapGetters([
            'contentCategoryList',
            'contentTagList'
        ]),
    },
    async created(){await this.getList()},
    async mounted(){
        this.$store.dispatch('getContentCategoryList');
        this.$store.dispatch('getContentTagList', {
            pageSize: 200
        });
    },
    async asyncData(){await this.getList()},
}
</script>
<style lang="scss">
    table{width:100% !important}
</style>
