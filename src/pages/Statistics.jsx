import { Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../chart/Chart";

const Statistics = () => {
  const [totalMales, setTotalMales] = useState(0);
  const [totalFemales, setTotalFemales] = useState(0);
  const [totalAbove21, setTotalAbove21] = useState(0);
  const [totalUnder21, setTotalUnder21] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5555/user");
        const userData = response.data.data;
        setUsers(userData);
        let totalNumChildrenAbove21 = 0;
        let totalNumChildrenUnder21 = 0;
        // Calculate totals
        const males = userData.filter((user) => user.gender === "male");
        const females = userData.filter((user) => user.gender === "female");
        const above21 = userData.map(
          (user) => (totalNumChildrenAbove21 += user.numChildrenAbove21)
        );
        const under21 = userData.map(
          (user) => (totalNumChildrenUnder21 += user.numChildrenUnder21)
        );

        setTotalMales(males.length);
        setTotalFemales(females.length);
        setTotalAbove21(totalNumChildrenAbove21);
        setTotalUnder21(totalNumChildrenUnder21);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 gap-5 p-5">
        <Card>
          <CardContent>
            <Typography className="text-slate-500" variant="h7">
              Total Males
            </Typography>
            <div className="flex justify-between items-center">
              <Typography variant="h4">{totalMales}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography className="text-slate-500" variant="h7">
              Total Females
            </Typography>
            <div className="flex justify-between items-center">
              <Typography variant="h4">{totalFemales}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography className="text-slate-500" variant="h7">
              Total Children Under 21
            </Typography>
            <Typography variant="h4">{totalUnder21}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography className="text-slate-500" variant="h7">
              Total Children Above 21
            </Typography>
            <Typography variant="h4">{totalAbove21}</Typography>
          </CardContent>
        </Card>
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Statistics;
