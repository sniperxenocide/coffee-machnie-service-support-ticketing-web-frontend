import React from "react";

export default new class CommonMethods{

    objectKeyToCamelCaseToWord(listData){
        let finalData = [];
        listData.forEach(d=>{
            let obj = {}
            for(let key in d){
                obj[this.camelCaseToText(key)]=d[key];
            }
            finalData.push(obj);
        })
        return finalData;
    }

    camelCaseToText(val){
        let result = val.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    getTimeDif(totalMin,firstLimit,secondLimit){
        let color='green';
        if(totalMin===null) return '---'
        if(totalMin>firstLimit) color='blue';
        if(totalMin>secondLimit) color='red';
        let text = '';
        let d=0,hr=0,min=totalMin;
        hr=Math.floor(min/60);
        min=min%60;
        d=Math.floor(hr/24);
        hr=hr%24;
        text = (d>0?d+'d':'')+' '+(hr>0?hr+'h':'')+' '+min+'m';
        return <b style={{color:color}}>{text}</b>;
    }
}