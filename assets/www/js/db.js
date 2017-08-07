	
		function Htmldb(){
			
			var params = {
				//�������ݿ������
				databaseName : "tpdatabase",
				//���ݿ�İ汾
				version : "1.0",
				//���ݿ����������
				displayname : "mydb",
				//���ݿ�Ĵ�С
				dbsize : 10000 //byte
			};
			
			//��ʼ�����ݿ�
			this.init = function(){
				var name = params.databaseName;
				var ver = params.version;
				var disname = params.displayname;
				var size = params.dbsize;
				
				///alert(name+"-->"+ver+"-->"+disname+"-->"+size);
				db = openDatabase(name, ver, disname, size);
				createTables();
				
			}
			
			//������
			function createTables(){
				db.transaction(function(transaction){
					//��֧�����������У�
					//ִ�д�����ķ�����executeSql ��һ�������Ǵ������SQL��䣬�ڶ��������Ǵ���Ĳ������Ǹ����顾��
					//������������ִ��sql���ɹ��ĺ��������ĸ�������ִ��sqlʧ�ܵĺ���
					
					transaction.executeSql("create table if not exists t_video(v_id integer not null, v_title text not null, v_name text not null, v_path text not null)",[],
					function(tx,rs){
						console.log("�����û���ɹ�");
					},function(tx,error){
						console.log("�����û���ʧ��-->" + error.message);
					});
				});
			}
			
			//ɾ�����е�����
			this.deleteData = function(){
				db.transaction(function(transaction){
					transaction.executeSql("delete from t_video",[],
					function(tx, rs){
						console.log("ɾ���������ݳɹ�");
					},function(tx, error){
						console.log("ɾ�����ݲ��ɹ�-->"+error.message);
					});
				});
			}
			
			
			//�������������
			function addVideoData(data){
				
				$.each(data,function(index,value)
				 {
					db.transaction(function(transaction){
					transaction.executeSql("insert into t_video(v_id, v_title, v_name, v_path) values (?, ?, ?, ?)",[value.vId,value.vTitle, value.vName, value.vPath],
					    function(tx, rs){
					    	console.log("����"+value.v_title+"���ݳɹ�");
					    	
					    }, function(tx, error){
					    	console.log("����video����ʧ��-->" + error.message);
					    });
					});
				});
			}
			
			
			
			//��ѯĳ������
			this.selectAutherData = function(authername){
				
				db.transaction(function(transaction){
					transaction.executeSql("select * from t_video where v_name=?",[authername],
					function(tx,rs){
						
						console.log(rs.rows);
						
						if(rs.rows.length <= 0){
							console.log("û��"+authername+"�������");
							alert("Ŀǰû��"+authername+"����Ƶ");
							//�����ajax�����̨��������-->Ȼ����뱾�ص����ݿ�
							
							$.ajax({
								type:'post',
								url:'http://192.168.1.103:8090/sshweb/user_getVideo.action',
								data:{"type":authername},
								dataType:'json',
								success:function(data){
								 	var musiclist = $(".musiclist");
								 	
								 	/* ��ʾ��ҳ����-->�ٴ������ݿ� */
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
									alert("�����������Դʧ��!");
									
								}
							 });
						}else{
							console.log("��ѯ"+authername+"�ɹ�");
							
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
						//��ߺ���û��ִ�е��������ݻ���ݲ鵽�ĳ���������
						console.log("��ѯʧ��-->"+error.message);
						alert("��ѯ"+authername+"ʧ��");
					});
				});
				
			}
			
			
			//��ѯ������������
			this.selectDatas = function(){
				db.transaction(function(transaction){
					transaction.executeSql("select * from t_video",[],
					function(tx, rs){
						console.log("��ѯ�ɹ�"+rs);
						//rs�൱��jdbc��result
						for(var i = 0; i < rs.rows.length; i ++){
							console.log(rs.rows.item(i));
						}
					}, function(tx, error){
						console.log("��ѯʧ��-->"+error.message);
						
					});
				});
			}
			
			
		}
		
	
		