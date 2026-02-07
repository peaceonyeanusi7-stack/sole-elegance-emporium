import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unworn items in their original packaging. Simply contact us to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping within Lagos takes 1-3 business days. Nationwide delivery takes 3-7 business days depending on your location.",
  },
  {
    question: "Do you offer size exchanges?",
    answer:
      "Yes! If your size doesn't fit, we offer free size exchanges within 14 days of delivery. Contact us to arrange an exchange.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "Absolutely. We only source from authorized distributors and guarantee 100% authenticity on all our products.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help. Reach out to
            us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-elegant ${errors.name ? "border-destructive" : ""}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-elegant ${errors.email ? "border-destructive" : ""}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input-elegant ${errors.subject ? "border-destructive" : ""}`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`input-elegant resize-none ${errors.message ? "border-destructive" : ""}`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="feature-icon shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="feature-icon shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a
                      href="tel:+2348012345678"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +234 801 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="feature-icon shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:info@lovelycollections.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@lovelycollections.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="feature-icon shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9AM - 6PM
                      <br />
                      Saturday: 10AM - 4PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenFaq(openFaq === index ? null : index)
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary transition-colors"
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-secondary">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Map coming soon</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
