import {
  DashboardOutlined,
  LoginOutlined,
  PeopleOutlineTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[200px] bg-white border-[5px] min-h-screen">
      <div className="h-[50px] flex items-center justify-center">
        <Link to="/dashboard">
          <span className="text-xl text-green-500">Admin Panel</span>
        </Link>
      </div>
      <hr className="h-[0] border-[0.5px]  text-gray-400" />
      <div className="pl-[10px] list-none m-0 p-0">
        <ul>
          <p className="text-[10px] font-bold text-slate-500 mt-[15px]">MAIN</p>
          <Link to="/dashboard">
            <li className="cursor-pointer flex items-center p-[5px] hover:bg-green-400">
              <DashboardOutlined className="text-[18px] " />
              <span className="text-[13px] font-medium text-slate-500 ml-[10px]">
                Dashboard
              </span>
            </li>
          </Link>
          <p className="text-[10px] font-bold text-slate-500 mt-[15px]">LIST</p>
          <Link to="/registered-users">
            <li className="cursor-pointer flex items-center p-[5px] hover:bg-green-400">
              <PeopleOutlineTwoTone className="text-[18px] " />
              <span className="text-[13px] font-medium text-slate-500 ml-[10px]">
                Users
              </span>
            </li>
          </Link>

          <Link to="/admin-login">
            <li className="cursor-pointer flex items-center p-[5px] hover:bg-green-400">
              <LoginOutlined className="text-[18px] " />
              <span className="text-[13px] font-medium text-slate-500 ml-[10px]">
                Logout
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
