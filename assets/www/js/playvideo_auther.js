	/*��ȡ��ַ������*/
		function getQueryStringArgs(){
			//ȡ�ò�ѯ�ַ�����ȥ����ͷ���ʺ�--->��һ�����ʺ�
			var qs = (location.search.length > 0 ? location.search.substring(1) : "")
			
			//alert(qs);
			//�������ݵĶ���
			var args = [];
			
			//ȡ��ÿһ��
			var items = qs.length ? qs.split("&") : [];
			var item = null, name = null, value = null;
			
			//��forѭ����ʹ��
			var i = 0, 
			    len = items.length;
			    
			//�����ÿһ����ӵ�args������
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