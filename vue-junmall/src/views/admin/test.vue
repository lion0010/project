<template>
	<div class="testpage">
		<el-row>
			<el-col :span="24">
				<div id="turnover" class="grid-content turnover">w</div>
			</el-col>
		</el-row>
		<el-row style="margin-top: 30px">
			<div class="select-part">
				用户：
				<el-select v-model="selectedUser" placeholder="请选择" @change="changeUser">
				<el-option
					v-for="item in userList"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			</div>
			<el-col :span="12">
				<div class="grid-content userConsume" id="userConsume">e</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content top-sale" id="topSale">w</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import * as echarts from 'echarts';
	export default {
		data() {
			return {
				selectedUser: '666',
				userList: [
					{
						label: 'yjh',
						value: '666',
					}
				]
			}
		},
		methods: {
			initData() {
				// 绘制每日成交额度
				this.monthlyTurnover()
				// 绘制某用户在一个月的消费状况
				this.userConsume()
				// 绘制商品销量柱状图
				this.topSalePro()
				// 获取用户列表
				this.getUserList()
			},
			// 绘制每日成交额度的方法
			monthlyTurnover() {
				let myChart = echarts.init(document.getElementById('turnover'))

				var base = +new Date(2016, 8, 3);
				var oneDay = 24 * 3600 * 1000;
				var date = [];

				var data = [Math.random() * 100];
				var currentDate = new Date()

				for (var i = 1; base < currentDate ; i++) {
						var now = new Date(base += oneDay);
						date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
						var tempVal = Math.random() * 100
						data.push(Math.round(tempVal < 50 ? tempVal + 50 : tempVal ));
				}

				var option = {
						tooltip: {
								trigger: 'axis',
								position: function (pt) {
										return [pt[0], '10%'];
								}
						},
						title: {
								left: 'center',
								text: '每日商品成交额度(单位: 千元)',
						},
						toolbox: {
								feature: {
										dataZoom: {
												yAxisIndex: 'none'
										},
										restore: {},
										saveAsImage: {}
								}
						},
						xAxis: {
								type: 'category',
								boundaryGap: false,
								data: date
						},
						yAxis: {
								type: 'value',
								boundaryGap: [0, '100%']
						},
						dataZoom: [{
								type: 'inside',
								start: 0,
								end: 10
						}, {
								start: 0,
								end: 10,
								handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
								handleSize: '90%',
								handleStyle: {
										color: '#fff',
										shadowBlur: 3,
										shadowColor: 'rgba(0, 0, 0, 0.6)',
										shadowOffsetX: 2,
										shadowOffsetY: 2
								}
						}],
						series: [
								{
										name:'成交额',
										type:'line',
										smooth:true,
										symbol: 'none',
										sampling: 'average',
										itemStyle: {
												normal: {
														color: 'rgb(255, 70, 131)'
												}
										},
										areaStyle: {
												normal: {
														color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
																offset: 0,
																color: 'rgb(255, 158, 68)'
														}, {
																offset: 1,
																color: 'rgb(255, 70, 131)'
														}])
												}
										},
										data: data
								}
						]
				};
				myChart.setOption(option)
			},

			// 绘制某个用户在一月的消费状况
			userConsume(param) {
				let params = param || {}
				this.axios.get('/users/order', { params }).then((res) => {
					if (res.status === 200) {
						let data = res.data
						if (data.status === '0') {
							let result = data.result
							let finalData = this.serUserConsumeData(result)

							var myChart = echarts.init(document.getElementById('userConsume'))

							var option = {
								title : {
										text: '对用户一个月的销售额的统计',
										x:'center'
								},
								tooltip : {
										trigger: 'item',
										formatter: "{a} <br/>{b} : {c} ({d}%)"
								},
								legend: {
										type: 'scroll',
										orient: 'vertical',
										right: 30,
										top: '30%',
										bottom: 20,
										data: finalData.legendData,

										selected: finalData.selected
								},
								series : [
										{
												name: '成交额',
												type: 'pie',
												radius : '55%',
												center: ['40%', '50%'],
												data: finalData.seriesData,
												itemStyle: {
														emphasis: {
																shadowBlur: 10,
																shadowOffsetX: 0,
																shadowColor: 'rgba(0, 0, 0, 0.5)'
														}
												}
										}
								]
							};

							myChart.setOption(option)
						}
					}
				})
			},

			// 绘制销量最高的几件商品的图表
			topSalePro() {
				let params = {
					pageSize: 8,
					page: 1,
					sortBySales: true,
					sortGoodsBySalesFlag: -1,
					priceLevel: 'all'
				}
				var myChart = echarts.init(document.querySelector('#topSale'))
				this.axios.get('/goods/list', { params }).then((res) => {
					if (res.status === 200) {
						let data = res.data
						if (data.status == 0) {
							let list = data.result.list;

							var appusage_data = []
							for(let i = 0, len = list.length; i < len; i++) {
								var tempObj = {}
								tempObj.name = list[i]['productName']
								tempObj.value = list[i]['sales']
								appusage_data.unshift(tempObj)
							}
							var option = {
									"title": {
											"text": "商品销量TOP8",
											"textStyle": {
													"color": "#333",
													"fontWeight": "bold",
													"fontSize": 16
											},
											"top": "4%",
											"left": "center"
									},
									"tooltip": {
											"trigger": "axis",
											"axisPointer": { // 坐标轴指示器，坐标轴触发有效
													"type": "shadow" // 默认为直线，可选为："line" | "shadow"
											}
									},
									"grid": {
											"left": "3%",
											"right": "10%",
											"bottom": "3%",
											"containLabel": true
									},
									"yAxis": [{
											"type": "category",
											"data": ["TOP8","TOP7","TOP6","TOP5", "TOP4", "TOP3", "TOP2", "TOP1"],
											"axisLine": {
													"show": false
											},
											"axisTick": {
													"show": false,
													"alignWithLabel": true
											},
											"axisLabel": {
													"textStyle": {
															"color": "#ffb069"
													}
											}
									}],
									"xAxis": [{
											"type": "value",
											"axisLine": {
													"show": false
											},
											"axisTick": {
													"show": false
											},
											"axisLabel": {
													"show": false
											},
											"splitLine": {
													"show": false
											}
									}],

									"series": [{
											"name": "销售量",
											"type": "bar",
											"data": appusage_data,
											"barCategoryGap": "25%",
											"label": {
													"normal": {
															"show": true,
															"position": "right",
															"formatter": function(params) {
																	return params.data.name;
															},
															"textStyle": {
																	"color": "#bcbfff" //color of value
															}
													}
											},
											"itemStyle": {
													"normal": {
															"color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
																	"offset": 0,
																	"color": "#ffb069" // 0% 处的颜色
															}, {
																	"offset": 1,
																	"color": "#ec2e85" // 100% 处的颜色
															}], false)
													}
											}
									}]
							};

							myChart.setOption(option)
						}
					}
				}) 
			},

			// 获取用户列表
			getUserList() {
				this.axios.get('/users/userList').then((res) => {
					if (res.status === 200) {
						let data = res.data
						if (data.status == '0') {
							let result = data.data
							this.userList = []
							for(let i = 0, len = result.length; i < len; i++) {
								var tempObj = {}
								tempObj.label = result[i]['userName']
								tempObj.value = result[i]['userId']
								this.userList.push(tempObj)
							}
						}
					}
				})
			},

			changeUser(val) {
				let params = {
					userId: val,
					SelectedUserId: true
				}
				this.userConsume(params)
			},
			serUserConsumeData(data) {
					var nameList = ['女士专区', '男士专区', '精品鞋区', '家电数码', '箱包专区', '美味零食']
					var legendData = ['女士专区', '男士专区', '精品鞋区', '家电数码', '箱包专区', '美味零食'];
					var seriesData = [
						{
							name: '女士专区',
							value: 0
						},
						{
							name: '男士专区',
							value: 0
						},
						{
							name: '美味零食',
							value: 0
						},
						{
							name: '精品鞋区',
							value: 0
						},
						{
							name: '家电数码',
							value: 0
						},
						{
							name: '箱包专区',
							value: 0
						},
					];
					var selected = {};
					for (let i = 0, len = data.length; i < len; i++) {
						let tableData = data[i]['tableData']
						let name = ''
						for (let j = 0, lenght = tableData.length; j < lenght; j++) {
							if (tableData[j]['classify'] == '0') {
								name = '女士专区'
							} else if (tableData[j]['classify'] == '1') {
								name = '男士专区'
							} else if (tableData[j]['classify'] == '2') {
								name = '精品鞋区'
							} else if (tableData[j]['classify'] == '3') {
								name = '家电数码'
							} else if (tableData[j]['classify'] == '4') {
								name = '箱包专区'
							} else if (tableData[j]['classify'] == '5') {
								name = '美味零食'
							}
							let value = parseInt(tableData[j]['number']) * parseFloat(tableData[j]['signal'])

							for (let m = 0, l = seriesData.length; m < l; m++) {
								if (seriesData[m]['name'] === name) {
									seriesData[m]['value'] += value
								}
							}
						}
					}
					return {
							legendData: legendData,
							seriesData: seriesData,
							selected: selected
					};
			}
		},
		mounted() {
			this.initData()
		}
	}
</script>
<style scoped>
	.bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
	}
	.turnover {
		height: 500px
	}
	.userConsume {
		height: 400px
	}
	.top-sale {
		height: 400px
	}
	.select-part {
		margin-bottom: 30px;
		padding-left: 60px;
	}
</style>