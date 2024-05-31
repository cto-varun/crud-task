"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { addUser } from "@/lib/actions";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [isLoading , setIsLoading] = useState(false)

  const { name, email, password } = formData;

  const router = useRouter()

  async function handleSubmit() {
    try {
      setIsLoading(true)
      const { error } = await addUser(formData);
      if (error) {
         return toast.error(error.message)
      } 
      setFormData({
        email: "",
        name: "",
        password: "",
      })
      router.refresh()
      toast.success('new user added successfully')
    } catch (error) {
      return toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  const handleChange = (e)=>{
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="py-10 flex items-center">
      <div className="w-full">
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <form>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Fullname"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="twitter"
                className="block mb-2 font-bold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="border shadow p-3 w-full rounded mb-"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="twitter"
                className="block mb-2 font-bold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="border shadow p-3 w-full rounded mb-"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <Button loading={isLoading} type="button" onClick={() => handleSubmit()} className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
