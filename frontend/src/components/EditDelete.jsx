"use client";

import { deleteUser } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const EditDelete = ({ id }) => {
  const handleDelete = async () => {
    const { error } = await deleteUser(id);
    if (error) {
      return toast.error(error.message);
    }
    toast.success("user deleted successfully");
  };

  return (
    <div className="flex justify-start gap-4 item-center w-[4rem]">
      <Link href={`?edit=${id}`} color="blue">
        <MdEdit size={20} />
      </Link>
      <MdDelete size={20} onClick={handleDelete} className="" color="red" />
    </div>
  );
};

export default EditDelete;
