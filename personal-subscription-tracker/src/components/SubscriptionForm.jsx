function SubscriptionForm({
  name,
  amount,
  category,
  editingId,
  error,
  onNameChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Add Your Subscription
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Subscription name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="rounded-lg border-2 border-gray-400 p-3 placeholder:text-gray-700"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="rounded-lg border-2 border-gray-400 p-3 placeholder:text-gray-700"
        />

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border-2 border-gray-400 p-3"
        >
          <option value="">Choose category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Music">Music</option>
          <option value="Education">Education</option>
          <option value="Gaming">Gaming</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {error && (
        <p className="mt-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onSubmit}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {editingId ? "Update Subscription" : "Add Subscription"}
      </button>
    </div>
  )
}

export default SubscriptionForm