import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getNewArrivals, formatPrice } from "@/data/products";
import { Truck, RotateCcw, Shield, Award, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ₦100,000",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted excellence",
  },
];

const Index = () => {
  const featuredProducts = getFeaturedProducts(4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-sneaker.jpg')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-slide-up">
            <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">
              Exclusive Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-tight mb-6">
              Step Into
              <br />
              <span className="text-primary">Elegance</span>
            </h1>
            <p className="text-cream/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Discover our curated collection of premium sneakers designed for
              the modern individual who values both style and comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-hero">
                Shop Collection
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary border-cream text-cream hover:bg-cream hover:text-foreground"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="feature-icon mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-medium mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our curated collections designed for every style
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Male Category */}
            <Link
              to="/shop?category=male"
              className="category-card aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="/images/sneaker-1.jpg"
                alt="Male Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="category-card-overlay" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                  Male Collection
                </h3>
                <p className="text-white/80 mb-4">Premium footwear for gentlemen</p>
                <span className="btn-hero text-sm">
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Unisex Category */}
            <Link
              to="/shop?category=unisex"
              className="category-card aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="/images/sneaker-5.jpg"
                alt="Unisex Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="category-card-overlay" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                  Unisex Collection
                </h3>
                <p className="text-white/80 mb-4">Style without boundaries</p>
                <span className="btn-hero text-sm">
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="section-title text-left mb-2">Featured Products</h2>
              <p className="text-muted-foreground text-lg">
                Handpicked selections from our latest collection
              </p>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-primary font-medium hover:underline"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="section-title text-left mb-2">New Arrivals</h2>
              <p className="text-muted-foreground text-lg">
                The latest additions to our exclusive collection
              </p>
            </div>
            <Link
              to="/shop?filter=new"
              className="mt-4 md:mt-0 inline-flex items-center text-primary font-medium hover:underline"
            >
              Shop New Arrivals
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Join the Lovely Family
            </h2>
            <p className="text-background/70 text-lg mb-8">
              Subscribe to receive exclusive offers, early access to new arrivals,
              and style inspiration delivered to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
