export default {
    /*
    * 首页-业务概况-pie
    * */
    business_monitor_option(data){
        let temp = true;
        for(const i in data){
            if(isNaN(data[i]) || data[i] < 0 ){
                temp = false;
                break;
            }
        }
        if(!temp){
            console.error('数据格式有误！');
            return false;
        }
        else{
            return {
                title:{
                    text:(parseInt(data[2])),
                    subtext:'总数',
                    x:'center',
                    y:'35%',
                    textStyle : {
                        fontSize : 30,
                        fontWeight : 'bold',
                        color : '#25a4f6'
                    },
                    subtextStyle : {
                        fontSize : 14,
                        color : '#666',
                        fontFamily : '微软雅黑'
                    }
                },
                tooltip:{
                    trigger:'item',
                    formatter:"{a}<br/>{b} : {c}"
                },
                legend:{
                    //selectedMode:false,//数据开关
                    orient:'horizontal',
                    bottom:'0%',
                    itemWidth:12,
                    itemHeight:8,
                    formatter:function(name){
                        var  format = [
                            {value:data[0],name:'可用'},
                            {value:data[1],name:'不可用'},
                            {value:data[2]-data[1]-data[0],name:'未检测'}
                        ];
                        for(var i = 0; i < format.length; i++){
                            if(name == format[i].name){
                                return name +'(个) : '+ format[i].value;
                            }
                        }
                    },
                    data:['可用','不可用','未检测']
                },
                series:[{
                    name:'业务运行情况',
                    type:'pie',
                    radius:['45%', '70%'],
                    center:['50%','50%'],
                    hoverAnimation:false,
                    label:{
                        normal:{
                            show:false
                        }
                    },
                    itemStyle : {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        normal : {
                            borderColor: '#fff',
                            borderWidth: 2,
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        }
                    },
                    data:[
                        {value:data[0],name:'可用'},
                        {value:data[1],name:'不可用'},
                        {value:data[2]-data[1]-data[0],name:'未检测'}
                    ]
                }],
                color:['#25a4f6','#ff3b2f','#ccc']
            }
        }
    },

    business_status(value, color){
        let dataStyle={
            normal:{
                label:{show:false},
                labelLine:{show:false},
                shadowBlur:0,
                shadowColor:"#fff"
            }
        };
        let placeHolderStyle={
            normal:{
                color:color,
                label:{show:false},
                labelLine:{show:false}
            },
            emphasis:{
                color:color
            }
        };
        let percent=value;
        return {
            title:{
                text:percent,
                x: 'center',
                y: 'center',
                textStyle:{
                    color:color,
                    fontSize:25,
                    fontFamily:"微软雅黑"
                }
            },
            series:[
                {
                    name: 'line1',
                    type: 'pie',
                    clockWise: false,
                    radius: ["90%", "100%"],
                    hoverAnimation: false,
                    itemStyle: dataStyle,
                    data: [
                        {
                            value: "100"-percent,
                            name: '01'
                        },
                        {
                            value: percent,
                            name: 'invisible',
                            itemStyle: placeHolderStyle,
                        }
                    ]
                },
                {
                    name: 'line2',
                    type: 'pie',
                    clockWise: false,
                    radius: ["80%", "91%"],
                    hoverAnimation: false,
                    itemStyle: dataStyle,
                    data: [
                        {
                            value: "100"-percent,
                            name: '02'
                        },
                        {
                            value: percent,
                            name: 'invisible',
                            itemStyle: placeHolderStyle,
                        },

                    ]
                }
            ],
            color:['#dcdcdc','#fff']
        };
    }
}
