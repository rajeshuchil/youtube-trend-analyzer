import type { Category } from "../types";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <div className="card">
      <h3>{category.title}</h3>
      <small>ID: {category.id}</small>
      <p>Region: {category.regionCode}</p>
    </div>
  );
}
