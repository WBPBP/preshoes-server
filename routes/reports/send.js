var {PythonShell} = require('python-shell');
var fs = require("fs");
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/home/ec2-user/myapp/data/report.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    } else {
    }
});

router.get('/', function (req, res, next) {
    res.render('send');
	
});

//투입할 데이터 안드로이드에서 오면 나 이거 삭제해도됨
const testData = {
	key1: 3,
	key2: 4,
};

//문자열로 바꾼다~
var json = JSON.stringify(testData);
 
// var obj = JSON.parse(json);  얘는 복구~
// console.log(json);

//파일명을 위한 날짜+시간 조합
var date = new Date();

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
	var hour =date.getHours();
	hour = hour >=10 ? hour : '0'+ hour;
	//hour 두자리로 저장	
	var minute =date.getMinutes();
	minute= minute >=10 ? minute : '0'+ minute;
	//minute 두자리로 저장
	var second =date.getSeconds();
	second = second >=10 ? second : '0'+ second;
	//second 두자리로 저장
    return  year + '' + month + '' + day+'_'+hour+''+minute+''+second;
}




router.post('/info',function(req,res,next){
//옵션을 준다
const user_email = req.body.user_email;
	var options = {
		mode : 'text',
		encoding:'utf-8',
		pythonOptions:['-u'],
		scriptPath: '',
		pythonPath: '',
		args:[json]
	};
	date = getFormatDate(date);
	PythonShell.run('dataProcessing.py',options,function(err,results){
		if(err){
			console.log('fail');
			res.send(500);
		}
		else{	
			console.log('잘 넘어갔다왔음');
		
			//항상 저 폴더에 파일들이 저장되어있으며 db에 유저의 이메일과 파일명이 저장되어있다(나중에 들고올 수 있도록)
			fs.writeFile('./routes/reports/reportsResource/'+date+'.json',results,function(err){
				if(err){
					console.log(err);
				}
				else{
					const query =`insert into report (user_email,file_name)values('${user_email}','${date}')`;
					db.run(query,function(err,db_data){ //인서트 하고 성공했다는 메세지 보내준다. 
						console.log('insert user information :',user_email);
					//res.json(date.json)
					}); //잘 넘어가는지 모르겠음.. 
					console.log('보고서 완료');
				}
			});
		}
	});	
	
});


	
	
	







 module.exports = router;

