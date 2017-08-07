	/*获取地址栏参数*/
		function getQueryStringArgs(){
			//取得查询字符串并去掉开头的问号--->第一个是问好
			var qs = (location.search.length > 0 ? location.search.substring(1) : "")
			
			//alert(qs);
			//保存数据的对象
			var args = [];
			
			//取得每一项
			var items = qs.length ? qs.split("&") : [];
			var item = null, name = null, value = null;
			
			//在for循环中使用
			var i = 0, 
			    len = items.length;
			    
			//逐个讲每一项添加到args对象中
			for(i = 0; i < len; i ++){
				item = items[i].split("=");
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				
				if(name.length){
					args[name] = value;
				}
			}
			
			return args;
		}