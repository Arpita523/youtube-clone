import { AiFillHome } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { IoMdMusicalNote } from "react-icons/io";
import { MdHistory, MdOutlineMovie, MdOutlinePlaylistPlay, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { Link } from "react-router-dom";



const Sidebar = () => {
    const mainLinks = [
        {
            icon : <AiFillHome className="text-xl"/>,
            name : 'Home',
        },{
            icon : <SiYoutubeshorts  className="text-xl"/>,
            name : 'Shorts',
        },{
            icon : <MdSubscriptions  className="text-xl"/>,
            name : 'Subscriptions',
        }
    ];
    const secondaryLinks = [
        {
            icon : <MdOutlineVideoLibrary  className="text-xl"/>,
            name : 'Library',
        },{
            icon : <MdHistory  className="text-xl"/>,
            name : 'History',
        },{
            icon : <MdOutlinePlaylistPlay  className="text-xl"/>,
            name : 'Playlists',
        },{
            icon : <MdOutlineWatchLater  className="text-xl"/>,
            name : 'Watch Later',
        },{
            icon : <BiLike  className="text-xl"/>,
            name : 'Liked Videos',
        }
    ]
    const thirdLinks = [
        {
            icon : <RiShoppingBag4Fill  className="text-xl"/>,
            name : 'Shopping',
        },{
            icon : <IoMdMusicalNote  className="text-xl"/>,
            name : 'Music',
        },{
            icon : <MdOutlineMovie  className="text-xl"/>,
            name : 'Movies',
        }
    ]

  return (
    <div className="w-2/12 bg-[#212121] pr-5 overflow-auto pb-8 h-screen">
        <ul className="flex flex-col border-b-2 border-gray-700">
            {
                mainLinks.map(({icon, name}) => {
                    return (
                        <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 rounded-full ${name === 'Home' ? 'bg-zinc-600' : ''}'`}>
                            <Link href='#' className="flex items-center gap-5">
                                {icon}
                                <span className="text-sm tracking-wider">{name}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>

          <ul className="flex flex-col border-b-2 border-gray-700">
            {
                secondaryLinks.map(({icon, name}) => {
                    return (
                        <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 rounded-full ${name === 'Home' ? 'bg-zinc-600' : ''}'`}>
                            <Link href='#' className="flex items-center gap-5">
                                {icon}
                                <span className="text-sm tracking-wider">{name}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
           <ul className="flex flex-col  border-gray-700">
            {
                thirdLinks.map(({icon, name}) => {
                    return (
                        <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 rounded-full ${name === 'Home' ? 'bg-zinc-600' : ''}'`}>
                            <Link href='#' className="flex items-center gap-5">
                                {icon}
                                <span className="text-sm tracking-wider">{name}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Sidebar
