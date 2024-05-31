"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import { editUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const EditUser = ({ selectedUser }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: selectedUser.name,
    email: selectedUser.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { error } = await editUser(userInfo, selectedUser.id);
      if (error) {
        return toast.error(error.message);
      }
      toast.success("user updated successfully");
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
              href={"/"}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              loading={isLoading}
              onClick={() => handleSubmit()}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
