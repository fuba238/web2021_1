const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

let sql = `
select id, 名前,　性別, 体力値, スタン値, 使用順位 from test;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let row of data ) {
			console.log( row.id + ' : ' + row.名前 + ' : ' + row.性別 + ' : ' + row.体力値 + ' : ' + row.スタン値 + ' : ' + row.使用順位 );
		}
	});
});
