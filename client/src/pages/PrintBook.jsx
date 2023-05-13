import { useState } from "react"
import Print from "../form/print/print"
import { useFetching } from "../hooks/useFetching"
import RequestList from "../API/RequestList"


const PrintBook = () => {
    const [success, setSuccess] = useState(false)

    const [fetchAdd, isAddLoading, addError] = useFetching(async (obj) => {
        await RequestList.addElem('requests', obj);
    })

    const changeWindow = (obj) => {
        fetchAdd(obj)
        setSuccess(true)
    }

    return(
        <article>
            {success?
                <div className="warning">Запрос на печать отправлен. Менеджер перезвонит.</div>
                :
                <Print func={changeWindow}/>
            }
        </article>
    )
}

export default PrintBook