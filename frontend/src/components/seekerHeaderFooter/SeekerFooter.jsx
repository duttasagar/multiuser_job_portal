export default function SeekerFooter() {
  return (
    <footer
      className="
      bg-white
      border-t
      border-slate-200
      py-4
      px-4
      md:px-6
      "
    >
      <div
        className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-center
        gap-1
        text-center
        "
      >
        <p
          className="
          text-xs
          sm:text-sm
          text-slate-500
          "
        >
          © {new Date().getFullYear()} JobPortal.
        </p>

        <p
          className="
          text-xs
          sm:text-sm
          text-slate-500
          "
        >
          Find your dream job with confidence.
        </p>
      </div>
    </footer>
  );
}