/* eslint react/prop-types: 0 */
function SectionTitle({ value }) {
  return (
    <h1 className="text-2xl text-bold text-zinc-50 mb-2 md:text-4xl md:py-3">
      {value}
    </h1>
  );
}

export default SectionTitle;
