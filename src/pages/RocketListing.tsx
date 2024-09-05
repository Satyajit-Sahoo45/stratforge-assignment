"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import RocketCard from "../components/RocketCard";

const RocketsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch_rockets = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v4/rockets"
        );

        if (response.status === 200) {
          setRockets(response.data);
        }
      } catch (error) {
        console.error("Error fetching rocket data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch_rockets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="flex space-x-4">
          <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-4 px-8 bg-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Rockets</h1>
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rockets
            .filter((rocket: any) =>
              rocket.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((rocket: any) => (
              <RocketCard key={rocket.id} rocket={rocket} />
            ))}
        </div>
      </div>
    </>
  );
};

export default RocketsPage;
