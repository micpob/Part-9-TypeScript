import  { CoursePart } from '../App'

interface ContentProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: ContentProps) => {

    const part = props.coursePart;
    let partToReturn;

    switch (part.kind) {
      case 'basic':
        partToReturn = { name: part.name, exerciseCount: part.exerciseCount, description: part.description }
        break;
      case 'group':
        partToReturn = { name: part.name, exerciseCount: part.exerciseCount, groupProjectCount: part.groupProjectCount }
        break;
      case 'background':
        partToReturn = { name: part.name, exerciseCount: part.exerciseCount, description: part.description, backgroundMaterial: part.backgroundMaterial }
        break;
      default:
        return assertNever(part);
    }

    return (
      <div style={{marginBottom: 15}}>
        <p style={{margin: 0}}><b>{partToReturn.name} {partToReturn.exerciseCount}</b></p>
        {
          partToReturn.description ? <em>{partToReturn.description}</em> : null
        }
        {
          partToReturn.groupProjectCount ? <p style={{margin: 0}}>group projects: {partToReturn.groupProjectCount}</p> : null
        }
        {
          partToReturn.backgroundMaterial ? <p style={{margin: 0}}>background material: {partToReturn.backgroundMaterial}</p> : null
        }
      </div>
    )
      
    
  
  }

export default Part;