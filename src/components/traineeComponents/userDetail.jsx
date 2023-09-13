
function UserDetail(props) {
  const user = props.user
  const setEdit = props.setEdit

  return (
    <>
      <div className="flex justify-center items-center h-full bg-gray-900">
        <div className="container mx-auto py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- ">
            <div className="">
              <div className="card rounded-md bg-gray-800 ">
                <div className="flex justify-end p-2">
                  <a
                    onClick={() => setEdit(true)}
                    className="text-gray-400 hover:text-gray-200 hover:cursor-pointer"
                  >
                    Edit Profile
                  </a>
                </div>
                <div className="card-body text-center">
                  <img
                    src={
                      user.profileImage
                        ? user.profileImage
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-md h-40 w-40 mx-auto"
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="card p-2 rounded-md bg-gray-800 mb-4">
                <div className="card-body">
                  <div className="flex items-center">
                    <p className="w-1/3 font-semibold text-gray-400">Full Name</p>
                    <p className="text-white mb-0">{user.name}</p>
                  </div>
                  <hr className="my-2 border-gray-700" />
                  <div className="flex lowercase items-center">
                    <p className="w-1/3 font-semibold text-gray-400">Email</p>
                    <p className="text-white mb-0">{user.email}</p>
                  </div>
                  <hr className="my-2 border-gray-700" />
                  <div className="flex items-center">
                    <p className="w-1/3 font-semibold text-gray-400">Phone</p>
                    <p className="text-white mb-0">{user.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetail