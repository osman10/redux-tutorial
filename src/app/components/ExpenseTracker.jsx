import Form from "./Form";


const ExpenseTracker = () => {
    return (
        <div>
            <div className="p-4 bg-sky-500 shadow-md">
                <h1 className="text-white text-2xl font-bold text-center">Expense Tracker</h1>
            </div>

            <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md mt-4">
                <div className="p-4 bg-sky-500 mt-4 max-w-md mx-auto flex gap-4 items-center ">
                    <p className="text-white font-bold text-2xl">Your Current Balance : </p>
                    <p className="text-white text-2xl font-bold">$0.00</p>
                </div>
                {/* Form for adding/editing new expenses */}
                    <Form />
                <div className="p-4 bg-sky-500 p-20 mt-20 flex justify-between">
                    <p>Earned this month</p>
                    <div className="flex items-center gap-4">
                        <p className="text-white text-2xl font-bold">$0.00</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExpenseTracker;