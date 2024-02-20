const Home = () => {
  return (
    <>
      <div className="mx-auto text-gray-400">
        <h1 className="text-3xl font-extrabold mb-3">Classic Ciphers</h1>
        <div className="mb-8">
          <h2>William Manuel Kurniawan (13520020)</h2>
          <h2>Damianus Clairvoyance Diva Putra (13520035)</h2>
        </div>
        <table className="table-auto text-sm">
          <thead>
            <tr className="border-b">
              <th className="pr-8">Ciphers</th>
              <th className="pr-8">Input</th>
              <th>Input Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-8">Standard Vigenere Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file</td>
            </tr>
            <tr>
              <td className="pr-8">Autokey Vigenere Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file</td>
            </tr>
            <tr>
              <td className="pr-8">Extended Vigenere Cipher</td>
              <td className="pr-8">256-ascii</td>
              <td>text or any file</td>
            </tr>
            <tr>
              <td className="pr-8">Playfair Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file</td>
            </tr>
            <tr>
              <td className="pr-8">Affine Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file</td>
            </tr>
            <tr>
              <td className="pr-8">Hill Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file</td>
            </tr>
            <tr>
              <td className="pr-8">Superencrypt Cipher</td>
              <td className="pr-8">256-ascii</td>
              <td>text or any file</td>
            </tr>
            <tr>
              <td className="pr-8">Enigma Cipher</td>
              <td className="pr-8">26-alphabet</td>
              <td>text or txt file or keyboard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
