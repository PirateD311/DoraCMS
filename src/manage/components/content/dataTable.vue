<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="isTop" label="顶置" width="55" show-overflow-tooltip>
                <template scope="scope">
                    <i @click="update(scope.$index, {isTop:scope.row.isTop === 1?0:1})" :class="scope.row.isTop === 1 ? 'fa fa-star' : 'fa fa-star-o'" :style="scope.row.isTop === 1 ? yellow : gray"></i>
                </template>
            </el-table-column>
            <el-table-column prop="isTop" label="加精" width="55" show-overflow-tooltip>
                <template scope="scope">
                    <i @click="update(scope.$index, {refined:!scope.row.refined})" :class="scope.row.refined ? 'fa fa-star' : 'fa fa-star-o'" :style="scope.row.isTop? yellow : gray"></i>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200" show-overflow-tooltip>
                <template scope="scope"><a :class="{vip:scope.row.isVip}" :href="'/details/'+scope.row._id+'.html'" target="_blank">{{scope.row.title}}</a></template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180">
                <template scope="scope">{{scope.row.updateDate}}</template>
            </el-table-column>
            <el-table-column prop="categories" label="类别" show-overflow-tooltip width="120">
                <template scope="scope">{{typeof scope.row.categories == 'object' && scope.row.categories.length > 1 ? scope.row.categories[scope.row.categories.length-1].name : '其它'}}</template>
            </el-table-column>

            <el-table-column prop="from" label="星级" >
                <template scope="scope"> 
                    <el-button size="mini" type="primary" plain round @click="tuijianContent(scope.$index, dataList)">
                        {{scope.row.star}}
                        <i class="fa fa-star"></i>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="clickNum" label="点击" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="commentNum" label="评论数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state" label="显示" show-overflow-tooltip>
                <template scope="scope">
                    <i :class="scope.row.state ? 'fa fa-check-circle' : 'fa fa-minus-circle'" :style="scope.row.state ? green : red"></i>
                </template>
            </el-table-column>
            <el-table-column prop="author.name" label="作者" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="from" label="来源" show-overflow-tooltip>
                <template scope="scope">{{scope.row.from === '1'?'原创':'转载'}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    
                    <el-button size="mini" type="primary" plain round @click="editContentInfo(scope.$index, dataList)">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="deleteContent(scope.$index, dataList)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">
.fa-star {
    cursor: pointer
}

.fa-star-o {
    cursor: pointer
}
.vip{
    border-left: 2px solid #FF5722;
}
</style>
<script>
import services from '../../store/services.js';
export default {
    props: {
        dataList: Array
    },
    data() {
        return {
            loading: false,
            multipleSelection: [],
            yellow: {
                color: '#F7BA2A'
            },
            gray: {
                color: '#CCC'
            },
            green: { color: '#13CE66' },
            red: { color: '#FF4949' }
        }
    },

    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        editContentInfo(index, rows) {
            let rowData = rows[index];
            let categoryIdArr = [],
                tagsArr = [];
            rowData.categories && rowData.categories.map((item, index) => {
                categoryIdArr.push(item._id);
            })
            rowData.tags && rowData.tags.map((item, index) => {
                tagsArr.push(item._id);
            })
            rowData.categories = categoryIdArr;
            rowData.tags = tagsArr;
            console.log('rowData:',rowData)
            this.$store.dispatch('showContentForm', {
                edit: true,
                formData: rowData
            });
            this.$router.push('/editContent/' + rowData._id);
        },
        async tuijianContent(index,rows){
            try{
                let rowData = rows[index];
                let {value} = await this.$prompt('请输入星级[0,5]', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[0-5]/,
                    inputErrorMessage: '推荐指数格式不正确.[0,5]'
                })
                let update = {star:value,_id:rowData._id}
                let result = await services.updateContent(update)
                if (result.data.state === 'success') {
                    rows[index] = Object.assign(rowData,update)
                    this.$message({
                        type: 'success',
                        message: '推荐成功: '
                    });
                } else {
                    this.$message.error(result.data.message);
                }     
            }catch(error){
                this.$message({
                    type: 'info',
                    message: '放弃推荐'
                }); 
            }
        },
        topContent(index, rows) {
            let contentData = rows[index];
            contentData.isTop = contentData.isTop == 1 ? 0 : 1;
            services.updateContent(contentData).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('getContentList');
                } else {
                    this.$message.error(result.data.message);
                }
            });
        },
        async update(index,data){
            let row = this.dataList[index],
                update = Object.assign({},data,{_id:row._id})
            let result = await services.updateContent(update)
            if (result.data.state === 'success') {
                this.dataList[index] = Object.assign(row,data)
            } else {
                this.$message.error(result.data.message);
            }            
        },
        deleteContent(index, rows) {
            this.$confirm('此操作将永久删除该文档, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return services.deleteContent({
                    ids: rows[index]._id
                });
            }).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('getContentList');
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(result.data.message);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    computed: {

    }
}

</script>
