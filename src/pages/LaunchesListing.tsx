import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string;
  success: boolean;
  upcoming: boolean;
}

export const LaunchesListing = () => {
  const [selectedSection, setSelectedSection] = useState("Latest");
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.spacexdata.com/v5/launches/${selectedSection.toLowerCase()}`
        );
        if (response.status === 200) {
          setLaunches(
            Array.isArray(response.data) ? response.data : [response.data]
          );
        }
      } catch (error) {
        toast.error("Error fetching launch data");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, [selectedSection]);

  return (
    <>
      <Helmet>
        <title>Launches</title>
        <meta name="description" content="SpaceX Launches" />
      </Helmet>
      <div className="grid-background"></div>
      <div className="container mx-auto py-8 px-4 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center text-white mb-12 tracking-wide">
          SpaceX Launches
        </h1>

        <div className="flex justify-center space-x-6 mb-10">
          {["Upcoming", "Latest", "Past"].map((section) => (
            <button
              key={section}
              className={`text-lg px-6 py-2 rounded-full border-2 border-transparent transition duration-300 hidden md:block ${
                selectedSection === section
                  ? "text-white border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-400 hover:text-white hover:border-blue-500"
              }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white w-full bg-blue-500 px-4 py-2 rounded-md mb-4 flex justify-evenly items-center"
          >
            <span className="font-medium">{selectedSection}</span>

            {isDropdownOpen ? (
              <ChevronUp size={18} className="text-white" />
            ) : (
              <ChevronDown size={18} className="text-white" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="bg-black text-white mt-2 rounded-lg shadow-lg w-full">
              {["Upcoming", "Latest", "Past"].map((section) => (
                <button
                  key={section}
                  className={`block px-4 py-2 text-left w-full transition duration-300 ${
                    selectedSection === section
                      ? "bg-blue-500"
                      : "hover:bg-blue-500"
                  }`}
                  onClick={() => {
                    setSelectedSection(section);
                    setIsDropdownOpen(false);
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {launches.map((launch) => (
              <div
                key={launch.id}
                className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[40px]"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {launch.name}
                  </h2>
                  <p className="text-gray-400 mb-3">
                    {new Date(launch.date_utc).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {launch.details
                      ? launch.details.length > 120
                        ? launch.details.substring(0, 120) + "..."
                        : launch.details
                      : "No details available"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                  <p
                    className={`font-bold ${
                      launch.success ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {launch?.upcoming
                      ? "Upcoming"
                      : launch.success
                      ? "Success"
                      : "Failed"}
                  </p>
                  <Link
                    to={`/launches/${launch.id}`}
                    className="text-blue-500 hover:text-blue-400 underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LaunchesListing;
