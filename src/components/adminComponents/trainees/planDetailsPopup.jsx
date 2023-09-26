import React, { useEffect, useState } from 'react';
import errorFunction from '../../../services/errorHandling';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ImageUpdatePopup = ({ isOpen, onClose, token, userId, axiosInstance }) => {
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  const fetch = (userId) => {
    axiosInstance
      .get(`/admin/subs/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubs(res?.data?.subs);
      })
      .catch((err) => {
        errorFunction(err, navigate);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetch(userId);
    }
  }, [isOpen, userId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          zIndex: 990,
        },
        content: {
          minWidth: '90%', 
          maxWidth: '500px', 
          margin: 'auto',
          padding: '20px',
          borderColor: 'black',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          background: 'black',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <h4 className="text-zinc-300 text-center my-10 w3-animate-top">Subscriptions</h4>

      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th colSpan={2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          {subs?.length === 0 ? (
            <tbody>
              <tr>
                <td className="px-6 py-4 text-center text-gray-500" colSpan="5">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {subs.map((sub) => (
                <tr key={sub._id} className="">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(sub?.startDate).toDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(sub?.endDate).toDateString()}</td>
                  <td className="px-6 py-4">
                    <img
                      src={sub?.plan?.imageSrc}
                      alt=""
                      className="w-16 h-16 object-cover rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{sub?.plan?.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${sub?.expired ? 'text-red-500' : 'text-blue-500'}`}>
                    {sub?.expired ? 'Expired' : 'Ongoing'}
                  </td>
                </tr>
              ))}
            </tbody>
          )}

        </table>
      </div>

      <div className="flex justify-center gap-5 my-10">
        <button
          onClick={onClose}
          className="bg-transparent hover:text-red-700 text-zinc-300 font-semibold py-2 px-4 rounded-full"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageUpdatePopup;
