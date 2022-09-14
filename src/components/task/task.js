import { Component } from 'react'
import './task.css'

export default class Task extends Component{     
    render () {
      const { description, created, onDeleted, onToogleCompleted, completed } = this.props
      let classNames = ''

      if(completed){
        classNames= ' completed'        
      }

      return (
        <li className= { classNames }>
          <div className='view'>
            <input 
            className="toggle" 
            type="checkbox"
            onClick={ onToogleCompleted } 
            defaultChecked={ completed ? true : false }
            />
            <label>
              <span className="description">{ description }</span>
              <span className="created">{ created }</span>
            </label>
            <button className="icon icon-edit" />
            <button 
            className="icon icon-destroy"
            onClick={onDeleted } />
          </div>
        </li>
  )
    }
}