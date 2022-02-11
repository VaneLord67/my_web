<template>
  <div style="text-align: center; margin-top: 150px">
    <h1>B站分P总时长计算</h1>
    视频BV号<el-input style="width: 180px;margin-bottom: 5px" v-model="BVNumber" placeholder="视频BV号"></el-input>
    <!-- 视频BV号<input type="text" v-model="BVNumber" placeholder="输入BV号" /> -->
    <br />
    起始分P号<el-input-number style="margin-bottom: 5px" v-model="start" :min="1" :max="videoList.length" label="描述文字"></el-input-number>
    <br />
    结束分P号<el-input-number v-model="end" :min="1" :max="videoList.length" label="描述文字"></el-input-number>
    <br />
    <el-button @click="proc" type="primary" round>重新计算时长</el-button>
    <hr />
    <div v-show="title">
      <h1>
        视频标题：<a :href="videoUrl">{{ title }}</a>
      </h1>
      <div style="width: 60%; margin: 0 auto;">{{ desc }}</div>
      UP主：<a :href="ownerUrl">{{ owner.name }}</a>
      <h1 v-if="isShowDuration">p{{start}}-p{{end}}累计时长：{{hour}}小时{{this.minute}}分钟{{this.second}}秒</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Bilibili',
  data() {
    return {
      BVNumber: "",
      start: null,
      end: null,
      title: "",
      pic: "",
      owner: {
        name: "",
        face: "",
        mid: "",
      },
      desc: "",
      videoList: [],
      hour: 0,
      minute: 0,
      second: 0,
      isShowDuration: false,
    };
  },
  watch: {
    start() {
      if (this.BVNumber) {
        let sum = 0;
        for (let index = this.start - 1; index < this.end; index++) {
          if (index < 0 || index >= this.videoList.length) {
            return alert("分p非法");
          }
          sum += this.videoList[index].duration;
        }
        this.hour = Math.floor(sum / 3600);
        sum %= 3600;
        this.minute = Math.floor(sum / 60);
        sum %= 60;
        this.second = sum;
      } else {
        this.isShowDuration = false
      }
    },
    end() {
      if (this.BVNumber) {
        let sum = 0;
        for (let index = this.start - 1; index < this.end; index++) {
          if (index < 0 || index >= this.videoList.length) {
            return alert("分p非法");
          }
          sum += this.videoList[index].duration;
        }
        this.hour = Math.floor(sum / 3600);
        sum %= 3600;
        this.minute = Math.floor(sum / 60);
        sum %= 60;
        this.second = sum;
      } else {
        this.isShowDuration = false
      }
    },
    BVNumber() {
      if (!this.BVNumber) {
        this.isShowDuration = false
        this.videoList = []
        this.start = 1
        this.end = 1
        return
      }
      axios
        .get("http://localhost:8081/api/x/web-interface/view", {
          params: {
            bvid: this.BVNumber,
          },
        })
        .then(
          (response) => {
            if (response.data.code === -400) {
              // return alert("BV号填写有误！");
              return
            }
            let data = response.data.data;
            this.title = data.title;
            this.desc = data.desc.replace(/[\r\n]/g, "");
            this.owner.name = data.owner.name;
            this.owner.face = data.owner.face;
            this.owner.mid = data.owner.mid;
            this.pic = data.pic;
            this.videoList = response.data.data.pages;
            this.start = 1
            this.end = this.videoList.length

            let sum = 0;
            for (let index = this.start - 1; index < this.end; index++) {
              if (index < 0 || index >= this.videoList.length) {
                return alert("分p非法");
              }
              sum += this.videoList[index].duration;
            }
            this.hour = Math.floor(sum / 3600);
            sum %= 3600;
            this.minute = Math.floor(sum / 60);
            sum %= 60;
            this.second = sum;
            this.$nextTick(() => {
              this.isShowDuration = true
            })
          }
        )
    }
  },
  computed: {
    videoUrl() {
      return `https://www.bilibili.com/video/${this.BVNumber}`;
    },
    ownerUrl() {
      return `https://space.bilibili.com/${this.owner.mid}`;
    },
  },
  methods: {
    proc() {
      if (!this.BVNumber || !this.start || !this.end) {
        return alert("参数为空！");
      }
      if (this.start > this.end) {
        return alert("分p非法");
      }
      axios
        .get("http://localhost:8081/api/x/web-interface/view", {
          params: {
            bvid: this.BVNumber,
          },
        })
        .then(
          (response) => {
            if (response.data.code === -400) {
              return alert("BV号填写有误！");
            }
            let data = response.data.data;
            this.title = data.title;
            this.desc = data.desc.replace(/[\r\n]/g, "");
            this.owner.name = data.owner.name;
            this.owner.face = data.owner.face;
            this.owner.mid = data.owner.mid;
            this.pic = data.pic;

            this.videoList = response.data.data.pages;
            let sum = 0;
            for (let index = this.start - 1; index < this.end; index++) {
              if (index < 0 || index >= this.videoList.length) {
                return alert("分p非法");
              }
              sum += this.videoList[index].duration;
            }
            this.hour = Math.floor(sum / 3600);
            sum %= 3600;
            this.minute = Math.floor(sum / 60);
            sum %= 60;
            this.second = sum;
            this.isShowDuration = true
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
  },
};
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 5px;
}

button {
  margin-top: 5px;
}

a{
  color: rgb(31, 156, 228);
}
</style>