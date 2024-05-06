import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

interface CardState {
  isShow: boolean;
  message: string;
}

const NewsletterData = () => {
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/newsletter").then((res: any) => {
      const data = res.data;
      const defaultCardStates = data.map(() => ({
        isShow: false,
        message: "",
      }));
      setCardStates(defaultCardStates);
      setApiData(data);
    });
  }, []);

  const handleCopyClick = (email: string, index: number) => {
    navigator.clipboard.writeText(email);
    setCardStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = { isShow: true, message: "Email Copied!" };
      return updatedStates;
    });
    setTimeout(() => {
      setCardStates((prevState) => {
        const updatedStates = [...prevState];
        updatedStates[index] = { isShow: false, message: "Email Copied!" };
        return updatedStates;
      });
    }, 5000);
  };

  const handleDelete = async (id: string, index: number) => {
    try {
      await axios.delete(`/api/newsletter?id=${id}`);
      // Remove the deleted item from the UI
      setApiData((prevData) => prevData.filter((item, idx) => idx !== index));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate.replace(",", " -");
  };

  return (
    <div className="newletter-data-box flex items-start flex-wrap w-full justify-center overflow-scroll gap-2 py-2  pr-4 max-h-[65vh]">
      {apiData.map((item, index) => (
        <div
          className="w-[320px] p-4 border-2 rounded-md shadow-md shadow-gray-300"
          key={index}
        >
          <span className="pb-2 flex items-center justify-between gap-4">
            <h2
              className="text-xl font-bold cursor-pointer hover:text-[#ff000096]"
              title={item?.email}
            >
              {item?.email.slice(0, 14)}...
            </h2>
            <span className="flex items-center gap-3 text-gray-500">
              <FaCopy
                className="cursor-pointer hover:text-[#000]"
                onClick={() => handleCopyClick(item?.email, index)}
              />
              <FaTrash
                className="cursor-pointer hover:text-[#ff000096]"
                onClick={() => handleDelete(item?._id, index)}
              />
            </span>
          </span>

          <h5 className="pt-2 border-t-[1px] border-t-gray-200 text-gray-400 text-sm select-none">
            {formatDate(item?.date)}
          </h5>

          <p>{cardStates[index]?.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsletterData;
