import React, { useState, useEffect } from "react";
import axios from "axios";

interface CrewMember {
  id: string;
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  status: string;
}

interface CrewSectionProps {
  crewIds: string[];
  launchId: string;
}

const CrewSection: React.FC<CrewSectionProps> = ({ crewIds, launchId }) => {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await axios.post(
          "https://api.spacexdata.com/v4/crew/query",
          {
            query: {
              id: crewIds,
              launches: launchId,
            },
          }
        );
        if (response.status === 200) {
          setCrew(response.data.docs);
        }
      } catch (error) {
        console.error("Error fetching crew data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (crewIds.length > 0) {
      fetchCrew();
    }
  }, [crewIds, launchId]);

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

  if (crew.length <= 0) {
    return (
      <div className="text-gray-400 text-center py-12">
        No crew data available.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Crew</h2>
      {crew.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crew.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative mb-6">
                <img
                  src={member.image || "https://via.placeholder.com/150"}
                  alt={member.name}
                  className="w-full h-48 object-contain rounded-lg"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>Agency:</strong> {member.agency}
              </p>
              {member.wikipedia && (
                <a
                  href={member.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Wikipedia
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No crew data available.</p>
      )}
    </div>
  );
};

export default CrewSection;
