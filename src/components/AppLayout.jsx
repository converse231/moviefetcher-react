/* eslint react/prop-types: 0 */
function AppLayout({ children }) {
  return (
    <main className="max-w-screen-2xl mx-auto md:px-5 flex flex-col px-3">
      {children}
    </main>
  );
}

export default AppLayout;
