import { useState, useEffect } from "react"

interface UseFetchProps{
    url: string;
}

export const useFetch = ({url}: UseFetchProps) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(!url){
            return;
        }
        
        const fetchData = async() =>{
            setIsLoading(true);
            setError(false);

            try {
                const resp = await fetch(url as string);
                if(!resp.ok) {
                    throw new Error('Ошибка');
                }

                const json = await resp.json();
                setData(json);
            }
            catch(err: any){
                setError(true);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {data, isLoading, error};
}