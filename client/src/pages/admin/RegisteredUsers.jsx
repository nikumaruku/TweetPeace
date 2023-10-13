import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisteredUsers() {
  const [userDatas, setUserDatas] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/users`).then((response) => {
      setUserDatas(response.data);
    });
  }, []);

  return (
    <div>
      {userDatas ? ( 
        <ul role="list" className="divide-y divide-gray-100">
          {userDatas.map((person) => (
            <li key={person._id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.username}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.age} years old</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    {/* <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> */}
                  </div>
                  <p className="text-xs leading-5 text-gray-500">User since 2019</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
