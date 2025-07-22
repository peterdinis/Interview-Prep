import Image from "next/image";
import { Star } from "lucide-react";
import type { FC } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer at Google",
    content:
      "InterviewAce transformed my preparation strategy. The AI-powered questions felt incredibly realistic and helped me identify my weak spots.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Michael Rodriguez",
    role: "Frontend Lead at Meta",
    content:
      "The personalized feedback and progress tracking made all the difference. I went from failing interviews to getting multiple offers.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Emily Johnson",
    role: "Full Stack Developer at Netflix",
    content:
      "The variety of questions and difficulty levels helped me prepare for any scenario. Highly recommend to anyone serious about landing their dream job.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
];

const FeaturesSection: FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-sky-50 text-gray-900 mb-6">
            Loved by
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              {" "}
              Developers
            </span>
            <br />
            Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful developers who transformed their
            careers with InterviewAce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:bg-foreground p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover mr-4 ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
