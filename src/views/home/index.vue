<template>
  <el-row class="home" :gutter="20">
    <!-- 左边部分 -->
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2020-10-18</span></p>
          <p>上次登录地点: <span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="weight: 100%; margin-top: 20px">
        <el-table :data="tableData" stripe="true">
          <el-table-column
            v-for="(value, name) in tableLabel"
            :key="name"
            :prop="name"
            :label="value"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 右边部分 -->
    <el-col :span="16">
      <div class="right">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">¥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="12">
          <el-card>
            <div style="height: 260px" ref="userEcharts"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div style="height: 260px" ref="videoEcharts"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "@/api/data";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      userImg: require("@/assets/user.png"),
      tableData: [
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
        { name: "oppo", todayBuy: 130, monthBuy: 300, totalBuy: 800 },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: "357",
          icon: "success",
          color: "#ff9f43",
        },
        {
          name: "今日收藏订单",
          value: "1281",
          icon: "star-on",
          color: "#ff9f43",
        },
        {
          name: "今日未支付订单",
          value: "432",
          icon: "s-goods",
          color: "#ff9f43",
        },
        {
          name: "本月支付订单",
          value: "134",
          icon: "success",
          color: "#ff9f43",
        },
        {
          name: "本月收藏订单",
          value: "4112",
          icon: "star-on",
          color: "#ff9f43",
        },
        {
          name: "本月未支付订单",
          value: "4231",
          icon: "s-goods",
          color: "#ff9f43",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);

        //用户图
        const userOption = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          //提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", //类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);

        //饼图
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#FFC312",
            "#12CBC4",
            "#ED4C67",
            "#D980FA",
            "#C4E538",
            "#FDA7DF",
            "#FFC312",
          ],
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption);
      }
      // console.log(res);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  margin-bottom: 20px;
  .userinfo {
    margin-left: 20px;
    .name {
      font-size: 36px;
    }
    .access {
      font-size: 20px;
    }
  }
  img {
    width: 100px;
    height: 100px;
  }
}

.right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 260px;
    margin-bottom: 20px;
  }
  i {
    width: 64px;
    font-size: 30px;
    line-height: 64px;
    text-align: center;
    color: #fff;
  }
  .detail {
    margin-left: 10px;
    padding: 5px;
    .num {
      font-size: 24px;
    }
    .txt {
      font-size: 12px;
      color: #8395a7;
    }
  }
}
</style>