	
		function Htmldb(){
			
			var params = {
				//定义数据库的名字
				databaseName : "tpdatabase",
				//数据库的版本
				version : "1.0",
				//数据库的描述名字
				displayname : "mydb",
				//数据库的大小
				dbsize : 10000 //byte
			};
			
			//初始化数据库
			this.init = function(){
				var name = params.databaseName;
				var ver = params.version;
				var disname = params.displayname;
				var size = params.dbsize;
				
				///alert(name+"-->"+ver+"-->"+disname+"-->"+size);
				db = openDatabase(name, ver, disname, size);
				createTables();
				
			}
			
			//创建表
			function createTables(){
				db.transaction(function(transaction){
					//不支持自增长序列？
					//执行创建表的方法是executeSql 第一个参数是创建表的SQL语句，第二个参数是传入的参数，是个数组【】
					//第三个参数是执行sql语句成功的函数，第四个参数是执行sql失败的函数
					
					transaction.executeSql("create table if not exists t_video(v_id integer not null, v_title text not null, v_name text not null, v_path text not null)",[],
					function(tx,rs){
						console.log("创建用户表成功");
					},function(tx,error){
						console.log("创建用户表失败-->" + error.message);
					});
				});
			}
			
			//删除所有的数据
			this.deleteData = function(){
				db.transaction(function(transaction){
					transaction.executeSql("delete from t_video",[],
					function(tx, rs){
						console.log("删除所有数据成功");
					},function(tx, error){
						console.log("删除数据不成功-->"+error.message);
					});
				});
			}
			
			
			//批量的添加数据
			function addVideoData(data){
				
				$.each(data,function(index,value)
				 {
					db.transaction(function(transaction){
					transaction.executeSql("insert into t_video(v_id, v_title, v_name, v_path) values (?, ?, ?, ?)",[value.vId,value.vTitle, value.vName, value.vPath],
					    function(tx, rs){
					    	console.log("插入"+value.v_title+"数据成功");
					    	
					    }, function(tx, error){
					    	console.log("插入video数据失败-->" + error.message);
					    });
					});
				});
			}
			
			
			
			//查询某个数据
			this.selectAutherData = function(authername){
				
				db.transaction(function(transaction){
					transaction.executeSql("select * from t_video where v_name=?",[authername],
					function(tx,rs){
						
						console.log(rs.rows);
						
						if(rs.rows.length <= 0){
							console.log("没有"+authername+"这个数据");
							alert("目前没有"+authername+"的视频");
							//这边用ajax请求后台数据请求-->然后存入本地的数据库
							
							$.ajax({
								type:'post',
								url:'http://192.168.1.103:8090/sshweb/user_getVideo.action',
								data:{"type":authername},
								dataType:'json',
								success:function(data){
								 	var musiclist = $(".musiclist");
								 	
								 	/* 显示在页面上-->再存入数据库 */
									 $.each(data,function(index,value)
									 {
										//alert(value.aPath);
										 var $musiclist = "<div class='list'>"+
										 				"<div class='music_id'>"+value.vId+"</div>"+
										 				"<div class='music_msg'>"+
										 				"<span>"+value.vTitle+"</span>"+
										 				"<span>"+value.vName+"</span>"+
										 				"<span>"+value.vPath+"</span>"+
										 				"</div>"+
										 				"<div class='more_play'>&gt;</div>"+
										 				"</div>";
										 				
										musiclist.append($musiclist);
									 });
									 
									 //alert(data);
									 addVideoData(data);
		  
								},
								error:function()
								{
									alert("请求服务器资源失败!");
									
								}
							 });
						}else{
							console.log("查询"+authername+"成功");
							
							for(var i = 0; i < rs.rows.length; i ++){
								/*console.log(rs.rows.item(i));
								console.log(rs.rows.item(i).v_name);*/
								var musiclist = $(".musiclist");
								var $musiclist = "<div class='list'>"+
								 				"<div class='music_id'>"+rs.rows.item(i).v_id+"</div>"+
								 				"<div class='music_msg'>"+
								 				"<span>"+rs.rows.item(i).v_title+"</span>"+
								 				"<span>"+rs.rows.item(i).v_name+"</span>"+
								 				"<span>"+rs.rows.item(i).v_path+"</span>"+
								 				"</div>"+
								 				"<div class='more_play'>&gt;</div>"+
								 				"</div>";
					 				
								musiclist.append($musiclist);
							}
							
							
						}
					},function(tx,error){
						//这边好像没有执行到，查数据会根据查到的长度来决定
						console.log("查询失败-->"+error.message);
						alert("查询"+authername+"失败");
					});
				});
				
			}
			
			
			//查询所有数据数据
			this.selectDatas = function(){
				db.transaction(function(transaction){
					transaction.executeSql("select * from t_video",[],
					function(tx, rs){
						console.log("查询成功"+rs);
						//rs相当于jdbc的result
						for(var i = 0; i < rs.rows.length; i ++){
							console.log(rs.rows.item(i));
						}
					}, function(tx, error){
						console.log("查询失败-->"+error.message);
						
					});
				});
			}
			
			
		}
		
	
		