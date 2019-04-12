export const getDay=(time=new Date())=>{
    let date=new Date(time);
    let Y=date.getFullYear();
    let M=date.getMonth()+1;
    if(M<10){
        M="0"+M
    }
    let D=date.getDate()
    if(D<=10){
        D="0"+D
    }
    return `${Y}-${M}-${D}`
}
export const dateString=(time=new Date())=>{
    let date=new Date(time);
    let Y=date.getFullYear();
    let M=date.getMonth()+1;
    if(M<10){
        M="0"+M
    }
    let D=date.getDate()
    if(D<=10){
        D="0"+D
    }
    return {Y,M,D}
}