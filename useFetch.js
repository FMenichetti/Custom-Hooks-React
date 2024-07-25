import { useEffect, useState } from "react"

const localCache = {}; //Array para almacenar cache, key url y data data de pokemon


export const useFetch = (url) => {


    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    })

    useEffect(() => {

        getFetch();

    }, [url]) //Si el url cambia necesito recargar el getFetch

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async () => {

        if ( localCache[url] ) { //Si hay data en esa posicion la uso y retorno
            
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            })
            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        await new Promise(resolve => setTimeout(resolve, 1000));//retardo

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: error.code,
                    message: error.message,
                },
            })
            return;
        }


        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })
        localCache[url] = data; //en la posicion url, guardo la data
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
