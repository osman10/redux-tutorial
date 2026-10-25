import Form from "./Form";
import Header from "./Header";
import Transections from "./Transections";


const ExpenseTracker = () => {
    return (
        <div>
            <div className="p-4 bg-sky-500 shadow-md">
                <h1 className="text-white text-2xl font-bold text-center">Expense Tracker</h1>
            </div>

            <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md mt-4">
                {/* Header */}
                <Header />
                {/* Form for adding/editing new expenses */}
                <Form />
                {/* Transaction List */}
                <Transections />
            </div>
        </div>
    );
};

export default ExpenseTracker;