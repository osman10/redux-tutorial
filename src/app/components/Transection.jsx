
const Transection = () => {
    return (
        <div className="flex justify-between p-2 bg-sky-500 mt-4 flex gap-4 items-center ">
           <div className="flex items-center justify-between text-white gap-4">
                <p className="font-bold">Earn This month</p>
                <p>0.00</p>
            </div>
            <div>
                <button className="bg-white text-sky-500 px-4 py-2  font-bold hover:bg-sky-600 hover:text-white transition duration-200">Edit</button>
                <button className="bg-white text-sky-500 px-4 py-2  font-bold hover:bg-sky-600 hover:text-white transition duration-200 ml-2">Delete</button>
            </div>
         </div>
    );
};

export default Transection;