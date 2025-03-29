import FilterSection from "@/components/FilterSection";

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen lg:px-20 md:px-14 py-[1rem] px-4 flex flex-col gap-10 bg-slate-50">
      <div className="merriweather pt-16" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-[3.5rem] md:text-[4rem]">
          Our recent <span className="text-gray-900">Listing</span>
        </h2>
      </div>

      <FilterSection />

      {children}
    </div>
  );
}
