import {Trash} from 'lucide-react'
type Priority = 'low' | 'medium' | 'high'

type Todo = {
  id : number ;
  text : string ;
  priority : Priority
}

type Props = {
  todo : Todo
  onDelete : () => void
  isSelected : boolean
  onToggleSelect : (id : number) => void
}
const TodoItem = ({todo , onDelete , isSelected ,  onToggleSelect} : Props) => {
  return (
    <li className="p-3 ">
         <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" 
                    checked={isSelected}
                    onChange={() => onToggleSelect(todo.id)}
                    />
                    <span className="text-md font-bold">
                        <span className="capitalize p-2" >{todo.text}</span>
                        <span 
                            className={`badge badge-sm badge-soft ${
                                todo.priority === 'high'
                                ? 'badge-error'
                                : todo.priority === 'medium'
                                ? 'badge-warning'
                                : 'badge-success'
                            }`}
                            >
                            {todo.priority}
                            </span>
                    </span>
                </div>
                <div>
                    <button 
                        onClick={onDelete} 
                        className='btn btn-sm btn-error btn-soft' 
                        >
                        <Trash className='w-4 h-4'/>
                    </button>
                </div>
         </div>
     
    </li>
  )
}

export default TodoItem