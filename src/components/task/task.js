import { Component } from 'react'
import './task.css'

export default class Task extends Component{  
    state = {
      completed: false
    }

    onToogleClick = () => {
      this.setState(({ completed }) => {
        return {
          completed: !completed
        }
      })
    }
    
    render () {
      const { description, created, onDeleted } = this.props
      const {completed} = this.state
      let classNames = 'view'

      if(completed){
        classNames= ' completed'
        
      }

      return (
        <li className= { classNames }>
          <div className='view'>
            <input 
            className="toggle" 
            type="checkbox"
            onClick={ this.onToogleClick} 
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