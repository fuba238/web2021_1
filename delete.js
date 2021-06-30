const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

let sql = `
delete from test where id=2;
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを削除しました" );
	});
});
