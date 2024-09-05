"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useParams } from "react-router-dom";
import { ImageSlider } from "../components/Slider";
import { Link } from "react-router-dom";

interface Rocket {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  first_stage: {
    thrust_sea_level: {
      kN: number;
      lbf: number;
    };
    thrust_vacuum: {
      kN: number;
      lbf: number;
    };
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  };
  second_stage: {
    thrust: {
      kN: number;
      lbf: number;
    };
    payloads: {
      composite_fairing: {
        height: {
          meters: number;
          feet: number;
        };
        diameter: {
          meters: number;
          feet: number;
        };
      };
      option_1: string;
    };
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  };
  engines: {
    isp: {
      sea_level: number;
      vacuum: number;
    };
    thrust_sea_level: {
      kN: number;
      lbf: number;
    };
    thrust_vacuum: {
      kN: number;
      lbf: number;
    };
    number: number;
    type: string;
    version: string;
    layout: string;
    engine_loss_max: number;
    propellant_1: string;
    propellant_2: string;
    thrust_to_weight: number;
  };
  landing_legs: {
    number: number;
    material: string;
  };
  payload_weights: {
    id: string;
    name: string;
    kg: number;
    lb: number;
  }[];
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
}

const RocketDetail = () => {
  const { rocketId } = useParams();
  const [rocketData, setRocketData] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRocket = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.spacexdata.com/v4/rockets/${rocketId}`
        );
        setRocketData(res.data);
      } catch (error) {
        console.error("Error fetching rocket data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [rocketId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
      <div className="grid-background"></div>
      <div className="flex justify-center items-center flex-col p-8 text-white">
        <ImageSlider Images={rocketData?.flickr_images || []} />
        <div className="flex flex-col items-start mt-8 max-w-4xl w-full  p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-4xl font-extrabold mb-4 gradient-title">
              {rocketData?.name}
            </h1>
            <Link
              to={rocketData?.wikipedia || ""}
              className="mr-10 flex gap-2 items-center hover:text-gray-400 cursor-pointer"
            >
              Wikipedia
              <Globe size={18} className="text-white hover:text-gray-400" />
            </Link>
          </div>
          <p className="text-lg mb-4">{rocketData?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">
                Dimensions
              </h2>
              <p className="text-md">
                Height: {rocketData?.height.meters} meters (
                {rocketData?.height.feet} feet)
              </p>
              <p className="text-md">
                Diameter: {rocketData?.diameter.meters} meters (
                {rocketData?.diameter.feet} feet)
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">Mass</h2>
              <p className="text-md">
                Mass: {rocketData?.mass.kg} kg ({rocketData?.mass.lb} lb)
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">
                First Stage
              </h2>
              <p className="text-md">
                Thrust (Sea Level):{" "}
                {rocketData?.first_stage.thrust_sea_level.kN} kN (
                {rocketData?.first_stage.thrust_sea_level.lbf} lbf)
              </p>
              <p className="text-md">
                Thrust (Vacuum): {rocketData?.first_stage.thrust_vacuum.kN} kN (
                {rocketData?.first_stage.thrust_vacuum.lbf} lbf)
              </p>
              <p className="text-md">
                Engines: {rocketData?.first_stage.engines}
              </p>
              <p className="text-md">
                Burn Time: {rocketData?.first_stage.burn_time_sec} sec
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">
                Second Stage
              </h2>
              <p className="text-md">
                Thrust: {rocketData?.second_stage.thrust.kN} kN (
                {rocketData?.second_stage.thrust.lbf} lbf)
              </p>
              <p className="text-md">
                Payload Fairing Height:{" "}
                {
                  rocketData?.second_stage.payloads.composite_fairing.height
                    .meters
                }{" "}
                meters (
                {
                  rocketData?.second_stage.payloads.composite_fairing.height
                    .feet
                }{" "}
                feet)
              </p>
              <p className="text-md">
                Payload Fairing Diameter:{" "}
                {
                  rocketData?.second_stage.payloads.composite_fairing.diameter
                    .meters
                }{" "}
                meters (
                {
                  rocketData?.second_stage.payloads.composite_fairing.diameter
                    .feet
                }{" "}
                feet)
              </p>
              <p className="text-md">
                Engines: {rocketData?.second_stage.engines}
              </p>
              <p className="text-md">
                Burn Time: {rocketData?.second_stage.burn_time_sec} sec
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">Engines</h2>
              <p className="text-md">
                ISP (Sea Level): {rocketData?.engines.isp.sea_level}
              </p>
              <p className="text-md">
                ISP (Vacuum): {rocketData?.engines.isp.vacuum}
              </p>
              <p className="text-md">
                Thrust (Sea Level): {rocketData?.engines.thrust_sea_level.kN} kN
                ({rocketData?.engines.thrust_sea_level.lbf} lbf)
              </p>
              <p className="text-md">
                Thrust (Vacuum): {rocketData?.engines.thrust_vacuum.kN} kN (
                {rocketData?.engines.thrust_vacuum.lbf} lbf)
              </p>
              <p className="text-md">Number: {rocketData?.engines.number}</p>
              <p className="text-md">Type: {rocketData?.engines.type}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">
                Landing Legs
              </h2>
              <p className="text-md">
                Number: {rocketData?.landing_legs.number}
              </p>
              <p className="text-md">
                Material: {rocketData?.landing_legs.material}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 underline">
                Payload Weights
              </h2>
              {rocketData?.payload_weights.map((weight) => (
                <p key={weight.id} className="text-md">
                  {weight.name}: {weight.kg} kg ({weight.lb} lb)
                </p>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-md">
              Cost per Launch: ${rocketData?.cost_per_launch.toLocaleString()}
            </p>
            <p className="text-md">
              Success Rate: {rocketData?.success_rate_pct}%
            </p>
            <p className="text-md">First Flight: {rocketData?.first_flight}</p>
            <p className="text-md">Country: {rocketData?.country}</p>
            <p className="text-md">Company: {rocketData?.company}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RocketDetail;
