import TestimonialScroller from "./testimonial-scroller";
import FloatingElements from "@/app/ui/components/animation/FloatingElements";

const topRowTestimonials = [
  {
    name: "Paul H",
    location: "Boston, MA",
    date: "15 Jan, 2025",
    rating: 5,
    content: "Found my new favorite author through this app! The recommendation engine is brilliant.",
  },
  {
    name: "Angela P",
    location: "Memphis, TN",
    date: "03 Jan, 2025",
    rating: 5,
    content: "As an English teacher, I'm impressed by the quality and depth of book suggestions.",
  },
  {
    name: "Kevin M",
    location: "Los Angeles, CA",
    date: "01 Jan, 2025",
    rating: 5,
    content: "Perfect for breaking out of reading slumps. The 'read-alike' feature is genius!",
  },
  {
    name: "Regina H",
    location: "Miami, FL",
    date: "30 Apr, 2024",
    rating: 5,
    content: "Love how it recommends books based on mood and reading pace, not just genre.",
  },
];

const bottomRowTestimonials = [
  {
    name: "Sandra K",
    location: "Chicago, IL",
    date: "15 Dec, 2024",
    rating: 5,
    content: "My 'to-read' list has tripled thanks to these perfectly curated recommendations.",
  },
  {
    name: "Derrick J",
    location: "Seattle, WA",
    date: "28 Nov, 2024",
    rating: 4,
    content: "Great for discovering diverse voices and international literature I'd otherwise miss.",
  },
  {
    name: "Beatrice M",
    location: "Newark, NJ",
    date: "12 Oct, 2024",
    rating: 5,
    content: "The community reviews and similar reader profiles make finding books so much easier.",
  },
  {
    name: "Tunde L",
    location: "Houston, TX",
    date: "05 Sep, 2024",
    rating: 5,
    content: "Finally, a book app that understands nuanced preferences beyond basic genres.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="py-16 relative ">
      <section className="w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] ">
        <h2 className="text-center text-2xl font-bold mb-10">
          What Our Clients Say
        </h2>

        <div className="space-y-10">
          <TestimonialScroller
            testimonials={topRowTestimonials}
            direction="right"
          />
          <TestimonialScroller
            testimonials={bottomRowTestimonials}
            direction="left"
          />
        </div>
      </section>
      <FloatingElements />
    </div>
  );
}