const Slide = (props) => {

  return (

    <div style={{left: props.left}} className="relative flex whitespace-nowrap">

      <Phrase src={props.src}/>

      <Phrase src={props.src}/>

      <Phrase src={props.src}/>

    </div>

  )

}