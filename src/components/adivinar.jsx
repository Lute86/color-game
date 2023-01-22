import React, { useEffect, useState } from 'react'

const Adivinar = () => {

  const [color, setColor] = useState([])
  const [guess,setGuess] = useState(null)
  const [correct,setCorrect] = useState(false)

  const random_hex = () => {
    setCorrect(false)
    let list=[]
    let i=0
    while(i<3){
      let create = (Math.random() * 0xfffff * 1000000).toString(16);
      let finished = '#' + create.slice(0, 6)
      list.push({col:finished, id:list.length+1, msg:''})
      i++
    }
    setColor(list)
    setGuess({col:list[Math.floor(Math.random() * 2)].col, msg:''})
  };
  
  const handleGuess = (guessing) => {
    if(guessing===guess.col){
      setCorrect(true)
      setGuess({...guess, msg:'correct'})
      setColor([])
    }
    if(guessing!==guess.col){
      setGuess({...guess, msg:'incorrect'})
    }
  }

  useEffect(()=>{
    random_hex()
  },[])

  return (
    <div>
      {correct && <button onClick={random_hex}>Play again</button>}
      {guess && <div style={{backgroundColor:`${guess}`, height:'60px', width:'60px'}}></div>}
      {color.map((item)=>{
        const {col, id} = item
        return <button key={id} onClick={()=>handleGuess(col)}>{col}</button>})}
      {correct && <p>{guess.msg}</p>} 
      {!correct && guess && <p>{guess.msg}</p>}
    </div>
  )
}

export default Adivinar