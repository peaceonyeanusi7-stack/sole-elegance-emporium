import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn("product-card group block", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
          {hasDiscount && (
            <span className="badge-sale">-{discountPercentage}%</span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background px-4 py-2 text-sm font-medium">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="price-tag">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="price-original">{formatPrice(product.originalPrice!)}</span>
          )}
        </div>

        {/* Colors Preview */}
        <div className="mt-3 flex items-center gap-2">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
