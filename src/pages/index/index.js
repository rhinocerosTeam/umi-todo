
import React from 'react';
import styles from './index.css';
import { connect } from 'dva';
function App(props) {
  const list = props.index.list||[]
  const addTODO=(e)=>{
    if(e.keyCode === 13) {
      let value = e.target.value
      let todo = {text:value,status:0}
      props.dispatch({type:'index/add',todo})
      e.target.value=""
    }
  }
  const updateStatusTODO=(e,index)=>{
      let checked = e.target.checked
      
      let status = checked?1:0
      props.dispatch({type:'index/update',index,status})
  }
  const deleteTODO=(e,index)=>{
      
      props.dispatch({type:'index/delete',index})
  }
  let time= Date.now()
  return (
    <div className={styles.normal}>
      <header className={styles.menu}>
        <section>
            <span>TODO</span>
            <input type="text" placeholder="添加TODO" onKeyUp={addTODO}/>
        </section>
      </header>
      <div className={styles.list}>
        <h3>正在进行</h3>
        <ul className={styles.doing}>
          { list&&list.map((todo,index)=>{
              return (todo.status === 0 && <li key={"doing"+index+time}>
              <input type="checkbox"  onChange={(e)=>{updateStatusTODO(e,index)}}/>
              <span>{todo.text}</span> 
              <a href="#" data-index={index} onClick={(e)=>{deleteTODO(e,index)}}>-</a>
            </li>)
            })}
        </ul>
        <h3>已经完成</h3>
        <ul className={styles.finish}>
          {list&&list.map((todo,index)=>{
            return (todo.status === 1 && <li key={"finish"+index+time}>
              <input type="checkbox" data-index={index} checked={true} onChange={(e)=>{updateStatusTODO(e,index)}} />
              <span>{todo.text}</span> 
              <a href="#" data-index={index} onClick={(e)=>{deleteTODO(e,index)}}>-</a>
            </li>)
          })}
        </ul>
      </div>
     
    </div>
  );
}

export default connect((state)=> {
  return state;
})(App);
