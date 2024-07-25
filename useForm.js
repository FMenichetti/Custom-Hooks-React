import { useState } from "react";


export const useForm = ( initialValue = {} ) => {

    const [formState, setFormState] = useState({ initialValue });

    const onInputChange = ({ target }) => {

        const { value, name } = target;
        setFormState({
            ...formState, //Desestructuro formState para que no se modifique ni tire error 
            [name]: value, //De la propiedad name, modifico value..ESto es propiedad computada del objeto???
        });
    }

    const onReset = () =>{
        setFormState( initialValue )
    }

    return {
        ...formState, //Retornar con spread me permite tomat las variables del objeto cuando llamo al hook
        formState, //aqui retorno el objeto completo
        onInputChange,
        onReset, //retorno de la funcion, para usar en los input
    }
}
