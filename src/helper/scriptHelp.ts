// функция позволяющая увеличивать выосту textarea или другого блока для избежания появления полосы прокрутки


export const autoHeight =  (el:React.ChangeEvent<HTMLTextAreaElement> & any) =>{

    el.target.style.height = 25 + 'px'
    el.target.style.height = el.target.scrollHeight + 'px'
}