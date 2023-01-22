import { createContext, useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import './App.css'
import Colors from './components/colores'

export const AppContext= createContext();

function App() {

  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=>{
    if(darkMode){
      document.body.classList.add('dark', 'dark:bg-slate-800', 'dark:text-white')
      document.getElementById('root').classList.add('dark', 'dark:bg-slate-800', 'dark:text-white')
    }
    //dark:bg-slate-800 dark:text-white
    else{
      document.body.classList.remove('dark', 'dark:bg-slate-800', 'dark:text-white')
      document.getElementById('root').classList.remove('dark', 'dark:bg-slate-800', 'dark:text-white')
    }
  },[darkMode])

  return (
    <AppContext.Provider value={{darkMode, setDarkMode}}>
      <div className={(`h-100vh ${darkMode === false?'':'dark'} `)}>
        <Colors />
      </div>
    </AppContext.Provider>
  )
}

export default App
