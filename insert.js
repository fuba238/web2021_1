const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

let sql = `
insert into test ("name", "address") values ("fukaya", "yamanashi");
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});
