<template>
    <div>
        <el-card :body-style="{ padding: '15px' }">
            <div slot="header">
                <span>导航配置</span>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-button type="text" @click="handleAdd">添加</el-button>
                </el-col>
            </el-row>
            <el-table :data="navigation" border>
                <el-table-column label="名称" prop="name">
                </el-table-column>
                <el-table-column label="图标">
                    <template scope="scope">
                        <img style="height:50px" :src="scope.row.icon" >
                    </template>
                </el-table-column>
                <el-table-column label="链接" prop="href">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.$index,scope)">编辑</el-button>
                        <el-button size="mini" @click="handleDelete(scope.$index,scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>  
        </el-card>
        <!-- 表单对话框 -->
        <el-dialog :title="dialog1.title" :visible.sync="dialog1.visible">
            <el-form  ref="dataForm" :model="tempData" label-position="left" label-width="70px" style='width: 90%; margin-left:5%;'>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="tempData.name" ></el-input>
                </el-form-item>            
                <el-form-item label="链接" prop="href">
                    <el-input v-model="tempData.href" ></el-input>
                </el-form-item>        
                <el-form-item label="图标" prop="icon">
                    <el-upload class="avatar-uploader" action="/system/upload?type=images" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tempData.icon" :src="tempData.icon" class="avatar" style="width:100%">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>                           
 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog1.visible = false">取消</el-button>
                <el-button v-if="dialog1.status=='create'" type="primary" @click="createData(tempData)">创建</el-button>
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
let dd = [
            {href:'www.baidu.com',img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=617231263,187954695&fm=26&gp=0.jpg'}
        ]
export default {
data(){
    return {
        // banner:default,
        dialog1:{title:'创建',visible:false,status:'create'},
        tempData:{},
        configs:{},
    }
},
computed: {
    ...mapGetters([
        'systemConfig'
    ]),
    navigation(){
        let systemConfig = this.$store.getters['systemConfig']
        console.log(`systemConfig:`,systemConfig)
        this.configs = systemConfig.configs
        let navigation
        try{
            navigation = JSON.parse(this.configs.navigation)
        }catch(error){
            error
        }
        return navigation||dd
    }
},
async mounted() {
//    this.$store.dispatch('getSystemConfig'); 
},
methods:{
        handleAvatarSuccess(res, file) {
            let imageUrl = res;
            this.tempData.icon = res
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
    async createData(data){
        this.navigation.push(data)
        await request('/systemConfig/editConfig',{id:this.configs._id,navigation:JSON.stringify(this.navigation)})
        this.$message('创建成功!')
        this.dialog1.visible = false       
    },
    async updateData(item){
        // await request('/book/update',Object.assign(this.tempData,{id:this.tempData._id}),'get')
        // await this.getList()
        this.navigation[this.tempData.index] = this.tempData
        let data = await request('/systemConfig/editConfig',{id:this.configs._id,navigation:JSON.stringify(this.navigation)})
        this.$message(`编辑成功！`)
        this.dialog1.visible=false
        this.$forceUpdate();   
    },
    async handleAdd(){
        this.tempData = {}
        this.dialog1.visible = true
        this.dialog1.status = 'create'
        this.dialog1.title = '创建'      
    },
    async handleUpdate(index,scope){
        console.log(`scope:`,scope)
        this.tempData = this.navigation[index]
        this.tempData.index = index
        this.dialog1.visible =true
        this.dialog1.status = 'edit'
        this.dialog1.title = '编辑'
    },
    async handleDelete(index,scope){
        try{
            await this.$confim('确定删除？')
            this.navigation.splice(index,1)
            await request('/systemConfig/editConfig',{id:this.configs._id,navigation:JSON.stringify(this.navigation)})
            this.$message(`删除成功!`)
        }catch(error){
            this.$message('取消删除!')
        }
    }
}
}
</script>