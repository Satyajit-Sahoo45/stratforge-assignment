"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLinkIcon } from "lucide-react";

interface HistoryEvent {
  id: string;
  title: string;
  event_date_utc: string;
  details: string;
  links: {
    article: string;
  };
}

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v4/history"
        );

        if (response.status === 200) {
          setHistory(response.data);
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <div className="grid-background"></div>
      <div className="container mx-auto py-8 px-8">
        <h1 className="text-4xl font-bold text-white mb-6">SpaceX History</h1>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-4">
              <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[300px]"
              >
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {event.title}
                </h2>
                <p className="text-gray-400 mb-3">
                  {new Date(event.event_date_utc).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-300 mb-4">
                  {event.details.length > 100
                    ? event.details.substring(0, 100) + "..."
                    : event.details}
                </p>
                <div className="mt-auto">
                  {event.links.article && (
                    <a
                      href={event.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 inline-flex items-center hover:underline"
                    >
                      Read More
                      <ExternalLinkIcon size={18} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
