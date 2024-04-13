import React, { useEffect, useState } from "react";
import data from "./records.json";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [searchedCollege, setSearchCollege] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = data.filter((res) =>
        res.collegeName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchCollege(filteredData.slice(0, itemsPerPage)); // Initial data
    };

    fetchData();
  }, [searchText]);

  const fetchMoreData = async () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex >= data.length) {
      setHasMore(false);
      return;
    }

    const filteredData = data.filter((res) =>
      res.collegeName.toLowerCase().includes(searchText.toLowerCase())
    );
    const newData = filteredData.slice(startIndex, endIndex);

    setSearchCollege((prevCollege) => [...prevCollege, ...newData]);
    setCurrentPage(currentPage + 1);
  };
  
  return (
    <>
    <div className="items-center"><input type="text" name="" id="" placeholder="Enter college name" className="p-2 m-2 rounded-3xl bg-white w-100 items-center " onChange={(e)=>{setSearchText(e.target.value)}}/> 
    <button onClick={()=>{
      // console.log(searchText);
      const fillteredCollege = [...data].filter((res) => {
        return res.collegeName
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
      setSearchCollege(fillteredCollege);
    }}
    >Search</button></div>
    <InfiniteScroll
                dataLength={searchedCollege.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
              >
    <div className="p-5 h-screen bg-gray-100">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-400 border-b-2 border-gray-200">
            <tr>
              <th className="w-15 p-3 text-sm font-semibold tracking-wide text-left">
                CD Rank
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Colleges
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Course Fees
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Placement
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                User Review
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Ranking
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          
          {searchedCollege.map((item,index)=>{
                return ( <tr className="bg-white" key={index}>
              
                <><td className="p-3 text-sm text-gray-700 whitespace-nowrap w-1/12">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  #{item.ranking}
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap w-4/12">
               <span className="inline-flex gap-3">
                <img src={item.image}  className="h-max-15"/>
                <div><p className="text-xl text-blue-400"> 
                  {item.collegeName}</p>
                <sub>{item.location}</sub>
                </div>
                </span>
                
               
                
                <div className="flex justify-between">
                  <button className="m-4 text-green-600"><i class="fa-solid fa-arrow-right"></i> Apply Now</button>
                  <button className=""> <i className="fa-solid fa-download"></i> Download Brochure</button>
                  <div>
                  <input
                    type="checkbox"
                    value="Add To Compare"
                    className="m-2 p-2 mt-5"
                    />
                    <label>Add to Compare</label>
                    </div>
                </div>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="" >
                  <div className="hover:underline pb-2">
                  <div className="text-green-700 font-semibold"> <i class="fa-solid fa-indian-rupee-sign"></i> {item.courseFees}</div>
                  <div>BE/Btech</div>
                  <div>-1st Year Fees</div>
                  </div>  
                  <a href="" className="text-green-600"><i class="fa-solid fa-arrow-right-arrow-left"></i>  Compare Fees</a>
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap w-2/12">
              <a href="" >
                  <div className="hover:underline  pb-2">
                  <div className="text-green-700 font-semibold"> <i class="fa-solid fa-indian-rupee-sign"></i> { item.averagePackage}</div>
                  <div>Average Package</div>
                  </div>  
                  <div className="hover:underline pb-2">
                  <div className="text-green-700 font-semibold">  <i class="fa-solid fa-indian-rupee-sign"></i> {item.highestPackage}</div>
                  <div>Highest Package</div>
                  </div>  
                  <a href="" className="text-green-600"><i class="fa-solid fa-arrow-right-arrow-left"></i> Compare Placements</a>
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <div>
                  <a href="">{item.userReviewScore}</a>
                  <div className="hover:underline">
                  <div>Based on 346 User</div>
                  <div>Reviews</div>
                  </div>
                  <a href="" className="text-green-600 bg-yellow-200 rounded-2xl pl-2 pr-2"><i class="fa-solid fa-check"></i> Best in  Social Life <i class="fa-solid fa-angle-down"></i></a>
                </div>
              </td>
              <td className="w-1/12">
                <div>#{item.ranking}/131 in India</div>
              </td>
              </>
              
            </tr>)
              })}
            
          </tbody>
        </table>
      </div>
      </div>
      </InfiniteScroll>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1000
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1001
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                Shipped
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1002
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                Canceled
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
      </div> */}
  
    </>
  );
};

export default App;
