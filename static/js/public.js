/*
*  存放公共方法
* */

/*
*  深拷贝
* */
export function deepCopyObject(obj){
    let dst = {};
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            dst[prop] = obj[prop];
        }
    }
    return dst;
}

/*
*  判断两个对象是否完全相等
* */
export function isObjectValueEqual(a, b){
const aProps = Object.getOwnPropertyNames(a),
    bProps = Object.getOwnPropertyNames(b);
console.log(aProps.length);
if (aProps.length !== bProps.length) {
    return false;
}
for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    console.log(a[propName] );
    console.log(b[propName] );
    if (a[propName] !== b[propName]) {
        return false;
    }
}
return true;
}

export function getRandomNumber(min, max){
    const r = Math.random() * (max - min),
           re = Math.round(r + min);
    return Math.max(Math.min(re, max), min);
}
