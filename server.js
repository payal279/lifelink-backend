import "dotenv/config";
import server from "./app.js";

// Use Render's PORT
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});