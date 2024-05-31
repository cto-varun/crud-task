import EditUser from "@/components/EditUser";
import Form from "@/components/form";
import Table from "@/components/Table";
import { apiCall } from "@/lib/helper";

export default async function Home({ searchParams }) {
  const { users } = await apiCall({ url: `users` });

  let selectedUser;
  if (searchParams.edit) {
    try {
      const { user } = await apiCall({ url: `users/${searchParams.edit}` });
      if (user) {
        selectedUser = user;
      }
    } catch (error) {}
  }else{
    selectedUser = null;
  }

  return (
    <div>
      {selectedUser && <EditUser  selectedUser={selectedUser}/>}
      <Form />
      <Table data={users} />
    </div>
  );
}
