import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clientId = "YOUR_BITLY_CLIENT_ID"; // add your ID
  const clientSecret = "YOUR_BITLY_CLIENT_SECRET"; // add your secret keys

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Obtain an access token
      const tokenResponse = await axios.post(
        "https://api-ssl.bitly.com/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Shorten the URL
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortenedUrl(response.data.link);
      setErrorMessage(""); // Reset the error message on successful response
    } catch (error) {
      console.error(error);
      setErrorMessage("Error: Unable to shorten the URL"); // Set error message when there's an issue
    }
  };

  return (
    <section style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <h1 className="font-extrabold text-5xl text-blue-500 tracking-tight text-shadow text-center mt-8 pt-4">
        Short URL
      </h1>
      <div className="bg-gradient-to-r from-red-400 to-indigo-500 max-w-3xl mx-auto shadow-lg rounded-md bg-white mt-8 pt-4 p-6 text-center" style={{ width: "80%", maxWidth: "500px", marginTop: "15vh" }}>
        <h1 className="text-3xl font-bold mb-6">Paste the URL to be shortened</h1>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <input
            type="text"
            name="u"
            placeholder="Enter the link here"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={longUrl}
            onChange={(event) => setLongUrl(event.target.value)}
          />
          <input
            type="submit"
            value="Shorten URL"
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          />
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {shortenedUrl && (
          <div className="text-left mt-4">
            <p>
              Long URL:{" "}
              <a href={longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {longUrl}
              </a>
            </p>
            <p>
              Shortened URL:{" "}
              <input
                type="text"
                value={shortenedUrl}
                className="px-4 py-2 border border-gray-300 rounded-md"
                readOnly
              />
            </p>
            <p>
              <a href={`url-total-clicks.php?u=${shortenedUrl}`} className="text-blue-500 underline">
                Total clicks of your shortened URL
              </a>
            </p>
            <p>
              <a href="https://www.shorturl.at/" className="text-blue-500 underline">
                Shorten another URL
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
