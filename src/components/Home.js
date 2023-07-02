  import React, { useState } from "react";

  const App = () => {
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [longUrl, setLongUrl] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      // Simulating backend response
      // Replace this with your actual API call to the backend
      const fakeBackendResponse = {
        shortUrl: "https://shorturl.example/abc123",
        longUrl: "https://www.example.com/long-url",
      };

      setShortenedUrl(fakeBackendResponse.shortUrl);
      setLongUrl(fakeBackendResponse.longUrl);
    };

    return (
      <section>
        <h1 className="font-extrabold text-5xl text-blue-500 tracking-tight text-shadow text-center mt-8 pt-4">Short URL</h1>
        <div className="max-w-3xl mx-auto shadow-lg rounded-md bg-white mt-8 pt-4 p-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Paste the URL to be shortened</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex">
              <input
                type="text"
                name="u"
                placeholder="Enter the link here"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md mr-0.5"
              />
              <input
                type="submit"
                value="Shorten URL"
                className="px-6 py-2 bg-blue-500 text-white rounded-r-md shadow-md hover:bg-blue-600 ml-0.5"
              />
            </div>
          </form>
          {shortenedUrl && (
            <p className="text-left mt-4">
              Long URL:{" "}
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {longUrl}
              </a>
              <br /><br />
              <a href={`url-total-clicks.php?u=${shortenedUrl}`} className="text-blue-500 underline">
                Total clicks of your shortened URL
              </a>
              <br />
              <a href="https://www.shorturl.at/" className="text-blue-500 underline">
                Shorten another URL
              </a>
            </p>
          )}
        </div>
      </section>
    );
  }

  export default App;
