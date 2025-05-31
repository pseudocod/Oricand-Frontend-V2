import { Link } from "react-router-dom";

export default function CategoryPreview({
  categoryName,
  videoUrl,
  categoryId,
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden py-32">
      {/* Background Text */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center space-y-6 text-[10vw] font-extrabold uppercase text-black leading-[0.9] opacity-100 pointer-events-none select-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <p key={i}>{categoryName}</p>
        ))}
      </div>

      {/* Centered Video */}
      <Link
        to={`/categories/${categoryId}`}
        className="absolute inset-0 z-20 flex items-center justify-center group"
      >
        <div className="relative z-10">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-[500px] md:w-[400px] h-[300px] md:h-[400px] object-cover rounded shadow-xl"
          />
        </div>
      </Link>
    </section>
  );
}
