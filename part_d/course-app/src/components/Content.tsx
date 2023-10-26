import  { CoursePart } from '../App'
import Part from './Part'


/* type coursePart = {
  name: String, 
  exerciseCount: number
} */

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
  <div>
    {
      //props.courseParts.map(coursePart => <p>{coursePart.name} {coursePart.exerciseCount}</p>)
      props.courseParts.map(coursePart => <Part coursePart={coursePart} />)
    } 
  </div>
);

export default Content;