import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

interface CardState {
  isShow: boolean;
  message: string;
}

const ContactData = () => {
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/contact").then((res: any) => {
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
      await axios.delete(`/api/contact?id=${id}`);
      // Remove the deleted item from the UI
      setApiData((prevData) => prevData.filter((item, idx) => idx !== index));
    } catch (error) {
      console.error('Error deleting contact:', error);
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
    <div className="flex flex-col gap-5">
      {apiData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 shadow-md w-full overflow-hidden rounded-md p-4 border-[1px] border-gray-200 shadow-gray-300"
        >
          <h2 className="text-2xl font-bold text-gray-700">
            {item?.name}
          </h2>
          <div className="text-xl font-medium text-gray-600 flex items-center gap-2">
            <h3>{item?.email}</h3>
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
          </div>
          <h4 className="text-base font-medium text-gray-500">
            {item?.subject}
          </h4>
          <p className="text-sm font-medium text-gray-400">
            {item?.message}
          </p>
          <h5 className="pt-2 border-t-[1px] border-t-gray-200 text-gray-400 text-sm select-none">
            {formatDate(item?.date)}
          </h5>
          <p>{cardStates[index]?.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactData;
