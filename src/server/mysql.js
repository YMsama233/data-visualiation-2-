

/*
 * @Author: maximing
 * @Date: 2022-12-28 09:33:17
 * @LastEditTime: 2022-12-28 09:52:00
 * @LastEditors: your name
 * @Description: 请添加描述
 * @FilePath: \domysql\src\server\mysql.js
 */
 
const mySql = require('mysql')
//连接数据库的配置信息
const db_config = { 
	host: 'localhost', //本地都是localhost
	user: 'root', //账户名
	password: '200202139', //密码
	port: '3306', //端口号
	database: 'dict' //数据库的名称
}
var book=[];
book[0]="晋书";book[1]="汉书";
book[2]="诗经";book[3]="史记";
book[4]="左传";book[5]="礼记";
book[6]="论语";book[7]="春秋";
book[8]="三国";book[9]="宋书";
book[10]="唐书";book[11]="庄子";
book[12]="老子";book[13]="周易";
book[14]="梁书";book[15]="明史";
book[16]="战国";book[17]="后汉书";
book[18]="秦";book[19]="汉";
book[20]="晋";book[21]="孟子";
book[22]="公羊传";book[23]="东观汉记";
book[24]="南唐";book[25]="唐";
book[26]="宋";book[27]="元";
book[28]="隋";book[29]="明";
book[30]="清";book[31]="南朝";
book[32]="五代";book[33]="十国";
book[34]="韩非子";book[35]="魏";
book[36]="三国志";book[37]="孝经";
book[38]="天地";book[39]="项羽本纪";
book[40]="淮南子";book[41]="无名氏";
book[42]="金刚经";book[43]="元史";
book[44]="仪礼";book[45]="诗";
book[46]="书";book[47]="词";
book[48]="传";book[49]="记";
book[50]="荀子";book[51]="赋";
book[52]="铭";book[53]="论";
book[54]="经";book[55]="典";


var book2=[]
book2[0]="春秋";book2[1]="战国";
book2[2]="秦";book2[3]="汉";
book2[4]="三国";book2[5]="晋";
book2[6]="隋";book2[7]="唐";
book2[8]="五代";book2[9]="宋";
book2[10]="元";book2[11]="明";
book2[12]="清";
var res=[]
var res2=[]
var data=[]
var data2=[]


function conMysql(sql) {
	res=[]
	num=0
    //创建数据库连接池
	let Myconnect = mySql.createConnection(db_config)
	//开始连接数据库
	Myconnect.connect(function (err) {
		if (err) {
			console.log(`myqsl连接失败:${err}!`)
		} else {
			console.log('恭喜哦，mysql连接成功哦')
		}
	})
 
	//因为query查询是一个异步操作，所以用promise来操作
	return new Promise((resolve, reject) => {
		for(var i=0;i<56;i++){
			sql_new="select count(*) from map_cy where id in ("+sql+" and cc like " + "'%" + book[i] + "%')"
			Myconnect.query(sql_new, (err, result) => {
				if(err){
					reject(err)
				}
				else{
					result = JSON.stringify(result,["count(*)"])
					result = JSON.parse(result)
					res[i]=result[0]['count(*)']
					data[num]=res[56]
					num++;
				}
			})
		}

		closeMysql(Myconnect)  //调用函数关闭mysql连接
		resolve(data)

		//query() 函数用于mysql语句查询	
		// 	Myconnect.query(sql, (err, result) => {
		// 		if (err) {
		// 			reject(err)
		// 		} else {
		// 			let res = JSON.parse(JSON.stringify(result))
		// 			closeMysql(Myconnect)  //调用函数关闭mysql连接
		// 			resolve(res)
		// 		}
			
		// });
	})
}
 

function conMysql2(sql) {
	res2=[]
	num=0

    //创建数据库连接池
	let Myconnect = mySql.createConnection(db_config)
	//开始连接数据库
	Myconnect.connect(function (err) {
		if (err) {
			console.log(`myqsl连接失败:${err}!`)
		} else {
			console.log('恭喜哦，mysql连接成功哦')
		}
	})

	//因为query查询是一个异步操作，所以用promise来操作
	return new Promise((resolve, reject) => {
		for(var i=0;i<13;i++){
			sql_new="select count(cy) from map_cy where (SUBSTRING_INDEX( cc, '：', 1 ) LIKE '%《%"+book2[i]+"%》%' or SUBSTRING_INDEX( cc, '：', 1 ) LIKE '%"+book2[i]+"·%')"+sql
			Myconnect.query(sql_new, (err, result) => {
				if(err){
					reject(err)
				}
				else{
					result = JSON.stringify(result,["count(cy)"])
					result = JSON.parse(result)
					res2[i]=result[0]['count(cy)']
					data2[num]=res2[13]
					num++;
				}
			})

		}

		console.log(data2)

		closeMysql(Myconnect)  //调用函数关闭mysql连接
		resolve(data2)
	})
}

//关闭mysql数据库的函数
function closeMysql(Myconnect) {
	Myconnect.end((err) => {
		if (err) {
			console.log(`mysql关闭失败:${err}!`)
		} else {

			console.log('mysql关闭成功')
		}
	})
}
 
//导出conMysql函数
exports.conMysql = conMysql
exports.conMysql2 = conMysql2