<template>
  <div class="homeWrap">
    <el-container class="main_container">
      <el-header><span style="font-size:40px;">My Web</span></el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="tool" @click="$router.push({name:'Bilibili'})">B站分p时长计算</span>
          </div>
          <div class="text item">
            <span class="tool-desc">根据BV号以及起止分p号计算出累计时长</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toBilibili">进入</el-button>
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="tool" @click="$router.push({name:'Elec'})">HUST宿舍电量趋势查询</span>
          </div>
          <div class="text item">
            <span class="tool-desc">显示出宿舍近10天来电量变化情况</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toElec" >进入</el-button>
          </div>
        </el-card>

      </el-main>

      <el-footer>该网站由HUST D724构建</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    toBilibili() {
      this.$router.push({
        name: 'Bilibili',
      })
    },
    toElec() {
      this.$router.push({
        name: 'Elec',
      })
    }
  },
};
</script>

<style scoped>
/* 功能名 */
.tool {
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
}

.tool-desc {
  font-size: 20px;
}

/* 卡片 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 50px;
  display: inline-block;
}

/* 用来让布局充满整个屏幕 */
.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main_container {
  height: 100%;
}

/* 布局 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>