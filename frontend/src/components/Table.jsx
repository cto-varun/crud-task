import React from "react";
import EditDelete from "./EditDelete";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto py-10 flex items-center mx-auto justify-center">
      <table className="bg-white border border-gray-200 w-2/4 ">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Email</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ name, email, id }, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{name}</td>
              <td className="py-2 px-4">{email}</td>
              <td className="py-2 flex gap-2 justify-center justify-start">
                <EditDelete id={id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
