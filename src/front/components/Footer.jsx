export const Footer = () => {
  return (
    <footer
      className="footer mt-auto text-center py-2 mt-2"
      style={{ 
        background: "linear-gradient(to right, #00aeef, #33bef2, #66cef6, #99dff9, #cceffc)", 
        color: "#004466" 
      }}
    >
      <div className="container">
        <hr style={{ borderColor: "#66cef6", opacity: 0.3, marginTop: '0.5rem' }} />
      </div>
    </footer>
  );
};