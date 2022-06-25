import Mock from "mockjs"

let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                videoData: [
                    { name: '小米', value: 3183 },
                    { name: 'vivo', value: 4134 },
                    { name: '苹果', value: 1233 },
                    { name: '魅族', value: 2394 },
                    { name: '三星', value: 5429 },
                    { name: 'oppo', value: 3123 },
                ],
                userData: [
                    { date: '周一', new: 125, active: 56 },
                    { date: '周二', new: 64, active: 154 },
                    { date: '周三', new: 73, active: 78 },
                    { date: '周四', new: 114, active: 58 },
                    { date: '周五', new: 135, active: 48 },
                    { date: '周六', new: 30, active: 56 },
                    { date: '周日', new: 99, active: 53 },
                ],
                orderData: {
                    date: ['20190110', '20190111', '20190112', '20190113', '20190114', '20190115', '20190116'],
                    data: List
                },
                tableData: [
                    { name: 'oppo', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                    { name: 'vivo', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                    { name: '小米', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                    { name: '魅族', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                    { name: '苹果', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                    { name: '三星', todayBuy: 500, monthBuy: 2000, totalBuy: 2130 },
                ]
            }
        }
    }
}