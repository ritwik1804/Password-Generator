import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  let [length, setLength] = useState(10)
  const[numAllowed, setNumAllowed]= useState(false)
  const[charAllowed, setCharAllowed]=useState(false)
  const [password, setPassword]= useState("")

  //ref hook
  const passwordRef= useRef(null)

  const passwordGenerator= useCallback ( ()=> {

    let pass= ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()><?+=-{}[]`"

    for(let i=1; i<=length; i++){
      let char= Math.floor(Math.random() * str.length+ 1)

      pass += str.charAt(char)

    }
    setPassword(pass)



  },
  [length, numAllowed, charAllowed, setPassword] )

  const copyPasswordToClipboard= useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(9,59);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed,  passwordGenerator])

  
  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600">
      <h1 className="text-white text-center my-3"> Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-5">
    <input
    type="text"
    value= {password}
    className="outline-none w-full py-1 px-3"
    placeholder= "Password"
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
    className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"> Copy </button>
    </div>
    <div className= 'flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={1}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(Number(e.target.value))}}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() =>{
            setNumAllowed((prev) => !prev);
            
          }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={() => {
          setCharAllowed((prev)=> !prev);
          
        }}
      />
      <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
  
  )
}

export default App
