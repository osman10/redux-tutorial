

const Transections = () => {
    return (
        <div className="flex justify-between p-2 bg-sky-500 mt-4 flex gap-4 items-center ">
           <div className="flex items-center justify-between text-white gap-4">
                <p>Earn This month</p>
                <p>0.00</p>
            </div>
            <div>
                <button className="bg-white text-sky-500 px-4 py-2 rounded-md font-bold">Edit</button>
                <button className="bg-white text-sky-500 px-4 py-2 rounded-md font-bold ml-2">Delete</button>
            </div>
         </div>
    );
};

export default Transections;