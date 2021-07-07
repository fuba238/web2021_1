const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

let schema = `
create table test(
  id integer primary key,
  名前 text,
  性別 text,
  体力値 integer,
  スタン値 integer,
  使用順位 integer
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});
