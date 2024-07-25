import { useState } from "react"


export const useCounter = ( initialValue = 1 )=>{

const [counter, setCounter] = useState( initialValue );

// const increment = ( value = 1 )=>{ setCounter( counter + value ) }
//En esta linea aseguramos en caso de llamar a la funcion mas de una vez
//De que el valor sea el actualizado, lo mismo en decrement
const increment = ( value = 1 )=>{ setCounter( (current) => current + value ) }
const decrement = ( value = 1 )=>{ 
    if ( counter === 0) return ;   // que no baje nunca de 0
    // setCounter( counter - value ) }
    setCounter( current => current - value ) }
const reset = ()=>{ setCounter( initialValue ) }


    return {
        counter,
        increment,
        decrement,
        reset
    }


}