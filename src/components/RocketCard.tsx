import { Link } from "react-router-dom";

const RocketCard = ({ rocket }: any) => {
  return (
    <div className="flex flex-col rounded-lg bg-black shadow-lg overflow-hidden">
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <img
          className="w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          src={rocket?.flickr_images[0]}
          alt="Rocket"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col p-6 flex-grow bg-gray-900 text-white">
        <h5 className="mb-2 text-2xl font-semibold leading-tight">
          {rocket?.name}
        </h5>
        <p className="mb-4 text-base flex-grow overflow-hidden text-ellipsis line-clamp-3">
          {rocket?.description}
        </p>
        <Link
          to={`/rockets/${rocket.id}`}
          className="w-fit inline-flex rounded bg-[#1d4ed8] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-[#1e40af] hover:shadow-xl focus:outline-none"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default RocketCard;
