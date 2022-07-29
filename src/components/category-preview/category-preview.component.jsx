import ProductCard from '../../components/product-card/product-card.component';

import {
  CategoryPreviewConteiner,
  Preview,
  Title,
} from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewConteiner>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewConteiner>
  );
};

export default CategoryPreview;
