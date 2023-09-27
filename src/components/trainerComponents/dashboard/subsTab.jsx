import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tabs({ title, items, link }) {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="">{title}</h2>
            <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>
            <div className="my-5 " >
                <table className="table">
                    <thead >
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>User</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {items !== null && items.length > 0 ? (
                        items.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map((item, index) => (
                            <tbody key={index} onClick={() => { navigate(`${link}`) }} className='w-full text-white rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                                <tr >
                                    <td>
                                        {new Date(item?.startDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td>
                                        {new Date(item?.endDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td>
                                        <div className='capitalize my-3' >{item?.user?.name}</div>
                                    </td>
                                    <td>
                                        <div className='capitalize my-3' >{item?.plan?.name}</div>{console.log()}
                                    </td>
                                    <td className={!item.expired ? 'text-green-600' : 'text-red-600'}>{!item.expired ? (
                                        'Ongoing'
                                    ) : (
                                        'Expired'
                                    )}</td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tbody className='w-full text-white rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                    <div className='flex items-center justify-center'>
                                        <span>No Data</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Tabs;
