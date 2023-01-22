import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';

const Colors = () => {

  const {darkMode, setDarkMode} = useContext(AppContext)
  const [toggle,setToggle] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [adivinar,setAdivinar] = useState(null);
  const [adivinado, setAdivinado] = useState(false);

  useEffect(()=>{
    let newList = [];
    let i=0;
    if(toggle && adivinado){
      while(i<3){
        newList.push({colores:random(), visible:''})
        i++;
      }
      setColorList(newList);
    }
    else if(!toggle && adivinado){
      while(i<6){
        newList.push({colores:random(), visible:''})
        i++;
      }
      setColorList(newList);
    }
  },[adivinado, toggle])

  useEffect(()=>{
    handleAgain();
  },[toggle])

  function random() {
    let color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
    return color
  }

  function listaColores () {
    let newList = [];
    let i=0;

    if(toggle){
      while(i<3){
        newList.push({colores:random(), visible:''})
        i++;
      }
      setColorList(newList);
      setAdivinar(newList[Math.floor(Math.random()*2)].colores);
    }
    
    else {
      while(i<6){
        newList.push({colores:random(), visible:''})
        i++
      }
      setColorList(newList)
      setAdivinar(newList[Math.floor(Math.random()*5)].colores);
    }
  }

  const handleAgain = () => {
    setAdivinar(null);
    setAdivinado(false);
    listaColores();
  }

  const handleClick = () => {
    if(adivinado){
      setAdivinado(false);
      setAdivinar(null);
    }
    else {
      setToggle(!toggle);
    } 
    listaColores();
  }

  const handleAdivinar = (id) => {
    let newList = [];
    if(id===adivinar){
      setAdivinado(true);
    }
    setColorList(colorList.map((item)=>{
      const {colores, visible} = item;
      if(id===colores){
        return {...item, visible:'hidden'}
      }
      return item;
      }))
  }

  return (
    <div className='h-100vh dark:text-white  dark:bg-slate-800'>
      <h1 className=' relative text-2xl border-b-2 border-black w-full' style={{backgroundColor:(adivinado?`${adivinar}`:null)}}>
        Guess the Color
        <br/>
        <span className='text-4xl'>
          {adivinar}
        </span>
        <button  className={`${darkMode?'bg-gray-200':'bg-slate-800'} rounded-full h-5 w-5 absolute top-0 right-0 xs:top-4 xs:right-10 p-b-6 xxs:h-10 xxs:w-10`} onClick={()=>setDarkMode(!darkMode)}>
        </button>
      </h1>
      
      {/* {adivinado && <h2 className='text-2xl'>Ganaste</h2>} */}
      <div className={`container ${toggle?'flex wrap-wrap m-9 ':'md:columns-3 xxs:columns-2 grid-rows-3'} p-9  justify-center justify-items-center mx-auto w-400`}>
        {
          ( adivinado && colorList.map((color, index)=>{
            const {colores, visible} = color;
            return <div key={index} className='shadow-md border-2 mb-6 m-auto h-20 w-20 xs:h-40 xs:w-40 flex justify-center items-center' style={{backgroundColor:`${adivinar}`}}>Win</div>}) )
          || 
          ( colorList.map((color, index)=>{
            const {colores, visible} = color
            return <div key={index} className={(`hover:opacity-90 hover:shadow-none shadow-md shadow-black mb-6 m-auto h-20 w-20 xs:h-40 xs:w-40 ${(visible===''?'':`invisible`)} ${toggle?'md:w-40 md:h-40 us:h-12 us:w-12 xs:w-24 xs:h-24':''}`)} style={{backgroundColor:`${colores}`}} onClick={()=>handleAdivinar(colores)}></div>}) )
        }
      </div>
      <button onClick={handleAgain} className='hover:shadow-none shadow-lg shadow-black hover:opacity-70 bg-blue-400 rounded-lg mb-4 mr-5 p-4 '>Play again</button>
      {
        !adivinado && 
        <button className='hover:shadow-none shadow-lg shadow-black hover:opacity-70 bg-blue-400 rounded-lg p-4' onClick={handleClick}>{( toggle && 'hard') || ( !toggle && 'easy')}</button>
      }
    </div>
  )
}

export default Colors