type coursePart = {
  name: String, 
  exerciseCount: number
}

interface ContentProps {
  courseParts: coursePart[]
}

const Content = (props: ContentProps) => (
  <div>
    {
      props.courseParts.map((coursePart: coursePart) => <p>{coursePart.name} {coursePart.exerciseCount}</p>)
    } 
  </div>
);

export default Content;