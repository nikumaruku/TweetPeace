import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  // CogIcon,
  UserCircleIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import AnalyseTweet from "../../components/AnalyseTweet.jsx";
import ReportTweet from "../../components/ReportTweet.jsx";
import UserStats from "./UserStats";
import UserContent from "./UserContent";
import TweetCollection from "../../components/TweetCollection.jsx";
import ReportHistory from "../../components/ReportHistory.jsx";
import DashboardFooter from "./DashboardFooter.jsx";

const DashboardHome = () => {
  return (
    <>
      <UserStats />
      <UserContent />
    </>
  );
};

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Home", component: DashboardHome },
  { name: "Tweet Analyser", component: AnalyseTweet },
  { name: "Report Tweet", component: ReportTweet },
  { name: "Tweet Collection", component: TweetCollection },
  { name: "Report History", component: ReportHistory },
];

const userNavigation = [
  {
    name: "Sign Out",
    icon: ArrowLeftOnRectangleIcon,
    onClick: () => handleSignOut(),
  },
];

const handleSignOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard() {
  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  const [currentSection, setCurrentSection] = useState("Home");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (dateTime) => {
    return dateTime.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderComponent = () => {
    switch (currentSection) {
      case "Tweet Analyser":
        return <AnalyseTweet />;
      case "Report Tweet":
        return <ReportTweet />;
      case "Tweet Collection":
        return <TweetCollection />;
      case "Report History":
        return <ReportHistory />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between ">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => setCurrentSection(item.name)}
                            className={classNames(
                              currentSection === item.name
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {/* <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            /> */}
                            <UserCircleIcon className="h-8 w-8 rounded-full bg-white" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <>
                                    {item.href ? (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        <item.icon className="h-5 w-5 inline mr-2" />{" "}
                                        {item.name}
                                      </a>
                                    ) : (
                                      <button
                                        onClick={item.onClick}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        <item.icon className="h-5 w-5 inline mr-2" />{" "}
                                        {item.name}
                                      </button>
                                    )}
                                  </>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back, {username}!
            </h3>

            <h4>{formatDateTime(currentDateTime)}</h4>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {renderComponent()}
          </div>
        </main>
      </div>
      <DashboardFooter />
    </>
  );
}
