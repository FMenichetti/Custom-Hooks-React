import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"



export const useTodos = () => {


    //Esta funcion es para inicializar el 3er argumento del useReducer, 
    //Lo que hace es sacar del Storage los datos y pasarlos como init
    //en caso que no haya nada en 1ra instancia, devuelvo [] vacio...
    //busco un item por la clave 'todo' y en caso de no hallarlo devuelve []
    const init = () => {
        return (JSON.parse(localStorage.getItem('todo')) || [])
    }


    //Primer argumento es el reducer, que esta en un js
    //2do argumento initialState, en este caso vacio
    const [todos, dispatchTodo] = useReducer(todoReducer, [] , init)

    //Utilizamos el localStorage para guardar cada vez que cambia la lista de todos
    useEffect(() => {
        //Guardamos con la clave 'todo', y como solo guarda string aplicamos Json.stringfy
        localStorage.setItem('todo', JSON.stringify(todos))

    }, [todos]) //cuando se modifica 'todos' vuelvo a renderizar hook

    //Creo la accion, este caso agregar y eliminar


    const handleNewTodo = (todo) => {

        const action = {
            type: '[TODO] add Todo',
            payload: todo, // mando 'todo'
        }


        dispatchTodo(action);//Al dispatch mando lo que quiero hacer con el useReducer
        //En este caso la accion que tiene dentro el add y el type
    }

    const handleDeleteTodo = (id) => {
        dispatchTodo({ //en vez de mandar la accion le mandamos el objeto completo, es lo mismo
            type: '[TODO] Remove Todo',
            payload: id, // mando 'todo'
        })

    }

    const handleToggleTodo = (id) => {

        dispatchTodo({
            type: '[TODO] Toggle',
            payload: id,
        })
    }

    let todosCount = todos.length //todos los todos conteo
    let pendingTodosCount = todos.filter(todo => !todo.done).length //conteo de pendientes

    return {
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todos,
        todosCount,
        pendingTodosCount,
    }

}
