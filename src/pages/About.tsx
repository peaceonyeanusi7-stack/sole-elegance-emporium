import { Layout } from "@/components/Layout";
import { Heart, Award, Leaf, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "Every pair of sneakers we offer is selected with genuine love for quality footwear and attention to detail.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We partner only with brands that share our commitment to exceptional craftsmanship and premium materials.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Fashion knows no boundaries. Our collections cater to diverse styles and preferences for everyone.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We're committed to promoting sustainable fashion and supporting brands with ethical practices.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/sneaker-6.jpg')" }}
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-background">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Our Story
            </h1>
            <p className="text-background/80 text-lg md:text-xl max-w-2xl">
              Crafting excellence, one step at a time
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                From Passion to Purpose
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Lovely Collections Enterprises was born from a simple yet
                  powerful vision: to bring premium, exclusive footwear to the
                  modern Nigerian gentleman who values both style and substance.
                </p>
                <p>
                  What started as a personal quest for the perfect sneaker has
                  evolved into a curated destination for discerning individuals
                  who understand that great footwear is the foundation of
                  exceptional style.
                </p>
                <p>
                  We believe that every step you take should be a statement.
                  That's why we handpick each piece in our collection, ensuring
                  it meets our exacting standards for craftsmanship, comfort,
                  and aesthetic excellence.
                </p>
                <p>
                  While we primarily focus on exclusive male footwear, we've
                  expanded to include a carefully selected unisex collection,
                  because great design transcends boundaries.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="/images/sneaker-1.jpg"
                alt="Premium sneakers showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card p-6 rounded-lg text-center"
              >
                <div className="feature-icon mx-auto mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-8">Meet the Founder</h2>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-secondary overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Users className="w-12 h-12" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2">
              Founder & Creative Director
            </h3>
            <p className="text-primary mb-6">Lovely Collections Enterprises</p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              "I started Lovely Collections with a simple belief: that premium
              footwear should be accessible to every Nigerian who appreciates
              quality. Every sneaker in our collection represents my personal
              commitment to excellence and my passion for helping others step
              into their best selves."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Ready to Step Into Elegance?
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium sneakers and find your
            perfect pair.
          </p>
          <Link to="/shop" className="btn-hero inline-flex items-center">
            Shop the Collection
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
