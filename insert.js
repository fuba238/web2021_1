const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

let sql = `
insert into test ("名前", "性別", "体力値", "スタン値", "使用順位") values ("ローズ", "女", "950", "1000", "7");
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
