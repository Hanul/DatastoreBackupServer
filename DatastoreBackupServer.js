require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'DatastoreBackupServer',
		
		isDevMode : true,
		webServerPort : 8409
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true,
		
		dbName : 'DatastoreBackupServer-test',
		
		DatastoreBackupServer : {
			secureKey : 'test123'
		}
	}
});
