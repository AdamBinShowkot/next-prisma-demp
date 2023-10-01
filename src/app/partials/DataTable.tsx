'use client'

import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';

interface DataType {
  key: string;
  name: string;
  description: string;
  price:string,
  imageUrl:string,
  category:string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Image',
    key: 'imageUrl',
    dataIndex: 'imageUrl',
    render: (text) => <Image width={80} height={50} src={text} alt="Image"></Image>,
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex:'category'
  },
];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     description: "Demo Description",
//     price:"45.20",
//     imageUrl:"https://static.javatpoint.com/computer/images/what-is-the-url.png",
//     category: 'New Category'
//   }
// ];

export default function DataTable({data}:any){
    return(
        <Table columns={columns} dataSource={data} />
    )
}