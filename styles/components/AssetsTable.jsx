import { Table } from 'antd';
import { useContext } from 'react';
import { useState } from 'react';
import CryptoContext from '../context/crypto-context';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.name - b.name,
    sortDirections: ['descend'],
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];


const AssetsTable = () => {
    const { assets } = useContext(CryptoContext)

    const data = assets.map(a => ({
        key: a.id,
        name: a.name,
        price: Number(a.price).toFixed(2),
        amount: a.amount,

    }))

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    return (
        <Table
            style={{margin: '2rem', width: '80%'}}
            columns={columns}
            dataSource={data}
            pagination= {false}
        />
    )
}

export default AssetsTable