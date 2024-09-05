import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaReddit, FaWikipediaW, FaYoutubeSquare } from "react-icons/fa";
import CrewSection from "../components/CrewSection";
import { ImageSlider } from "../components/Slider";

interface Crew {
  crew: string;
  role: string;
}

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean;
  details: string | null;
  crew: Crew[];
  links: {
    patch: {
      small: string;
      large: string;
    };
    webcast: string;
    wikipedia: string;
    reddit: {
      launch: string;
    };
  };
}

export const LaunchesPage = () => {
  const { launchId } = useParams();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [rocketData, setRocketData] = useState<[]>([]);

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        const response = await axios.get(
          `https://api.spacexdata.com/v5/launches/${launchId}`
        );
        if (response.status === 200) {
          setLaunch(response.data);
        }
      } catch (error) {
        console.error("Error fetching launch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunch();
  }, [launchId]);

  useEffect(() => {
    const fetchRocket = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.spacexdata.com/v4/rockets/${launch?.rocket}`
        );
        setRocketData(res.data?.flickr_images);
      } catch (error) {
        console.error("Error fetching rocket data:", error);
      } finally {
        setLoading(false);
      }
    };

    launch?.rocket && fetchRocket();
  }, [launch, launch?.rocket]);

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

  if (!launch) {
    return (
      <div className="text-white text-center py-12 bg-black">
        No launch data available.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {launch.links.patch.large ? (
          <img
            src={launch.links.patch.large}
            alt={launch.name}
            className="w-full h-72 rounded-lg mb-8 object-contain"
          />
        ) : (
          <div className="w-full h-72 bg-gray-600 rounded-lg mb-8"></div>
        )}

        <h1 className="text-4xl font-bold text-center mb-6  gradient-title">
          {launch.name}
        </h1>

        <p className="text-xl mb-4">
          <strong>Date:</strong>{" "}
          {new Date(launch.date_utc).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>

        <p
          className={`text-xl font-bold mb-4 ${
            launch.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {launch.success ? "Mission Success" : "Mission Failed"}
        </p>

        <p className="text-gray-300 mb-6">
          {launch.details
            ? launch.details
            : "No further details available for this launch."}
        </p>

        <div className="space-x-4 mb-8 flex items-center">
          {launch.links.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-400 transition-colors duration-300"
            >
              <FaYoutubeSquare
                className="text-red-700 h-6 w-6"
                title="YouTube"
              />
            </a>
          )}
          {launch.links.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-400 transition-colors duration-300"
            >
              <FaWikipediaW
                size={18}
                className="text-white h-6 w-6"
                title="WikiPedia"
              />
            </a>
          )}
          {launch.links.reddit.launch && (
            <a
              href={launch.links.reddit.launch}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-400 transition-colors duration-300"
            >
              <FaReddit className="text-red-700 h-6 w-6" title="Reddit" />
            </a>
          )}
        </div>

        <CrewSection
          crewIds={launch.crew.map((c: any) => c.crew)}
          launchId={launchId || ""}
        />

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Rocket Used</h2>
          <ImageSlider Images={rocketData || []} />
        </div>
      </div>
    </div>
  );
};

export default LaunchesPage;
