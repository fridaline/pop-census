import Sidebar from "../components/Sidebar";
import Datatable from "../datatable/Datatable";

const registeredUsers = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Datatable />
      </div>
    </div>
  );
};

export default registeredUsers;
