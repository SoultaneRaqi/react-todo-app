import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Construction } from 'lucide-react';


type Priority = 'low' | 'medium' | 'high'

type Todo = {
  id : number ;
  text : string ;
  priority : Priority
}

function App() {
  const [input , setInput] = useState<string>('')
  const [priority , setPriority] = useState<Priority>('medium')
  const savedTodos = localStorage.getItem('todos')
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos , setTodos] = useState<Todo[]>(initialTodos)

  const [filter , setFilter] = useState<Priority | "All">('All')


  useEffect(()=>{
    localStorage.setItem('todos' , JSON.stringify(todos))
  },[todos])
  
  function addTodo() {
    if(input.trim() === '') return alert('Please enter a valid todo')

     const newTodo : Todo = {
       id : Date.now(), 
       text : input.trim() ,
       priority : priority
     } 

     const newTodos = [ newTodo , ...todos]
     setTodos(newTodos)
     setInput('')
     setPriority('medium')
  }

  let filteredTodos : Todo[] = []

  if(filter === 'All'){
    filteredTodos = todos
  }else {
   filteredTodos = todos.filter((todo) => todo.priority === filter)
  } 

  const hightPriorityCount = todos.filter((todo) => todo.priority === 'high').length
  const mediumPriorityCount = todos.filter((todo) => todo.priority === 'medium').length
  const lowPriorityCount = todos.filter((todo) => todo.priority === 'low').length

  const totalTodos = todos.length

  function deleteTodo(id : number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos , setSelectedTodos] = useState<Set<number>>(new Set()) 
  function toggleTodoSelection(id : number) {
    const newSelected = new Set(selectedTodos)
    if(newSelected.has(id)){
      newSelected.delete(id)
    }else {
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishedSelected() {
  const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
  setTodos(newTodos);
  setSelectedTodos(new Set());
}


  return (
    
      <div className="flex justify-center">
       <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
         <div className="flex gap-4">
            <input 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <select 
            className="select w-full select-bordered"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            >
                 <option value="low">Low</option>   
                 <option value="medium">Medium</option>   
                 <option value="high">High</option>
            </select>
            <button onClick={addTodo} className="btn btn-primary">ADD</button>
         </div>
         
         <div className='space-y-2 flex-1 h-fit'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-wrap gap-4 '>

            <button className={`btn btn-soft ${filter === 'All' ? 'btn-primary' : ''}`} 
            onClick={() => setFilter('All')}
            > 
              ALL ({totalTodos})
            </button>

            <button className={`btn btn-soft ${filter === 'high' ? 'btn-primary' : ''}`} 
            onClick={() => setFilter('high')}
            > 
              Hight ({hightPriorityCount})
            </button>


            <button className={`btn btn-soft ${filter === 'medium' ? 'btn-primary' : ''}`} 
            onClick={() => setFilter('medium')}
            > 
              Medium ({mediumPriorityCount})
            </button>

             <button className={`btn btn-soft ${filter === 'low' ? 'btn-primary' : ''}`} 
            onClick={() => setFilter('low')}
            > 
              Low ({lowPriorityCount})
            </button>

          </div>
          
          <button 
             onClick={finishedSelected}
             className='btn btn-primary'
             disabled={selectedTodos.size === 0}
             >
              Finish Selected Todos ({selectedTodos.size})
            </button>
          </div>
          {filteredTodos.length > 0 ? (
                 <ul className='divide-y divide-primary/20'>
                    {filteredTodos.map((todo)=>(
                      <li key={todo.id}>
                        <TodoItem todo={todo} 
                        isSelected={selectedTodos.has(todo.id)}
                        onDelete={() => deleteTodo(todo.id)}
                        onToggleSelect = {toggleTodoSelection}
                        />
                      </li>
                    )
                    
                    )}
                 </ul>      

              ) :(
                   <div className='flex justify-center items-center flex-col p-5'>
                        <div>
                          <Construction strokeWidth={1} className='w-40 h-40 text-primary'/>
                        </div>
                        <p className='text-2xl font-bold text-primary'>No todos</p>
                   </div> 
              )
              }
         </div>
       </div>
      </div>
     
   
  )
}

export default App
