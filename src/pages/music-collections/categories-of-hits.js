import { useParams } from "react-router-dom";
import { categories } from "../../components/sidebar/categories";

export const CategoriesOfHits = () => {
  const params = useParams();
  console.log("-->", params);
  const category = categories.find(
    (category) => category.id === Number(params.id),
  );

  return (
    <div>
      <p>Категория {category.id}</p>
    </div>
  );
};
