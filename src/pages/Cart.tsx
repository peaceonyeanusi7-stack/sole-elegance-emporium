import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from "lucide-react";

const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    total,
    freeShippingRemaining,
  } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-semibold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Free Shipping Progress */}
            {freeShippingRemaining > 0 && (
              <div className="mb-6 p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    Add {formatPrice(freeShippingRemaining)} more for free
                    shipping!
                  </span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.min((subtotal / 100000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {freeShippingRemaining === 0 && (
              <div className="mb-6 p-4 bg-secondary border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3 text-primary">
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">
                    🎉 You've qualified for free shipping!
                  </span>
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-6 p-4 bg-card rounded-lg border border-border"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-secondary rounded overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-display text-lg font-medium hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-copper-dark">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-lg sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-xl text-copper-dark">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary mb-4">
                Proceed to Checkout
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Taxes calculated at checkout. Free shipping on orders over
                ₦100,000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
