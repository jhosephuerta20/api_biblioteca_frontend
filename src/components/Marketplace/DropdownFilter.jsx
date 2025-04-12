const DropdownFilter = ({ title, items, selected, onChange }) => {
  const handleSelection = (item) => {
    const newSelected = selected.includes(item)
      ? selected.filter((selectedItem) => selectedItem !== item)
      : [...selected, item];

    onChange(newSelected);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2">{title}</label>
      <div className="mt-2 h-[250px] space-y-1 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item}
            onClick={() => handleSelection(item)}
            className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
              selected.includes(item)
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center h-4 w-4 relative">
              <input
                type="checkbox"
                checked={selected.includes(item)}
                readOnly
                className="opacity-0 absolute h-4 w-4 cursor-pointer"
              />
              <div className="h-4 w-4 border-2 rounded border-gray-300 flex items-center justify-center">
                {selected.includes(item) && (
                  <svg
                    className="h-3 w-3 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-2 text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DropdownFilter;
