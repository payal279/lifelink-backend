import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Home() {
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [liveMsg, setLiveMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    blood: "",
    city: ""
  });

  /* Fetch Donors */
  const fetchDonors = () => {
    fetch("http://localhost:3000/donor")
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDonors();

    /* Listen Socket Messages */
    socket.on("message", (msg) => {
      setLiveMsg(msg);
      fetchDonors();
    });

    return () => socket.off("message");
  }, []);

  /* Input Change */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* Submit Donor */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/donor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);

    /* Emit Live Message */
    socket.emit(
      "chat-message",
      `New Donor Registered: ${form.name} ❤️`
    );

    setForm({
      name: "",
      blood: "",
      city: ""
    });

    fetchDonors();
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">Give Life Through Donation</p>

          <h1>
            One Donor Can <br />
            Save Many Lives
          </h1>

          <p className="desc">
            Join our mission to connect donors, hospitals and patients.
            Together we can create hope, healing and second chances.
          </p>

          {/* Live Message */}
          {liveMsg && (
            <div className="live-box">
              🔴 {liveMsg}
            </div>
          )}

          <div className="buttons">
            <button
              className="primary"
              onClick={() =>
                document
                  .getElementById("register-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Become Donor
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/register")}
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Donor Form */}
      <section className="section register" id="register-section">
        <h2>Register as Donor</h2>

        <form className="donor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="blood"
            placeholder="Blood Group"
            value={form.blood}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <button className="primary">
            Register Donor
          </button>
        </form>
      </section>

      {/* Stats */}
      <section className="section stats">
        <div className="stat-card">
          <h3>500+</h3>
          <p>Lives Saved</p>
        </div>

        <div className="stat-card">
          <h3>{donors.length}+</h3>
          <p>Registered Donors</p>
        </div>

        <div className="stat-card">
          <h3>25+</h3>
          <p>Partner Hospitals</p>
        </div>
      </section>

      {/* Donor List */}
      <section className="section donors">
        <h2>Available Donors</h2>

        <div className="story-grid">
          {donors.map((donor) => (
            <div className="story-card" key={donor._id}>
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Blood:</strong> {donor.blood}</p>
              <p><strong>City:</strong> {donor.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 LifeLink | Organ Donation Awareness Platform</p>
      </footer>
    </>
  );
}

export default Home;