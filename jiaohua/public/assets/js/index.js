$(function(){
	var socket = io();
	$('#checkbox__led').click(function(){
		socket.emit('light',Number(this.checked));
	});
	socket.on('light',function(data){
		document.getElementById('checkbox__led').checked = data;
	})
	$.ajax({
		url:'/api/dht/current',
		type:'get',
		data:{},
		success:function(data){
			if(data&&data.success){
				var datas = data.data.split(',');
				$('#temperature').text(datas[0]);
				$('#humidity').text(datas[1]);
			}
		},
		error:function(err){
		}
	
	});
	var datetimes = [];
	var temps = [];
	var hums = [];
	var lineChartData = {
		labels: datetimes,
		datasets: [{
			label: '温度',
			borderColor: window.chartColors.red,
			backgroundColor: window.chartColors.red,
			fill: false,
			data: temps,
			yAxisID: 'y-axis-1',
			}, {
			label: '湿度',
			borderColor: window.chartColors.blue,
			backgroundColor:window.chartColors. blue,
			fill: false,
			data: hums,
			yAxisID: 'y-axis-2'
			}]
	};
				var ctx = document.getElementById('myChart').getContext('2d');
			window.myLine = Chart.Line(ctx, {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: true,
						text: '温湿度'
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
				}
			});
	$.ajax({
		url:'/api/tu/current',
		type:'get',
		data:[],
		success:function(data){
			if(data && data.data){
				if(0==data.data){
					$('#tu').text("不缺水");
				}else{
					$('#tu').text("缺水");
				}	
			}
		}
	})
	$.ajax({
		url:'/api/dht/data/today',
		type:'get',
		data:{},
		success:function(data){
			for(var d in data){
				let date = new Date(data[d].timestamp);
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				let D = date.getDate() + ' ';
				let h = date.getHours() + ':';
				let m = date.getMinutes(); 
				datetimes.push(Y+M+D+h+m);
				hums.push(data[d].humidity);
				temps.push(data[d].temp);
			}
			window.myLine.update();

		},
		error:function(err){
			console.log(err)
		}
	});
			var lineChartData = {
			labels: datetimes,
			datasets: [{
				label: '温度',
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: temps,
				yAxisID: 'y-axis-1',
			}, {
				label: '湿度',
				borderColor: window.chartColors.blue,
				backgroundColor:window.chartColors. blue,
				fill: false,
				data: hums,
				yAxisID: 'y-axis-2'
			}]
		};


})
