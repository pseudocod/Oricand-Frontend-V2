import ScrollSection from "./ScrollSection";

export default function ManifestoSection() {
  return (
    <ScrollSection>
      <section className="bg-[#f9f7f4] text-[#0a0a0a] py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair leading-snug text-center">
          A moment to slow down.
          <br />A rhythm you can taste.
        </h2>
        <p className="mt-8 text-center text-lg text-neutral-600">
          ORICAND is an atmosphere, a feeling, a drop of calm. Inspired by jazz,
          crafted by time. We design coffee experiences that feel like golden
          hour.
        </p>
      </section>
    </ScrollSection>
  );
}
