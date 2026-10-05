import { useState } from "react"

import SubscriptionForm from "./components/SubscriptionForm"
import SubscriptionList from "./components/SubscriptionList"

function App() {
  //subscription data
  const [subscriptions, setSubscriptions] = useState([
  {
    id: "1710000000000",
    name: "Netflix",
    amount: 15.99,
    category: "Entertainment",
  },
  {
    id: "1710000000001",
    name: "Spotify",
    amount: 9.99,
    category: "Music",
  },
])

  //Form state
const [name, setName] = useState("")
const [amount, setAmount] = useState("")
const [category, setCategory] = useState("")
const [editingId, setEditingId] = useState(null)
const [error, setError] = useState("")

//Calculate total monthly cost
const totalMonthlyCost = subscriptions.reduce(
  (total, subscription) => total + subscription.amount,
  0
)
const handleSubmit = () => {
  if (!name.trim()) {
    setError("Subscription name is required.")
    return
  }

  if (!amount || Number(amount) <= 0) {
    setError("Amount must be greater than 0.")
    return
  }

  if (!category) {
    setError("Please choose a category.")
    return
  }

  setError("")

  if (editingId) {
    setSubscriptions(
      subscriptions.map((subscription) =>
        subscription.id === editingId
          ? {
              ...subscription,
              name: name.trim(),
              amount: Number(amount),
              category: category,
            }
          : subscription
      )
    )

    setEditingId(null)
  } else {
    const newSubscription = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: Number(amount),
      category: category,
    }

    setSubscriptions([...subscriptions, newSubscription])
  }

  setName("")
  setAmount("")
  setCategory("")
}

const handleEdit = (subscription) => {
  setEditingId(subscription.id)
  setName(subscription.name)
  setAmount(subscription.amount)
  setCategory(subscription.category)
}

const handleDelete = (subscription) => {
  const confirmDelete = window.confirm(
    "Do you want to delete this subscription?"
  )

  if (confirmDelete) {
    setSubscriptions(
      subscriptions.filter((item) => item.id !== subscription.id)
    )

    setEditingId(null)
    setName("")
    setAmount("")
    setCategory("")
  }
}

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="mb-6 text-center font-serif text-4xl font-bold text-gray-900">
      Personal Subscription Tracker
    </h1>

    <p className="mb-6 text-center text-gray-600">
      Track and manage your subscriptions with ease.
    </p>

    <SubscriptionForm
  name={name}
  amount={amount}
  category={category}
  editingId={editingId}
  error={error}
  onNameChange={setName}
  onAmountChange={setAmount}
  onCategoryChange={setCategory}
  onSubmit={handleSubmit}
/>

{/* Total Monthly Cost */}
<div className=" mt-6 mb-6 rounded-xl border-2 border-gray-400 bg-white p-5 shadow-lg">
  <h2 className="text-lg font-semibold text-gray-900">
    Total Monthly Cost
  </h2>

  <p className="mt-2 text-2xl font-bold text-blue-600">
    ${totalMonthlyCost.toFixed(2)}
  </p>
</div>

{/* Subscription cards */}
<SubscriptionList
  subscriptions={subscriptions}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
</div>
)
}
export default App