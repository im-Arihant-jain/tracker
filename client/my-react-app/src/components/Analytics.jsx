import React from "react";
import { Progress,Input,Form,Modal,message } from "antd";
const Analytics = ({ alltransactions  }) => {
  const categoryarr = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "fee",
    "tax",
  ];
  const totalTransactions = alltransactions.length;
  const totalIncometransactions = alltransactions.filter(
    (transactions) => transactions.type === "saving"
  );
  const totalExpensetransactions = alltransactions.filter(
    (transactions) => transactions.type === "expense"
  );
  const totalIncomepercent =
    (totalIncometransactions.length * 100) / totalTransactions;
  const totalExpensepercent =
    (totalExpensetransactions.length * 100) / totalTransactions;
  const totalturnover = alltransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalincometurnover = alltransactions
    .filter((transactions) => transactions.type === "saving")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalexpensiveturnover = alltransactions
    .filter((transactions) => transactions.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalincometurnoverpercent =
    (totalincometurnover * 100) / totalturnover;
  const totalexpensiveturnoverpercent =
    (totalexpensiveturnover * 100) / totalturnover;
  //   const totalincometurnoverpercent = (totalincometurnover*(100))/
  // 2 bethe and hence its always good to make it count fn
  return (
    <>
      <div className=" ">
        <div className="">
          <div className="">
            <div className="custom-flex custom-flexhead  custom-text-4xl">
              Total Transactions : {totalTransactions}
            </div>
            <div className="custom-flex custom-text-4xl space-x-4">
  <div>Total Income : {totalIncometransactions.length}</div>
  <div>Total Expense: {totalExpensetransactions.length}</div>
</div>

            <div className="custom-flex space-x-6">
              <Progress
                type="circle"
                strokeColor="green"
                
                trailColor="#e6f4ff"
                percent={totalIncomepercent.toFixed(0)}
                className=" custom-progress-circle"
                
              />
              <Progress
                type="circle"
                trailColor="#e6f4ff"
                strokeColor="red"
                percent={totalExpensepercent.toFixed(0)}
                className=" custom-progress-circle"

              />
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="">
            <div className=" custom-flex custom-text-4xl custom-flexhead  ">Total Turnover : {totalturnover}</div>
            <div className="custom-flex custom-text-4xl">
              <div>Total Incometurnover : {totalincometurnover}</div>
              <div> Total Expenseturnover: {totalexpensiveturnover}</div>
            </div>
            <div className="custom-flex custom-text-4xl">
              <Progress
                type="circle"
                strokeColor="green"
                
                trailColor="#e6f4ff"
                percent={totalincometurnoverpercent.toFixed(0)}
                className="custom-progress-circle"
              />
              <Progress
                type="circle"
                strokeColor="red"
                
                trailColor="#e6f4ff"
                percent={totalexpensiveturnoverpercent.toFixed(0)}
                className=" custom-progress-circle"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="custom-flex">
      <div className="col-md-4">
        {categoryarr.map((category) => {
          const amount = alltransactions
          .filter(
            (transaction) =>
              transaction.category === category &&
              transaction.type === "saving"
          )
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        
             return(
                <div className="card cardy">
                    <div className=" category-amount">
                      <div className="category">{category}</div>  
                    
                  <div className="amount"> {amount}</div> </div>
                    <Progress
                
                percent={((amount/totalincometurnover)*100).toFixed(0)}
                className=" "
              />
                </div>
             )
        })}
      </div>
      <div className="col-md-4">
        {categoryarr.map((category) => {
          const amount = alltransactions
          .filter(
            (transaction) =>
              transaction.category === category &&
              transaction.type === "expense"
          )
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        
             return(
                <div className="card cardy">
                    <div className=" category-amountexp ">
                      <div className="category">{category}</div>  
                    
                  <div className="amount"> {amount}</div> </div>
                    <Progress
                strokeColor="red"
                percent={((amount/totalexpensiveturnover)*100).toFixed(0)}
                className=""
              />
                </div>
             )
        })}
      </div>
      </div>
       
    </>
  );
};

export default Analytics;
