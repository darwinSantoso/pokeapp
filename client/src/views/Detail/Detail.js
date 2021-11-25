import './Detail.css';

import React, { useEffect, useState } from 'react';
import axios from '../../apis/server';

import { useParams } from 'react-router-dom';

export default function Detail() {
  const { name } = useParams();

  const [detail, setDetail] = useState({});
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    axios({
      url: `/${name}`,
      method: 'GET',
    })
      .then((res) => {
        setDetail(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setDetailError(err.response.data);
      })
      .finally(() => setDetailLoading(false));
  }, []);

  if (detailLoading) {
    return <h5>Loading...</h5>;
  }

  if (detailError) {
    return <h5>{detailError}</h5>;
  }

  return (
    <>
      <div className="detail-content">
        <div className="image">
          <img
            src={detail.sprites.other['official-artwork'].front_default}
            alt="pokemon"
            className="text-center artwork"
          />
        </div>
        <div>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-about-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-about"
                type="button"
                role="tab"
                aria-controls="pills-about"
                aria-selected="true"
              >
                About
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-stats-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-stats"
                type="button"
                role="tab"
                aria-controls="pills-stats"
                aria-selected="false"
              >
                Base Stats
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-evolution-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-evolution"
                type="button"
                role="tab"
                aria-controls="pills-evolution"
                aria-selected="false"
              >
                Evolution
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-moves-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-moves"
                type="button"
                role="tab"
                aria-controls="pills-moves"
                aria-selected="false"
              >
                Moves
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-about"
              role="tabpanel"
              aria-labelledby="pills-about-tab"
            >
              <ul>
                <li>Species</li>
                <li>Height</li>
                <li>Weight: {detail.weight}</li>
                <li>Abilities</li>
              </ul>
            </div>
            <div
              class="tab-pane fade"
              id="pills-stats"
              role="tabpanel"
              aria-labelledby="pills-stats-tab"
            >
              stats
            </div>
            <div
              class="tab-pane fade"
              id="pills-evolution"
              role="tabpanel"
              aria-labelledby="pills-evolution-tab"
            >
              evolution
            </div>
            <div
              class="tab-pane fade"
              id="pills-moves"
              role="tabpanel"
              aria-labelledby="pills-moves-tab"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
