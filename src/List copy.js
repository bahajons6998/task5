import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import { books_DE } from './data/books_DE';
import { book_create } from './book_create';
const columns = [
  { title: '№', dataIndex: 'index', key: 'index' },
  { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
  { title: 'TITLE', dataIndex: 'title', key: 'title' },
  { title: 'AUTHOR(S)', dataIndex: 'authors', key: 'authors' },
  { title: 'PULISHER', dataIndex: 'publisher', key: 'pulisher' },
  // {
  //   title: 'PUBLISHER',
  //   dataIndex: '',
  //   key: 'x',
  //   render: () => <a>Delete</a>,
  // },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  // {
  //   key: 3,
  //   name: 'Not Expandable',
  //   age: 29,
  //   address: 'Jiangsu No. 1 Lake Park',
  //   description: 'This not expandable',
  // },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];



const List_copy = ({ language = 'en', seed }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const loader = useRef(null);
  // let offset = books.length;

  const loadMoreBooks = () => {
    const count = page === 0 ? 20 : 10
    const newBooks = book_create({ language, seed, page, count, offset });
    setBooks((prev) => [...prev, ...newBooks]);
    setPage((prev) => prev + 1);
    console.log(books.length);
  };

  useEffect(() => {
    loadMoreBooks();
  }, []);

  useEffect(() => {
    setOffset(books.length);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreBooks();
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [loader.current]);


  return (
    <div className='container-fluid'>
      {console.log(books)}
      <Table pagination={false}
        columns={columns}
        rowKey={record => record.index}
        expandable={{
          expandedRowRender: record => <div style={{ margin: 0, display: 'flex' }}>
            <img src={record.cover} width={250} />

            {record.description}

          </div>,
          // rowExpandable: record => record.name !== 'Not Expandable',
        }}

        dataSource={books}
      />
      <div ref={loader} className="text-center py-4 text-gray-500">Yuklanmoqda...</div>
    </div>
  )
};
export default List_copy;