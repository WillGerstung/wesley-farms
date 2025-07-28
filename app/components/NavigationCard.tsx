import Link from "next/link";

interface NavigationCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}

export default function NavigationCard({ title, icon, href, color = "bg-gray-50 dark:bg-gray-800" }: NavigationCardProps) {
  return (
    <Link href={href}>
      <div className={`${color} rounded-lg p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-gray-600 dark:text-gray-300">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
