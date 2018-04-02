var sqlMap = {
    user: {
        name: 'root',
        password: 'abcd1234!',
    },
    
    data: {
        dbs_list: 'SHOW DATABASES',
        tables_list: 'SHOW TABLES from ??',
        rows_list: 'SELECT * from ?? LIMIT ?, ?',
    },

    role: [
    	'ADMIN',
    	'STUDENT'
    ]
}
module.exports = sqlMap;