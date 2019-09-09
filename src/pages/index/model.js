import * as Service from './services'
export default {
    namespace:'index',
    state:{
        list:[
            // {text:"todo内容",status:0正在进行 1已经完成}
        ]
    },
    reducers:{
        save(state,{payload:{data:list}}){
            return {...state,list}
        }
    },
    effects:{
        *fetch(payload,{call,put}){
            const data = yield call(Service.fetch)
            console.log("*fetch")
            yield put({type:'save',payload:{data}})
        },
        *add(payload,{call,put}){
            let {todo} = payload
            const data = yield call(Service.add,todo)
            yield put({type:'save',payload:{data}})
        },
        *update(payload,{call,put}){
            let {index,status} = payload
            const data = yield call(Service.update,index,status)
            yield put({type:'save',payload:{data}})
        },
        *delete(payload,{call,put}){
            let {index} = payload
            const data = yield call(Service.deleteD,index)
            yield put({type:'save',payload:{data}})
        },
    },
    subscriptions:{
        setup({ dispatch, history }){
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                  dispatch({ type: 'fetch', payload: query });
                }
              });
        }
    }
}