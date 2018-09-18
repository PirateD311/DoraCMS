<template>
    <div>
        <el-table align="center" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="任务名" width="120">
            </el-table-column>
            <el-table-column prop="articleCount" label="文章链接数" width="80"></el-table-column>
            <el-table-column prop="doneCount" label="完成数" width="80"></el-table-column>
            <el-table-column prop="ratio" label="完成度" width="80"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="mini" type="primary" plain round @click="showTaskInfo(scope.$index, dataList)"><i class="fa fa-edit"></i></el-button>
                    <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="deleteAds(scope.$index, dataList)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import services from '../../store/services.js';
export default {
    props: {
        dataList: Array
    },
    data() {
        return {
            green: { color: '#13CE66' },
            red: { color: '#FF4949' }
        }
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        showTaskInfo(index, rows) {
            let rowData = rows[index];
            this.$store.dispatch('crawlerDetail', {
                edit: true,
                formData: rowData
            });
            this.$router.push('/crawler/' + rowData.name);
        },
        deleteAds(index, rows) {
            this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return services.delAds({
                    ids: rows[index]._id
                });
            }).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('getAdsList');
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
    }
}
</script>