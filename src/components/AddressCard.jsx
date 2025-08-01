import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const AddressCard = ({ CountrName, emailId, completeAddress }) => {
    return (
        <div className=" text-center flex flex-col items-center gap-3 bg-white shadow-mb-5 shadow-xl hover:shadow-2xl mb-10">
            <div className="w-full transition duration-300 text-3xl py-5 font-semibold hover:text-white hover:bg-[#493657] ">
                {CountrName}
            </div>
            <div className="flex flex-col items-center text-gray-600 gap-2 mb-12 mx-5">
                <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                <a href={`mailto:${emailId}`} className="text-base hover:underline">
                    {emailId}
                </a>
                </div>
                <div className="flex items-center gap-2 text-center">
                    <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-gray-500 mt-1" />
                    <span className="whitespace-pre-line">{completeAddress}</span>
                    </div>
                </div>
            </div>
        </div>
  );
};
