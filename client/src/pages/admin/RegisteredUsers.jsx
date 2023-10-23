import axios from "axios";
import { useEffect, useState } from "react";
import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import UserPopUp from "./UserPopUp";

export default function RegisteredUsers() {
  const [userDatas, setUserDatas] = useState(null);
  const [isUserPopUpOpen, setUserPopUpOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGuardians, setSelectedGuardians] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/users`).then((response) => {
      setUserDatas(response.data);
    });
  }, []);

  const fetchGuardians = (username) => {
    axios
      .get(`http://localhost:3001/guardians/obtain/${username}`)
      .then((response) => {
        setSelectedGuardians(response.data);
        setSelectedUser(username);
        setUserPopUpOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching guardian details:", error);
      });
  };

  const mappedUserDatas = userDatas
    ? userDatas.map((user) => ({
        name: user.username,
        title: "Since 2019",
        role: "Active member",
        email: user.email,
        telephone: "N/A",
        imageUrl: "https://picsum.photos/200/300",
      }))
    : [];

  return (
    <div>
      {isUserPopUpOpen && (
        <UserPopUp
          user={selectedUser}
          guardians={selectedGuardians}
          closeUserPopUp={() => setUserPopUpOpen(false)}
        />
      )}

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {mappedUserDatas.map((person) => (
          <li
            key={person.email}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={person.imageUrl}
                alt={person.name}
              />

              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {person.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{person.title}</dd>
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.role}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    onClick={() => fetchGuardians(person.name)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <UserGroupIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
