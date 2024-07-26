import { useParams } from "react-router-dom";
import Correspondence from "../../../../components/Correspondence/Correspondence";



export default function ChatCorrespondencePage(){

    const {uidCompound}= useParams()
    const uidRes = uidCompound?.slice(1, uidCompound.length) as string

    return(
        <div>
            <Correspondence uidCompound={uidRes}/>
        </div>
    )
}