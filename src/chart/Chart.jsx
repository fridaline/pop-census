import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const Chart = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5555/user");
        console.log(response.data.data);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };
    fetchUsers();
  }, []);

  const population = users;

  // Create an object to store totals by region
  const totalsByRegion = {};

  // Loop through the data and calculate totals
  population.forEach((user) => {
    const { gender, numChildrenUnder21, placeOfBirth } = user;

    // Initialize totals if not already present
    if (!totalsByRegion[placeOfBirth]) {
      totalsByRegion[placeOfBirth] = {
        male: 0,
        female: 0,
        numberChildrenUnder21: 0,
      };
    }

    // Increment totals based on gender and age criteria
    if (gender === "male") {
      totalsByRegion[placeOfBirth].male += 1;
    } else if (gender === "female") {
      totalsByRegion[placeOfBirth].female += 1;
    }

    totalsByRegion[placeOfBirth].numberChildrenUnder21 += numChildrenUnder21;
  });

  // Convert the totals to an array of objects
  const totalsArray = Object.entries(totalsByRegion).map(
    ([region, totals]) => ({
      region,
      male: totals.male,
      female: totals.female,
      numberChildrenUnder21: totals.numberChildrenUnder21,
    })
  );

  // Log the totals in the specified format
  console.log(totalsArray);

  return (
    <div className="bg-white shadow-md rounded-md p-[10px]">
      <Typography variant="h5" mb={3}>
        Summary
      </Typography>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <AreaChart
          width={730}
          height={150}
          data={totalsArray}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="totalMale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="totaleFemale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="totalenumberChildrenUnder21"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#be3e34" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#be3e34" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="region" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="male"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#totalMale)"
          />
          <Area
            type="monotone"
            dataKey="female"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#totaleFemale)"
          />
          <Area
            type="monotone"
            dataKey="numberChildrenUnder21"
            stroke="#be3e34"
            fillOpacity={1}
            fill="url(#totalenumberChildrenUnder21)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
