import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('ass');
  const [options, setOptions] = useState([]);
  const [img, setImages] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.waifu.im/search?included_tags=${url}`)
      .then((response) => {
        response.data.images.map((img) => setImages(img));
      });
  }, [url]);
  useEffect(() => {
    axios.get(`https://api.waifu.im/tags`).then((response) => {
      console.log(setOptions(response.data.nsfw));
    });
  }, []);

  const handleInput = () => {
    axios
      .get(`https://api.waifu.im/search?included_tags=${url}`)
      .then((response) => {
        response.data.images.map((img) => setImages(img));
      });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center p-10 gap-5">
        <select
          className="p-4 w-[60%] md:w-[30%] rounded-full outline-none"
          onChange={(e) => setUrl(e.target.value)}
          defaultValue={url}
        >
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
        <button
          className="text-white bg-green-500 p-4 rounded-full"
          onClick={handleInput}
        >
          Refresh
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <img className='w-[300px] md:w-[400px] rounded-xl' src={img.url}  alt="hihi" />
      </div>
    </div>
  );
}

export default App;
