import React from 'react'
import NirvaDiagonal from './NirvaDiagonal'

function Home4() {
  return (
    <div className='relative'>
      <NirvaDiagonal />
      <div className="mt-10 w-full max-w-[1440px] min-h-[685px] relative mx-auto px-4 z-10 overflow-hidden">
        <h1 className="font-Inter font-bold text-center tracking-[10px] sm:tracking-[20px] lg:tracking-[30px] text-4xl sm:text-6xl lg:text-[128px] mb-8">
          Shirt
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start ">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
            <h1 className="text-[26px] sm:text-3xl lg:text-[32px]  font-bold mb-4 font-Inter tracking-wide mt-30">
              Winter Softness.
              <p className="text-[#494949] mt-1">Crafted for </p>
              <p className="text-[#494949]">Effortless Warmth.</p>
            </h1>
            <div className="mt-10">
              <img
                src="./Frame 27.png"
                alt="Winter Collection"
                className="w-full max-w-[300px] lg:max-w-none "
              />
            </div>
          </div>

           <img src="Home4.png" alt="Home4" className="z-[2] absolute top-10 left-1/2 transform -translate-x-1/2 w-auto h-auto max-w-[200px] sm:max-w-[300px] lg:max-w-none" />
          <div className="hidden lg:block">
            <svg
              width="128"
              height="432"
              viewBox="0 0 128 432"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0002 23.9998L48.0002 10.6665H80.0002L104 23.9998L114.667 63.9998L93.3335 79.9998V117.333H34.6668V79.9998L13.3335 63.9998L24.0002 23.9998Z"
                fill="#1B263B"
                stroke="#1B263B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.667 82.6667V64M93.3337 82.6667V64"
                stroke="#1B263B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.0002 176L48.0002 162.667H80.0002L104 176L114.667 216L93.3335 232V269.333H34.6668V232L13.3335 216L24.0002 176Z"
                fill="#0040D6"
                stroke="#0040D6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.667 234.667V216M93.3337 234.667V216"
                stroke="#0040D6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.0002 328L48.0002 314.667H80.0002L104 328L114.667 368L93.3335 384V421.333H34.6668V384L13.3335 368L24.0002 328Z"
                fill="#61FF59"
                stroke="#61FF59"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.667 386.667V368M93.3337 386.667V368"
                stroke="#61FF59"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home4