import { useState } from 'react';
import dash from '../../assets/images/images/bg.jpg'

function UserDetail(props) {
  const user = props.user
  const foodCount = props.foodCount
  const taskCount = props.taskCount
  const metricsCount = props.metricsCount
  const setEdit = props.setEdit
  const subscriptions = props.subscriptions
  const [visibleSubscriptions, setVisibleSubscriptions] = useState(2);

  const showMoreSubscriptions = () => {
    setVisibleSubscriptions(visibleSubscriptions + 8);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className='bg-white w-full h-2/5'>
          <div className='w3-animate-bottom'
            style={{
              backgroundImage: `url(${user?.dashImage ? user?.dashImage : dash})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>
        <div className="p-8 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0 w3-animate-left">
              <div className='mx-2'>
                <p className="font-bold text-zinc-200 text-xl">{foodCount}</p>
                <p className="text-gray-300">Food Tracker Entries</p>
              </div >
              <div className='mx-2'>
                <p className="font-bold text-zinc-200 text-xl">{taskCount}</p>
                <p className="text-gray-300">Total Tasks Scheduled</p>
              </div>
              <div className='mx-2'>
                <p className="font-bold text-zinc-200 text-xl">{metricsCount}</p>
                <p className="text-gray-300">Body Metrics Entries</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-56 h-56 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <div className='w3-animate-zoom'
                  style={{
                    backgroundImage: `url(${user.profileImage ? user.profileImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            </div>
            <div className="space-x-8 flex justify-end mt-32 md:mt-0 md:justify-end">
              <button onClick={() => setEdit(true)}
                className="text-white w3-animate-right py-2 px-4 rounded font-medium transition transform hover:-translate-y-0.5"
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12 ">
            <h1 className="text-4xl font-medium text-zinc-200 w3-animate-bottom">{user?.name}, <span className="font-light text-gray-200">{user?.age}</span></h1>
            <p className="font-light text-zinc-300 mt-3 w3-animate-bottom">
              {user?.place}
              {user?.district ? `, ${user?.district}` : ''}
            </p>
            <p className="mt-8 text-gray-200 w3-animate-bottom">Designation: {user?.job}</p>
            <p className="mt-2 text-gray-200 w3-animate-bottom">Organization: {user?.organization}</p>
            <p className="mt-2 text-gray-200 w3-animate-bottom">{user?.email}</p>
            <p className="mt-2 text-gray-200 w3-animate-bottom">{user?.phone}</p>
          </div>

          <div className="mt-12 flex flex-col justify-center">
            <div className="mb-4 text-center">
              <p className="text-zinc-100 font-bold lg:px-16 mb-2">Subscription History
              </p>
            </div>
            {subscriptions && subscriptions.slice(0, visibleSubscriptions).map((subscription, index) => (
              <div key={index} className="mb-4  text-center border-b border-black w3-animate-bottom">
                <p className="text-zinc-300 font-light lg:px-16 mb-2">
                  Subscription Period: <span className='font-bold text-green-300'> {formatDate(subscription?.startDate)}</span> till <span className='font-bold text-red-300'>{formatDate(subscription?.endDate)}</span>
                </p>
                <p className="text-zinc-300 font-light lg:px-16 mb-2">
                  Plan Name: {subscription?.plan?.name}
                </p>
                <p></p>
              </div>
            ))}
            {subscriptions && visibleSubscriptions < subscriptions.length && (
              <button className="text-indigo-500 py-2 px-4 font-medium mt-4 self-center"
                onClick={showMoreSubscriptions}>
                Show more
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default UserDetail