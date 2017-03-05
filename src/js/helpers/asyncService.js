var promise;

function xhr(type, url, data){

	return new Promise((resolve, reject)=>{

		let xhr = new XMLHttpRequest();
		xhr.open(type, url);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.addEventListener('readystatechange', ()=>{

			if(xhr.readyState !== 4){
				return;
			}
			if(xhr.status === 200){
				resolve(xhr.responseText);
			}else{
				reject(xhr.responseText);
			}
		});
		return xhr.send(data && JSON.stringify(data));
	});
}

let xhrPromisified = {
	get: function(url){
		return xhr('get', url, null);
	},
	post: function(url, data){
		return xhr('post', url, data);
	},
	put: function(url, data){
		return xhr('put', url, data);
	},
	del: function(url){
		return xhr('delete', url, null);
	}
}

export default xhrPromisified;