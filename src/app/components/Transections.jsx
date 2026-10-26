import Transection from "./Transection";


const Transections = () => {
    return (
        <div className="bg-gray-50">
            <h1 className="text-xl font-bold p-4 text-sky-500">Your Transections</h1>
            <Transection />
            <Transection />
            <Transection />
        </div>
    );
};

export default Transections;