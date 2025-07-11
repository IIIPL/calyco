const ProductCard = ({ name, description, src, finish }) => {
  return (
        <div className="bg-white shadow-md rounded-lg p-5 w-64 text-left hover:shadow-lg transition">
            <div>
                <img src={`${src}`} alt="" className="scale-75 hover:scale-100 transition duration-300" />
            </div>
            <div className="text-xl font-semibold text-black text-center mb-1">{name}</div>
            <div className="text-sm text-gray-600 text-center mb-2">{description}</div>
            
            {/* <div className="text-sm text-gray-700 mt-2">
                <strong>Sizes:</strong> {sizes.join(", ")}
            </div>
            <div className="text-sm text-gray-700">
                <strong>Finish:</strong> {finish}
            </div> */}

            <div className="flex justify-center">
                <button className="mt-4 px-4 py-1 bg-[#493657] text-white text-sm rounded hover:bg-yellow-900 transition duration-300">
                    View Details
                </button>
            </div>
        </div>
  );
};

export default ProductCard;
