import {
  LightBulbIcon,
  AcademicCapIcon,
  PhoneIcon,
  UsersIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Cyberbullying Hotline",
    href: "https://findahelpline.com/my/topics/bullying",
    icon: PhoneIcon,
    description:
      "Need to talk? Get free, confidential support with Bullying from a real human. Online chat, text and phone helplines. No sign up or personal info required.",
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
  },
  {
    title: "What is Cyberbully?",
    href: "https://www.stopbullying.gov/cyberbullying/what-is-it",
    icon: AcademicCapIcon,
    description:
      "Discover tactics, prevention methods and how to deal with cyberbullying",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Guardian Contact Info",
    href: "/guardian",
    icon: UsersIcon,
    description:
      "Sometimes you need the support of your beloved ones when things get tough. Save information about a guardian or contact person for easy reachability, whenever you need them",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Words of the Day!",
    href: "https://quotes-react.netlify.app/",
    icon: LightBulbIcon,
    description:
      "Click here to get some light motivation for the day! Stay strong and seek extra help if necessary, remember, no one deserves to suffer",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserContent() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-white"
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500">{action.description}</p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <ArrowRightCircleIcon className="h-6 w-6" aria-hidden="true"/>
          </span>
        </div>
      ))}
    </div>
  );
}
