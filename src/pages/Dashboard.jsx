import Sidebar from "../components/Sidebar";
import Statistics from "./Statistics";

const Admin = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Statistics />
      </div>
    </div>
  );
};

export default Admin;
