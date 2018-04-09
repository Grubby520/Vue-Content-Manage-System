<!--
add/edit dialog
-->
<template >
    <el-dialog
        :title="formData.title"
        :visible.sync="dialogVisible"
        :close-on-click-modal=false
        :before-close="closeDialog"
        :close-on-press-escape=false
    >
        <el-dialog
            class="innerDialog"
            width="50%"
            title="提示"
            :visible.sync="innerVisible"
            :modal=false
            >
            <h3 class="warn-text">您未做任何修改</h3>
        </el-dialog>

        <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item label="父节点 :" :label-width="formLabelWidth" prop="dictId">
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    :highlight-current=true
                    node-key="id"
                    :default-expanded-keys="['sysCodeTable']"
                    :default-checked-keys="[this.formData.dictId]"
                    accordion
                    class="el-tree-add"
                    @node-click="handleNodeClick">
                </el-tree>
            </el-form-item>
            <el-form-item label="名称 :" :label-width="formLabelWidth" prop="dictName">
                <el-input v-model="formData.dictName" placeholder="请输入2-16位名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="编码 :" :label-width="formLabelWidth" prop="dictCode">
                <el-input v-model="formData.dictCode" placeholder="请输入5-8位编码号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否生效 :" :label-width="formLabelWidth" prop="isEffect">
                <el-radio v-model="formData.isEffect" :label=true>是</el-radio>
                <el-radio v-model="formData.isEffect" :label=false>否</el-radio>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('formData')">重 置</el-button>
            <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import api from '../../../../axios/api.js'
    import {deepCopyObject, isObjectValueEqual} from '../../../../../static/js/public.js'
    export default {
        props: {
            dialogVisible: {type: Boolean},
            form: {type:Object}
            },
        data(){
            return  {
                rules: {
                    dictId: [
                        {required: true, message: '请选择父节点', trigger: 'click'},
                        {min: 2, message: '未选中如何父节点', trigger: 'click'}
                    ],
                    dictName: [
                        {required: true, message: '请输入2-16位用户名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在2到16个字符', trigger: 'blur'}
                    ],
                    dictCode: [
                        {required: true, message: '请输入5-8位编码号', trigger: 'blur'},
                        {min: 5, max: 8, message: '长度在5到8个字符', trigger: 'blur'}
                    ],
                    isEffect: [
                        {required: true}
                    ]
                },
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                formData: {},
                copyFormData : {},
                departments: [],
                isSubmit: false,
                formLabelWidth: '150px',
                innerVisible: false
            }
        },
        created(){
            this.formData = this.form;
            this.copyFormData = deepCopyObject(this.form);
            this.getTreeList();
        },
        watch: {
            form: {
                handler: function(val, oldVal){
                    this.formData = val;
                },
                deep: true
            },
            dialogVisible: function(){
                this.copyFormData = deepCopyObject(this.form);
                this.isSubmit = false;
            }
        },
        methods: {
            closeDialog(){
                const _this = this;
                _this.$emit('callbackParent',{type: 'dialog', isSubmit: this.isSubmit});
                setTimeout(function(){
                    _this.$refs['formData'].resetFields();//仅close时执行
                },1000);

            },
            /*
            *  获取节点tree列表
            * */
            getTreeList(){
                let tree = [];
              if(this.form.codeType === 'sysCode'){
                  tree = [
                      {
                          "id": "sysCodeTable",
                          "label": "系统码表",
                          "iconCls": null,
                          "state": null,
                          "children": [
                              {
                                  "id": "148377ca-d459-4a87-8ef6-9e97ea44de13",
                                  "label": "网络安全服务字段",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "e384cdaa-fdcd-432b-b5b1-c7cc38c822a6",
                                          "label": "控制数量",
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
                                          "id": "e5216b5a-bc57-4932-aec2-eb451916cdba",
                                          "label": "控制名称",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "fa0230d0-a462-43de-adb4-28d00daed7b3",
                                  "label": "网域区分",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "0a2d4d07-d0e6-4709-9599-c46feadce866",
                                          "label": "互联网",
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
                                          "id": "3bad6bf5-fbdf-45f5-b258-6b1fd98f026f",
                                          "label": "内网",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec20000",
                                  "label": "服务目录类型",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec20006",
                                          "label": "计算服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec20003",
                                          "label": "存储服务",
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
                                          "id": "deaf904f-6773-46f2-a3d0-ea628cb41549",
                                          "label": "软件服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec20007",
                                          "label": "网络安全服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec20004",
                                          "label": "第三方安全服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec20005",
                                          "label": "其它服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              }
                          ],
                          "attributes": {
                              "isLeaf": false
                          },
                          "leaf": false
                      }
                  ];
            }
              else if(this.form.codeType === 'userCode'){
                  tree =   [
                      {
                          "id": "userCodeTable",
                          "label": "用户码表",
                          "iconCls": null,
                          "state": null,
                          "children": [
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec2ffa7",
                                  "label": "计价单位",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
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
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec2f1a7",
                                  "label": "计价周期",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
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
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec2f9a7",
                                  "label": "计算服务类型",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
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
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "1d392569-31af-4517-a625-afa01dc3221d",
                                  "label": "软件服务类型",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "bf94d491-f4a2-44b1-b3b6-027aa28d3c61",
                                          "label": "测试软件类型",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "9a761fe2-aae9-4987-8d22-27ba7bee1708",
                                                  "label": "测试软件-test",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "d7c429e1-9248-45b2-9bb6-3c38a38a29b6",
                                          "label": "中间件类型",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "4fafd656-3087-462d-b4ca-1cebba2d909b",
                                                  "label": "甲骨文 Weblogic",
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
                                                  "id": "e5c8a9f2-bdaf-4bb7-a43e-c29628b8d382",
                                                  "label": "东方通Tongweb",
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
                                                  "id": "a3c10069-1513-44e9-a904-c2e1e5c17487",
                                                  "label": "IBM WebSphere",
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
                                                  "id": "c6a9e09f-7ba8-44ea-84d3-22f3dca11ebb",
                                                  "label": "金碟 Apusic",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec30000",
                                          "label": "操作系统类型",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "c3f40c07-b1ef-4531-b4b1-06c214f015c8",
                                                  "label": "Windows Server",
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
                                                  "id": "5e4eed6d-4f7b-4002-8142-f9def63214f4",
                                                  "label": "SUSE",
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
                                                  "id": "2523cf04-f806-436a-8626-61fd7f18cfbe",
                                                  "label": "RedHat",
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
                                                  "id": "1eb36e06-4ea3-4d28-85ac-c9da0fd3d19d",
                                                  "label": "CentOS",
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
                                                  "id": "a9ca6397-511e-4d6d-a83a-a9c592d25329",
                                                  "label": "Ubuntu",
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
                                                  "id": "d011cd32-a7bc-4c72-ba98-1a6087dedbc2",
                                                  "label": "中标麒麟",
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
                                                  "id": "a0a53096-60db-4647-835e-f507a047c222",
                                                  "label": "Aliyun",
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
                                                  "id": "0ee11914-70a4-41d6-905a-9a8ea3b16782",
                                                  "label": "Debian",
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
                                                  "id": "cac30376-578c-40f9-a745-218b96d7ccd0",
                                                  "label": "OpenSUSE",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec40000",
                                          "label": "数据库类型",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "acfa6ed5-80cd-4b35-8dea-533252986e13",
                                                  "label": "MySQL",
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
                                                  "id": "83465d27-58d1-487e-ade0-c80823e5238d",
                                                  "label": "SQLServer",
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
                                                  "id": "a39959ed-bef5-4dfd-baac-2f4773b6ae08",
                                                  "label": "达梦",
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
                                                  "id": "860e0f22-bdc4-4494-a7d3-f6c34ac9b461",
                                                  "label": "南大通用 Gbase",
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
                                                  "id": "19ad0914-f9e0-4195-b897-8389e7453de0",
                                                  "label": "DB2",
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
                                                  "id": "5de26b88-477e-447f-8286-02bd2448704c",
                                                  "label": "PPAS",
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
                                                  "id": "aba8da79-1c6a-4273-b027-03064eea0a88",
                                                  "label": "ORACLE",
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
                                                  "id": "f453fcf9-ef8e-4c24-867b-2577838d3a74",
                                                  "label": "postgreSQL",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec80000",
                                  "label": "网络安全类型",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "826a1f20-8c93-470a-9b74-fe630e8b7a03",
                                          "label": "网络服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "adee6b29-5654-4b5b-a43a-e6956785d72a",
                                                  "label": "弹性负载均衡软件",
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
                                                  "id": "a1fbc1c3-7337-4b62-93b8-0b9931b83b4d",
                                                  "label": "弹性负载均衡硬件",
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
                                                  "id": "b657e485-8789-4f83-9e4a-659274d3c6f2",
                                                  "label": "VPN",
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
                                                  "id": "f0b4cc06-8786-45f3-827f-e2983cf090c7",
                                                  "label": "日志审计",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "f4d18497-d6ce-41a1-9a9d-8d55c943a374",
                                          "label": "安全服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "460fdd42-d697-444c-8002-9588f1e6b942",
                                                  "label": "WAF防护",
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
                                                  "id": "07c4502f-575a-4486-bfd2-a3d8dbaf3bb7",
                                                  "label": "漏洞扫描",
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
                                                  "id": "8f04bfa0-6bfb-4a90-a67b-7b6089e89078",
                                                  "label": "网页防篡改",
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
                                                  "id": "ae12f989-e938-4855-9fd2-a131dd1d7d0f",
                                                  "label": "虚拟化防病毒",
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
                                                  "id": "39c442db-e2c4-4a69-bae5-ae823be84f57",
                                                  "label": "堡垒机",
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
                                                  "id": "67020b7d-5020-4be8-9b20-7fddec28311e",
                                                  "label": "安全防护系统",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec50000",
                                  "label": "存储和备份容灾",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "add1b3dc-cb55-41b7-999b-3aca2b4b1d98",
                                          "label": "存储服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "5676179a-d260-4db5-b7b2-ad9529937906",
                                                  "label": "NAS存储",
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
                                                  "id": "f92d3a2d-2a87-4c43-bcf0-a67708d5f40f",
                                                  "label": "分布式存储",
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
                                                  "id": "3cf6d785-d4a3-409b-aebe-77f7c8d4cd28",
                                                  "label": "FCSAN存储空间",
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
                                                  "id": "4725636d-300a-4067-9e2c-424a0c1c8a7c",
                                                  "label": "Oracle一体机存储",
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
                                                  "id": "c59bbcae-1b23-440e-9384-df2f1e75131f",
                                                  "label": "数据库存储",
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
                                                  "id": "d4a2867a-dfed-4023-b5b3-03e3d09bd3c4",
                                                  "label": "对象存储",
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
                                                  "id": "ca73cb73-84ce-494f-b484-bf9758a5f514",
                                                  "label": "虚拟机存储",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "1b5dae16-de77-4d3c-9ca3-ba835736d92d",
                                          "label": "备份容灾",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "be4aa6a3-c221-4b3b-a1e7-1111a28a9660",
                                                  "label": "虚拟机/文件备份",
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
                                                  "id": "58ee04cb-6f66-4c20-8045-21ae892f1927",
                                                  "label": "数据库备份",
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
                                                  "id": "b0b9234e-98a1-4d48-babd-457db05bf4a7",
                                                  "label": "异地备份",
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
                                                  "id": "f0136b7c-d445-4522-ac30-d6cb2ceaa2ff",
                                                  "label": "主备容灾",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec60000",
                                  "label": "第三方安全服务",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "019d15f7-56b3-4f3c-a204-bbab739ed9fc",
                                          "label": "安全检查服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [
                                              {
                                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec60001",
                                                  "label": "虚拟机安全检查",
                                                  "iconCls": null,
                                                  "state": null,
                                                  "children": [

                                                  ],
                                                  "attributes": {
                                                      "isLeaf": true
                                                  },
                                                  "leaf": true
                                              }
                                          ],
                                          "attributes": {
                                              "isLeaf": false
                                          },
                                          "leaf": false
                                      },
                                      {
                                          "id": "c989e393-da55-4c81-b067-a63ab25bbfcf",
                                          "label": "安全防护服务",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "73a5aa3e-466e-11e7-b988-fa163ec70000",
                                  "label": "其他服务",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec70001",
                                          "label": "数据库安装服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec70002",
                                          "label": "运维服务",
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
                                          "id": "73a5aa3e-466e-11e7-b988-fa163ec70003",
                                          "label": "一次性收费",
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
                                          "id": "2a113f68-747a-40ef-a09d-673e31cf3bbf",
                                          "label": "云通信短信通讯",
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
                                          "id": "973268fb-0c0f-4edd-b2ad-f414ed3da23f",
                                          "label": "高性能物理机",
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
                                          "id": "848e51c8-14b5-4964-ba9e-0357998e5d16",
                                          "label": "虚拟桌面",
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
                                          "id": "09648553-7c07-4ffe-b8af-255ee498bb59",
                                          "label": "网络设备",
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
                                          "id": "b32ed582-9955-4c8f-a304-fbc781cda5b2",
                                          "label": "机柜服务（T3+）",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "e098a669-0d7e-46d9-83de-44919218221b",
                                  "label": "资源运行状态",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "326d8c8d-da9e-4407-8ef5-a8aae50abea7",
                                          "label": "运行中",
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
                                          "id": "399b751c-44dd-41e1-8980-bbda7d40edab",
                                          "label": "关机",
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
                                          "id": "073b5776-c6dd-461d-8ac5-080fc0eb6736",
                                          "label": "未知",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              },
                              {
                                  "id": "5fc06eee-07c2-44e5-9b9b-82be027303e7",
                                  "label": "资源使用状态",
                                  "iconCls": null,
                                  "state": null,
                                  "children": [
                                      {
                                          "id": "5965af34-e0c7-4220-807e-5773e3ab552c",
                                          "label": "使用中",
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
                                          "id": "f2943d24-046e-4c3e-8c16-44bd34fbb77f",
                                          "label": "已回收",
                                          "iconCls": null,
                                          "state": null,
                                          "children": [

                                          ],
                                          "attributes": {
                                              "isLeaf": true
                                          },
                                          "leaf": true
                                      }
                                  ],
                                  "attributes": {
                                      "isLeaf": false
                                  },
                                  "leaf": false
                              }
                          ],
                          "attributes": {
                              "isLeaf": false
                          },
                          "leaf": true
                      }

                  ];
              }
              this.treeData = tree;
            },
            /*
            *  获取节点选中id
            * */
            handleNodeClick(data){
                this.formData.dictId = data.id;
            },
            resetForm(formName) {
                //深浅拷贝-坑
                this.formData = deepCopyObject(this.copyFormData);
                if(this.formData.type === 'add'){
                    this.$refs[formName].resetFields();
                }
                else{
                    this.$refs[formName].validate('dictName');
                    this.$refs[formName].validate('dictCode');
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this,
                               isChange = isObjectValueEqual(
                                   JSON.parse(JSON.stringify(this.formData)),
                                   JSON.parse(JSON.stringify(this.copyFormData))
                               );

                        if(isChange){
                            //未修改
                            _this.innerVisible = true;
                        }
                        else{
                            this.isSubmit = true;
                            console.info(this.formData);
                            this.closeDialog();
                            setTimeout(function(){
                                _this.$message({
                                    type: 'success',
                                    message: '提交成功',
                                    duration: '1500'
                                });
                                _this.formData = {//初始化
                                    title: '',
                                    dictId: '',
                                    dictName: '',
                                    dictCode: '',
                                    isEffect: false,
                                    type:''
                                };
                            },300);
                        }
                    } else {
                        console.warn('error submit');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>
    .el-form-item__label{
        padding-right: 10px;
    }
    .inner-dialog td{
        border-bottom: 1px solid #ccc;
    }
    .el-tree-add{
        width: 300px;
        height: 218px;
        overflow-y: scroll;
    }
</style>
