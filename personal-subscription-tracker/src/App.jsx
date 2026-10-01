import { useEffect, useState } from "react"

function App() {
  //subscription data
  const [subscriptions, setSubscriptions] = useState(() => {
  const savedSubscriptions = localStorage.getItem("subscriptions")

  if (savedSubscriptions) {
  const savedData = JSON.parse(savedSubscriptions)

  const defaultSubscriptions = [
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
  ]

  const savedIds = savedData.map((subscription) => subscription.id)

  return [
    ...savedData,
    ...defaultSubscriptions.filter(
      (subscription) => !savedIds.includes(subscription.id)
    ),
  ]
}

  return [
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
  ]
})
useEffect(() => {
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions))
}, [subscriptions])

  //Form state
const [name, setName] = useState("")
const [amount, setAmount] = useState("")
const [category, setCategory] = useState("")
const [editingId, setEditingId] = useState(null)

//Calculate total monthly cost
const totalMonthlyCost = subscriptions.reduce(
  (total, subscription) => total + subscription.amount,
  0
)

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="mb-6 text-center font-serif text-4xl font-bold text-gray-900">
      Personal Subscription Tracker
    </h1>

    <p className="mb-6 text-center text-gray-600">
      Track and manage your subscriptions with ease.
    </p>

{/* Add Subscription Form */}
<div className="mb-6 rounded-lg bg-white p-6 shadow">
  <h2 className="mb-4 text-xl font-semibold text-gray-900">
    Add Your Subscription
  </h2>

  <div className="grid gap-4 md:grid-cols-3">

    <input
  type="text"
  placeholder="Subscription name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="rounded-lg border-2 border-gray-400 p-3 placeholder:text-gray-700"
/>

    <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="rounded-lg border-2 border-gray-400 p-3 placeholder:text-gray-700"
    />

    <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="rounded-lg border-2 border-gray-400 p-3 placeholder:text-gray-700"
>
  <option value="">Choose category</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Music">Music</option>
  <option value="Education">Education</option>
  <option value="Gaming">Gaming</option>
  <option value="Other">Other</option>
</select>

  </div>
</div>

{/* Add or update subscription */}
<button
  onClick={() => {
    if (!name || !amount || !category) return

    if (editingId) {
      setSubscriptions(
       subscriptions.map((subscriptions) =>
        subscriptions.id === editingId
       ? {
             ...subscriptions,
             name: name,
             amount: Number(amount),
             category: category,
       }
      : subscriptions
      ) 
      )

      setEditingId(null)
    } else {
    const newSubscription = {
      id: Date.now().toString(),
      name: name,
      amount: Number(amount),
      category: category,
    }

    setSubscriptions([...subscriptions, newSubscription])
  }
    setName("")
    setAmount("")
    setCategory("")
  }}

  className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
>
  {editingId ? "Update Subscription" : "Add Subscription"}
</button>

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
    <div className="grid gap-4 md:grid-cols-2">
      {subscriptions.map((subscription) => (
        <div
          key={subscription.id}
          className="rounded-xl border-2 border-gray-400 bg-white p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {subscription.name}
          </h2>

          <p className="text-gray-600">
            Category: {subscription.category}
          </p>

          <p className="font-medium text-gray-900">
            ${subscription.amount}
          </p>

{/* Edit and Delete actions */}
<button
type="button"
  onClick={() => {
    setEditingId(subscription.id)
    setName(subscription.name)
    setAmount(subscription.amount)
    setCategory(subscription.category)
  }}
  className="mt-3 mr-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600"
>
  Edit
</button>

<button
onClick={() => {
  const confirmDelete = window.confirm(
    "Do you want to delete this subscription?"
  )

  if (confirmDelete) {
    setSubscriptions(
      subscriptions.filter((item) => item.id !== subscription.id)
    )
  }
}}
className="mt-3 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
>
  Delete
</button>

        </div>
      ))}
    </div>
  </div>
)
}
export default App