const Mock = require('mockjs');
const Random = Mock.Random;

/*
* 登录-账户表
* */
const userListData = function(data) {
    data = JSON.parse(data.body);
    let result = 'false';
    const userListJson = require('../static/json/login/user_database.json');
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
 * 菜单
 * */
const menuList = function(){
    return require( '../static/json/public/menu.json');
};
/*
* home-数据表
* */
const homeListData = function( ) {
    let homeListJson = require('../static/json/home/home_database.json');
    for(const item in homeListJson){
        homeListJson[item].forEach(function(value, index){
            if(item === 'distribution'){
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
const businessListData = function( ) {
    return {
        business_monitor: [Random.integer(80, 100),Random.integer(0, 20),Random.integer(120, 130)],
        business_security: Random.integer(5, 100),
        business_usability: Random.integer(5, 100),
        business_busyness: Random.integer(5, 100)
    }
};
/**
 * public-获取role列表
 **/
const roleList = function(){
    return require('../static/json/public/role_database.json');
};
/**
 * public-获取department列表
 **/
const departmentList = function(){
    return require('../static/json/public/departments_database.json');
};
/*
* 用户管理-table列表
* */
const produceNewsData = function(data) {
    data = JSON.parse(data.body);
    console.log(data);
	let articles = [];
	let pageSize = data.pageSize || 10,
        curPage = data.currentPage || 1,
        total = data.total,
        lastPage = Math.ceil( total/pageSize),
        start = pageSize*(curPage-1),
        end = lastPage === curPage ? total : pageSize*curPage;
    //模拟假数据
	//for (let i = pageSize*(curPage-1); i < pageSize*curPage; i++) { // 定义30条数据
    for (let i =start; i < end; i++) { // 定义30条数据
        //const role_all = ['系统管理员','监管人员','租户管理员','云服务商','应用厂商'];
        const role_all = [
            {roleId:'1',roleName: '系统管理员'},
            {roleId:'2',roleName: '监管人员'},
            {roleId:'3',roleName: '租户管理员'},
            {roleId:'4',roleName: '云服务商'},
            {roleId:'5',roleName: '应用厂商'}
            ];
        const unit_all = [
            {orgId:'1',orgName: '省办公厅'},
            {orgId:'2',orgName: '省政协'},
            {orgId:'3',orgName: '省政法委'},
            {orgId:'4',orgName: '省公安厅消防总队'},
            {orgId:'5',orgName: '省地税局'},
            {orgId:'6',orgName: '省国税局'},
            {orgId:'7',orgName: '省工商局'},
            {orgId:'8',orgName: '省审计厅'},
            {orgId:'9',orgName: '省商务厅'}
        ];
        let randomRole = Mock.mock({"randomOne|1": role_all}).randomOne;
        let randomUnit = Mock.mock({"randomOne|1": unit_all}).randomOne;

		let newArticleObject = {
            num: i+1,
            id: Random.id(),
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
/*
 * 用户管理-数据权限
 * */
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
/*
 * 租户管理-table列表
 * */
const tenantListData = function(data) {
    data = JSON.parse(data.body);
    console.log(data);
    let articles = [];
    let pageSize = data.pageSize || 10,
        curPage = data.currentPage || 1,
        total = data.total,
        lastPage = Math.ceil( total/pageSize),
        start = pageSize*(curPage-1),
        end = lastPage === curPage ? total : pageSize*curPage;
    //模拟假数据
    //for (let i = pageSize*(curPage-1); i < pageSize*curPage; i++) { // 定义30条数据
    for (let i =start; i < end; i++) { // 定义30条数据
        const unit_all = [
            {orgId:'1',orgName: '省办公厅'},
            {orgId:'2',orgName: '省政协'},
            {orgId:'3',orgName: '省政法委'},
            {orgId:'4',orgName: '省公安厅消防总队'},
            {orgId:'5',orgName: '省地税局'},
            {orgId:'6',orgName: '省国税局'},
            {orgId:'7',orgName: '省工商局'},
            {orgId:'8',orgName: '省审计厅'},
            {orgId:'9',orgName: '省商务厅'}
        ];
        let randomUnit = Mock.mock({"randomOne|1": unit_all}).randomOne;
        let newArticleObject = {
            num: i+1,
            id: Random.id(),
            createTime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            name: Random.cname() + randomUnit.orgName, // 用户名
            org: randomUnit.orgName, // 单位
            orgId: randomUnit.orgId, // 单位id
            publicCloud: randomUnit.orgId,
            privateCloud_mobile: randomUnit.orgId,
            privateCloud_unicom: randomUnit.orgId,
            remark: Random.csentence(10, 20) // 描述信息
        };
        articles.push(newArticleObject);
    }
    return {
        articles: articles
    }
};
/*
*  码表管理-tree列表
* */
const codeTreeList = function(){
        return require('../static/json/codeTable/codeTree.json');
};
const codeTableListData = function(data){
    data = JSON.parse(data.body);
    console.log(data);
    let articles = [];
    let pageSize = data.page.pageSize || 10,
        curPage = data.page.currentPage || 1,
        total = 0,
        lastPage = 0,
        start = 0,
        end = 0,
        id = data.id;
    const thisArray =  data.table.children;
    if(data.table.children){
    // if(data.children){
        total = data.table.children.length;
        lastPage = Math.ceil( total/pageSize);
        start = pageSize*(curPage-1);
        end = lastPage === curPage ? total : pageSize*curPage;
        for(let i=start; i<end; i++){
            let newArticleObject = {
                sortNo: i+1, // 序号
                dictId: thisArray[i].id, //id
                dictName: thisArray[i].label, // 名称
                dictCode: Random.string('lower', 5, 8 ),// 编码
                parentName: data.label,// 上级名称
                isEffect: Random.boolean() // 是否生效
            };
            articles.push(newArticleObject);
        }
    }

    return {
        articles: articles,
        total: total
    }
};

/*
* 接口列表
* Mock.mock( url, post/get , params)
* */
//登录账户表
Mock.mock('/validate_logon','post', userListData);

//菜单列表
Mock.mock('/menuList','post', menuList);

//主页
Mock.mock('/getHomeList','post', homeListData);
Mock.mock('/getHomeList/business','post', businessListData);

//公共接口
Mock.mock('/roleList','post', roleList);
Mock.mock('/departmentList','post', departmentList);

//用户管理
Mock.mock('/userTable','post', produceNewsData);
Mock.mock('/userTable/getUserPower','post', getUserPower);

//租户管理
Mock.mock('/tenantTable','post', tenantListData);

//码表管理
Mock.mock('/codeTree', 'post', codeTreeList);
Mock.mock('/codeTable','post', codeTableListData);


