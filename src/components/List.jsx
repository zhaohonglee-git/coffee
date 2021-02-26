import React from 'react'

const List = ({ lists }) => {
  return (
    <div>
      {lists.map((item, index) => {
        return (
          <div key={index}>
            <h4>{`序号：${index}  口味种类:${item.drinkName}  制作时间：${item.produceTime}`}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default List
