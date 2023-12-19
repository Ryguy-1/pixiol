import React from "react";
import SideMenuCategory from "./SideMenuCategory";
import { Category } from "@/api/data-structures";

const Categories: React.FC = async () => {
  const fetchCategories = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories", {
      method: "GET",
      next: { revalidate: 30 }, // fixes hydration error (revalidate server-side cache to be in sync with client)
    });
    const categories = await res.json();
    return categories;
  };
  const categories: Category[] = ((await fetchCategories()) as string[]).map(
    (category) => ({ title: category })
  );

  return (
    <div className="flex flex-col justify-start items-center gap-3 py-5 overflow-y-auto">
      {categories.map((category) => (
        <SideMenuCategory key={category.title} category={category} />
      ))}
    </div>
  );
};

export default Categories;
