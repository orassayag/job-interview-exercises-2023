import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table() {
  const [data, setData] = useState([]);
  const [curp, setCurP] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalC, setTotalC] = useState(0);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      // Fetch all the data.
      const dataResult = await fetch(`${USERS_URL}?page=${page}`);
      const jsonDataResult = await dataResult.json();
      setData(jsonDataResult.results);


      setTotalC(jsonDataResult.count);

      setLoading(false);


    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(0);
    };

    fetchInitialData();
  }, [totalC]);

  useEffect(() => {
    fetchData(curp);
  }, [curp]);

  const goToFirst = () => {
    if (curp > 0) {
      setCurP(0);
    }
  };

  const goToPrev = () => {
    /*     if (curp > 0) {
          setCurrentPage((prevp) => prevp - 1);
        } else if (curp === 0 && totalCount > 0) {
          setCurrentPage(Math.ceil(totalCount / 10) - 1);
        } else if (curp === 0 && totalCount === 0) {
          setCurrentPage(0);
        } */

    if (curp > 0) {
      setCurP((prevp) => prevp - 1);
    } else if (curp === 0 && totalC > 0) {
      setCurP(Math.ceil(totalC / 10) - 1);
    }
  };

  const goToNext = () => {
    setCurP((prevp) => prevp + 1);
  };

  const goToLast = () => {
    const lpage = Math.ceil(totalC / 10) - 1;
    setCurP(lpage);
  };

  const isFPage = curp === 0 || totalC === 0;
  const isLPage = curp === Math.ceil(totalC / 10) - 1 || totalC === 0;
  const isLoadingOrFirst = loading || isFPage;
  const isLoadingOrLast = loading || isLPage;

  return (
    <div>
      <table className="my-table">
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            null
          ) : (
            data.map((us) => (
              <tr key={us.id}>
                <td>{us.id}</td>
                <td>{us.firstName}</td>
                <td>{us.lastName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <section className="pagination">
        <button
          type="button"
          className="first-page-btn"
          onClick={goToFirst}
          disabled={isLoadingOrFirst}
        >
          first
        </button>
        <button
          type="button"
          className="previous-page-btn"
          onClick={goToPrev}
          disabled={isLoadingOrFirst}
        >
          previous
        </button>
        <button
          type="button"
          className="next-page-btn"
          onClick={goToNext}
          disabled={isLoadingOrLast}
        >
          next
        </button>
        <button
          type="button"
          className="last-page-btn"
          onClick={goToLast}
          disabled={isLoadingOrLast}
        >
          last
        </button>
      </section>
    </div>
  );
}