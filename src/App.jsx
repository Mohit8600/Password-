import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(10);
  const [numAllow, setNumAllow] = useState(false);
  const [apperChar, setApperChar] = useState(false);
  const [lowerChar, setLowerChar] = useState(false);
  const [symbAllow, setSymbAllow] = useState(false);
  const [Password, setPassword] = useState("");

   // useRef hook
   const PasswordRef = useRef(null)

   const copyPass = useCallback(() => {
    PasswordRef.current?.select();
    // PasswordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(Password);
   }, [Password])

  const PasswordGenerator = useCallback(() =>{
      let pass ="";
      let str ="";

      if(numAllow) str += "1234567890";
      if(lowerChar) str += "qwertyuiopasdfghjklzxcvbnm";
      if(symbAllow) str += "~!@#$%^&*()+={}[]?";
      if(apperChar) str += "QWERTYUIOPASDFGHJKLZXCVBNM";

      for (let i = 1; i <= length; i++) {
        let char = Math.floor( Math.random() * str.length +1)
        pass += str.charAt(char);
      }
      setPassword(pass); 
  }, [length, numAllow, apperChar, lowerChar, setPassword])


  // useEffect(() => {
  //   PasswordGenerator();
  // }, [length, numAllow, lowerChar, apperChar, symbAllow, PasswordGenerator]);

  return (
    <>
      <div className=" w-full max-w-xl mx-auto shadow-xl rounded-lg px-4 py-3 my-20 text-[#090909]">
        <h1 className="text-[44px] text-center">Password Generator</h1>

        <div className="flex shadow my-3 rounded-lg overflow-hidden text-[24px]">
          <input className="outline-none w-full py-1 px-3" type="text" value={Password} placeholder="Password Generator" readOnly ref={PasswordRef} />
          <button onClick={copyPass} className="bg-[blue] outline-none text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 hover:text-opacity-30">
            Copy
          </button>
        </div>
        <div className='text-[#3838f7]'>
              <div className="flex flex-col md:flex-row items-center shadow my-3 text-[24px]">
                <input onChange={(e) => { setLength(e.target.value); }} value={length} type="range" min={6} max={50} className="cursor-pointer w-full md:w-72"/>
                <label className="ml-0 md:ml-8 mt-2 md:mt-0">Length: {length}</label>
              </div>

              <div className="flex flex-col md:flex-row items-center my-3 text-[24px]">
                <label className="md:mr-auto" htmlFor="lowercase"> Lowercase Letters (a-z)</label>
                <input className="mt-2 md:mt-0 md:ml-auto" type="checkbox" id="lowercase"  onChange={() =>{
                  setLowerChar((prev) => !prev);
                }}/>
              </div>

              <div className="flex flex-col md:flex-row items-center my-3 text-[24px]">
                <label className="md:mr-auto" htmlFor="uppercase"> Uppercase Letters (A-Z) </label>
                <input className="mt-2 md:mt-0 md:ml-auto" type="checkbox" id="uppercase" onChange={() =>{
                  setApperChar((prev) => !prev);
                }}/>
              </div>

              <div className="flex flex-col md:flex-row items-center my-3 text-[24px]">
                <label className="md:mr-auto" htmlFor="numbers"> Numbers (0-9) </label>
                <input className="mt-2 md:mt-0 md:ml-auto" type="checkbox" id="numbers" onChange={() =>{
                  setNumAllow((prev) => !prev);
                }}/>
              </div>

              <div className="flex flex-col md:flex-row items-center my-3 text-[24px]">
                <label className="md:mr-auto" htmlFor="symbols">Symbols (@ - *)  </label>
                <input className="mt-2 md:mt-0 md:ml-auto" type="checkbox"  id="symbols" onChange={() =>{
                  setSymbAllow((prev) => !prev);
                }} />
              </div>

              <div className="bg-[blue] text-white shadow my-5 rounded-lg text-[24px] flex items-center justify-center  hover:bg-[#0000ffb7] hover:text-opacity-20">
                <button  onClick={PasswordGenerator}>Generate</button>
              </div>
          </div>
      </div>
    </>
  );
}

export default App;
