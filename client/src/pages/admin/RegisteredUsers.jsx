// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function RegisteredUsers() {
//   const [userDatas, setUserDatas] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/users`).then((response) => {
//       setUserDatas(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       {userDatas ? (
//         <ul role="list" className="divide-y divide-gray-100">
//           {userDatas.map((person) => (
//             <li key={person._id} className="flex justify-between gap-x-6 py-5">
//               <div className="flex gap-x-4">
//                 <div className="min-w-0 flex-auto">
//                   <p className="text-sm font-semibold leading-6 text-gray-900">
//                     {person.username}
//                   </p>
//                   <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                     {person.email}
//                   </p>
//                 </div>
//               </div>
//               <div className="hidden sm:flex sm:flex-col sm:items-end">
//                 <p className="text-sm leading-6 text-gray-900">{person.age} years old</p>
//                 <div className="mt-1 flex items-center gap-x-1.5">
//                   <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//                     {/* <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> */}
//                   </div>
//                   <p className="text-xs leading-5 text-gray-500">User since 2019</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

export default function RegisteredUsers() {
  const [userDatas, setUserDatas] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/users`).then((response) => {
      setUserDatas(response.data);
    });
  }, []);

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
                  Email
                </a>
              </div>
              {/* <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call
                </a>
              </div> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
