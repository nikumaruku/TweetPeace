import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DisplayGuardian = () => {
  const [guardianDatas, setGuardianDatas] = useState([]);
  const [editedGuardian, setEditedGuardian] = useState(null);

  const navigate = useNavigate();

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/guardians/obtain/${user}`)
      .then((response) => {
        setGuardianDatas(response.data);
        console.log(response.data);
      });
  }, [user]);

  const handleEdit = (guardianId) => {
    const guardianToEdit = guardianDatas.find(
      (guardian) => guardian._id === guardianId
    );

    setEditedGuardian(guardianToEdit);
  };

  const handleCancelEdit = () => {
    setEditedGuardian(null);
  };

  const handleUpdate = () => {
    if (editedGuardian) {
      axios
        .patch(`http://localhost:3001/guardians/update/${editedGuardian._id}`, {
          name: editedGuardian.name,
          email: editedGuardian.email,
          phone: editedGuardian.phone,
        })
        .then((response) => {
          console.log("Guardian updated:", response.data);

          setEditedGuardian(null);
          navigate(`/testing?username=${user}`);
        })
        .catch((error) => {
          console.error("Error updating guardian:", error);
        });
    }
  };

  return (
    <div>
      {guardianDatas.map((guardianData) => (
        <div key={guardianData._id}>
          {editedGuardian && editedGuardian._id === guardianData._id ? (
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                  <form>
                    <h1 className="leading-7 text-gray-900 text-4xl font-bold mb-10">
                      Guardian Info
                    </h1>
                    <div className="border-b border-gray-900/10 pb-8">
                      <div className="mt-2">
                        <div className="flex items-start">
                          <div className="w-1/4">
                            <h2 className="text-gray-600">Name:</h2>
                          </div>
                          <div className="w-3/4">
                            <input
                              type="text"
                              value={editedGuardian.name}
                              onChange={(e) =>
                                setEditedGuardian({
                                  ...editedGuardian,
                                  name: e.target.value,
                                })
                              }
                              className="border-b border-gray-900/10 pb-2"
                            />
                          </div>
                        </div>
                        <div className="flex items-start mt-2">
                          <div className="w-1/4">
                            <h2 className="text-gray-600">Email:</h2>
                          </div>
                          <div className="w-3/4">
                            <input
                              type="email"
                              value={editedGuardian.email}
                              onChange={(e) =>
                                setEditedGuardian({
                                  ...editedGuardian,
                                  email: e.target.value,
                                })
                              }
                              className="border-b border-gray-900/10 pb-2"
                            />
                          </div>
                        </div>
                        <div className="flex items-start mt-2">
                          <div className="w-1/4">
                            <h2 className="text-gray-600">Phone:</h2>
                          </div>
                          <div className="w-3/4">
                            <input
                              type="text"
                              value={editedGuardian.phone}
                              onChange={(e) =>
                                setEditedGuardian({
                                  ...editedGuardian,
                                  phone: e.target.value,
                                })
                              }
                              className="border-b border-gray-900/10 pb-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-col justify-center items-center mb-2">
                        <button
                          type="button"
                          onClick={handleUpdate}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="rounded-md bg-gray-300 px-3 py-2 mt-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                  <form>
                    <h1 className="leading-7 text-gray-900 text-4xl font-bold mb-10">
                      Guardian Info
                    </h1>
                    <div className="border-b border-gray-900/10 pb-8">
                      <h1>Name: {guardianData.name}</h1>
                      <h2>Email: {guardianData.email}</h2>
                      <h3>Phone: {guardianData.phone}</h3>
                      <div className="flex flex-col justify-center items-center mt-8 mb-2">
                        <button
                          onClick={() => handleEdit(guardianData._id)}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit
                        </button>
                        <Link to={`/dashboard?username=${user}`}>
                          <button className="rounded-md bg-gray-300 px-3 py-2 mt-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400">
                            Return to dashboard
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayGuardian;
