/* eslint react/prop-types: 0 */
function SectionTitle({ value }) {
  return (
    <h1 className="text-1xl text-bold text-zinc-50 mb-2 md:text-2xl 2xl:text-4xl md:py-3">
      {value}
    </h1>
  );
}

export default SectionTitle;
