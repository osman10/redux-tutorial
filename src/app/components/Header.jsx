import {useSelector} from "react-redux";

const Header = () => {
    
    const { transactions } = useSelector((state) => state.transactions);
    const calculateIncome = (transactions) => {
        let imcome =0;
        transactions.forEach((transaction) => {
            const {type, amount} = transaction;

            if(type === "income"){
                imcome += amount;
            } else{
                imcome -= amount;
            }
        });
        return imcome;
    };

    return (
        <div>
            
            <div className="p-4 bg-sky-500 mt-4 max-w-md mx-auto flex gap-4 items-center ">
                <p className="text-white font-bold text-2xl">Your Current Balance : </p>
                <p className="text-white text-2xl font-bold">${calculateIncome(transactions).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Header;