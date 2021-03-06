var sqlMap = {
    user: {
        name: 'root',
        password: 'abcd1234!',
    },
    
    data: {
        dbs_list: 'SHOW DATABASES',
        tables_list: 'show full tables where table_type = "BASE TABLE"',
        rows_list: 'SELECT * from ?? LIMIT ?, ?',
        /*
            db_row_count comes from information_schema and it's a approximate value.
        */
        db_row_count: 'select SUM(table_rows) from tables where TABLE_SCHEMA = ?',
        tb_count: 'select count(*) from tables where TABLE_SCHEMA = ?',
        tb_row_count: 'select count(*) from ??',
        db_size: 'select concat(round(sum(data_length)/(1024*1024),2) + round(sum(index_length)/(1024*1024),2),"MB") as "DB Size" from tables where table_schema= ?',
        columns_list: 'SELECT COLUMN_NAME from information_schema.COLUMNS where table_schema = ? and table_name = ?',
        structure: 'desc ??',
    },

    role: [
        'ADMIN',
        'STUDENT'
    ]
}
module.exports = sqlMap;