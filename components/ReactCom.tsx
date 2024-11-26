import axios from "axios";
import React, { useEffect, useState } from "react";

function ReactCom() {
  const [data, setData] = useState([]);
  const [UpdateData, setUpdateData] = useState<any>({
    Id: "",
    title: "",
    stock: "",
  });

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleDelete = (id: any) => {
    const DeletedData = data.filter((ids: any) => {
      return ids.id !== id;
    });
    setData(DeletedData);
  };

  const HandleUpdate = (item: any) => {
    setUpdateData(item);
  };

  const HandleUpdateRecord = () => {
    const updatedRecord: any = data.map((item: any) =>
      item.id === UpdateData.id
        ? { ...item, title: UpdateData.title, stock: UpdateData.stock }
        : item
    );
    setData(updatedRecord);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="">
        <p>Update data ID: {UpdateData.id}</p>
        <div className="">
          <div className="">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              // value={UpdateData.title}
              value={UpdateData.title}
              onChange={(e) =>
                setUpdateData({ ...UpdateData, title: e.target.value })
              }
              className="border border-black ps-2 w-[500px]"
              id=""
            />
          </div>
          <div className="">
            <label htmlFor="Name">Stock</label>
            <input
              type="text"
              value={UpdateData.stock}
              onChange={(e) =>
                setUpdateData({ ...UpdateData, stock: e.target.value })
              }
              className="border border-black ps-2 w-[500px]"
            />
          </div>
          <div className="">
            <button
              onClick={HandleUpdateRecord}
              className="bg-red-500 text-white rounded-md my-2 px-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Stock</th>
            <th className="py-3 px-6 text-left">Delete</th>
            <th className="py-3 px-6 text-left">Update</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data.map((item: any, index: any) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{item.id}</td>
              <td className="py-3 px-6">{item.title}</td>
              <td className="py-3 px-6">{item.stock}</td>
              <td className="py-3 px-6">{item.rating}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => {
                    HandleDelete(item.id);
                  }}
                  className="bg-black text-white px-5 rounded-lg py-2"
                >
                  Delete
                </button>
              </td>
              <td className="py-3 px-6">
                <button
                  onClick={() => {
                    HandleUpdate(item);
                  }}
                  className="bg-black text-white px-5 rounded-lg py-2"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReactCom;
