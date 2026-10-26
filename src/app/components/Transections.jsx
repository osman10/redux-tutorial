import { useDispatch, useSelector } from "react-redux";
import Transection from "./Transection";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import { useEffect } from "react";


const Transections = () => {
    const dispatch = useDispatch();
    const { transactions, isLoading, isError } = useSelector((state) => state.transactions);
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

// decide what to render
let content = null;
if (isLoading) content = <p>Loading...</p>;
if (!isLoading && isError) content = <p className="text-red-500">Error fetching transactions!</p>;
if(!isLoading && !isError && transactions.length === 0) content = <p>No transactions found!</p>;
if(!isLoading && !isError && transactions.length > 0) content = transactions.map((transaction) => (
    <Transection key={transaction.id} transaction={transaction} />
));


    return (
        <div className="bg-gray-50">
            <h1 className="text-xl font-bold p-4 text-sky-500">Your Transections</h1>
            {content}
        </div>
    );
};

export default Transections;