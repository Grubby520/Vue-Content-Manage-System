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
const specificSetList = function(){
  return   [
      {
          "id": "06fe8c71-6551-425f-9370-73a41fc94ebc",
          "label": "普通",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "e50b5153-3cf9-4ec0-8e85-d37cafa82937",
          "label": "高性能",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "5c53a197-ad0f-48f8-b21b-7661bb76359f",
          "label": "Oracle数据库一体机",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "5981cdc5-32b3-4d8b-b8bc-0ba2f49daa59",
          "label": "虚拟数据中心",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "acf606ec-b56e-4f83-b3c4-546f5eab7f85",
          "label": "普通",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "bfcfa108-c521-4832-9e55-0b9c4bfd673e",
          "label": "数据库一体机",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      },
      {
          "id": "49ed4aad-a056-4374-a8a6-af378525243a",
          "label": "云主机（ECS）",
          "iconCls": null,
          "state": null,
          "children": [

          ],
          "attributes": {
              "isLeaf": true
          },
          "leaf": true
      }
  ]
};
const priceUnitList = function () {
    return [
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ffa8",
            "label": "台",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ffa9",
            "label": "TB",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff10",
            "label": "100GB",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff11",
            "label": "10GB",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff12",
            "label": "核",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff13",
            "label": "PVU",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff14",
            "label": "CPU",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff15",
            "label": "GB",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff16",
            "label": "CPU/4G",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff17",
            "label": "每实例",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff18",
            "label": "每客户端",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff19",
            "label": "每VM、节点",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff20",
            "label": "每VM",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff21",
            "label": "每个",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "54d7dd40-b06d-46b3-9c5e-dea0765aeaf9",
            "label": "机柜单位",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff23",
            "label": "人次",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "5f905112-8a7e-4866-b9e7-155028449b90",
            "label": "VM每网站",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "f379b79b-1e3e-4bfd-bbea-3d03f85561f5",
            "label": "管理50个资产",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "47146968-5439-4a4c-a882-6ba1f58b9d2d",
            "label": "每条",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "862a8404-5b12-4a16-ae50-fbd3f6f509a1",
            "label": "每节点",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "775828aa-0ae5-41e4-aa22-94a24b6458cf",
            "label": "MB",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        }
    ];
};
const pricePeriodList = function () {
    return [
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2f2a7",
            "label": "每月",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2f3a7",
            "label": "一次性",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "73a5aa3e-466e-11e7-b988-fa163ec2f4a7",
            "label": "每天",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "9a6b22f3-a8d6-41a0-9b80-630e0d4be4f0",
            "label": "每季度",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        },
        {
            "id": "2afd53cf-478a-489c-86e3-00a7100912f9",
            "label": "每年",
            "iconCls": null,
            "state": null,
            "children": [

            ],
            "attributes": {
                "isLeaf": true
            },
            "leaf": true
        }
    ];
};
const cloudPlatformList = function() {
    return [
        {
            id: '1',
            name: '移动-华三'
        },
        {
            id: '2',
            name: '电信-腾讯'
        },
        {
            id: '3',
            name: '电信-华为备份云'
        },
        {
            id: '4',
            name: '联通'
        },
        {
            id: '5',
            name: '浪潮'
        }
    ]

};
const cloudResourcePoolList = function() {
    return [
        {
            id: '1',
            name: '互联网资源池'
        },
        {
            id: '2',
            name: '政务外网资源池'
        }
    ]

};

/*
* 用户管理-table列表
* */
const produceNewsData = function(data) {
    data = JSON.parse(data.body);
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
    let articles = [];
    let pageSize = data.page.pageSize || 10,
        curPage = data.page.currentPage || 1,
        total = 0,
        lastPage = 0,
        start = 0,
        end = 0,
        id = data.id;
    const thisArray =  data.table.children;
    if(data.table.children && data.table.children.length){
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
*  服务目录
* */
const getTabList = function () {
    return require('../static/json/serviceCatalog/serviceCatalog-list.json');
};
const getComputingServiceTable = function (data) {
    data = JSON.parse(data.body);
    let articles = [];
    let pageSize = data.pageSize || 10,
        curPage = data.currentPage || 1,
        total = 63,
        end = 0,
        lastPage = Math.ceil( total/pageSize),
        start = pageSize*(curPage-1);
        end = lastPage === curPage ? total : pageSize*curPage;
        const specificSetName = [
            {
                "id": "06fe8c71-6551-425f-9370-73a41fc94ebc",
                "label": "普通",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "e50b5153-3cf9-4ec0-8e85-d37cafa82937",
                "label": "高性能",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "5c53a197-ad0f-48f8-b21b-7661bb76359f",
                "label": "Oracle数据库一体机",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "5981cdc5-32b3-4d8b-b8bc-0ba2f49daa59",
                "label": "虚拟数据中心",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "acf606ec-b56e-4f83-b3c4-546f5eab7f85",
                "label": "普通",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "bfcfa108-c521-4832-9e55-0b9c4bfd673e",
                "label": "数据库一体机",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "49ed4aad-a056-4374-a8a6-af378525243a",
                "label": "云主机（ECS）",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            }
        ];
        const cores = [2,4,8,16,32,64];
        const memoryCapacity = [4,8,16,32,64,128,256];
        const priceUnitName = [
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ffa8",
                "label": "台",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ffa9",
                "label": "TB",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff10",
                "label": "100GB",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff11",
                "label": "10GB",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff12",
                "label": "核",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff13",
                "label": "PVU",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff14",
                "label": "CPU",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff15",
                "label": "GB",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff16",
                "label": "CPU/4G",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff17",
                "label": "每实例",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff18",
                "label": "每客户端",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff19",
                "label": "每VM、节点",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff20",
                "label": "每VM",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff21",
                "label": "每个",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "54d7dd40-b06d-46b3-9c5e-dea0765aeaf9",
                "label": "机柜单位",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2ff23",
                "label": "人次",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "5f905112-8a7e-4866-b9e7-155028449b90",
                "label": "VM每网站",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "f379b79b-1e3e-4bfd-bbea-3d03f85561f5",
                "label": "管理50个资产",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "47146968-5439-4a4c-a882-6ba1f58b9d2d",
                "label": "每条",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "862a8404-5b12-4a16-ae50-fbd3f6f509a1",
                "label": "每节点",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "775828aa-0ae5-41e4-aa22-94a24b6458cf",
                "label": "MB",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            }
        ];
        const pricePeriodName = [
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2f2a7",
                "label": "每月",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2f3a7",
                "label": "一次性",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "73a5aa3e-466e-11e7-b988-fa163ec2f4a7",
                "label": "每天",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "9a6b22f3-a8d6-41a0-9b80-630e0d4be4f0",
                "label": "每季度",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            },
            {
                "id": "2afd53cf-478a-489c-86e3-00a7100912f9",
                "label": "每年",
                "iconCls": null,
                "state": null,
                "children": [

                ],
                "attributes": {
                    "isLeaf": true
                },
                "leaf": true
            }
        ];
        for(let i=start; i<end; i++){
            let newArticleObject = {
                sortNo: i+1,
                specificSetName: specificSetName[Random.natural(0,specificSetName.length-1)].label,
                cores: cores[Random.natural(0,cores.length-1)],
                memoryCapacity: memoryCapacity[Random.natural(0,memoryCapacity.length-1)],
                priceUnitName: priceUnitName[Random.natural(0,priceUnitName.length-1)].label,
                unitCost: Random.natural(1000, 20000),
                pricePeriodName: pricePeriodName[Random.natural(0,pricePeriodName.length-1)].label,
                createDate:  Random.date() + ' ' + Random.time()
            };
            articles.push(newArticleObject);
        }

    return {
        articles: articles,
        total: total
    }
};

/*
*  基础设施 - 服务器(latest)
* */
const serverList = function (data) {
    data = JSON.parse(data.body);
    let articles = [];
    let pageSize = data.pageSize || 10,
        curPage = data.currentPage || 1,
        total = 36,
        end = 0,
        lastPage = Math.ceil( total/pageSize),
        start = pageSize*(curPage-1);
    end = lastPage === curPage ? total : pageSize*curPage;

    const groupRole = [
        {
            id: '1',
            name: '计算服务器'
        },
        {
            id: '2',
            name: '存储服务器'
        }
    ];
    const cloudPlatformName = [
        {
            id: '1',
            name: '移动-华三'
        },
        {
            id: '2',
            name: '电信-腾讯'
        },
        {
            id: '3',
            name: '电信-华为备份云'
        },
        {
            id: '4',
            name: '联通'
        },
        {
            id: '5',
            name: '浪潮'
        }
    ];
    const cloudResourcePoolName = [
        {
            id: '1',
            name: '互联网资源池'
        },
        {
            id: '2',
            name: '政务外网资源池'
        }
    ];
    const modelNo = [
        {
            id: '1',
            name: 'H3C'
        },
        {
            id: '2',
            name: 'HUAWEI'
        }
    ];
    for(let i=start; i<end; i++){
        let newArticleObject = {
            sortNo: i+1,
            hostName: Random.character('upper')+Random.natural(10, 99)+'-'+Random.string('upper',3)+'-'+Random.natural(0, 100),
            groupRole: groupRole[Random.natural(0,groupRole.length-1)].name,
            ip: Random.ip(),
            cloudPlatformName: cloudPlatformName[Random.natural(0,cloudPlatformName.length-1)].name,
            cloudResourcePoolName: cloudResourcePoolName[Random.natural(0,cloudResourcePoolName.length-1)].name,
            manufacturer: Random.character('upper')+Random.natural(10, 99)+'-'+Random.character('upper')+Random.natural(1, 10),
            modelNo: modelNo[Random.natural(0,modelNo.length-1)].name,
            instanceCounts:  Random.natural(0, 20),
            healthStatus: Random.boolean(8, 9, true)
        };
        articles.push(newArticleObject);
    }

    return {
        articles: articles,
        total: total
    }
};

const storageDeviceList = function (data) {
  data = JSON.parse(data.body);
  let articles = [];
  let pageSize = data.pageSize || 10,
    curPage = data.currentPage || 1,
    total = 26,
    end = 0,
    lastPage = Math.ceil( total/pageSize),
    start = pageSize*(curPage-1);
  end = lastPage === curPage ? total : pageSize*curPage;
  
  const storageType = [
    {
      id: '1',
      name: 'DAS'
    },
    {
      id: '2',
      name: 'NAS'
    },
    {
      id: '3',
      name: 'SAN'
    }
  ];
  const cloudPlatformName = [
    {
      id: '1',
      name: '移动-华三'
    },
    {
      id: '2',
      name: '电信-腾讯'
    },
    {
      id: '3',
      name: '电信-华为备份云'
    },
    {
      id: '4',
      name: '联通'
    },
    {
      id: '5',
      name: '浪潮'
    }
  ];
  const cloudResourcePoolName = [
    {
      id: '1',
      name: '互联网资源池'
    },
    {
      id: '2',
      name: '政务外网资源池'
    }
  ];
  for(let i=start; i<end; i++){
    let newArticleObject = {
      sortNo: i+1,
      hostName: Random.character('upper')+Random.natural(10, 99)+'-'+Random.string('upper',3)+'-'+Random.natural(0, 100),
      storageType: storageType[Random.natural(0,storageType.length-1)].name,
      cloudPlatformName: cloudPlatformName[Random.natural(0,cloudPlatformName.length-1)].name,
      cloudResourcePoolName: cloudResourcePoolName[Random.natural(0,cloudResourcePoolName.length-1)].name,
      manufacturer: Random.character('upper')+Random.natural(10, 99)+'-'+Random.character('upper')+Random.natural(1, 10),
      instanceCounts:  Random.natural(0, 90)+'GB/'+Random.natural(100, 1000)+'GB',
      healthStatus: Random.boolean(8, 9, true)
    };
    articles.push(newArticleObject);
  }
  
  return {
    articles: articles,
    total: total
  }
};
/*
 *  基础设施 - 服务器-资源变更
 * */
/**
 * 获取type列表
 **/
const changeTypeList = function(data){
  return [
    {
      id:'1',
      name:'虚拟化服务器总数量'
    },
    {
      id:'2',
      name:'虚拟化服务器CPU总数量'
    },
    {
      id:'3',
      name:'虚拟化服务器内存总数量'
    },
    {
      id:'4',
      name:'虚拟化服务器存储总数量'
    },
    {
      id:'5',
      name:'虚拟化服务器网络总数量'
    },
  ];
};
const basicInfoList = function(data){
  return {
       basicInfo:{
         hostname: 'inner',
         serverIp: '172.18.4.2',
         cloudProvider: '电信-腾讯',
         cloudResource: '政务外网资源池',
         hostNo: '9台',
         status: 'safe',
         safeRunTime: '3月15天2小时'
       },
       resourceConfig: {
         cpu: '64核',
         memory: '120GB',
         storage: '1024GB'
       }
    }
};

const changeList = function (data) {
  data = JSON.parse(data.body);
  let articles = [];
  let pageSize = data.pageSize || 10,
    curPage = data.currentPage || 1,
    total = 36,
    end = 0,
    lastPage = Math.ceil( total/pageSize),
    start = pageSize*(curPage-1);
  end = lastPage === curPage ? total : pageSize*curPage;

  const typeList = [
    {
      id:'1',
      name:'虚拟化服务器总数量'
    },
    {
      id:'2',
      name:'虚拟化服务器CPU总数量'
    },
    {
      id:'3',
      name:'虚拟化服务器内存总数量'
    },
    {
      id:'4',
      name:'虚拟化服务器存储总数量'
    },
    {
      id:'5',
      name:'虚拟化服务器网络总数量'
    },
  ];


  for(let i=start; i<end; i++){
    let newArticleObject = {
      sortNo: i+1,
      time:Random.date() + ' ' + Random.time(),
      type: typeList[Random.natural(0,typeList.length-1)].name,
      resourceBefore: 'xx',
      resourceAfter: 'xx',
      author: Random.cname()
    };
    articles.push(newArticleObject);
  }

  return {
    articles: articles,
    total: total
  }
};

/*
 *  基础设施 - 服务器-资源变更
 * */
/**
 * 获取type列表
 **/
const warnTypeList = function(data){
  return [
    {
      id:'1',
      name:'虚拟化服务器总数量'
    },
    {
      id:'2',
      name:'虚拟化服务器CPU总数量'
    },
    {
      id:'3',
      name:'虚拟化服务器内存总数量'
    },
    {
      id:'4',
      name:'虚拟化服务器存储总数量'
    },
    {
      id:'5',
      name:'虚拟化服务器网络总数量'
    },
  ];
};

const warnList = function (data) {
  data = JSON.parse(data.body);
  let articles = [];
  let pageSize = data.pageSize || 10,
    curPage = data.currentPage || 1,
    total = 12,
    end = 0,
    lastPage = Math.ceil( total/pageSize),
    start = pageSize*(curPage-1);
  end = lastPage === curPage ? total : pageSize*curPage;
  
  const typeList = [
    {
      id:'1',
      name:'虚拟化服务器总数量'
    },
    {
      id:'2',
      name:'虚拟化服务器CPU总数量'
    },
    {
      id:'3',
      name:'虚拟化服务器内存总数量'
    },
    {
      id:'4',
      name:'虚拟化服务器存储总数量'
    },
    {
      id:'5',
      name:'虚拟化服务器网络总数量'
    },
  ];
  
  
  for(let i=start; i<end; i++){
    let newArticleObject = {
      sortNo: i+1,
      time:Random.date() + ' ' + Random.time(),
      type: typeList[Random.natural(0,typeList.length-1)].name,
      name: Random.csentence(3, 5),
      status: 'xx',
      content: Random.cparagraph()
    };
    articles.push(newArticleObject);
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
Mock.mock('/specificSetList','post', specificSetList);
Mock.mock('/priceUnitList','post', priceUnitList);
Mock.mock('/pricePeriodList','post', pricePeriodList);

Mock.mock('/cloudPlatformList','post', cloudPlatformList);
Mock.mock('/cloudResourcePoolList','post', cloudResourcePoolList);

//用户管理
Mock.mock('/userTable','post', produceNewsData);
Mock.mock('/userTable/getUserPower','post', getUserPower);

//租户管理
Mock.mock('/tenantTable','post', tenantListData);

//码表管理
Mock.mock('/codeTree', 'post', codeTreeList);
Mock.mock('/codeTable','post', codeTableListData);

//服务目录
Mock.mock('/serviceCatalog/getTabList', 'post', getTabList);
Mock.mock('/serviceCatalog/getComputingServiceTable', 'post', getComputingServiceTable);

//服务器
Mock.mock('/serverList', 'post', serverList);

//服务器-详情页：资源变更
Mock.mock('/basicInfoList','post', basicInfoList);
Mock.mock('/changeTypeList','post', changeTypeList);
Mock.mock('/changeList', 'post', changeList);

//服务器-详情页：告警
Mock.mock('/warnTypeList','post', warnTypeList);
Mock.mock('/warnList', 'post', warnList);

Mock.mock('/storageDeviceList', 'post', storageDeviceList);
