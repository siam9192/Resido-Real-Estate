const Heading = ({heading,title,color}) => {
    return (
        <div>
              <h1 className={`${color ? color : 'text-black'} text-4xl font-semibold text-center py-2`}>{heading}</h1>
            <p className={`${color ? color : 'text-black'} text-center`}>{title}</p>
        </div>
    );
}


export default Heading
