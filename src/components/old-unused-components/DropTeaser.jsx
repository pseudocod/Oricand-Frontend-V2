import ScrollSection from "./ScrollSection";

export default function DropTeaser() {
  return (
    <ScrollSection>
      <section className="bg-white py-24 px-6 flex flex-col items-center">
        <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
          ORICAND NO.1
        </h3>
        <h2 className="text-4xl font-playfair mb-6 text-center">
          The Sunset Drop
        </h2>
        <p className="text-neutral-600 text-center max-w-xl">
          A limited collection inspired by seaside jazz, poured in small
          batches. Featuring artisan roast profiles and soft-touch packaging
          designed for slow evenings.
        </p>
        <button className="mt-10 px-6 py-3 border border-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition cursor-pointer">
          View Drop
        </button>
      </section>
    </ScrollSection>
  );
}
