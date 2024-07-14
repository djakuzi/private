
import PeopleCard from '../PeopleCard/PeopleCard';
import { PeopleListProps } from './PeopleList.props';



export default  function PeopleList(props: PeopleListProps) {


  return (
    <div className={props.classNameList}>
      {props.people.map( (el, i) => <PeopleCard key={i} {...el}/>)}
    </div>
  )
}