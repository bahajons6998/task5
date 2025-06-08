import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import { creatCsvFile, downloadFile } from 'download-csv';
import { book_create } from './book_create';
const columns = [
  { title: '№', dataIndex: 'index', key: 'index' },
  { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
  { title: 'TITLE', dataIndex: 'title', key: 'title' },
  { title: 'AUTHOR(S)', dataIndex: 'authors', key: 'authors' },
  { title: 'PULISHER', dataIndex: 'publisher', key: 'pulisher' },
];

const List = ({ language, seed, like, review }) => {
  const [books, setBooks] = useState([]);
  let page = 0;

  const loader = useRef(null);


  const create_book = () => {
    setBooks([]);
    const count = page === 0 ? 20 : 10;
    const offset = page === 0 ? 0 : 20 + (page - 1) * 10;
    const newBooks = book_create({ language, seed, page, like, review, count, offset });
    setBooks((prev) => [...prev, ...newBooks]);
    page++;
    console.log('chaqirilyapti');
  };

  const loadMoreBooks = () => {
    const count = page === 0 ? 20 : 10;
    const offset = books.length ? 0 : 20 + (page - 1) * 10;
    const newBooks = book_create({ language, seed, page, count, offset });
    setBooks((prev) => [...prev, ...newBooks]);
    page++;
    console.log('chaqirilyapti');
  };

  useEffect(() => {
    create_book();
    console.log(language, seed, like, review);

  }, [language, seed, like, review]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreBooks();
      }
    });

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  function downloadcsvfile() {
    let exportData = books.sort((a) => a.likes <= like && a.review <= review)
    const csvfile = creatCsvFile(exportData, columns);
    downloadFile(csvfile, 'CSV FILE')
  }

  return (
    <div>
      <button className='btn btn-primary my-3 float-right' onClick={downloadcsvfile}>Download CSV</button>
      <Table pagination={false}
        columns={columns}
        rowKey={record => record.index}
        expandable={{
          expandedRowRender: record => <div className='d-flex justify-content-start'>
            <img src={record.cover} width={250} />
            <div className='p-3 w-50'>
              <h4>{record.title}</h4>
              <h6>{record.authors[0]}</h6>
              <ul className='list-unstyled p-2'>
                {record.reviews.map((item, i) =>
                  <li key={i}><b className='font-italic'>{item.author}</b><br /><p>{item.text}</p></li>
                )}
              </ul>
              <b style={{ fontSize: '20px' }}>❤ {record.likes} 👀: {record.review}</b>
              <hr />
              {record.description}
            </div>
          </div>,
          showExpandColumn: books => books.likes < like && books.review < review,
        }}

        dataSource={books}
      />
      <div ref={loader} className="text-center py-4 text-gray-500">Uploading...</div>
    </div>
  )
};
export default List;