import {
  MdLock,
  MdDoubleArrow,
  MdArrowOutward,
  MdTag,
  MdNumbers,
  Md360,
  MdKeyboard,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen">
      <nav className="h-full w-20 md:w-32 flex flex-col bg-primary_1 text-secondary shadow-md">
        {/* web title */}
        <Link to="/">
          <div className="flex mt-2 justify-center h-16 items-center">
            <h1 className="font-bold hidden md:block">CLASSIC CIPHERS</h1>
            <MdLock size="32" className="block md:hidden"></MdLock>
          </div>
        </Link>

        {/* list of pages */}
        <Link to="/viginere">
          <SidebarItem
            icon={<MdDoubleArrow size="32" />}
            title="Viginere"
          ></SidebarItem>
        </Link>
        <Link to="/playfair">
          <SidebarItem
            icon={<MdArrowOutward size="32" />}
            title="Playfair"
          ></SidebarItem>
        </Link>
        <Link to="/affine">
          <SidebarItem icon={<MdTag size="32" />} title="Affine"></SidebarItem>
        </Link>
        <Link to="/hill">
          <SidebarItem
            icon={<MdNumbers size="32" />}
            title="Hill"
          ></SidebarItem>
        </Link>
        <Link to="/superencrypt">
          <SidebarItem
            icon={<Md360 size="32" />}
            title="Superencrypt"
          ></SidebarItem>
        </Link>
        <Link to="/enigma">
          <SidebarItem
            icon={<MdKeyboard size="32" />}
            title="Enigma"
          ></SidebarItem>
        </Link>

        {/* github link */}
        <div></div>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, title }) => {
  return (
    <div
      className="rounded-md flex flex-col items-center justify-center h-20 w-16 md:w-28 my-1 mx-auto shadow-md 
    bg-primary_2 text-secondary hover:bg-primary_3 hover:cursor-pointer"
    >
      <div className="">{icon}</div>
      <div className="break-all text-xs md:text-sm mt-0.5 mx-2">{title}</div>
    </div>
  );
};

export default Sidebar;
