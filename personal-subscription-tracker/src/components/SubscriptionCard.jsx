function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border-2 border-gray-400 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900">
        {subscription.name}
      </h2>

      <p className="text-gray-600">
        Category: {subscription.category}
      </p>

      <p className="font-medium text-gray-900">
        ${subscription.amount.toFixed(2)}
      </p>

      <button
        type="button"
        onClick={() => onEdit(subscription)}
        className="mt-3 mr-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => onDelete(subscription)}
        className="mt-3 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default SubscriptionCard