function HeaderOrdersTable() {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Orders Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and update customer orders seamlessly
          </p>
        </div>
        <p className="relative inline-block text-2xl font-medium text-gray-800 tracking-wide group">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </p>
      </div>
    );
}

export default HeaderOrdersTable
