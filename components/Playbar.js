'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function Playbar(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [name,setName]=useState("");
  const [creator,setCreator]=useState("");
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    
  if(props.song){

    setName(props.song.split('-')[0]);
    setCreator(props.song.split('-')[1].split('.')[0]);
  }
  }, [props.song]);

  useEffect(() => {
    if(props.currentSong){

    props.currentSong.volume = volume;
    } 
  }, [volume, props.currentSong]);

  
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value; 
    setVolume(newVolume);
  };

  const Playcurrentsong = () => {
    if (props.currentSong.paused) {
      props.currentSong.play();
      setIsPlaying(true); 
    } else {
      props.currentSong.pause();
      setIsPlaying(false); 
    }
    console.log(props.songData,props.song);
  };
  
  
  return (
    <div className='songdetials mx-2 my-1 flex items-center'>
      <div className='group flex flex-row gap-3 items-center p-2 rounded-lg w-[400px]'>
        <img src={props.songData[props.song]?.imageUrl || "/music.svg"} alt="Song cover" className="rounded-md w-[55px]" />
        <div className='flex flex-col'>
          <h3 className='text-white font-medium text-base mb-1'>{name|| "Song Name"}</h3>
          <p className='text-[#b3b3b3] text-sm'>{creator || "Creator Name"}</p>
        </div>
      </div>

      <div className="options flex items-center justify-between w-[calc(100vw-500px)] pl-14 mx-auto">
        <div className='songcontrol flex flex-col justify-center items-center'>
          <div className="upper flex items-center gap-4">
            <button className='rounded-full h-8 w-8 object-cover object-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className='fill-current w-5' role="img" aria-hidden="true" viewBox="0 0 16 16">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
              </svg>
            </button>

            <button onClick={Playcurrentsong} className='bg-white rounded-full h-8 w-8 object-cover object-center'>
              <Image src={isPlaying ? "/pause.svg" : "/play.svg"} className={`p-1 ${isPlaying ? "object-scale-down" : "scale-150"}`} width={50} height={50} />
            </button>

            <button className='rounded-full ml-2 h-8 w-8 object-cover object-center text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" className='fill-current w-5' role="img" aria-hidden="true" viewBox="0 0 16 16">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
              </svg>
            </button>
          </div>

          <div className="lower flex gap-2 text-sm items-center">
            <div className="timecompleted">0:45</div>
            <div className="relative group flex items-center overflow-visible playscroll bg-stone-900 h-[5px] rounded-full w-[550px]">
              <div id="playbar_completed" className="completed w-44 h-full rounded-full group-hover:rounded-e-none bg-white group-hover:bg-green-600"></div>
              <div className='absolute -top-full z-50 group-hover:opacity-100 hover:opacity-100 opacity-0 bg-white h-4 w-4 rounded-full left-100'></div>
            </div>
            <div className="timetocomplete">3:00</div>
          </div>
        </div>

        <div className="sound flex items-center gap-1">
          <button>
            <img src="/volume.svg" alt="volume" />
          </button>
          <input  type="range" 
            name="volume" 
            id="volume" 
            className='bg-transparent text-white h-1' 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}/>
        </div>
      </div>
    </div>
  );
}

export default Playbar;
