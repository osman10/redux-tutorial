

const Form = () => {
    return (
        <div className="p-4 bg-gray-50 ">
            <h2 className="text-sky-500 font-bold text-xl">Add Expense</h2>
            <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Expense/Transaction Name */}
                <div className="mb-4">
                    <label htmlFor="expenseName" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        placeholder="Enter transaction name"
                        type="text"
                        id="expenseName"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Amount Field */}
                <div className="mb-4">
                    <label htmlFor="expenseAmount" className="block text-gray-700 font-bold mb-2">Amount</label>
                    <input
                        placeholder="Enter amount"
                        type="number"
                        id="expenseAmount"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Transaction Type (Radio Buttons) */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Type</label>
                    <div className="flex items-center space-x-6">
                        <label htmlFor="incomeRadio" className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                id="incomeRadio"
                                value="income"
                                name="transaction_type"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700 font-medium">Income</span>
                        </label>

                        <label htmlFor="expenseRadio" className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                id="expenseRadio"
                                value="expense"
                                name="transaction_type"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700 font-medium">Expense</span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded transition duration-200"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default Form;