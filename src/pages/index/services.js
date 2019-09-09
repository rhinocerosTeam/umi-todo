var storage = window.localStorage;    
var key = "TODO:list" 
/**
 * 
 * text 内容
 * time 时间
 * status 0 正在做 1 已经完成
 */
export function fetch(){
    let data = storage.getItem(key)||"[]"
    return JSON.parse(data)
}
export function update(index,status){
    let data = JSON.parse(storage.getItem(key)||"[]")
    data[index].status = status
    storage.setItem(key,JSON.stringify(data))
    return data
}
export function add(todo){
   let data = JSON.parse(storage.getItem(key)||"[]")
   data.push(todo)
   storage.setItem(key,JSON.stringify(data))
   return data
}
export function deleteD(index){
    console.log("deleteD=====>",index)
    let data = JSON.parse(storage.getItem(key)||"[]")
    data.splice(index,1)
    storage.setItem(key,JSON.stringify(data))
    return data
}