import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const navigate = useNavigate();
  return (
    <>
      <header className='flex justify-center mt-10'>
        <img src="/Images/Logo.svg" alt="Logo" className="w-64 h-auto hover:cursor-pointer" onClick={()=>navigate('/') } />
      </header>
      <div className="w-full fixed top-0 left-0 bg-white shadow-md border-b-2 border-b-gray-300 h-16 flex items-center px-4 z-50">
        <div className="w-3/12 flex justify-end">
          <img src="/Images/logoBlack.png" alt="Logo" className="h-10 hover:cursor-pointer" onClick={()=>navigate('/') } />
        </div>
        <div className=" w-full">
          <Menu />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-end md:hidden">
        
        </div>
      </div>
    </>
  );
};

export default Header;
