DatastoreBackupServer.MAIN = METHOD({

	run : (addRequestListener, addPreprocessor) => {
		
		let collections = {};
		
		addRequestListener((requestInfo, _response, replaceRootPath, next) => {
			
			let uri = requestInfo.uri;
			let _data = requestInfo.data;
			
			let response = (content) => {
				_response({
					headers : {
						'Access-Control-Allow-Origin' : '*'
					},
					content : content
				});
			};
			
			if (uri === 'backup' && _data !== undefined) {
				
				let kind = _data.kind;
				let data = _data.data;
				let secureKey = _data.secureKey;
				
				if (secureKey === NODE_CONFIG.DatastoreBackupServer.secureKey && kind !== undefined && data !== undefined) {
					
					NEXT([
					(next) => {
						
						if (collections[kind] === undefined) {
							CONNECT_TO_DB_SERVER.addInitDBFunc((nativeDB) => {
								collections[kind] = nativeDB.collection(kind);
								next();
							});
						} else {
							next();
						}
					},
					
					() => {
						return () => {
							data._id = data.id;
							delete data.id;
							collections[kind].save(data);
							
							response('SAVED!');
						};
					}])
				}
				
				return false;
			}
		});
	}
});
