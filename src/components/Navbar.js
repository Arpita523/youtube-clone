import { AiOutlineSearch } from "react-icons/ai";
import { BiLogoYoutube } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";



const Navbar = () => {
  return (
    <div className="flex justify-between px-14 h-14 items-center bg-[#212121] opacity-95 sticky">
      <div className=" flex gap-8 items-center text-2xl">
        <div>
            <TiThMenu />
        </div>
        <div className="flex gap-2 items-center justify-center">
            <BiLogoYoutube className="text-3xl text-red-500" />
        <span className="text-xl font-serif">Youtube</span>
        </div>
        </div>
        <div className="flex items-center justify-center gap-5">
            <form>
                <div className="flex bg-zinc-900 items-center h-10 px-1 pr-5 rounded-full">
                    <div className="flex items-center gap-5 pr-5 ">
                        <input type="text" placeholder="search" className="w-96 bg-zinc-900 font-serif focus:outline-none border-none pl-7 rounded-r-3xl "/>
                    </div>
                     <button className=" h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl">
                            <AiOutlineSearch className="text-2xl"/>
                     </button>
                </div>
            </form>
           
            <div className="text-xl p-3  bg-zinc-900 rounded-full">
                <FaMicrophone />
            </div>
             </div>
            <div className=" flex items-center gap-8 text-xl">
                <RiVideoAddLine />
                <div className="relative">
                    <BsBell />
                    <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1"> 9+ </span>
                </div>
                <img src="https://media.licdn.com/dms/image/v2/D4E0BAQFT97pufZOovw/company-logo_200_200/company-logo_200_200/0/1680353648899?e=2147483647&v=beta&t=TeLon0F_I3-6p2HLOBH4vsXt8q-TRyk16sbCWT5zk9E" alt="profile-logo" className="w-9 h-9 rounded-full"/>
            </div>
        </div>
  )
}

export default Navbar
