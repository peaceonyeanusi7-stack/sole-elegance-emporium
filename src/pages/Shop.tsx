import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, Product } from "@/data/products";
import { Filter, X, Grid2X2, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc" | "name";
type CategoryFilter = "all" | "male" | "unisex";
type PriceRange = "all" | "under-100k" | "100k-150k" | "over-150k";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  // Get initial values from URL params
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";
  const initialFilter = searchParams.get("filter");

  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showNewOnly, setShowNewOnly] = useState(initialFilter === "new");
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(
    initialFilter === "bestsellers"
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price range filter
    if (priceRange !== "all") {
      result = result.filter((p) => {
        switch (priceRange) {
          case "under-100k":
            return p.price < 100000;
          case "100k-150k":
            return p.price >= 100000 && p.price <= 150000;
          case "over-150k":
            return p.price > 150000;
          default:
            return true;
        }
      });
    }

    // New arrivals filter
    if (showNewOnly) {
      result = result.filter((p) => p.isNew);
    }

    // Bestsellers filter
    if (showBestsellersOnly) {
      result = result.filter((p) => p.isBestseller);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [category, priceRange, sortBy, showNewOnly, showBestsellersOnly]);

  const clearFilters = () => {
    setCategory("all");
    setPriceRange("all");
    setSortBy("newest");
    setShowNewOnly(false);
    setShowBestsellersOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== "all" ||
    priceRange !== "all" ||
    showNewOnly ||
    showBestsellersOnly;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover premium sneakers crafted with passion and designed for the
            modern individual who values both style and comfort.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}

              <span className="text-muted-foreground text-sm">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-border bg-background focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center border border-border">
                <button
                  onClick={() => setGridCols(2)}
                  className={cn(
                    "p-2 transition-colors",
                    gridCols === 2 ? "bg-foreground text-background" : "hover:bg-secondary"
                  )}
                  aria-label="2 columns"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={cn(
                    "p-2 transition-colors",
                    gridCols === 3 ? "bg-foreground text-background" : "hover:bg-secondary"
                  )}
                  aria-label="3 columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div
              className={cn(
                "w-64 shrink-0 space-y-8 transition-all duration-300",
                showFilters
                  ? "block"
                  : "hidden md:block"
              )}
            >
              {/* Categories */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                  {(["all", "male", "unisex"] as CategoryFilter[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "block w-full text-left py-2 px-3 transition-colors capitalize",
                        category === cat
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {cat === "all" ? "All Products" : `${cat} Collection`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "under-100k", label: "Under ₦100,000" },
                    { value: "100k-150k", label: "₦100,000 - ₦150,000" },
                    { value: "over-150k", label: "Over ₦150,000" },
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value as PriceRange)}
                      className={cn(
                        "block w-full text-left py-2 px-3 transition-colors",
                        priceRange === range.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-4">
                  Special Filters
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>New Arrivals</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBestsellersOnly}
                      onChange={(e) => setShowBestsellersOnly(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>Bestsellers</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-6",
                    gridCols === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
