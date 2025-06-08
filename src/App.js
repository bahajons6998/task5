import { Input, Select } from "antd";
import List from "./List";
import { useState } from "react";

export default function App() {

  const [language, setLanguage] = useState('en');
  const [seed, setSeed] = useState('');
  const [like, setLike] = useState(10);
  const [review, setReview] = useState(10);

  function seed_generator() {
    let seed_random = Math.floor((Math.random() * 10000));
    setSeed(seed_random);

  }



  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-around my-3">
        <label className="d-flex align-items-center">Region:
          <Select
            className="mx-2"
            defaultValue="en"
            placeholder="Select region"
            style={{ width: 120 }}
            onChange={(e) => setLanguage(e)}
            options={[
              { value: 'en', label: 'USA' },
              { value: 'de', label: 'GERMANY' },
              { value: 'jp', label: 'JAPAN' }
            ]} />
        </label>
        <label className="d-flex align-items-center">Seed:
          <Input
            className="mx-2"
            placeholder="Seed"
            style={{ width: 120 }}
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <button className="btn btn-primary" onClick={seed_generator}>Generate</button>
        </label>
        <label className="d-flex align-items-center">Likes: {like}
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            className="mx-2"
            style={{ width: 120 }}
            value={like}
            onChange={(e) => setLike(e.target.value)}
          />
        </label>
        <label className="d-flex align-items-center">Review: {review}
          <input
            type="range"
            min={1}
            step={0.1}
            max={10}
            className="mx-2"
            style={{ width: 120 }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
      </div>

      <List language={language} seed={seed} like={like} review={review} />
    </div>
  )
}