// функция позволяющая увеличивать выосту textarea или другого блока для избежания появления полосы прокрутки



export const autoHeight =  (el:React.ChangeEvent<HTMLTextAreaElement>, maxHeight?: number, minHeight?: number) => {
    
    if ( maxHeight && el.target.scrollHeight >= maxHeight ){
        return
    }

    if( maxHeight && el.target.scrollHeight <= maxHeight){
        el.target.style.height = (minHeight) ?  minHeight + 'px' : 25 + 'px'
        el.target.style.height = el.target.scrollHeight + 'px'
        return
        
    }

    el.target.style.height = (minHeight) ?  minHeight + 'px' : 25 + 'px'
    el.target.style.height = el.target.scrollHeight + 'px'
}


// функция, которая объеденяет два индификатора пользователы, чтобы создать чат или показать его 

export const getUidCompound = (uidAuth: string, uidPeople: string) : string => {

    let uidCompound = (uidAuth > uidPeople) ? uidAuth + uidPeople : uidPeople + uidAuth

    return uidCompound
}

    