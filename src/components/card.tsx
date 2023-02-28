import React from 'react'
import style from './style.module.css'

export const Card = () => {
  return <div>
  <div className={style.box}>
  <h3 className={style.box_title}>Name:</h3>
  <div className={style.btn_box}>
  <button className={style.edit}>Edit</button>
  <button className={style.delete}>Delete</button>
  </div>
  </div>
  </div>;
}
