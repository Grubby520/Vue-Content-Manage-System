const Mock = require('mockjs');
const Random = Mock.Random;

/*
* Login-表
* */
const userListData = function(data) {
    data = JSON.parse(data.body);
    let result = 'false';
    const userListJson = require('../static/json/user_database.json');
    userListJson.userList.some(function(value, index){
        if(value.username === data.username && value.password === data.password){
            result = 'success';
            return true;
        }
    });
    return {
        result: result
    };
};

/*
* home-表
* */
const homeListData = function( ) {
    let homeListJson = require('../static/json/home_database.json');
    for(const item in homeListJson){
        homeListJson[item].forEach(function(value, index){
            if(item == 'distribution'){
                value.total = Random.integer(100, 200);
                value.use = Random.integer(20, 100);
                const id = 'id';
                const rate = 'rate';
                value[id] = Random.id();
                value[rate] = Math.round(value.use*100/value.total);
            }else{
                value.total = Random.integer(100, 200);
                value.error = Random.integer(0, 20);
                const id = 'id';
                value[id] = Random.id();
            }
        })
    }
    return homeListJson;
};


/*table的数据*/
const produceNewsData = function(data) {
    data = JSON.parse(data.body);
	let articles = [];
	let pageSize = data.pageSize || 15, curPage = data.curPage || 1; // 获取前台参数
	for (let i = pageSize*(curPage-1); i < pageSize*curPage; i++) { // 定义30条数据
        //const role_all = ['系统管理员','监管人员','租户管理员','云服务商','应用厂商'];
        const role_all = [
            {roleId:1,roleName: '系统管理员'},
            {roleId:2,roleName: '监管人员'},
            {roleId:3,roleName: '租户管理员'},
            {roleId:4,roleName: '云服务商'},
            {roleId:5,roleName: '应用厂商'}
            ];
        const unit_all = [
            {orgId:1,orgName: '省办公厅'},
            {orgId:2,orgName: '省政协'},
            {orgId:3,orgName: '省政法委'},
            {orgId:4,orgName: '省公安厅消防总队'},
            {orgId:5,orgName: '省地税局'},
            {orgId:6,orgName: '省国税局'},
            {orgId:7,orgName: '省工商局'},
            {orgId:8,orgName: '省审计厅'},
            {orgId:9,orgName: '省商务厅'}
        ];
        let randomRole = Mock.mock({"randomOne|1": role_all}).randomOne;
        let randomUnit = Mock.mock({"randomOne|1": unit_all}).randomOne;

		let newArticleObject = {
            num: i+1,
            date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            name: Random.cname(), // 用户名
            org: randomUnit.orgName, // 单位
            orgId: randomUnit.orgId, // 单位id
            role: randomRole.roleName, // 角色
            roleId: randomRole.roleId, //角色id
            isRun: Random.boolean(),// 是否激活
            isBind: Random.boolean(),// 是否绑定证书
            desc: Random.csentence(10, 20) // 描述信息
		};
		articles.push(newArticleObject)
	}
	return {
		articles: articles
	}
};

/*数据权限*/
//请求
const getUserPower = function(data) {
    const params = JSON.parse(data.body); // 获取前台参数
    let orgPower = [];
    let arr = Mock.mock({
        "getPower|1": [1, 2, 3]
    });
    orgPower.push(arr.getPower); // 随机获取一个值
    return {
        orgPower: orgPower
    }
};
//提交
const submitUserPower = function(data) {

    return {
        orgPower: orgPower
    }
};

/*所有接口*/
// Mock.mock( url, post/get , params)

Mock.mock('/validate_logon','post', userListData);
Mock.mock('/getHomeList','post', homeListData);
Mock.mock('/userTable','post', produceNewsData);
Mock.mock('/userTable/getUserPower','post', getUserPower);
Mock.mock('/userTable/submitUserPower','post', submitUserPower);


