// components/DomainCard.tsx
import React from "react";
import { DomainData } from "@/app/page";

interface DomainCardProps {
  data: DomainData;
}

const DomainCard: React.FC<DomainCardProps> = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Информация о домене</h2>
      <p>
        <span className="font-semibold">URL:</span> {data.url}
      </p>
      <p>
        <span className="font-semibold">Корневой домен:</span> {data.root_domain}
      </p>
      <p>
        <span className="font-semibold">Email домены:</span>{" "}
        {data?.email_domains?.join(", ")}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Учётные данные:</h3>
        {data?.creds?.length > 0 ? (
          <ul>
            {data.creds?.map((cred, index) => (
              <li key={index} className="border p-2 rounded mb-2">
                <p>
                  <span className="font-semibold">Пользователь:</span>{" "}
                  {cred?.username}
                </p>
                {cred?.password && (
                  <p>
                    <span className="font-semibold">Пароль:</span> {cred?.password}
                  </p>
                )}
                {cred?.credential_category && (
                  <p>
                    <span className="font-semibold">Категория:</span>{" "}
                    {cred?.credential_category}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Учётные данные не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default DomainCard;
