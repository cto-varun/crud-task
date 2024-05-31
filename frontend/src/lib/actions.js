"use server";

import { revalidatePath } from "next/cache";
import { apiCall } from "./helper";

export async function deleteUser(id) {
  const data = await apiCall({ url: `users/${id}`, method: "DELETE" });
  revalidatePath("/");
  return data;
}

export async function editUser(payload, id) {
  "use server";
  const data = await apiCall({
    method: "PUT",
    url: `users/${id}`,
    payload: payload,
  });

  return data
}

export async function addUser(payload) {
 const data =  await apiCall({
    method: "POST",
    url: "users",
    payload: payload,
  });

  return data
}
