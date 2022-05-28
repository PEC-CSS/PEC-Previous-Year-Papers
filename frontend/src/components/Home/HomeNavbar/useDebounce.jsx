import React, { useEffect, useState } from 'react'

const useDebounce = (val,offset=600) => {
    const [debouncedValue,setdebouncedValue] = useState(val);
    useEffect(()=>{
        const timeoutRef = setTimeout(() => {
            setdebouncedValue(val)
        }, offset);

        return () =>{
            clearTimeout(timeoutRef)
        }
    },[val])
  return debouncedValue
}

export default useDebounce;
